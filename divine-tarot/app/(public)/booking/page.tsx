'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Heart, Sparkles as SparklesIcon, Star, Clock, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FloatingOrbs, FadeInSection, GlowingButton } from '@/components/animated/MysticalComponents'

export default function BookingPage() {
  const handleBook = () => {
    window.location.href = 'https://sitelytc.com/booking'
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-[#FAF9FF] to-[#F5F3FF]">
      <FloatingOrbs />
      
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#A78BFA]/20 to-[#C4B5FD]/20 mb-6"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(167,139,250,0.3)",
                  "0 0 40px rgba(167,139,250,0.5)",
                  "0 0 20px rgba(167,139,250,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SparklesIcon className="w-10 h-10 text-[#A78BFA]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              A Personal Reading Meant Just For You
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              When your question needs more than cards… receive deep, one-to-one intuitive guidance tailored to your energy and situation.
            </p>

            <GlowingButton onClick={handleBook}>
              Request Your Personal Reading
              <ArrowRight className="w-5 h-5 ml-2" />
            </GlowingButton>
          </FadeInSection>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              This Is Not a General Reading
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Each personal reading is a unique, energy-based interpretation focused entirely on YOUR situation.</p>
              <p>It goes deeper than automated readings — designed to bring clarity, not confusion.</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              What You Receive
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Sparkles, title: "Personalized Tarot Interpretation", description: "A reading tailored specifically to your energy and question" },
              { icon: Heart, title: "Intuitive Guidance", description: "Deep insights based on your unique situation" },
              { icon: Sparkles, title: "Clarity on Life Areas", description: "Love, career, and direction — addressed with care" },
              { icon: ArrowRight, title: "Follow-up Insights", description: "Additional clarity if needed for deeper understanding" },
            ].map((benefit, index) => (
              <FadeInSection key={benefit.title} delay={index * 0.1}>
                <motion.div 
                  className="flex gap-4 p-6 bg-white rounded-2xl border border-[#A78BFA]/10 shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#A78BFA]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              How It Works
            </h2>
          </FadeInSection>

          <div className="relative">
            {/* Animated flow line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#A78BFA]/30 to-transparent -translate-y-1/2" />
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Submit Your Request", description: "Share your question and details" },
                { step: "2", title: "Energy Review", description: "Your energy and question are carefully reviewed" },
                { step: "3", title: "Receive Reading", description: "You receive a deeply personalised reading" },
              ].map((item, index) => (
                <FadeInSection key={item.title} delay={index * 0.15}>
                  <div className="relative text-center p-6 bg-white rounded-2xl border border-[#A78BFA]/10">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#C4B5FD] text-white flex items-center justify-center mx-auto mb-4 text-lg font-semibold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Authority */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Seekers Choose This Experience
            </h2>
          </FadeInSection>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: Users, text: "Hundreds of personal readings delivered" },
              { icon: Heart, text: "Deeply personal and intuitive approach" },
              { icon: Sparkles, text: "Focused on clarity, not generic answers" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#A78BFA]/20"
              >
                <item.icon className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-sm text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { quote: "This wasn't like other readings. It felt like someone truly understood my situation.", author: "Sarah M." },
              { quote: "The clarity I received was exactly what I needed to move forward.", author: "James K." },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-[#A78BFA]/10"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA]" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
                <p className="font-medium text-gray-900">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scarcity */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeInSection>
            <div className="p-8 bg-gradient-to-br from-[#A78BFA]/10 to-[#C4B5FD]/10 rounded-3xl border border-[#A78BFA]/20">
              <Shield className="w-10 h-10 text-[#A78BFA] mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Limited Personal Sessions
              </h2>
              <p className="text-gray-600">
                To maintain depth and accuracy, only a limited number of personal readings are taken each day.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Begin Your Personal Reading Journey
            </h2>
            <p className="text-gray-600 mb-8">
              Take the first step toward clarity. Your personalized reading awaits.
            </p>
            <GlowingButton onClick={handleBook}>
              Book Your Personal Reading
              <ArrowRight className="w-5 h-5 ml-2" />
            </GlowingButton>
          </FadeInSection>
        </div>
      </section>

      {/* Final Emotional Close */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeInSection>
            <p className="text-xl text-gray-600 italic mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              "Sometimes, the answers aren't meant to be rushed… they are meant to be revealed."
            </p>
            <p className="text-gray-500">
              I'll be here to listen and guide you.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-8 px-6 border-t border-[#A78BFA]/10">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-center">
          {[
            { icon: Shield, text: "100% Private" },
            { icon: Heart, text: "Judgment-free" },
            { icon: Clock, text: "Response within 24-48h" },
          ].map((item, index) => (
            <span key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <item.icon className="w-4 h-4 text-[#A78BFA]" />
              {item.text}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
