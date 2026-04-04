'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Start Reading', href: '/tarot' },
  { name: 'Guidance Hub', href: '/blog' },
]

export function Navbar() {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-8 lg:px-12">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Divine Tarot"
                width={48}
                height={48}
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-200 px-4 py-2 relative group',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
                <span className={cn(
                  'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-primary/60 rounded-full transition-all duration-200',
                  pathname === item.href ? 'w-full' : 'group-hover:w-1/2'
                )} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: CTA + Avatar */}
        <div className="flex items-center gap-3">
          {/* Login Button - Soft Gold/Lavender Gradient */}
          <Button 
            asChild 
            className="hidden sm:flex rounded-full px-5 py-5 text-sm font-medium bg-gradient-to-r from-lavender-300 to-lavender-400 text-foreground hover:from-lavender-400 hover:to-lavender-500 hover:scale-[1.03] transition-all duration-200 shadow-sm border border-lavender-200/50"
          >
            <Link href="/login">Begin Your Journey</Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-1 ring-border hover:ring-primary/30 transition-all duration-200">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback className="bg-gradient-to-br from-lavender-300 to-lavender-500 text-foreground text-sm">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/wallet">Wallet</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login">Sign In</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
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
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                  pathname === item.href
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              asChild 
              className="w-full mt-4 rounded-full bg-gradient-to-r from-lavender-300 to-lavender-400 text-foreground hover:from-lavender-400 hover:to-lavender-500 transition-all duration-200 shadow-sm"
            >
              <Link href="/login">Begin Your Journey</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
