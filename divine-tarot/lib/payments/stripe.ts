import Stripe from 'stripe'
import { config } from '@/lib/config'

const stripeSecretKey = config.payments.stripe.secretKey || ''

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2026-03-25.dahlia',
      typescript: true,
    })
  : null

export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: '',
    readingsPerMonth: 3,
    features: [
      '3 readings per month',
      'Basic tarot spreads',
      'Standard interpretations',
      'Email support',
    ],
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    readingsPerMonth: -1, // Unlimited
    features: [
      'Unlimited readings',
      'All tarot spreads',
      'AI-powered interpretations',
      'Priority support',
      'Reading history',
      'Personalized insights',
    ],
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '',
    readingsPerMonth: -1, // Unlimited
    features: [
      'Everything in Pro',
      'Live reader sessions',
      'Exclusive spreads',
      'Advanced analytics',
      'Custom card decks',
      'Dedicated support',
    ],
  },
}

export type PlanId = keyof typeof PLANS

export function getPlanById(planId: string) {
  return Object.values(PLANS).find(plan => plan.id === planId)
}

export function getPlanByPriceId(priceId: string) {
  return Object.values(PLANS).find(plan => plan.priceId === priceId)
}
