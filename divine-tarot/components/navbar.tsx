'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Book Personal Reading', href: '/booking' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* LEFT SECTION - Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Divine Tarot"
              width={320}
              height={180}
              className="h-10 w-auto md:h-14 md:w-[240px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* CENTER SECTION - Nav Links */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-200 relative group py-1',
                  pathname === item.href
                    ? 'text-[#A78BFA]'
                    : 'text-gray-700 hover:text-[#A78BFA]'
                )}
              >
                {item.name}
                <span className={cn(
                  'absolute bottom-0 left-0 h-0.5 w-0 bg-[#A78BFA] rounded-full transition-all duration-200',
                  pathname === item.href ? 'w-full' : 'group-hover:w-full'
                )} />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - CTA Button */}
        <div className="flex items-center gap-3">
          <Button 
            asChild
            className="hidden sm:flex rounded-full px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            <Link href="/booking">
              Start Reading
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-md fixed inset-0 top-16">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-xl font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'text-[#A78BFA]'
                    : 'text-gray-700 hover:text-[#A78BFA]'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              asChild 
              className="rounded-full px-8 py-3 text-base font-semibold bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white shadow-md"
            >
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                Start Reading
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}