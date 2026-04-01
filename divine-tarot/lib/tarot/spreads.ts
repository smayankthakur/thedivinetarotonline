export interface SpreadPosition {
  id: number
  name: string
  meaning: string
  description: string
}

export interface Spread {
  id: string
  name: string
  description: string
  cardCount: number
  positions: SpreadPosition[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeRequired: string
  bestFor: string[]
}

export const spreads: Spread[] = [
  {
    id: 'single-card',
    name: 'Single Card',
    description: 'Quick daily guidance or simple yes/no questions',
    cardCount: 1,
    positions: [
      {
        id: 1,
        name: 'The Answer',
        meaning: 'Core message',
        description: 'The main guidance for your question',
      },
    ],
    difficulty: 'beginner',
    timeRequired: '1-2 minutes',
    bestFor: ['Daily guidance', 'Quick questions', 'Yes/No answers'],
  },
  {
    id: 'three-card',
    name: 'Three Card Spread',
    description: 'Past, Present, and Future timeline reading',
    cardCount: 3,
    positions: [
      {
        id: 1,
        name: 'Past',
        meaning: 'What has led to this situation',
        description: 'Influences from the past affecting your current situation',
      },
      {
        id: 2,
        name: 'Present',
        meaning: 'Current situation',
        description: 'What is happening right now and current energies',
      },
      {
        id: 3,
        name: 'Future',
        meaning: 'Potential outcome',
        description: 'Where things are heading if current path continues',
      },
    ],
    difficulty: 'beginner',
    timeRequired: '3-5 minutes',
    bestFor: ['Timeline readings', 'Situation analysis', 'Decision making'],
  },
  {
    id: 'celtic-cross',
    name: 'Celtic Cross',
    description: 'Comprehensive 10-card reading for deep life insights',
    cardCount: 10,
    positions: [
      {
        id: 1,
        name: 'Present Situation',
        meaning: 'The heart of the matter',
        description: 'Your current situation and what surrounds you',
      },
      {
        id: 2,
        name: 'Challenge',
        meaning: 'What crosses you',
        description: 'Immediate challenge or obstacle you face',
      },
      {
        id: 3,
        name: 'Subconscious',
        meaning: 'Root cause',
        description: 'Underlying influences and subconscious factors',
      },
      {
        id: 4,
        name: 'Recent Past',
        meaning: 'What has just passed',
        description: 'Recent events that have led to this situation',
      },
      {
        id: 5,
        name: 'Conscious',
        meaning: 'Best outcome',
        description: 'Your hopes, goals, and best possible outcome',
      },
      {
        id: 6,
        name: 'Near Future',
        meaning: 'What is coming',
        description: 'What will happen in the near future',
      },
      {
        id: 7,
        name: 'Your Approach',
        meaning: 'How you see yourself',
        description: 'Your attitude and approach to the situation',
      },
      {
        id: 8,
        name: 'External Influences',
        meaning: 'How others see you',
        description: 'Environment and people around you',
      },
      {
        id: 9,
        name: 'Hopes & Fears',
        meaning: 'Inner emotions',
        description: 'Your hopes and fears about the situation',
      },
      {
        id: 10,
        name: 'Final Outcome',
        meaning: 'Ultimate result',
        description: 'The final outcome if current path continues',
      },
    ],
    difficulty: 'advanced',
    timeRequired: '10-15 minutes',
    bestFor: ['Deep analysis', 'Complex situations', 'Life guidance'],
  },
]

export function getSpreadById(id: string): Spread | undefined {
  return spreads.find((spread) => spread.id === id)
}

export function getSpreadsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Spread[] {
  return spreads.filter((spread) => spread.difficulty === difficulty)
}
