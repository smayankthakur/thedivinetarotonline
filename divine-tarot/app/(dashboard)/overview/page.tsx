'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, BookOpen, History, Star, Heart, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function DashboardOverviewPage() {
  const stats = [
    { name: 'Total Readings', value: '12', icon: Sparkles, color: 'from-primary to-purple-400', description: 'Your spiritual journey' },
    { name: 'Saved Questions', value: '8', icon: BookOpen, color: 'from-amber-400 to-gold-500', description: 'Remembered insights' },
    { name: 'This Month', value: '5', icon: TrendingUp, color: 'from-emerald-400 to-teal-500', description: 'New perspectives' },
    { name: 'Favorites', value: '3', icon: Star, color: 'from-rose-400 to-pink-500', description: 'Treasured readings' },
  ]

  const recentReadings = [
    {
      id: 1,
      question: 'What does my future hold in love?',
      cards: ['♈', '☸', '★'],
      date: '2 hours ago',
      type: 'love'
    },
    {
      id: 2,
      question: 'Should I take this job offer?',
      cards: ['⚔', '🏠', '🌙'],
      date: 'Yesterday',
      type: 'career'
    },
    {
      id: 3,
      question: 'What is my spiritual purpose?',
      cards: ['⚖', '🔮', '🌅'],
      date: '3 days ago',
      type: 'spiritual'
    },
  ]

  const suggestions = [
    {
      title: 'Your Love Journey Continues',
      description: 'Based on your recent readings, the cards suggest focusing on self-love before seeking romantic connections.',
      type: 'insight'
    },
    {
      title: 'Career Crossroads',
      description: 'A new opportunity is approaching. Trust your instincts—you\'ve been preparing for this moment.',
      type: 'guidance'
    }
  ]

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            Welcome Back, Seeker
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Your spiritual journey continues. The cards await your questions.
          </p>
        </div>
        <Button asChild className="btn-premium rounded-full px-8 w-fit">
          <Link href="/tarot">
            <Sparkles className="w-4 h-4 mr-2" />
            Start New Reading
          </Link>
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border/50 glass hover:border-primary/30 transition-all group"
          >
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
              stat.color
            )}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground">{stat.name}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Readings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-3xl bg-card border border-border/50 glass"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-semibold">Recent Readings</h2>
            <Button variant="ghost" className="text-primary text-sm rounded-full">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentReadings.map((reading) => (
              <Link
                key={reading.id}
                href={`/dashboard/readings/${reading.id}`}
                className="block p-4 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {reading.cards.map((card, i) => (
                      <span key={i} className="text-lg">{card}</span>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{reading.question}</p>
                    <p className="text-sm text-muted-foreground">{reading.date}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    reading.type === 'love' && "bg-rose-100 text-rose-600",
                    reading.type === 'career' && "bg-blue-100 text-blue-600",
                    reading.type === 'spiritual' && "bg-purple-100 text-purple-600"
                  )}>
                    {reading.type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Personalized Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-purple-400/5 border border-primary/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-semibold">Your Personalized Insights</h2>
          </div>

          <p className="text-muted-foreground mb-6">
            Based on your recent readings, the universe has messages for you...
          </p>

          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-card/50 border border-border/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button asChild variant="outline" className="w-full mt-6 rounded-2xl">
            <Link href="/tarot">
              Explore More
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Sparkles, label: 'Get Reading', href: '/tarot', color: 'from-primary to-purple-400' },
          { icon: History, label: 'Past Readings', href: '/dashboard/sessions', color: 'from-amber-400 to-gold-500' },
          { icon: BookOpen, label: 'Guidance Hub', href: '/blog', color: 'from-emerald-400 to-teal-500' },
          { icon: Heart, label: 'Saved Readings', href: '/dashboard/favorites', color: 'from-rose-400 to-pink-500' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group p-6 rounded-2xl bg-card border border-border/50 glass hover:border-primary/30 transition-all text-center"
          >
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform",
              action.color
            )}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <p className="font-medium">{action.label}</p>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}