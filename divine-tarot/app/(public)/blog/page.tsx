'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, Search, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const categories = [
  { name: 'All', active: true },
  { name: 'Love', active: false },
  { name: 'Career', active: false },
  { name: 'Spiritual Growth', active: false },
  { name: 'Daily Guidance', active: false },
]

const articles = [
  {
    id: 1,
    category: 'Love',
    title: 'Why You Keep Attracting the Wrong People',
    excerpt: 'The patterns in your love life are trying to teach you something important about yourself. The cards reveal what you need to understand to break free from recurring cycles.',
    readTime: '5 min read',
    image: null
  },
  {
    id: 2,
    category: 'Spiritual',
    title: 'What The Universe Wants You To Know Right Now',
    excerpt: 'There\'s a message waiting for you. The cards reveal it\'s about releasing what no longer serves you and embracing the new chapter that\'s approaching.',
    readTime: '4 min read',
    image: null
  },
  {
    id: 3,
    category: 'Career',
    title: 'Finding Your True Purpose',
    excerpt: 'Your professional path isn\'t about success—it\'s about alignment with your soul\'s calling. Discover what the cards say about your unique gifts.',
    readTime: '6 min read',
    image: null
  },
  {
    id: 4,
    category: 'Love',
    title: 'The Art of Self-Love',
    excerpt: 'Before seeking love from others, learn to cultivate a deep, nurturing relationship with yourself. The tarot shows the way to inner wholeness.',
    readTime: '5 min read',
    image: null
  },
  {
    id: 5,
    category: 'Daily Guidance',
    title: 'Your Daily Card Reading',
    excerpt: 'Start each day with wisdom from the cards. This daily guidance will help you navigate your day with intention and awareness.',
    readTime: '2 min read',
    image: null
  },
  {
    id: 6,
    category: 'Spiritual',
    title: 'Understanding Your Dreams',
    excerpt: 'Dreams hold deeper meanings than we often realize. Learn how to interpret the messages your subconscious is sending you.',
    readTime: '7 min read',
    image: null
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen mystical-gradient">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Spiritual Insights</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Guidance Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Explore articles, insights, and wisdom to support your spiritual journey. 
            Each piece is crafted with intention to illuminate your path.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for guidance..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-card/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 border-y bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category.active
                    ? 'bg-primary text-white'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 glass hover:border-primary/30 hover:shadow-soft transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {article.category}
                  </span>
                  <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <h2 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  <span className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-8">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
        <motion.div 
          className="max-w-2xl mx-auto text-center p-10 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold mb-4">
            Stay Connected to the Mystical
          </h2>
          <p className="text-muted-foreground mb-6">
            Get weekly spiritual insights and guidance delivered to your inbox. 
            Join thousands of seekers on their journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-12 px-5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button className="btn-premium rounded-xl px-8 h-12">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}