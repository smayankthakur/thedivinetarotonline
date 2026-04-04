'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LayoutDashboard, User, Wallet, Calendar, Star, ShoppingBag, Settings, Sparkles, BookOpen, Heart } from 'lucide-react'

const sidebarNav = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'My Readings', href: '/sessions', icon: Sparkles },
  { name: 'Guidance Hub', href: '/blog', icon: BookOpen },
  { name: 'Saved', href: '/favorites', icon: Heart },
  { name: 'Wallet', href: '/wallet', icon: Wallet },
  { name: 'Orders', href: '/orders', icon: ShoppingBag },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen mystical-gradient">
      <div className="container py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <motion.div 
              className="p-6 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 glass sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-border/30">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-serif font-semibold">Your Space</span>
              </div>
              
              <nav className="space-y-2">
                {sidebarNav.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                      )}
                    >
                      <item.icon className={cn(
                        "w-5 h-5",
                        isActive && "text-primary"
                      )} />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              {/* Ginni CTA */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-amber-400/10 border border-violet-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <p className="text-sm font-medium">Talk to Ginni</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Your personal spiritual companion is here to help.
                </p>
                <p className="text-xs text-violet-400">
                  Click the floating button 💜
                </p>
              </div>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 glass"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}