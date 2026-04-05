'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Heart, ArrowRight, MessageCircle, BookOpen, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#A78BFA]/10 blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[#C4B5FD]/10 blur-3xl"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  )
}

export default function HomePage() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Share What's on Your Mind",
      description: "Tell Ginni what you're going through or what questions you have."
    },
    {
      icon: Sparkles,
      title: "Receive Personal Guidance",
      description: "Get intuitive insights drawn from traditional tarot wisdom and real understanding."
    },
    {
      icon: Heart,
      title: "Find Clarity & Direction",
      description: "Walk away with clarity on your path and confidence in your next steps."
    }
  ]

  const testimonials = [
    {
      quote: "Ginni helped me see things clearly during a confusing time in my life. Her readings feel personal, not automated.",
      author: "Sarah M.",
      role: "Seeker"
    },
    {
      quote: "I've tried other tarot apps, but this feels different. There's real care and intuition here.",
      author: "James K.",
      role: "Seeker"
    },
    {
      quote: "Ginni creates such a safe, judgment-free space. I always feel heard and understood.",
      author: "Elena R.",
      role: "Seeker"
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-white to-[#F9FAFB]">
        <FloatingOrbs />
        
        <motion.div 
          className="container relative z-10 px-4 py-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
              <span className="text-sm text-gray-700">Personal Tarot Readings</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight"
            >
              Connect with a real tarot reader for{' '}
              <span className="text-[#A78BFA]">guidance, clarity, and peace.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Sometimes life feels overwhelming. Let Ginni help you find clarity and direction through personal tarot readings.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 py-6 text-base bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-full hover:scale-105 transition-transform">
                <Link href="/booking">
                  Book a Reading
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base rounded-full border-gray-300 text-gray-700 hover:bg-gray-50">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm text-gray-500">
              Private & confidential • Judgment-free space
            </motion.p>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9FAFB] to-transparent" />
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              How a Reading Works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Three simple steps to receive personal guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#A78BFA]/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-[#A78BFA]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="container px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              What Seekers Are Saying
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="p-8 bg-white rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F9FAFB]">
        <FloatingOrbs />
        <div className="container px-4 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Ready for Your Reading?
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Connect with Ginni and discover what the cards have to say about your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 py-6 text-base bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-full">
                <Link href="/booking">
                  Book a Reading
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}