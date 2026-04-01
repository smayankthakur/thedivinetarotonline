import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { readerId: string } }
) {
  try {
    const supabase = createClient()
    const { readerId } = params

    // Get reader availability
    const { data: availability, error } = await supabase
      .from('reader_availability')
      .select('*')
      .eq('reader_id', readerId)
      .order('day_of_week', { ascending: true })

    if (error) {
      console.error('Error fetching availability:', error)
      return NextResponse.json(
        { error: 'Failed to fetch availability' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: availability || [],
    })
  } catch (error) {
    console.error('Error in availability endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { readerId: string } }
) {
  try {
    const supabase = createClient()
    const { readerId } = params

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
    const { availability } = body

    if (!availability || !Array.isArray(availability)) {
      return NextResponse.json(
        { error: 'Availability data is required' },
        { status: 400 }
      )
    }

    // Delete existing availability
    await supabase
      .from('reader_availability')
      .delete()
      .eq('reader_id', readerId)

    // Insert new availability
    const { error: insertError } = await supabase
      .from('reader_availability')
      .insert(
        availability.map((item: any) => ({
          reader_id: readerId,
          day_of_week: item.dayOfWeek,
          start_time: item.startTime,
          end_time: item.endTime,
          slot_duration: item.slotDuration,
          is_active: item.isActive,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }))
      )

    if (insertError) {
      console.error('Error saving availability:', insertError)
      return NextResponse.json(
        { error: 'Failed to save availability' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Availability saved successfully',
    })
  } catch (error) {
    console.error('Error in availability endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
