'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#A78BFA]/15 blur-3xl"
        animate={{ 
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-[#C4B5FD]/15 blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-[#A78BFA]/10 blur-3xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  )
}

export function ParticleField() {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#A78BFA]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

interface TarotCardProps {
  onClick?: () => void
  isSelected?: boolean
  isRevealed?: boolean
  cardName?: string
  meaning?: string
}

export function TarotCard({ onClick, isSelected, isRevealed, cardName, meaning }: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (isRevealed) {
      setIsFlipped(true)
    }
  }, [isRevealed])

  return (
    <motion.div
      className="relative w-32 h-48 md:w-40 md:h-60 cursor-pointer perspective-1000"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (face down) */}
        <div
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`w-full h-full bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-xl border-2 border-[#A78BFA]/30 flex items-center justify-center transition-all duration-300 ${isSelected ? 'shadow-[0_0_30px_rgba(167,139,250,0.6)] border-[#A78BFA]' : ''}`}>
            <div className="w-16 h-24 border-2 border-[#A78BFA]/50 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#A78BFA]/60" />
            </div>
          </div>
        </div>

        {/* Back of card (revealed) */}
        <div
          className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-xl border-2 border-[#A78BFA]/30 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6 text-[#A78BFA]" />
            </div>
            {cardName && (
              <h4 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                {cardName}
              </h4>
            )}
            {meaning && (
              <p className="text-xs text-gray-600 leading-relaxed">
                {meaning}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function GlowingButton({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 bg-gradient-to-r from-[#A78BFA] to-[#C4B5FD] text-white rounded-full font-semibold text-lg shadow-md overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px rgba(167,139,250,0.4)",
            "0 0 40px rgba(167,139,250,0.6)",
            "0 0 20px rgba(167,139,250,0.4)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  )
}

export function FadeInSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCounter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span className="text-3xl md:text-4xl font-semibold text-[#A78BFA]">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function TypingAnimation({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStartTyping(true), delay * 1000)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return
    
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [startTyping, text])

  return (
    <span>
      {displayedText}
      {startTyping && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-1 h-4 bg-[#A78BFA] ml-1" />}
    </span>
  )
}
