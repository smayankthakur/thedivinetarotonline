'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Heart, ArrowRight, Star, Sparkles as SparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingOrbs, ParticleField, GlowingButton, FadeInSection, AnimatedCounter } from '@/components/animated/MysticalComponents'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#FAF9FF] to-[#F5F3FF]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <FloatingOrbs />
        <ParticleField />
        
        <div className="container relative z-10 px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 mb-6">
                <SparklesIcon className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-sm text-gray-700">Personal Tarot Readings</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight mb-6"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                Your Answers Are Already Written in the Cards
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8"
              >
                Ask your question and receive deeply personalised tarot guidance powered by intuitive intelligence
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <GlowingButton>
                  <Link href="/booking">
                    Start Your Reading
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </GlowingButton>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-sm text-gray-500 mt-6">
                Private • Personal • Judgment-free
              </motion.p>
            </motion.div>

            {/* Right Side - Animated Tarot Reader */}
            <motion.div 
              className="hidden lg:block relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Card spread behind */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative w-64 h-80">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-32 h-48 rounded-xl bg-gradient-to-br from-[#1A1A2E] to-[#16213E] border-2 border-[#A78BFA]/30"
                        style={{
                          left: `${30 + i * 40}px`,
                          top: `${20 + i * 20}px`,
                          transform: `rotate(${i * 5 - 5}deg)`,
                          zIndex: 3 - i
                        }}
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-[#A78BFA]/40" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Glowing aura */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#A78BFA]/20 blur-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F3FF] to-transparent" />
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-16 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              How It Works
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#A78BFA]/0 via-[#A78BFA]/30 to-[#A78BFA]/0 -translate-y-1/2" />

            {[
              { step: "1", title: "Ask Your Question", description: "Share what's on your mind" },
              { step: "2", title: "Draw Your Cards", description: "Select cards from the spread" },
              { step: "3", title: "Receive Guidance", description: "Get personalized insights" }
            ].map((item, index) => (
              <FadeInSection key={item.title} delay={index * 0.2}>
                <div className="relative text-center p-8 bg-white">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#C4B5FD] text-white flex items-center justify-center mx-auto mb-4 text-xl font-semibold shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F5F3FF] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Trusted by seekers worldwide
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: 10000, suffix: "+", label: "Readings Done" },
              { value: 92, suffix: "%", label: "Clarity Reported" },
              { value: 5000, suffix: "+", label: "Happy Seekers" },
              { value: 4.9, suffix: "/5", label: "Average Rating" }
            ].map((stat, index) => (
              <FadeInSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "The reading brought clarity I desperately needed. Truly transformative.", author: "Sarah M." },
              { quote: "Beautiful experience. The cards spoke to exactly what I was going through.", author: "James K." },
              { quote: "Felt like talking to a wise friend who truly understands.", author: "Elena R." }
            ].map((testimonial, index) => (
              <FadeInSection key={testimonial.author} delay={index * 0.15}>
                <motion.div
                  className="p-6 bg-white rounded-2xl shadow-sm border border-[#A78BFA]/10"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-[#F5F3FF]">
        <FloatingOrbs />
        <div className="container px-4 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The clarity you seek is one step away
            </h2>
            <p className="text-lg text-gray-600">
              Let the cards guide you to the answers you already hold within.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowingButton>
                <Link href="/booking">
                  Reveal Your Reading
                  <SparklesIcon className="w-5 h-5 ml-2" />
                </Link>
              </GlowingButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
