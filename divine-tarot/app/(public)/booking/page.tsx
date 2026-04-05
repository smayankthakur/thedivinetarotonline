'use client'

import { motion } from 'framer-motion'
import { Sparkles, Eye, Shield, Heart, MessageCircle, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BookingPage() {
  const handleBooking = () => {
    window.location.href = 'https://sitelytc.com/booking'
  }

  const benefits = [
    {
      icon: Eye,
      title: 'Clarity & Guidance',
      description: 'Receive intuitive insights tailored to your unique journey and questions.'
    },
    {
      icon: Shield,
      title: 'Safe & Private Space',
      description: 'Your readings and conversations remain completely confidential.'
    },
    {
      icon: Heart,
      title: 'Personalized Insights',
      description: 'Every reading is crafted specifically for your situation and energy.'
    }
  ]

  const steps = [
    {
      step: '01',
      title: 'Share Your Situation',
      description: 'Tell Ginni what\'s on your mind or what guidance you seek.'
    },
    {
      step: '02',
      title: 'Ginni Connects with Your Energy',
      description: 'Using ancient tarot wisdom and intuitive understanding.'
    },
    {
      step: '03',
      title: 'Receive Clarity & Direction',
      description: 'Get meaningful insights that help you move forward with confidence.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9FAFB] to-white" />
        <motion.div 
          className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-[#A78BFA]/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full bg-[#C4B5FD]/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#A78BFA]/20 to-[#C4B5FD]/20 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-[#A78BFA]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-semibold text-[#111827] mb-4 leading-tight">
              Book Your Personal Reading
            </h1>
            <p className="text-lg text-[#6B7280] max-w-xl mx-auto mb-8">
              Let Ginni guide you with clarity, intuition, and calm. Your personalized tarot experience awaits.
            </p>

            <Button 
              onClick={handleBooking}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-xl font-semibold text-lg hover:scale-[1.03] hover:shadow-lg transition-all duration-200"
            >
              Start Your Personal Reading
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust / Value Section */}
      <section className="py-16 md:py-20 px-6 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#111827] mb-3">
              How It Works
            </h2>
            <p className="text-[#6B7280]">
              Three simple steps to clarity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative p-6 bg-white rounded-2xl border border-gray-100"
              >
                <span className="text-5xl font-semibold text-[#A78BFA]/20 absolute top-4 right-6">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-[#111827] mb-2 mt-4">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional / Quote Section */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#A78BFA] text-[#A78BFA]" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-[#111827] leading-relaxed mb-6">
              "The cards speak to what we need to hear, not always what we want to hear. In that truth, we find our path forward."
            </blockquote>
            <p className="text-[#6B7280]">
              — Ginni, Your Spiritual Companion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-[#F9FAFB]">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-[#111827] mb-4">
              Ready for Your Reading?
            </h2>
            <p className="text-[#6B7280] mb-8">
              Connect with Ginni and discover what the universe has to say.
            </p>
            <Button 
              onClick={handleBooking}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-xl font-semibold text-lg hover:scale-[1.03] hover:shadow-lg transition-all duration-200"
            >
              Start Your Personal Reading
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}