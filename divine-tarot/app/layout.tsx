import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GinniChat } from '@/components/GinniChat'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: 'Divine Tarot - AI-Powered Spiritual Guidance',
    template: '%s | Divine Tarot',
  },
  description:
    'Connect with certified tarot readers and get AI-powered spiritual guidance. Experience personalized readings, live sessions, and spiritual products.',
  keywords: [
    'tarot',
    'tarot reading',
    'spiritual guidance',
    'ai tarot',
    'live tarot',
    'psychic',
    'spiritual advisor',
    'divination',
  ],
  authors: [
    {
      name: 'Divine Tarot Team',
    },
  ],
  creator: 'Divine Tarot',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://divinetarot.com',
    title: 'Divine Tarot - AI-Powered Spiritual Guidance',
    description:
      'Connect with certified tarot readers and get AI-powered spiritual guidance.',
    siteName: 'Divine Tarot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divine Tarot - AI-Powered Spiritual Guidance',
    description:
      'Connect with certified tarot readers and get AI-powered spiritual guidance.',
    creator: '@divinetarot',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <GinniChat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
