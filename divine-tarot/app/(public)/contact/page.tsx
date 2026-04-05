'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, Loader2, Check, Mail, Clock, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingOrbs, FadeInSection } from '@/components/animated/MysticalComponents'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmitted(true)
    setIsLoading(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FAF9FF] to-[#F5F3FF] flex items-center justify-center">
        <FloatingOrbs />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#C4B5FD] flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Thank You
          </h1>
          <p className="text-gray-600 mb-8">
            Your message has been received. Bharti Singh will reach out to you soon.
          </p>
          <Button 
            onClick={() => {
              setSubmitted(false)
              setFormData({ name: '', email: '', message: '' })
            }}
            variant="outline"
            className="rounded-full px-6"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FAF9FF] to-[#F5F3FF]">
      <FloatingOrbs />
      
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Text */}
            <FadeInSection>
              <div className="text-center lg:text-left">
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#A78BFA]/10 mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-7 h-7 text-[#A78BFA]" />
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  We're here to guide you
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Reach out for support, queries, or deeper consultations. Every message is received with care and intention.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">hello@divinetarot.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Response Time</p>
                      <p className="text-gray-600">Within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Service</p>
                      <p className="text-gray-600">Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Right Side - Form */}
            <FadeInSection delay={0.2}>
              <motion.div
                className="p-8 md:p-10 bg-white rounded-3xl shadow-lg border border-[#A78BFA]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-[#FAF9FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 focus:border-[#A78BFA] transition-all placeholder:text-gray-400"
                      placeholder="What should we call you?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-[#FAF9FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 focus:border-[#A78BFA] transition-all placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-[#FAF9FF] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A78BFA]/30 focus:border-[#A78BFA] transition-all resize-none placeholder:text-gray-400"
                      placeholder="Share what's on your mind..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-5 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-xl font-semibold text-lg hover:scale-[1.02] hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  )
}
