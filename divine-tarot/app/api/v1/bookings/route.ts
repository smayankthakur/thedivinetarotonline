import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = createClient()
    
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = supabase
      .from('bookings')
      .select(`
        *,
        reader:readers (
          id,
          name,
          avatar,
          specialty
        )
      `)
      .eq('user_id', user.id)
      .order('start_time', { ascending: false })

    // Add status filter if provided
    if (status) {
      query = query.eq('status', status)
    }

    // Add pagination
    query = query.range(offset, offset + limit - 1)

    const { data: bookings, error } = await query

    if (error) {
      console.error('Error fetching bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: bookings || [],
    })
  } catch (error) {
    console.error('Error in bookings endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { readerId, startTime, endTime, notes } = body

    // Validate input
    if (!readerId || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Reader ID, start time, and end time are required' },
        { status: 400 }
      )
    }

    // Check if reader exists and is available
    const { data: reader, error: readerError } = await supabase
      .from('readers')
      .select('*')
      .eq('id', readerId)
      .eq('available', true)
      .single()

    if (readerError || !reader) {
      return NextResponse.json(
        { error: 'Reader not found or not available' },
        { status: 404 }
      )
    }

    // Check if time slot is available
    const { data: existingBooking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('reader_id', readerId)
      .eq('status', 'confirmed')
      .or(`and(start_time.lte.${startTime},end_time.gt.${startTime}),and(start_time.lt.${endTime},end_time.gte.${endTime})`)
      .single()

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Time slot is already booked' },
        { status: 409 }
      )
    }

    // Create booking
    const { data: booking, error: createError } = await supabase
      .from('bookings')
      .insert({
        reader_id: readerId,
        user_id: user.id,
        start_time: startTime,
        end_time: endTime,
        status: 'pending',
        price: reader.price,
        notes: notes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating booking:', createError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    console.error('Error in bookings endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
