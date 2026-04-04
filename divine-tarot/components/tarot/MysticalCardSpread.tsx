'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { tarotCards, TarotCard } from '@/lib/tarot/cards'

interface MysticalCardSpreadProps {
  question: string
  onComplete: (cards: TarotCard[], interpretation: string) => void
}

type ReadingPhase = 'shuffle' | 'spread' | 'selecting' | 'reveal' | 'complete'

interface FloatingCard {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
}

interface SelectionState {
  cardIndex: number
  card: TarotCard
  position: string
}

export function MysticalCardSpread({ question, onComplete }: MysticalCardSpreadProps) {
  const [phase, setPhase] = useState<ReadingPhase>('shuffle')
  const [shuffleText, setShuffleText] = useState('Shuffling the cards… connecting with your energy ✨')
  const [floatingCards, setFloatingCards] = useState<FloatingCard[]>([])
  const [selectedCards, setSelectedCards] = useState<SelectionState[]>([])
  const [revealIndex, setRevealIndex] = useState(-1)
  
  // Pre-selected cards (hidden from user - system decides)
  const preSelectedCards = useMemo(() => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }, [])

  // Floating cards animation for shuffle phase
  useEffect(() => {
    if (phase !== 'shuffle') return

    const initialCards: FloatingCard[] = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 60 - 30,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    }))
    setFloatingCards(initialCards)

    const interval = setInterval(() => {
      setFloatingCards((prev) =>
        prev.map((card) => ({
          ...card,
          x: Math.random() * 100 - 50,
          y: Math.random() * 60 - 30,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
        }))
      )
    }, 2000)

    const texts = [
      'Shuffling the cards… connecting with your energy ✨',
      'The universe is listening… 🔮',
      'Divine guidance is being prepared… ⭐',
      'Your cards are ready…',
    ]
    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setShuffleText(texts[textIndex])
    }, 2000)

    setTimeout(() => {
      setPhase('spread')
    }, 4000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [phase])

  // Transition to selecting after spread
  useEffect(() => {
    if (phase !== 'spread') return

    const timer = setTimeout(() => {
      setPhase('selecting')
    }, 1500)

    return () => clearTimeout(timer)
  }, [phase])

  // Handle card selection - assign pre-selected card to clicked position
  const handleCardClick = useCallback((clickedIndex: number) => {
    if (phase !== 'selecting' || selectedCards.length >= 3) return

    // Check if this position already selected
    if (selectedCards.some(s => s.cardIndex === clickedIndex)) return

    // Assign the next pre-selected card to this position
    const newSelected: SelectionState = {
      cardIndex: clickedIndex,
      card: preSelectedCards[selectedCards.length],
      position: selectedCards.length === 0 ? 'Past' : selectedCards.length === 1 ? 'Present' : 'Future',
    }

    setSelectedCards(prev => [...prev, newSelected])

    // If 3 cards selected, start reveal
    if (selectedCards.length === 2) {
      setTimeout(() => {
        setPhase('reveal')
        // Reveal cards one by one
        setTimeout(() => setRevealIndex(0), 500)
        setTimeout(() => setRevealIndex(1), 1500)
        setTimeout(() => setRevealIndex(2), 2500)

        setTimeout(() => {
          setPhase('complete')
          const interpretation = generateInterpretation(preSelectedCards, question)
          onComplete(preSelectedCards, interpretation)
        }, 3500)
      }, 600)
    }
  }, [phase, selectedCards, preSelectedCards, question, onComplete])

  const generateInterpretation = (cards: TarotCard[], question: string): string => {
    const [past, present, future] = cards
    return `Dear seeker, the cards have spoken, and I bring you their wisdom with an open heart.

**The Past - ${past.name}:**
${past.upright_meaning}

${past.description}

**The Present - ${present.name}:**
${present.upright_meaning}

${present.description}

**The Future - ${future.name}:**
${future.upright_meaning}

${future.description}

---

**Ginni's Guidance:**

${past.emotional_message}

${present.advice}

${future.emotional_message}

Trust the timing. Trust yourself. The answers you've been seeking are closer than you think.

With warmth and light ✨`
  }

  // Create 12 face-down card positions
  const cardPositions = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="relative w-full min-h-[600px] flex flex-col items-center justify-center overflow-hidden py-8">
      {/* Mystical Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleField />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Shuffle Phase */}
      <AnimatePresence>
        {phase === 'shuffle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center"
          >
            <div className="relative w-80 h-80 mx-auto mb-8">
              {floatingCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="absolute w-24 h-36 rounded-xl bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900 border-2 border-violet-500/40 shadow-2xl flex items-center justify-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    translateX: `${card.x}px`,
                    translateY: `${card.y}px`,
                    rotate: card.rotation,
                    scale: card.scale,
                    zIndex: index,
                  }}
                  animate={{
                    x: [card.x, card.x + Math.random() * 30 - 15, card.x],
                    y: [card.y, card.y + Math.random() * 30 - 15, card.y],
                    rotate: [card.rotation, card.rotation + 15, card.rotation],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-2 rounded-lg border border-violet-400/20" />
                  <Sparkles className="w-8 h-8 text-violet-300/40" />
                </motion.div>
              ))}
            </div>
            <motion.p
              key={shuffleText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl text-muted-foreground font-serif"
            >
              {shuffleText}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spread / Selection / Reveal Phase */}
      <AnimatePresence>
        {(phase === 'spread' || phase === 'selecting' || phase === 'reveal' || phase === 'complete') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-4xl px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl font-serif font-bold mb-2">
                {phase === 'selecting'
                  ? 'Choose 3 cards that call to you'
                  : phase === 'reveal' || phase === 'complete'
                  ? 'Your destiny reveals itself'
                  : 'The cards await'}
              </h3>
              <p className="text-muted-foreground">
                {phase === 'selecting'
                  ? 'Trust your intuition - the universe will guide your choice'
                  : phase === 'reveal'
                  ? 'The cards hold wisdom for your journey'
                  : ''}
              </p>
            </motion.div>

            {/* Card Grid - 12 face-down cards */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
              {cardPositions.map((posIndex) => {
                const selection = selectedCards.find(s => s.cardIndex === posIndex)
                const isSelected = !!selection
                const revealOrder = selection ? selectedCards.indexOf(selection) : -1
                const isRevealed = revealOrder >= 0 && revealOrder <= revealIndex

                return (
                  <motion.div
                    key={posIndex}
                    initial={{ opacity: 0, scale: 0.5, y: 30 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { delay: posIndex * 0.03, duration: 0.3 }
                    }}
                    className={`
                      relative w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-44
                      rounded-xl cursor-pointer transition-all duration-300
                      ${phase === 'selecting' && !isSelected ? 'hover:scale-105 hover:-translate-y-2 hover:shadow-violet-500/30' : ''}
                      ${isSelected && phase !== 'reveal' && phase !== 'complete' ? 'ring-2 ring-violet-400 ring-offset-2 ring-offset-background' : ''}
                    `}
                    onClick={() => handleCardClick(posIndex)}
                    style={{ perspective: '1000px' }}
                  >
                    <div className={`relative w-full h-full transition-all duration-700 ${isRevealed ? 'rotate-y-180' : ''}`}>
                      {/* Card Back - Face Down */}
                      <div className={`
                        absolute inset-0 rounded-xl
                        bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-900
                        border-2 border-violet-500/40 shadow-xl
                        flex items-center justify-center backface-hidden
                        ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                      `}>
                        <div className="absolute inset-1 rounded-lg border border-violet-400/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-violet-400/30 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-violet-300/40" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Front - Revealed */}
                      <div className={`
                        absolute inset-0 rounded-xl
                        bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50
                        border-2 border-amber-400/50 shadow-2xl
                        backface-hidden rotate-y-180 overflow-hidden
                        ${isRevealed ? 'opacity-100' : 'opacity-0'}
                      `}>
                        {selection && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-300/10" />
                            <div className="relative w-full h-full p-2 sm:p-3 flex flex-col">
                              <div className="text-right">
                                <span className="text-[8px] sm:text-xs text-amber-700/70 font-medium">
                                  {selection.card.name}
                                </span>
                              </div>
                              <div className="flex-1 flex items-center justify-center">
                                <motion.span
                                  className="text-4xl sm:text-5xl"
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                >
                                  {selection.card.image}
                                </motion.span>
                              </div>
                              <div className="text-center">
                                <p className="text-[8px] text-amber-800/60">
                                  {selection.card.keywords.slice(0, 2).join(' • ')}
                                </p>
                              </div>
                              <div className="text-center mt-1">
                                <span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-700">
                                  {selection.position}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Selection Number Badge */}
                    {isSelected && !isRevealed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-violet-500 flex items-center justify-center shadow-lg z-10"
                      >
                        <span className="text-white text-xs sm:text-sm font-bold">
                          {selectedCards.indexOf(selection) + 1}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Selection Counter */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card/60 border border-border/40">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-muted-foreground">
                  {selectedCards.length} / 3 selected
                </span>
                {phase === 'selecting' && (
                  <span className="text-xs text-violet-400/80 ml-2">
                    • Tap cards to choose
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}

// Floating Particles Background Component
function ParticleField() {
  const [particles] = useState(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }))
  )

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-violet-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </>
  )
}