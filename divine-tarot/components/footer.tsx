'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2, Sparkles } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      setIsSuccess(true)
      setEmail('')
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const productLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Book Personal Reading', href: '/booking' },
  ]

  const supportLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Services', href: '/terms' },
  ]

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#EAEAEA]">
      {/* Main Footer Content */}
      <div className="container px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* SECTION 1: Brand */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-[80px]">
                <Image
                  src="/logo.png"
                  alt="The Divine Tarot"
                  width={200}
                  height={80}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <div>
              {/* <h3 className="text-base font-semibold text-[#1A1A1A]">
                The Divine Tarot
              </h3> */}
              <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                Guiding you with clarity, intuition, and spiritual insight. Talk to Ginni for personalized tarot guidance anytime.
              </p>
            </div>
            <p className="text-xs text-[#A78BFA] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Your intuitive companion
            </p>
          </div>

          {/* SECTION 2: Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
              Product
            </h4>
            <ul role="list" className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#666666] hover:text-[#A78BFA] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 3: Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
              Support
            </h4>
            <ul role="list" className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#666666] hover:text-[#A78BFA] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4: Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
              Legal
            </h4>
            <ul role="list" className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#666666] hover:text-[#A78BFA] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 5: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
              Stay Connected
            </h4>
            
            {isSuccess ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <Check className="h-4 w-4" />
                <span className="text-sm">You're now connected with Ginni 💜</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 focus:border-[#A78BFA] transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full rounded-full bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white hover:scale-[1.02] transition-transform text-sm py-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </Button>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <p className="text-xs text-[#666666]">
                  Get guidance, insights & updates from Ginni 💜
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#EAEAEA]">
        <div className="container px-6 md:px-12 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} The Divine Tarot. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-[#A78BFA] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-[#A78BFA] transition-colors"
              >
                Terms
              </Link>
              <span className="text-gray-300">|</span>
              <a
                href="https://sitelytc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#888888] hover:text-[#A78BFA] hover:underline transition-colors"
              >
                Designed & Developed by Sitelytc
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}