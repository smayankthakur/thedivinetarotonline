import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/payments/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const customerId = session.customer
        const subscriptionId = session.subscription
        const userId = session.metadata?.userId

        if (userId && subscriptionId) {
          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const priceId = subscription.items.data[0]?.price.id

          // Determine plan based on price ID
          let planId = 'free'
          if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
            planId = 'pro'
          } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
            planId = 'premium'
          }

          // Update user subscription in database
          await supabase
            .from('user_subscriptions')
            .upsert({
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan_id: planId,
              status: subscription.status,
              current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
              current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        const subscriptionId = subscription.id
        const customerId = subscription.customer

        // Get user by customer ID
        const { data: userSubscription } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (userSubscription) {
          const priceId = subscription.items.data[0]?.price.id

          // Determine plan based on price ID
          let planId = 'free'
          if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
            planId = 'pro'
          } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
            planId = 'premium'
          }

          // Update user subscription in database
          await supabase
            .from('user_subscriptions')
            .update({
              plan_id: planId,
              status: subscription.status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        const subscriptionId = subscription.id

        // Update user subscription status to canceled
        await supabase
          .from('user_subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscriptionId)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as any
        const subscriptionId = invoice.subscription
        const customerId = invoice.customer

        // Get user by customer ID
        const { data: userSubscription } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (userSubscription) {
          // Record payment in database
          await supabase
            .from('payments')
            .insert({
              user_id: userSubscription.user_id,
              stripe_invoice_id: invoice.id,
              amount: invoice.amount_paid,
              currency: invoice.currency,
              status: 'succeeded',
              created_at: new Date().toISOString(),
            })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        const customerId = invoice.customer

        // Get user by customer ID
        const { data: userSubscription } = await supabase
          .from('user_subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (userSubscription) {
          // Record failed payment
          await supabase
            .from('payments')
            .insert({
              user_id: userSubscription.user_id,
              stripe_invoice_id: invoice.id,
              amount: invoice.amount_due,
              currency: invoice.currency,
              status: 'failed',
              created_at: new Date().toISOString(),
            })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
