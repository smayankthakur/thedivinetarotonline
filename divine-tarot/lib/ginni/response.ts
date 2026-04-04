import { 
  GinniMemory, 
  getMemoryContext, 
  getPersonalizedGreeting, 
  getProgressAcknowledgment,
  updateMemory 
} from './memory'

interface GinniResponseInput {
  userMessage: string
  memory: GinniMemory
  includeReadingSuggestion?: boolean
}

interface GinniResponse {
  response: string
  memory_update: string[]
  suggested_action?: {
    type: 'reading' | 'redirect' | 'none'
    details?: string
  }
}

// Response templates for different scenarios
const responseTemplates = {
  // First interaction / new user
  greeting: (name?: string) => {
    if (name) {
      return `Arey ${name} yaar, kya chal raha hai? Main Ginni hoon - tumhara spiritual guide! 💜\n\nKoi bhi question ho, tension ho, ya bas kuch confuse ho - main yahan hoon!`
    }
    return `Namaste! Main Ginni hoon - tumhara spiritual guide! 💜\n\nKoi bhi question ho, tension ho, ya bas chat karna ho - main yahan hoon tumhare liye!`
  },

  // Relationship confusion - with memory
  relationshipConfusion: (name: string, hasBreakup: boolean, hasHealing: boolean) => {
    let response = `Arey ${name} yaar, relationship ki baatein hamesha complex hoti hain...`
    
    if (hasBreakup) {
      response += `\n\nLast time bhi tumne mention kiya tha ki breakup hua tha. Abhi bhi woh feeling hai kya?`
    }
    
    if (hasHealing) {
      response += `\n\nMaine dekha tha tumhara last reading - woh healing phase dikha raha tha. Ab thoda clarity aayi hogi na?`
    } else {
      response += `\n\nBatao kya exact situation hai? Koi specific question hai jiska answer chahiye?`
    }
    
    return response
  },

  // Anxiety / worry
  anxiety: (name: string, pastAnxiety: boolean) => {
    let response = `Tension mat lo ${name}! Main samajh sakta hoon tumhe kya worry kar raha hai...`
    
    if (pastAnxiety) {
      response += `\n\nTumhe pehle bhi anxiety feel hui thi. Remember, har baar tum usse bahar aaye ho. Tum strong ho!`
    }
    
    response += `\n\nBollywood mein bolte hain na - "Sab kuch theek ho jayega!" Woh sach hai! Bas thoda time aur patience chahiye. 💜`
    
    return response
  },

  // Heartbreak (with memory)
  heartbreak: (name: string, occurrences: number) => {
    let response = `Oh ${name}... heartbreak bahut painful hai, main jaanta hoon.`
    
    if (occurrences >= 2) {
      response += `\n\nTumhe baar baar yeh pain feel ho raha hai - isse zyada koi nahi samajh sakta tumhe. But main hoon na! 💜`
    }
    
    response += `\n\nDekho, breakup se healing ek process hai. Rush mat karo. Time lena chahiye. But yeh bhi remember karo - jo cheez gayi woh shayad chahiye thi nahi. Naya chapter abhi shuru hone wala hai!`
    
    return response
  },

  // Career confusion
  careerConfusion: (name: string, pastCareer: boolean) => {
    let response = `Career decisions bohot important hote hain ${name}!`
    
    if (pastCareer) {
      response += `\n\nTumne pehle bhi career ke baare mein query ki thi. Kya abhi bhi woh confusion hai ya naya situation aaya hai?`
    } else {
      response += `\n\nBatao kya chal raha hai career mein? Koi new opportunity aaya hai? Ya existing situation mein confusion hai?`
    }
    
    response += `\n\nTrust your gut - jo feel karta hai woh right hai. Tumari intuition powerful hai!`
    
    return response
  },

  // Progress / improvement
  progress: (name: string) => {
    return `Yaar ${name}, main dekho raha hoon tumhe - tum progress kar rahe ho! 🌟\n\nJo jo baat tum pehle karte the, ab woh thode different hai. That's growth! Keep going! 💜`
  },

  // General conversation / just chatting
  general: (name: string) => {
    return `${name} yaar, batao kya chal raha hai? Koi specific question hai ya bas mood kharab hai? Main hoon na - sunne ke liye taiyaar! 💜`
  },

  // Repeat issue (user stuck on same topic)
  stuck: (name: string, issue: string) => {
    return `${name} yaar, main notice kar raha hoon tum baar baar is topic par aa rahe ho. ${issue} kaafi baar discuss ho chuka hai...\n\nKya tumhe lagta hai tumhe isme actual guidance chahiye? Ek detailed tarot reading se zyada clarity milegi - tumhe aur mujhe dono! 🔮`
  },

  // Post-reading follow-up
  postReading: (name: string, readingInsight: string) => {
    return `${name} yaar, tumhari recent reading ke baare mein main soch raha tha...\n\n${readingInsight}\n\nKya iske baare mein koi question hai? Ya koi aur aspect explain karna chahiye?`
  },

  // Hope / looking forward
  hopeful: (name: string) => {
    return `${name}! Tumhe dekh kar accha lag raha hai! 🎉\n\nHope is powerful thing - isse zyada kuch nahi chahiye! Tumari journey acchi chal rahi hai. Keep that energy! 💜`
  },

  // Closing lines (pick one randomly)
  closing: [
    "Trust me, tum yeh phase cross kar loge 💜",
    "Main hoon na tumhare saath! 💫",
    "Yeh sab theek ho jayega, believe karo! ✨",
    "Tum strong ho - main jaanta hoon! 💜",
    "Koi tension nahi, sab handle ho jayega! 🌟",
  ],
}

// Helper to detect conversation category
type ConversationCategory = 'greeting' | 'relationship' | 'anxiety' | 'heartbreak' | 'career' | 'general' | 'stuck' | 'postReading' | 'hopeful'

const detectCategory = (message: string, memory: GinniMemory): ConversationCategory => {
  const lower = message.toLowerCase()
  
  // Check for stuck pattern (same issue repeated)
  if (memory.conversations.length >= 4) {
    const recentMessages = memory.conversations.slice(-4).filter(c => c.role === 'user')
    if (recentMessages.length >= 3) {
      const firstTopic = recentMessages[0].content.toLowerCase()
      const hasSimilar = recentMessages.slice(1).some(m => 
        m.content.toLowerCase().includes(firstTopic.split(' ').slice(0, 3).join(' '))
      )
      if (hasSimilar) return 'stuck'
    }
  }
  
  // Check for greeting / first message
  if (memory.totalInteractions === 0) return 'greeting'
  
  // Post-reading check
  if (memory.recentReadings.length > 0) {
    const lastReadingTime = new Date(memory.recentReadings[memory.recentReadings.length - 1].timestamp).getTime()
    const now = Date.now()
    if (now - lastReadingTime < 5 * 60 * 1000) return 'postReading' // Within 5 minutes
  }
  
  // Check emotional patterns in current message
  if (lower.includes('love') || lower.includes('relationship') || lower.includes('bf') || lower.includes('gf') || lower.includes('partner') || lower.includes('ex')) {
    return 'relationship'
  }
  if (lower.includes('heartbreak') || lower.includes('breakup') || lower.includes('dumped') || lower.includes('pain')) {
    return 'heartbreak'
  }
  if (lower.includes('anxious') || lower.includes('worried') || lower.includes('tension') || lower.includes('nervous') || lower.includes('stress')) {
    return 'anxiety'
  }
  if (lower.includes('career') || lower.includes('job') || lower.includes('work') || lower.includes('office') || lower.includes('promotion')) {
    return 'career'
  }
  if (lower.includes('hope') || lower.includes('better') || lower.includes('excited') || lower.includes('looking forward')) {
    return 'hopeful'
  }
  
  return 'general'
}

// Get context flags from memory
const getMemoryFlags = (memory: GinniMemory) => {
  const heartbreak = memory.emotionalPatterns.find(p => p.type === 'heartbreak')
  const anxiety = memory.emotionalPatterns.find(p => p.type === 'anxiety')
  const confusion = memory.emotionalPatterns.find(p => p.type === 'confusion')
  
  // Check if career was mentioned in recent conversations
  const recentCareerMention = memory.conversations
    .filter(c => c.role === 'user')
    .slice(-5)
    .some(c => c.content.toLowerCase().includes('career') || 
               c.content.toLowerCase().includes('job') || 
               c.content.toLowerCase().includes('work'))
  
  return {
    hasBreakup: heartbreak ? heartbreak.occurrences > 0 : false,
    heartbreakOccurrences: heartbreak?.occurrences || 0,
    hasAnxiety: anxiety ? anxiety.occurrences > 0 : false,
    anxietyOccurrences: anxiety?.occurrences || 0,
    hasConfusion: confusion ? confusion.occurrences > 0 : false,
    hasCareer: recentCareerMention,
    hasRecentReading: memory.recentReadings.length > 0,
    lastReading: memory.recentReadings[memory.recentReadings.length - 1],
    userName: memory.userProfile?.name,
  }
}

const getRandomClosing = (): string => {
  return responseTemplates.closing[Math.floor(Math.random() * responseTemplates.closing.length)]
}

export const generateGinniResponse = (input: GinniResponseInput): GinniResponse => {
  const { userMessage, memory, includeReadingSuggestion = true } = input
  const name = memory.userProfile?.name || 'Yaar'
  
  const category = detectCategory(userMessage, memory)
  const flags = getMemoryFlags(memory)
  
  let response = ''
  let memoryUpdates: string[] = []
  let suggestedAction: GinniResponse['suggested_action'] = { type: 'none' }
  
  // Generate response based on category
  switch (category) {
    case 'greeting':
      response = responseTemplates.greeting(name)
      memoryUpdates.push('First interaction / greeting')
      break
      
    case 'relationship':
      response = responseTemplates.relationshipConfusion(
        name,
        flags.hasBreakup,
        flags.lastReading?.keyInsight?.toLowerCase().includes('healing') || false
      )
      memoryUpdates.push('User discussed relationship status')
      if (includeReadingSuggestion) {
        suggestedAction = { type: 'reading', details: 'love reading' }
        response += `\n\nEk love reading karein toh aur clarity milegi! 🔮`
      }
      break
      
    case 'heartbreak':
      response = responseTemplates.heartbreak(name, flags.heartbreakOccurrences)
      memoryUpdates.push('User mentioned heartbreak')
      if (includeReadingSuggestion) {
        suggestedAction = { type: 'reading', details: 'healing reading' }
        response += `\n\nEk healing reading se tumhe aur clarity milegi aur comfort bhi milegi 💜`
      }
      break
      
    case 'anxiety':
      response = responseTemplates.anxiety(name, flags.hasAnxiety)
      memoryUpdates.push('User expressed anxiety')
      if (flags.anxietyOccurrences >= 2) {
        response += `\n\nTum baar baar anxious feel kar rahe ho - kya main suggest karu ki ek reading karo jisme future ki clarity mile?`
        suggestedAction = { type: 'reading', details: 'anxiety/peace reading' }
      }
      break
      
    case 'career':
      response = responseTemplates.careerConfusion(name, flags.hasCareer)
      memoryUpdates.push('User discussed career')
      if (includeReadingSuggestion) {
        suggestedAction = { type: 'reading', details: 'career reading' }
        response += `\n\nCareer ki baatein important hain - ek reading se right direction mil sakti hai!`
      }
      break
      
    case 'stuck':
      response = responseTemplates.stuck(name, userMessage.split(' ').slice(0, 5).join(' '))
      memoryUpdates.push('User stuck on same issue')
      suggestedAction = { type: 'reading', details: 'detailed reading recommended' }
      response += `\n\nEk detailed reading karo - isse actual clarity milegi! 🔮`
      break
      
    case 'postReading':
      response = responseTemplates.postReading(
        name,
        flags.lastReading?.keyInsight || 'Reading done'
      )
      memoryUpdates.push('Post-reading follow-up')
      break
      
    case 'hopeful':
      response = responseTemplates.hopeful(name)
      memoryUpdates.push('User feeling hopeful')
      break
      
    case 'general':
    default:
      // Check for progress acknowledgment
      const progressMsg = getProgressAcknowledgment(memory)
      if (progressMsg) {
        response = progressMsg + `\n\nAb batao, kya chal raha hai ${name}?`
        memoryUpdates.push('Acknowledged user progress')
      } else {
        response = responseTemplates.general(name)
        memoryUpdates.push('General conversation')
      }
      break
  }
  
  // Add closing line
  response += `\n\n${getRandomClosing()}`
  
  return {
    response,
    memory_update: memoryUpdates,
    suggested_action: suggestedAction.type !== 'none' ? suggestedAction : undefined,
  }
}

// Export for use in chat component
export const createGinniResponse = (
  userMessage: string,
  currentMemory: GinniMemory,
  newReadings?: { spreadType: string; question: string; keyInsight?: string }[]
): { response: string; updatedMemory: GinniMemory } => {
  const ginniResponse = generateGinniResponse({
    userMessage,
    memory: currentMemory,
  })
  
  const updatedMemory = updateMemory(
    currentMemory,
    userMessage,
    ginniResponse.response,
    newReadings?.map((r, i) => ({
      id: Date.now().toString() + i,
      ...r,
      cards: [],
      timestamp: new Date(),
    }))
  )
  
  return {
    response: ginniResponse.response,
    updatedMemory,
  }
}