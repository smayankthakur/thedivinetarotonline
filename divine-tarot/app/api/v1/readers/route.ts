import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = createClient()
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get('specialty')
    const available = searchParams.get('available')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = supabase
      .from('readers')
      .select('*')
      .order('rating', { ascending: false })

    // Add specialty filter if provided
    if (specialty) {
      query = query.eq('specialty', specialty)
    }

    // Add availability filter if provided
    if (available === 'true') {
      query = query.eq('available', true)
    }

    // Add pagination
    query = query.range(offset, offset + limit - 1)

    const { data: readers, error } = await query

    if (error) {
      console.error('Error fetching readers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch readers' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: readers || [],
    })
  } catch (error) {
    console.error('Error in readers endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
