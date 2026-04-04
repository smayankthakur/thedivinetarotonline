'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageCircle, RefreshCw, Volume2, Heart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MysticalCardSpread } from '@/components/tarot/MysticalCardSpread'
import { TarotCard } from '@/lib/tarot/cards'

type ReadingStep = 'question' | 'shuffle' | 'selection' | 'reveal' | 'interpretation'

function TarotPageContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<ReadingStep>('question')
  const [question, setQuestion] = useState(searchParams.get('question') || '')
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [interpretation, setInterpretation] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleStartReading = () => {
    if (!question.trim()) return
    setStep('shuffle')
  }

  const handleCardsComplete = (cards: TarotCard[], interp: string) => {
    setSelectedCards(cards)
    setStep('reveal')
    
    // Show card reveal animation then move to interpretation
    setTimeout(() => {
      setStep('interpretation')
      setIsTyping(true)
      
      setTimeout(() => {
        setIsTyping(false)
        setInterpretation(interp)
      }, 3000)
    }, 3000)
  }

  const handleNewReading = () => {
    setQuestion('')
    setSelectedCards([])
    setInterpretation('')
    setStep('question')
  }

  return (
    <div className="min-h-screen mystical-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-purple-400/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10 py-12 px-4">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 sm:gap-4">
            {['question', 'shuffle', 'selection', 'reveal', 'interpretation'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                  step === s ? "bg-primary text-white glow" : 
                  ['question', 'shuffle', 'selection', 'reveal', 'interpretation'].indexOf(step) > i ? "bg-primary/50 text-white" :
                  "bg-muted text-muted-foreground"
                )}>
                  {['question', 'shuffle', 'selection', 'reveal', 'interpretation'].indexOf(step) > i ? '✓' : i + 1}
                </div>
                {i < 4 && <div className="w-8 sm:w-16 h-0.5 bg-muted hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Question Input */}
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="p-8 sm:p-12 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 glass">
                <div className="text-center mb-8">
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-purple-400/20 mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                    What guidance do you seek?
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Take a moment to hold your question in your mind. The cards will reveal what you need to know.
                  </p>
                </div>

                <div className="space-y-6">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here... (e.g., 'What does my future hold in love?')"
                    className="w-full h-32 px-6 py-4 rounded-2xl border border-border bg-background/50 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-lg"
                    rows={4}
                  />

                  <Button 
                    onClick={handleStartReading}
                    disabled={!question.trim()}
                    className="w-full h-14 text-lg btn-premium rounded-2xl"
                  >
                    Begin Your Reading
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Free reading • No card required • Instant results
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Mystical Card Shuffle & Selection */}
          {(step === 'shuffle' || step === 'selection' || step === 'reveal') && (
            <motion.div
              key="shuffle-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <MysticalCardSpread 
                question={question}
                onComplete={handleCardsComplete}
              />
            </motion.div>
          )}

          {/* Step 5: AI Interpretation */}
          {step === 'interpretation' && (
            <motion.div
              key="interpretation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Your Personalized Reading
                </h2>
                <p className="text-muted-foreground">
                  Insights from your cards
                </p>
              </div>

              {/* Cards Summary */}
              <div className="flex justify-center gap-4 mb-8 flex-wrap">
                {selectedCards.map((card) => (
                  <div key={card.id} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/30">
                    <span className="text-2xl">{card.image}</span>
                    <span className="text-sm font-medium">{card.name}</span>
                  </div>
                ))}
              </div>

              {/* Interpretation Chat UI */}
              <div className="space-y-4">
                {/* AI Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 p-6 rounded-3xl bg-card border border-border/50 glass">
                    {isTyping ? (
                      <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-serif font-semibold text-lg">Card Meanings</h4>
                          <div className="grid gap-3">
                            {selectedCards.map((card) => (
                              <div key={card.id} className="p-3 rounded-xl bg-muted/30">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xl">{card.image}</span>
                                  <span className="font-medium">{card.name}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{card.upright_meaning}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-serif font-semibold text-lg">Ginni's Interpretation</h4>
                          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                            <p className="text-foreground leading-relaxed whitespace-pre-line">
                              {interpretation}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 flex-wrap">
                          <Button variant="outline" className="rounded-full">
                            <Heart className="w-4 h-4 mr-2" />
                            Save Reading
                          </Button>
                          <Button variant="outline" className="rounded-full">
                            <Volume2 className="w-4 h-4 mr-2" />
                            Listen
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* New Reading Button */}
              <div className="mt-12 text-center">
                <Button 
                  onClick={handleNewReading}
                  className="btn-premium rounded-full px-8"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Ask Another Question
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function TarotPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen mystical-gradient flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <TarotPageContent />
    </Suspense>
  )
}