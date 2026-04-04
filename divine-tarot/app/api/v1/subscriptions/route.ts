import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, PLANS } from '@/lib/payments/stripe'

export async function GET(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({
        success: true,
        data: {
          subscription: {
            plan_id: 'free',
            status: 'active',
          },
          currentPlan: PLANS.FREE,
          readingsThisMonth: 0,
          hasReachedLimit: false,
          availablePlans: Object.values(PLANS),
        },
      })
    }
    
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

    // Get user subscription
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Get user's reading count for current month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: readingsThisMonth } = await supabase
      .from('readings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString())

    // Determine current plan
    const currentPlan = subscription?.plan_id || 'free'
    const planDetails = Object.values(PLANS).find(plan => plan.id === currentPlan) || PLANS.FREE

    // Check if user has reached free limit
    const hasReachedLimit = currentPlan === 'free' && (readingsThisMonth || 0) >= planDetails.readingsPerMonth

    return NextResponse.json({
      success: true,
      data: {
        subscription: subscription || {
          plan_id: 'free',
          status: 'active',
        },
        currentPlan: planDetails,
        readingsThisMonth: readingsThisMonth || 0,
        hasReachedLimit,
        availablePlans: Object.values(PLANS),
      },
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

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
    const { planId } = body

    if (!planId || !['pro', 'premium'].includes(planId)) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
        { status: 400 }
      )
    }

    const plan = Object.values(PLANS).find(p => p.id === planId)
    if (!plan || !plan.priceId) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 400 }
      )
    }

    // Get or create Stripe customer
    const { data: existingSubscription } = await supabase
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    let customerId = existingSubscription?.stripe_customer_id

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      })
      customerId = customer.id
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade?canceled=true`,
      metadata: {
        userId: user.id,
        planId: planId,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
