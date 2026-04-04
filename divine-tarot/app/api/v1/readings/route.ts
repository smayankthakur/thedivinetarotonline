import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

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
    const limit = parseInt(searchParams.get('limit') || '5')
    const offset = parseInt(searchParams.get('offset') || '0')
    const search = searchParams.get('search') || ''

    // Build query
    let query = supabase
      .from('readings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    // Add search filter if provided
    if (search) {
      query = query.ilike('question', `%${search}%`)
    }

    // Add pagination
    query = query.range(offset, offset + limit - 1)

    const { data: readings, error, count } = await query

    if (error) {
      console.error('Error fetching readings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch readings' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('readings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    return NextResponse.json({
      success: true,
      data: {
        readings: readings || [],
        pagination: {
          total: totalCount || 0,
          limit,
          offset,
          hasMore: (offset + limit) < (totalCount || 0),
        },
      },
    })
  } catch (error) {
    console.error('Error in readings endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
