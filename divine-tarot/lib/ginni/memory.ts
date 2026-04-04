export interface UserProfile {
  name: string
  preferredLanguage: 'en' | 'hi' | 'hinglish'
  createdAt: Date
}

export interface ConversationEntry {
  id: string
  role: 'user' | 'ginni'
  content: string
  timestamp: Date
  sentiment?: 'positive' | 'negative' | 'neutral' | 'confused'
}

export interface TarotReadingSummary {
  id: string
  spreadType: string
  cards: string[]
  question: string
  timestamp: Date
  keyInsight?: string
}

export interface EmotionalPattern {
  type: 'anxiety' | 'confusion' | 'heartbreak' | 'excitement' | 'hope' | 'frustration'
  occurrences: number
  lastMentioned: Date
  relatedTopics: string[]
}

export interface GinniMemory {
  userProfile: UserProfile | null
  conversations: ConversationEntry[]
  recentReadings: TarotReadingSummary[]
  emotionalPatterns: EmotionalPattern[]
  lastInteraction: Date
  totalInteractions: number
}

export const createEmptyMemory = (): GinniMemory => ({
  userProfile: null,
  conversations: [],
  recentReadings: [],
  emotionalPatterns: [],
  lastInteraction: new Date(),
  totalInteractions: 0,
})

export const detectEmotionalPattern = (message: string): EmotionalPattern['type'] | null => {
  const lower = message.toLowerCase()
  
  if (lower.includes('confused') || lower.includes('confusion') || lower.includes('not sure') || lower.includes('what should')) {
    return 'confusion'
  }
  if (lower.includes('anxious') || lower.includes('worried') || lower.includes('tension') || lower.includes('nervous')) {
    return 'anxiety'
  }
  if (lower.includes('heartbreak') || lower.includes('breakup') || lower.includes('ex') || lower.includes('love pain')) {
    return 'heartbreak'
  }
  if (lower.includes('excited') || lower.includes('happy') || lower.includes('good') || lower.includes('great')) {
    return 'excitement'
  }
  if (lower.includes('hope') || lower.includes('looking forward') || positiveLookAhead.test(lower)) {
    return 'hope'
  }
  if (lower.includes('frustrated') || lower.includes('annoyed') || lower.includes('fed up') || lower.includes('tired of')) {
    return 'frustration'
  }
  
  return null
}

const positiveLookAhead = /future|soon|better|improving|progress|healing/i

export const updateMemory = (
  currentMemory: GinniMemory,
  userMessage: string,
  ginniResponse: string,
  newReadings?: TarotReadingSummary[]
): GinniMemory => {
  const userEntry: ConversationEntry = {
    id: Date.now().toString(),
    role: 'user',
    content: userMessage,
    timestamp: new Date(),
    sentiment: detectSentiment(userMessage),
  }

  const ginniEntry: ConversationEntry = {
    id: (Date.now() + 1).toString(),
    role: 'ginni',
    content: ginniResponse,
    timestamp: new Date(),
    sentiment: 'neutral',
  }

  // Update emotional patterns
  const detectedPattern = detectEmotionalPattern(userMessage)
  let updatedPatterns = [...currentMemory.emotionalPatterns]
  
  if (detectedPattern) {
    const existingIndex = updatedPatterns.findIndex(p => p.type === detectedPattern)
    if (existingIndex >= 0) {
      updatedPatterns[existingIndex] = {
        ...updatedPatterns[existingIndex],
        occurrences: updatedPatterns[existingIndex].occurrences + 1,
        lastMentioned: new Date(),
      }
    } else {
      updatedPatterns.push({
        type: detectedPattern,
        occurrences: 1,
        lastMentioned: new Date(),
        relatedTopics: [],
      })
    }
  }

  // Keep only last 50 conversations
  const updatedConversations = [...currentMemory.conversations, userEntry, ginniEntry].slice(-50)

  // Add new readings if provided
  const updatedReadings = newReadings 
    ? [...currentMemory.recentReadings, ...newReadings].slice(-10)
    : currentMemory.recentReadings

  return {
    ...currentMemory,
    conversations: updatedConversations,
    recentReadings: updatedReadings,
    emotionalPatterns: updatedPatterns,
    lastInteraction: new Date(),
    totalInteractions: currentMemory.totalInteractions + 1,
  }
}

const detectSentiment = (message: string): ConversationEntry['sentiment'] => {
  const lower = message.toLowerCase()
  const positiveWords = ['good', 'great', 'amazing', 'happy', 'excited', 'better', 'improving']
  const negativeWords = ['bad', 'terrible', 'worst', 'sad', 'hurt', 'pain', 'broken']
  
  const hasPositive = positiveWords.some(w => lower.includes(w))
  const hasNegative = negativeWords.some(w => lower.includes(w))
  
  if (hasPositive && !hasNegative) return 'positive'
  if (hasNegative) return 'negative'
  if (lower.includes('confused') || lower.includes('not sure')) return 'confused'
  return 'neutral'
}

export const getMemoryContext = (memory: GinniMemory): string => {
  const parts: string[] = []
  
  // Name
  if (memory.userProfile?.name) {
    parts.push(`User name: ${memory.userProfile.name}`)
  }
  
  // Recent readings context
  if (memory.recentReadings.length > 0) {
    const recent = memory.recentReadings.slice(-3)
    const readingContext = recent.map(r => 
      `${r.spreadType} reading: ${r.question} - ${r.keyInsight || 'card reading done'}`
    ).join('; ')
    parts.push(`Recent readings: ${readingContext}`)
  }
  
  // Emotional patterns
  if (memory.emotionalPatterns.length > 0) {
    const topPatterns = [...memory.emotionalPatterns]
      .sort((a, b) => b.occurrences - a.occurrences)
      .slice(0, 3)
      .map(p => `${p.type} (mentioned ${p.occurrences} times)`)
      .join(', ')
    parts.push(`Emotional patterns: ${topPatterns}`)
  }
  
  // Last conversation
  if (memory.conversations.length > 0) {
    const lastUserMsg = [...memory.conversations].reverse().find(c => c.role === 'user')
    if (lastUserMsg) {
      parts.push(`Last user message: ${lastUserMsg.content.slice(0, 100)}`)
    }
  }
  
  return parts.join('. ')
}

export const getPersonalizedGreeting = (memory: GinniMemory): string => {
  const name = memory.userProfile?.name
  const hoursSinceLastInteraction = memory.lastInteraction 
    ? (Date.now() - new Date(memory.lastInteraction).getTime()) / (1000 * 60 * 60)
    : null
  
  const hour = hoursSinceLastInteraction ?? 0
  
  let greeting = ''
  
  if (name) {
    if (hour < 1) {
      greeting = `Hey ${name}! Kaise ho? `
    } else if (hour < 24) {
      greeting = `Welcome back ${name}! `
    } else {
      greeting = `${name} yaar, kahan the tum itne din? Main soch raha tha tumhare baare mein! `
    }
  } else {
    if (hour < 1) {
      greeting = 'Hey yaar! '
    } else if (hour < 24) {
      greeting = 'Welcome back! '
    } else {
      greeting = 'Long time no chat! Tumse baat karke accha lag raha hai! '
    }
  }
  
  return greeting
}

export const getProgressAcknowledgment = (memory: GinniMemory): string | null => {
  if (memory.recentReadings.length === 0) return null
  
  // Check if emotional pattern is improving
  const heartbreak = memory.emotionalPatterns.find(p => p.type === 'heartbreak')
  const anxiety = memory.emotionalPatterns.find(p => p.type === 'anxiety')
  
  if (heartbreak && heartbreak.occurrences >= 2) {
    const lastMention = new Date(heartbreak.lastMentioned)
    const now = new Date()
    const daysSince = (now.getTime() - lastMention.getTime()) / (1000 * 60 * 60 * 24)
    
    if (daysSince > 7) {
      return "I notice tumhe ab heartbreak ke baare mein bhi kam mention kar rahe ho - yeh good sign hai! Healing chal rahi hai 💜"
    }
  }
  
  return null
}