'use client'

import { motion } from 'framer-motion'
import { Sparkles, HelpCircle, Shield, MessageCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: "How does a tarot reading work?",
    answer: "A tarot reading is a collaborativeconversation. You share what's on your mind or what questions you have, and I draw cards and share what insights come through. It's not about predicting the future — it's about helping you see your situation from fresh angles and find clarity."
  },
  {
    question: "Is my information kept private?",
    answer: "Absolutely. Your readings and conversations are completely confidential. I don't share any personal information, and this is a judgment-free space where you can be honest about what's going on in your life."
  },
  {
    question: "What can I ask during a reading?",
    answer: "Anything! Common questions include guidance onrelationships, career moves, life transitions, or just general direction. Some people come with specific questions, others just want to explore what's feeling off. There's no wrong way to approach tarot."
  },
  {
    question: "Do I need to know tarot to do a reading?",
    answer: "Not at all. You don't need any experience with tarot. Just come with an open mind and a genuine question or curiosity. I'll guide you through the rest."
  },
  {
    question: "Will I get a clear answer or prediction?",
    answer: "Tarot isn't about telling you what will definitely happen. It's about helping you see paths you might not have considered and honoring your own intuition. You'll leave with insight, not guarantees — and often more clarity than you expected."
  },
  {
    question: "Can I get a reading for someone else?",
    answer: "Readings work best when done for yourself, as they connect directly to your energy and intuition. I'd recommend focusing on your own questions and journey."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#A78BFA]/10 mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HelpCircle className="w-8 h-8 text-[#A78BFA]" />
            </motion.div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Common questions about tarot readings
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-gray-200 bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-[#A78BFA]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                </span>
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed pl-11">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F9FAFB]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-600 mb-6">
            Still have questions? Feel free to reach out.
          </p>
          <Button asChild className="px-8 py-6 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-full">
            <Link href="/contact">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Ginni
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}