'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Star, Heart, ArrowRight, MessageCircle, BookOpen, CreditCard, Users, ChevronRight, Sparkle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-400/10 blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-amber-300/10 blur-3xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  )
}

function TarotCardFloat({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-16 h-24 rounded-lg border-2 border-gold-400/30 bg-gradient-to-br from-ivory to-lavender-100 shadow-lg"
      initial={{ opacity: 0, y: 100, rotate: -15 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [100, 80, 100],
        rotate: [-15, -10, -15]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay 
      }}
    />
  )
}

export default function HomePage() {
  const [question, setQuestion] = useState('')

  const steps = [
    {
      icon: MessageCircle,
      title: "Ask Your Question",
      description: "Hold a specific question in your mind. The more focused your intention, the clearer the guidance."
    },
    {
      icon: Sparkles,
      title: "Shuffle the Cards",
      description: "Let the energy flow through you as the cards are drawn. Trust your first impressions."
    },
    {
      icon: BookOpen,
      title: "Receive Your Guidance",
      description: "Get a personalized interpretation that speaks directly to your unique situation and path."
    }
  ]

  const articles = [
    {
      category: "Love",
      title: "Why You Keep Attracting the Wrong People",
      excerpt: "The patterns in your love life are trying to teach you something important about yourself...",
      readTime: "5 min read"
    },
    {
      category: "Spirit",
      title: "What The Universe Wants You To Know Right Now",
      excerpt: "There's a message waiting for you. The cards reveal it's about releasing what no longer serves...",
      readTime: "4 min read"
    },
    {
      category: "Career",
      title: "Finding Your True Purpose",
      excerpt: "Your professional path isn't about success—it's about alignment with your soul's calling...",
      readTime: "6 min read"
    }
  ]

  const testimonials = [
    {
      quote: "The reading felt like talking to a wise friend who truly understood my journey.",
      author: "Sarah M.",
      role: "Artist"
    },
    {
      quote: "Incredibly intuitive. The cards captured exactly what I was going through.",
      author: "James K.",
      role: "Teacher"
    },
    {
      quote: "I've never felt so seen and understood. The guidance was exactly what I needed.",
      author: "Elena R.",
      role: "Writer"
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center mystical-gradient">
        <FloatingOrbs />
        
        {/* Decorative tarot cards */}
        <TarotCardFloat delay={0} />
        <TarotCardFloat delay={1.5} />
        <TarotCardFloat delay={3} />
        
        <motion.div 
          className="container relative z-10 px-4 py-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkle className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-white/90">AI-Powered Spiritual Guidance</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight"
            >
              Ask Your Question.{' '}
              <span className="text-primary">Let the Cards Reveal the Truth.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Sometimes life feels overwhelming. The cards offer clarity, comfort, and direction—whenever you need it.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <Input
                type="text"
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="h-14 text-lg bg-white/90 backdrop-blur border-0 shadow-soft focus:ring-2 focus:ring-primary/30"
              />
              <Button asChild size="lg" className="h-14 px-8 btn-premium text-lg rounded-2xl">
                <Link href={question ? `/tarot?question=${encodeURIComponent(question)}` : '/tarot'}>
                  Start Your Reading
                </Link>
              </Button>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm text-muted-foreground">
              Free to try • No card required • Instant results
            </motion.p>
          </div>
        </motion.div>

        {/* Gradient fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Tarot Reader Introduction */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <motion.div 
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-purple-400/20 flex items-center justify-center animate-breathe">
                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-ivory to-lavender-100 border-4 border-gold-300/50 shadow-soft overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-purple-400/10 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-primary/30" />
                  </div>
                </div>
              </div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-gold-500 flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Guided by your personal <span className="text-primary">AI Tarot Reader</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Imagine having a spiritual guide available anytime, who listens without judgment and answers with wisdom. Our AI understands the ancient language of the cards and speaks to your unique journey with compassion and insight.
              </p>
              <Button asChild className="btn-premium rounded-full px-8">
                <Link href="/tarot">Experience Your First Reading</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              How Your Reading Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to receive the guidance you seek
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative p-8 rounded-3xl bg-card border border-border/50 glass hover:border-primary/30 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guidance */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                Guidance for Your Journey
              </h2>
              <p className="text-muted-foreground">Insights for love, life, and purpose</p>
            </div>
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link href="/blog">View All Articles</Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                className="group p-6 rounded-3xl bg-card border border-border/50 glass hover:border-primary/30 hover:shadow-soft transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              What Seekers Are Saying
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real experiences from our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="p-8 rounded-3xl bg-gradient-to-br from-card to-muted/50 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-purple-400/30 flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 mystical-gradient relative overflow-hidden">
        <FloatingOrbs />
        <div className="container px-4 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Ready for Your Reading?
            </h2>
            <p className="text-lg text-foreground/80 max-w-lg mx-auto">
              Connect with the cards and discover what the universe has to say.
              Your answers await.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-premium rounded-full px-8">
                <Link href="/tarot">
                  Start Free Reading
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/30 text-foreground hover:bg-white/10">
                <Link href="/blog">
                  Explore Guidance
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}