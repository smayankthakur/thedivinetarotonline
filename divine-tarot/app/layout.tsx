import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cinzel } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GinniChat } from '@/components/GinniChat'
import { GinniChatProvider } from '@/components/GinniChatProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: {
    default: 'The Divine Tarot - Personal Tarot Readings',
    template: '%s | The Divine Tarot',
  },
  description:
    'Connect with Bharti Singh for personal tarot readings, clarity, and spiritual guidance. Book a session and discover what the cards have to say about your journey.',
  keywords: [
    'tarot',
    'tarot reading',
    'spiritual guidance',
    'tarot reader',
    'psychic',
    'spiritual advisor',
    'divination',
  ],
  authors: [
    {
      name: 'Bharti Singh - Divine Tarot Reader',
    },
  ],
  creator: 'The Divine Tarot',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://divinetarot.com',
    title: 'The Divine Tarot - Personal Tarot Readings',
    description:
      'Connect with Bharti Singh for personal tarot readings and spiritual guidance.',
    siteName: 'The Divine Tarot',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Divine Tarot - Personal Tarot Readings',
    description:
      'Connect with Bharti Singh for personal tarot readings and spiritual guidance.',
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
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <GinniChatProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <GinniChat />
            </div>
          </GinniChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
