'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, X, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for exploring',
    features: [
      '1 reading per day',
      'Basic card interpretations',
      'Access to Guidance Hub',
      'Save up to 3 readings',
    ],
    notIncluded: [
      'Detailed AI interpretations',
      'Voice narration',
      'Personalized suggestions',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    description: 'For dedicated seekers',
    features: [
      'Unlimited readings',
      'Detailed AI interpretations',
      'Save unlimited readings',
      'Voice narration option',
      'Personalized suggestions',
      'Priority support',
    ],
    notIncluded: [
      'Deep dive sessions',
      'Personal AI coaching',
    ],
    cta: 'Go Premium',
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    description: 'Maximum transformation',
    features: [
      'Everything in Premium',
      'Personal AI coaching',
      'Deep dive sessions',
      'Custom card spreads',
      'Exclusive pro content',
      'VIP support channel',
    ],
    notIncluded: [],
    cta: 'Go Pro',
    popular: false,
  },
]

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period, no questions asked.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards through Stripe, including Visa, Mastercard, and American Express. Also supports digital wallets.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'The Free plan gives you 1 reading per day with no credit card required. It\'s a great way to experience the magic before upgrading.',
  },
  {
    question: 'What if I want to change my plan?',
    answer: 'You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.',
  },
]

export default function UpgradePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen mystical-gradient">
      {/* Header */}
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
            <span className="text-sm text-primary font-medium">Unlock Deeper Insights</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Choose Your Path
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you\'re just starting or seeking deep transformation, 
            there\'s a plan that honors your journey.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-primary/10 to-purple-400/10 border-2 border-primary/30 shadow-lg scale-105 z-10' 
                    : 'bg-card/80 backdrop-blur-sm border border-border/50 glass'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-primary to-purple-400 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-serif font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="text-4xl font-bold">
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  {plan.price === 0 && (
                    <p className="text-sm text-muted-foreground mt-1">No credit card required</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-muted-foreground/50" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full rounded-2xl ${
                    plan.popular 
                      ? 'btn-premium' 
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold mb-4">
              Why Go Premium?
            </h2>
            <p className="text-muted-foreground">
              Unlock the full potential of your spiritual journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Unlimited Readings', desc: 'Ask as many questions as you need—no limits, no restrictions.' },
              { title: 'Deeper Interpretations', desc: 'Get detailed, nuanced readings that address your unique situation.' },
              { title: 'Voice Narration', desc: 'Listen to your readings for a more immersive experience.' },
              { title: 'Personalized Insights', desc: 'Receive suggestions based on your reading history and patterns.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 text-muted-foreground"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
        <motion.div 
          className="max-w-2xl mx-auto text-center p-10 rounded-3xl mystical-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
            Ready to Begin?
          </h2>
          <p className="text-foreground/80 mb-8">
            Your spiritual transformation starts with a single question. 
            The cards are waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-premium rounded-2xl px-8">
              <a href="/tarot">Start Free Reading</a>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl px-8 border-white/30 text-foreground hover:bg-white/10">
              <a href="/blog">Explore Guidance</a>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}