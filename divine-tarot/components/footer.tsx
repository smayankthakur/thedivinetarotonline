'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Sparkles, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Book Personal Reading', href: '/booking' },
  ]

  const supportLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
  ]

  return (
    <footer className="bg-[#F9FAFB] border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="The Divine Tarot"
                width={200}
                height={120}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Guiding you toward clarity and peace.
            </p>
            <p className="text-xs text-[#A78BFA] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Your privacy and energy are always respected.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Navigation
            </h4>
            <ul role="list" className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-[#A78BFA] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Support
            </h4>
            <ul role="list" className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-[#A78BFA] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">
              Stay Connected
            </h4>
            
            {isSuccess ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm">
                <Check className="w-4 h-4" />
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 focus:border-[#A78BFA] transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full rounded-full bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white hover:scale-[1.02] transition-transform text-sm py-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </Button>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} The Divine Tarot. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <a
                href="https://sitelytic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#A78BFA] hover:underline transition-colors"
              >
                Designed & Developed by Sitelytic
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}