export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Divine Tarot',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  },
  payments: {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY || '',
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    },
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    },
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
  },
  redis: {
    url: process.env.REDIS_URL || '',
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
    posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || '',
  },
  calendar: {
    google: {
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
      privateKey: process.env.GOOGLE_PRIVATE_KEY || '',
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    },
  },
} as const

export function validateConfig(): void {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ]

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName]
  )

  if (missingVars.length > 0) {
    console.warn(
      `⚠️  Missing required environment variables: ${missingVars.join(', ')}`
    )
    console.warn('Please check your .env.local file')
  }
}
