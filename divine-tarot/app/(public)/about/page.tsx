'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Shield, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A78BFA]/10 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-[#A78BFA]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Hi, I'm Ginni
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              I've been reading tarot for years to help people find clarity, direction, and peace during uncertain times. 
              My approach is simple: meet you where you are, listen without judgment, and help you see what the cards have to say about your unique path.
            </p>
          </motion.div>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 text-center">
            My Approach
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-[#A78BFA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassionate</h3>
              <p className="text-gray-600">
                I meet you where you are, without judgment. Whatever you're going through, there's space for it here.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-[#A78BFA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intuitive</h3>
              <p className="text-gray-600">
                Tarot is about connection, not just cards. I tap into what resonates for you in this moment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#A78BFA]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Private</h3>
              <p className="text-gray-600">
                Your readings are always confidential. This is a safe space to explore and be honest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I Believe */}
      <section className="py-20 px-6 bg-[#F9FAFB]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">
            What I Believe
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Tarot isn't about predicting the future — it's about helping you see your situation more clearly. 
              The cards don't give answers; they help you find perspectives you might have missed.
            </p>
            <p>
              Everyone who comes to tarot is already wise. Sometimes we just need a quiet space and a fresh lens 
              to see what we already know inside ourselves.
            </p>
            <p>
              My role is to hold that space for you, listen with an open heart, and offer insights 
              that feel true to your journey — not generic advice, but something that resonates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-600 mb-8">
            If you're feeling called to explore tarot, I'm here. Book a reading and let's see what the cards have to say.
          </p>
          <Button asChild className="px-8 py-6 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-full">
            <Link href="/booking">
              Book a Reading
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}