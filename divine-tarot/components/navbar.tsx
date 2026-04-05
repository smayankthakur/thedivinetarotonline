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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <nav className="container flex h-[200px] items-center justify-between px-4 md:px-8">
        {/* LEFT SECTION - Logo */}
        <div className="flex items-center mr-6">
          <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="The Divine Tarot"
                width={320}
                height={180}
                className="object-contain"
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
                    ? 'text-[#7C3AED]'
                    : 'text-gray-800 hover:text-[#7C3AED]'
                )}
              >
                {item.name}
                <span className={cn(
                  'absolute bottom-0 left-0 h-0.5 w-0 bg-[#7C3AED] rounded-full transition-all duration-200',
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
            className="hidden sm:flex rounded-full px-5 py-2 text-sm font-medium bg-gradient-to-r from-lavender-300 to-lavender-400 text-white hover:scale-105 hover:brightness-105 transition-all duration-200"
          >
            <Link href="/contact">
              Contact
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-gray-800"
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
        <div className="md:hidden border-t bg-white">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'bg-lavender-50 text-[#7C3AED]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              asChild 
              className="w-full mt-4 rounded-full bg-gradient-to-r from-lavender-300 to-lavender-400 text-white"
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}