import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { config } from '@/lib/config'
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
    const { user_question, selected_cards, spread_id = 'three-card' } = body

    // Validate input
    if (!user_question || typeof user_question !== 'string' || user_question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    if (!selected_cards || !Array.isArray(selected_cards) || selected_cards.length === 0) {
      return NextResponse.json(
        { error: 'Selected cards are required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!config.ai.openaiApiKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      )
    }

    // Get spread configuration
    const spread = getSpreadById(spread_id)
    if (!spread) {
      return NextResponse.json(
        { error: 'Invalid spread type' },
        { status: 400 }
      )
    }

    // Fetch user's last 5 readings for context
    const { data: recentReadings } = await supabase
      .from('readings')
      .select('question, cards, interpretation, created_at, spread_type')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    // Fetch or create user profile
    let { data: userProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!userProfile) {
      // Create new user profile
      const { data: newProfile } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          total_readings: 0,
          dominant_suits: {},
          energy_patterns: [],
          last_reading_at: null,
        })
        .select()
        .single()
      userProfile = newProfile
    }

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Prepare card information for prompt with positions
          const cardsInfo = selected_cards.map((card: any, index: number) => {
            const position = spread.positions[index]
            return `Card ${index + 1}: ${card.name} (${card.suit})
Position: ${position?.name || `Position ${index + 1}`} - ${position?.meaning || ''}
- Meaning: ${card.meaning}
- Reversed Meaning: ${card.reversedMeaning}
- Description: ${card.description}
- Keywords: ${card.keywords.join(', ')}`
          }).join('\n\n')

          // Prepare recent readings context
          let recentContext = ''
          if (recentReadings && recentReadings.length > 0) {
            recentContext = `\n\nUser's Recent Reading History (for context and continuity):
${recentReadings.map((reading, index) => {
  const cards = reading.cards.map((c: any) => c.name).join(', ')
  return `${index + 1}. Question: "${reading.question}"
   Spread: ${reading.spread_type || 'three-card'}
   Cards: ${cards}
   Date: ${new Date(reading.created_at).toLocaleDateString()}`
}).join('\n\n')}

Note: Use this history to provide personalized, continuous guidance. Reference past themes and patterns when relevant.`
          }

          // Prepare energy patterns context
          let energyContext = ''
          if (userProfile?.energy_patterns && userProfile.energy_patterns.length > 0) {
            energyContext = `\n\nUser's Energy Patterns:
${userProfile.energy_patterns.join(', ')}`
          }

          // Create spread-specific instructions
          let spreadInstructions = ''
          if (spread.id === 'single-card') {
            spreadInstructions = `
This is a SINGLE CARD reading. Focus on the core message of this one card. Be concise and direct.`
          } else if (spread.id === 'three-card') {
            spreadInstructions = `
This is a THREE CARD reading (Past/Present/Future). Interpret each card in its position and show the timeline progression.`
          } else if (spread.id === 'celtic-cross') {
            spreadInstructions = `
This is a CELTIC CROSS reading (10 cards). Provide a comprehensive analysis covering all aspects of the situation. Be thorough and detailed.`
          }

          // Create the enhanced prompt with personalization and spread awareness
          const prompt = `You are a mystical tarot reader with deep spiritual insight and perfect memory of past readings. You provide compassionate, insightful, and practical guidance based on tarot cards.

User's Question: "${user_question}"

Spread Type: ${spread.name} (${spread.cardCount} cards)
${spread.description}
${spreadInstructions}

Selected Cards with Positions:
${cardsInfo}
${recentContext}
${energyContext}

Provide a deeply personal and continuous interpretation that includes:

1. **Emotional Insight**: What emotions and feelings the cards reveal about the situation. Reference past patterns if relevant.

2. **Practical Advice**: Actionable guidance for the user's current circumstances. Connect to their journey.

3. **Energy Reading**: The spiritual energy surrounding this question. Note any shifts from past readings.

4. **Future Guidance**: What the cards suggest about potential outcomes and paths forward. Build on progress.

Be mystical, insightful, and compassionate. Use spiritual language while remaining grounded and practical. Make the reading feel like a continuous conversation with a trusted spiritual advisor who remembers everything.

Respond in a structured format with clear sections for each aspect.`

          // Call OpenAI API with streaming
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.ai.openaiApiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: 'You are a mystical tarot reader with deep spiritual insight and perfect memory. You provide compassionate, insightful, and practical guidance. Your readings are mystical yet grounded, offering both emotional depth and actionable advice. You remember past readings and provide continuous, personalized guidance.',
                },
                {
                  role: 'user',
                  content: prompt,
                },
              ],
              stream: true,
              max_tokens: spread.id === 'celtic-cross' ? 2000 : 1500,
              temperature: 0.8,
            }),
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.error?.message || 'OpenAI API error')
          }

          // Process streaming response
          const reader = response.body?.getReader()
          if (!reader) {
            throw new Error('No response body')
          }

          let fullContent = ''
          const decoder = new TextDecoder()

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n').filter(line => line.trim() !== '')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  break
                }

                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content || ''
                  if (content) {
                    fullContent += content
                    // Send chunk to client
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }

          // Parse the full content to extract structured data
          const interpretation = parseInterpretation(fullContent)

          // Extract energy patterns from the reading
          const energyPatterns = extractEnergyPatterns(fullContent, selected_cards)

          // Update user profile with new data
          await supabase
            .from('user_profiles')
            .update({
              total_readings: (userProfile?.total_readings || 0) + 1,
              dominant_suits: updateDominantSuits(userProfile?.dominant_suits || {}, selected_cards),
              energy_patterns: energyPatterns,
              last_reading_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)

          // Send final structured response
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                done: true,
                interpretation,
                energyPatterns,
                spread,
              })}\n\n`
            )
          )

          controller.close()
        } catch (error) {
          console.error('Error in AI reading:', error)
          const errorMessage = error instanceof Error ? error.message : 'Internal server error'
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                error: errorMessage,
              })}\n\n`
            )
          )
          controller.close()
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error in AI reading endpoint:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function parseInterpretation(content: string): {
  summary: string
  advice: string
  energy: string
  outcome: string
} {
  const interpretation = {
    summary: '',
    advice: '',
    energy: '',
    outcome: '',
  }

  const lines = content.split('\n')
  let currentSection = ''

  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim()

    if (lowerLine.includes('emotional insight') || lowerLine.includes('emotion')) {
      currentSection = 'summary'
      continue
    } else if (lowerLine.includes('practical advice') || lowerLine.includes('advice')) {
      currentSection = 'advice'
      continue
    } else if (lowerLine.includes('energy reading') || lowerLine.includes('energy')) {
      currentSection = 'energy'
      continue
    } else if (lowerLine.includes('future guidance') || lowerLine.includes('outcome')) {
      currentSection = 'outcome'
      continue
    }

    if (currentSection && line.trim()) {
      interpretation[currentSection as keyof typeof interpretation] += line + '\n'
    }
  }

  // If parsing didn't work well, use the full content
  if (!interpretation.summary && !interpretation.advice) {
    interpretation.summary = content.substring(0, 400)
    interpretation.advice = content.substring(400, 800)
    interpretation.energy = 'The cards carry a powerful spiritual energy that resonates with your current situation.'
    interpretation.outcome = content.substring(800, 1200) || 'The universe guides you toward positive transformation.'
  }

  // Clean up the extracted text
  Object.keys(interpretation).forEach((key) => {
    interpretation[key as keyof typeof interpretation] = interpretation[key as keyof typeof interpretation]
      .trim()
      .replace(/^\d+\.\s*/, '')
      .replace(/^[-*]\s*/, '')
  })

  return interpretation
}

function extractEnergyPatterns(content: string, cards: any[]): string[] {
  const patterns: string[] = []
  
  // Extract patterns from card suits
  const suits = cards.map(card => card.suit)
  const suitCounts: { [key: string]: number } = {}
  
  suits.forEach(suit => {
    suitCounts[suit] = (suitCounts[suit] || 0) + 1
  })
  
  // Add dominant suit patterns
  Object.entries(suitCounts).forEach(([suit, count]) => {
    if (count >= 2) {
      patterns.push(`${suit}-dominant`)
    }
  })
  
  // Extract patterns from content
  const lowerContent = content.toLowerCase()
  
  if (lowerContent.includes('transformation') || lowerContent.includes('change')) {
    patterns.push('transformation-phase')
  }
  if (lowerContent.includes('growth') || lowerContent.includes('expansion')) {
    patterns.push('growth-energy')
  }
  if (lowerContent.includes('challenge') || lowerContent.includes('obstacle')) {
    patterns.push('challenge-period')
  }
  if (lowerContent.includes('harmony') || lowerContent.includes('balance')) {
    patterns.push('harmony-seeking')
  }
  if (lowerContent.includes('manifestation') || lowerContent.includes('creation')) {
    patterns.push('manifestation-power')
  }
  
  return patterns.slice(0, 5) // Keep only last 5 patterns
}

function updateDominantSuits(current: { [key: string]: number }, cards: any[]): { [key: string]: number } {
  const updated = { ...current }
  
  cards.forEach(card => {
    updated[card.suit] = (updated[card.suit] || 0) + 1
  })
  
  return updated
}
