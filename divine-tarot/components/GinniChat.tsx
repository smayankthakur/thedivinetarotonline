'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Moon, ExternalLink, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GinniFloatingButtonProps {
  onOpen?: () => void
  isChatOpen?: boolean
  className?: string
}

export function GinniFloatingButton({ onOpen, isChatOpen, className }: GinniFloatingButtonProps) {
  const [showNudge, setShowNudge] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isChatOpen) {
        setShowNudge(true)
        setTimeout(() => setShowNudge(false), 5000)
      }
    }, 8000)

    return () => clearTimeout(timer)
  }, [isChatOpen])

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Nudge Tooltip */}
      <AnimatePresence>
        {showNudge && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-amber-300 flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-foreground whitespace-nowrap">Need guidance? Talk to Ginni 💜</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={onOpen}
        className="group relative"
      >
        <motion.div
          className={cn(
            "relative flex items-center gap-3 px-5 py-3 rounded-full",
            "bg-gradient-to-r from-violet-500 via-purple-500 to-amber-400",
            "shadow-lg shadow-purple-500/30 cursor-pointer"
          )}
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 25px rgba(168, 85, 247, 0.4)',
              '0 0 45px rgba(168, 85, 247, 0.6)',
              '0 0 25px rgba(168, 85, 247, 0.4)',
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20 blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          <motion.div
            className="relative z-10 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Moon className="w-5 h-5 text-white" />
            <motion.span
              className="absolute -top-1 -right-1 text-amber-300"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.div>

          <span className="text-white font-medium relative z-10 whitespace-nowrap">
            Talk to Ginni 💜
          </span>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full border border-violet-400/30"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 0.5
          }}
        />
      </motion.button>
    </div>
  )
}

function FallbackMessage({ onOpenExternal }: { onOpenExternal: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center mb-3">
        <AlertCircle className="w-7 h-7 text-violet-400" />
      </div>
      <h3 className="text-base font-semibold mb-2">Chat Unavailable</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Ginni is taking a short break. Click below to chat directly!
      </p>
      <button
        onClick={onOpenExternal}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium text-sm hover:scale-105 transition-transform"
      >
        <ExternalLink className="w-4 h-4" />
        Open Ginni Chat
      </button>
    </div>
  )
}

// Desktop Chatbox - anchored above button
interface GinniChatBoxProps {
  isOpen: boolean
  onClose: () => void
}

function GinniChatBox({ isOpen, onClose }: GinniChatBoxProps) {
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleOpenExternal = useCallback(() => {
    window.open('https://ginnitdt.lovable.app/', '_blank', 'noopener,noreferrer')
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false)
    setIframeError(false)
  }, [])

  const handleIframeError = useCallback(() => {
    setIsLoading(false)
    setIframeError(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIframeError(false)
      setIsLoading(true)
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          {/* Chatbox - anchored above button */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed bottom-24 right-6 z-50"
            style={{
              width: '340px',
              height: '480px',
            }}
          >
            {/* Chatbox Container */}
            <div className={cn(
              "w-full h-full",
              "bg-gradient-to-b from-card via-card to-muted/50",
              "border border-border/50 shadow-2xl shadow-purple-500/20 rounded-2xl",
              "flex flex-col overflow-hidden"
            )}>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-gradient-to-r from-violet-500/10 to-amber-500/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-amber-300 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Moon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2 text-sm">
                      Ginni 💜
                      <motion.span
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </h3>
                    <p className="text-xs text-muted-foreground">Your spiritual companion</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 relative bg-card/50">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <Moon className="w-5 h-5 text-white" />
                      </motion.div>
                      <p className="text-xs text-muted-foreground">Connecting...</p>
                    </div>
                  </div>
                )}

                {iframeError ? (
                  <FallbackMessage onOpenExternal={handleOpenExternal} />
                ) : (
                  <iframe
                    ref={iframeRef}
                    src="https://ginnitdt.lovable.app/"
                    className="w-full h-full border-none"
                    allow="clipboard-write; encrypted-media; fullscreen"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    title="Ginni Chat"
                  />
                )}
              </div>
            </div>

            {/* Arrow pointing to button */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 bg-card border-r border-b border-border/50 rotate-45 rounded-sm" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Mobile version - full screen
function GinniChatBoxMobile({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleOpenExternal = useCallback(() => {
    window.open('https://ginnitdt.lovable.app/', '_blank', 'noopener,noreferrer')
  }, [])

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false)
    setIframeError(false)
  }, [])

  const handleIframeError = useCallback(() => {
    setIsLoading(false)
    setIframeError(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIframeError(false)
      setIsLoading(true)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-50 bg-background flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-amber-300 flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  Ginni 💜
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-xs text-muted-foreground">Your spiritual companion</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 relative bg-card/50">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Moon className="w-5 h-5 text-white" />
                  </motion.div>
                  <p className="text-xs text-muted-foreground">Connecting...</p>
                </div>
              </div>
            )}

            {iframeError ? (
              <FallbackMessage onOpenExternal={handleOpenExternal} />
            ) : (
              <iframe
                ref={iframeRef}
                src="https://ginnitdt.lovable.app/"
                className="w-full h-full border-none"
                allow="clipboard-write; encrypted-media; fullscreen"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Ginni Chat"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main component
export function GinniChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      <GinniFloatingButton onOpen={handleOpen} isChatOpen={isOpen} />
      {isMobile ? (
        <GinniChatBoxMobile isOpen={isOpen} onClose={handleClose} />
      ) : (
        <GinniChatBox isOpen={isOpen} onClose={handleClose} />
      )}
    </>
  )
}

export default GinniChat