import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getRandomCards } from '@/lib/tarot/cards'
import { getSpreadById } from '@/lib/tarot/spreads'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { question, spreadId = 'three-card' } = body

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Get spread configuration
    const spread = getSpreadById(spreadId)
    if (!spread) {
      return NextResponse.json(
        { error: 'Invalid spread type' },
        { status: 400 }
      )
    }

    // Check user subscription and reading limits
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('plan_id, status')
      .eq('user_id', user.id)
      .single()

    const currentPlan = subscription?.plan_id || 'free'
    const planStatus = subscription?.status || 'active'

    // Get user's reading count for current month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: readingsThisMonth } = await supabase
      .from('readings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString())

    // Check if user has reached free limit
    if (currentPlan === 'free' && (readingsThisMonth || 0) >= 3) {
      return NextResponse.json(
        { 
          error: 'Reading limit reached',
          message: 'You have reached your free reading limit. Upgrade to Pro for unlimited readings.',
          currentPlan,
          readingsThisMonth: readingsThisMonth || 0,
          limit: 3,
        },
        { status: 403 }
      )
    }

    // Check if subscription is active
    if (currentPlan !== 'free' && planStatus !== 'active') {
      return NextResponse.json(
        { 
          error: 'Subscription inactive',
          message: 'Your subscription is not active. Please update your payment method.',
          currentPlan,
          planStatus,
        },
        { status: 403 }
      )
    }

    // Draw cards based on spread type
    const cards = getRandomCards(spread.cardCount)

    // Generate interpretation based on spread type
    const interpretation = generateInterpretation(cards, question, spread)

    // Store reading in database
    const { data: reading, error: dbError } = await supabase
      .from('readings')
      .insert({
        user_id: user.id,
        question: question.trim(),
        spread_type: spreadId,
        cards: cards.map((card, index) => ({
          id: card.id,
          name: card.name,
          suit: card.suit,
          meaning: card.upright_meaning,
          reversedMeaning: card.reversed_meaning,
          description: card.description,
          keywords: card.keywords,
          image: card.image,
          position: spread.positions[index]?.name || `Position ${index + 1}`,
          positionMeaning: spread.positions[index]?.meaning || '',
        })),
        interpretation,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error storing reading:', dbError)
      // Still return the reading even if storage fails
    }

    return NextResponse.json({
      success: true,
      data: {
        cards: cards.map((card, index) => ({
          ...card,
          position: spread.positions[index]?.name || `Position ${index + 1}`,
          positionMeaning: spread.positions[index]?.meaning || '',
        })),
        interpretation,
        spread,
        readingId: reading?.id,
        readingsThisMonth: (readingsThisMonth || 0) + 1,
        currentPlan,
      },
    })
  } catch (error) {
    console.error('Error in tarot draw:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateInterpretation(cards: any[], question: string, spread: any): string {
  const cardNames = cards.map((c) => c.name).join(', ')
  
  if (spread.id === 'single-card') {
    return generateSingleCardInterpretation(cards[0], question)
  } else if (spread.id === 'three-card') {
    return generateThreeCardInterpretation(cards, question)
  } else if (spread.id === 'celtic-cross') {
    return generateCelticCrossInterpretation(cards, question)
  }
  
  return generateGenericInterpretation(cards, question, spread)
}

function generateSingleCardInterpretation(card: any, question: string): string {
  return `The card drawn for your question "${question}" is **${card.name}**.

**Core Message:** ${card.upright_meaning}

**Detailed Insight:** ${card.description}

**Key Themes:** ${card.keywords.join(', ')}

This single card represents the essence of your situation. Focus on its message and how it relates to your question. The ${card.name} suggests that you are in a phase of ${card.keywords[0]} and ${card.keywords[1]}. Trust your intuition as you reflect on this guidance.`
}

function generateThreeCardInterpretation(cards: any[], question: string): string {
  const [past, present, future] = cards
  
  return `Your three-card reading for "${question}" reveals a powerful timeline:

**Past - ${past.name}:** ${past.upright_meaning}
${past.description}

**Present - ${present.name}:** ${present.upright_meaning}
${present.description}

**Future - ${future.name}:** ${future.upright_meaning}
${future.description}

**Overall Guidance:** The cards show a journey from ${past.keywords[0]} through ${present.keywords[0]} toward ${future.keywords[0]}. Your past experiences with ${past.keywords[1]} have shaped your current situation of ${present.keywords[1]}. The future holds promise of ${future.keywords[1]} if you continue on your current path. Trust the process and embrace the transformation ahead.`
}

function generateCelticCrossInterpretation(cards: any[], question: string): string {
  const positions = [
    'Present Situation',
    'Challenge',
    'Subconscious',
    'Recent Past',
    'Conscious',
    'Near Future',
    'Your Approach',
    'External Influences',
    'Hopes & Fears',
    'Final Outcome',
  ]
  
  let interpretation = `Your Celtic Cross reading for "${question}" provides deep insight into your situation:\n\n`
  
  cards.forEach((card, index) => {
    interpretation += `**${positions[index]} - ${card.name}:** ${card.upright_meaning}\n`
    interpretation += `${card.description}\n\n`
  })
  
  interpretation += `**Overall Summary:** This comprehensive reading reveals that you are in a phase of ${cards[0].keywords[0]} and ${cards[0].keywords[1]}. The main challenge involves ${cards[1].keywords[0]}, while your subconscious is focused on ${cards[2].keywords[0]}. Recent events have brought ${cards[3].keywords[0]} into your life. Your hopes center around ${cards[4].keywords[0]}, and the near future suggests ${cards[5].keywords[0]}. Your approach of ${cards[6].keywords[0]} is influenced by ${cards[7].keywords[0]}. Your hopes and fears revolve around ${cards[8].keywords[0]}, and the final outcome points to ${cards[9].keywords[0]}. Trust your journey and embrace the guidance offered by the cards.`
  
  return interpretation
}

function generateGenericInterpretation(cards: any[], question: string, spread: any): string {
  let interpretation = `Your ${spread.name} reading for "${question}" reveals:\n\n`
  
  cards.forEach((card, index) => {
    const position = spread.positions[index]?.name || `Position ${index + 1}`
    interpretation += `**${position} - ${card.name}:** ${card.upright_meaning}\n`
    interpretation += `${card.description}\n\n`
  })
  
  interpretation += `**Overall Guidance:** The cards suggest a theme of ${cards[0].keywords[0]} and ${cards[0].keywords[1]}. `
  interpretation += `Trust your intuition as you navigate this journey. The universe is guiding you toward positive transformation.`
  
  return interpretation
}
