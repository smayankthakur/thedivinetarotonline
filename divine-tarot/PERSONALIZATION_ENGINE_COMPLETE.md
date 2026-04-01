# Divine Tarot - Personalization Engine Complete! 🧠✨

## ✅ AI Memory & Personalization System

A complete personalization engine that makes AI readings feel personal and continuous by remembering user history and tracking energy patterns.

## 🎯 Features Implemented

### ✅ Core Features
- [x] Fetch last 5 readings for context
- [x] Pass readings to AI prompt as context
- [x] User profile table for memory storage
- [x] Energy pattern tracking
- [x] Dominant suit tracking
- [x] Personalized AI responses
- [x] Continuous conversation feel

### ✅ Memory System
- [x] User profile table with:
  - `user_id` - User reference
  - `total_readings` - Total reading count
  - `dominant_suits` - JSON object tracking suit frequency
  - `energy_patterns` - Array of detected patterns
  - `last_reading_at` - Timestamp of last reading
  - `created_at` / `updated_at` - Timestamps

### ✅ AI Enhancement
- [x] Recent readings context in prompt
- [x] Energy patterns context in prompt
- [x] Personalized interpretation generation
- [x] Pattern extraction from readings
- [x] Automatic profile updates

## 📁 Files Created/Modified

### Database Schema ([`lib/database/user-profiles.sql`](lib/database/user-profiles.sql))
- User profiles table
- Indexes for performance
- Row Level Security (RLS) policies
- Auto-update timestamp trigger

### Enhanced AI API ([`app/api/v1/ai/reading/route.ts`](app/api/v1/ai/reading/route.ts))
- Fetch last 5 readings
- Fetch/create user profile
- Pass context to AI prompt
- Extract energy patterns
- Update user profile
- Return personalized response

### Updated Types ([`types/index.ts`](types/index.ts))
- UserProfile interface
- Energy patterns tracking
- Dominant suits tracking

## 🔧 Technical Implementation

### Database Schema
```sql
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_readings INTEGER DEFAULT 0,
  dominant_suits JSONB DEFAULT '{}'::jsonb,
  energy_patterns TEXT[] DEFAULT '{}',
  last_reading_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### AI Prompt Enhancement
The AI now receives:
1. **Current Question**: User's current question
2. **Selected Cards**: Current tarot cards
3. **Recent Readings**: Last 5 readings with questions and cards
4. **Energy Patterns**: Detected patterns from past readings

### Energy Pattern Extraction
Patterns are automatically extracted from:
- **Card Suits**: Dominant suits (major, wands, cups, swords, pentacles)
- **Reading Content**: Keywords like "transformation", "growth", "challenge"
- **User History**: Accumulated patterns over time

### Profile Updates
After each reading:
- `total_readings` incremented
- `dominant_suits` updated with new cards
- `energy_patterns` updated with new patterns
- `last_reading_at` set to current time

## 📝 API Flow

### Enhanced AI Reading Flow
1. User submits question and cards
2. API validates authentication
3. API fetches last 5 readings
4. API fetches/creates user profile
5. API builds enhanced prompt with context
6. AI generates personalized interpretation
7. API extracts energy patterns
8. API updates user profile
9. API returns personalized response

### Example Context in Prompt
```
User's Recent Reading History (for context and continuity):
1. Question: "What should I focus on in my career?"
   Cards: The Magician, Wheel of Fortune, The World
   Date: Mar 15, 2024

2. Question: "How can I improve my relationships?"
   Cards: Two of Cups, The Lovers, Three of Cups
   Date: Mar 10, 2024

User's Energy Patterns:
transformation-phase, growth-energy, major-dominant
```

## 🎨 Personalization Features

### 1. Continuous Conversation
- AI references past readings
- Builds on previous guidance
- Notes progress and changes
- Maintains spiritual thread

### 2. Energy Tracking
- Tracks dominant suits
- Identifies recurring patterns
- Notes energy shifts
- Provides continuity

### 3. Pattern Recognition
- **Transformation-phase**: Major life changes
- **Growth-energy**: Expansion and development
- **Challenge-period**: Obstacles and tests
- **Harmony-seeking**: Balance and peace
- **Manifestation-power**: Creation and action

### 4. Suit Dominance
- **Major Arcana**: Spiritual lessons
- **Wands**: Creativity and passion
- **Cups**: Emotions and relationships
- **Swords**: Thoughts and communication
- **Pentacles**: Material world and finances

## 🔐 Security

- User profiles protected by RLS
- Users can only access their own profile
- Input validation on all fields
- SQL injection protection (Supabase)

## 📊 Database Queries

### Fetch Last 5 Readings
```typescript
const { data: recentReadings } = await supabase
  .from('readings')
  .select('question, cards, interpretation, created_at')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
  .limit(5)
```

### Fetch User Profile
```typescript
let { data: userProfile } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', user.id)
  .single()
```

### Update User Profile
```typescript
await supabase
  .from('user_profiles')
  .update({
    total_readings: (userProfile?.total_readings || 0) + 1,
    dominant_suits: updateDominantSuits(userProfile?.dominant_suits || {}, selected_cards),
    energy_patterns: energyPatterns,
    last_reading_at: new Date().toISOString(),
  })
  .eq('user_id', user.id)
```

## 🎯 Example Personalized Response

### Without Personalization
```
The cards reveal a powerful message about your career. The Magician suggests manifestation and power.
```

### With Personalization
```
The cards reveal a powerful message about your career journey. I notice this is your 5th reading, and The Magician appearing again suggests you're entering a manifestation phase. Looking at your recent readings about career focus and relationships, I see a pattern of growth-energy. The Magician in this context indicates you're ready to take action on the insights from your past readings. Your dominant suit of Wands suggests creativity and passion are driving forces in your current path.
```

## 🚀 Usage

### For Users
1. Draw cards at `/tarot`
2. Receive personalized interpretation
3. AI remembers your history
4. Readings feel continuous
5. Patterns are tracked automatically

### For Developers
```typescript
// The API automatically handles personalization
const response = await fetch('/api/v1/ai/reading', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_question: 'What should I focus on?',
    selected_cards: cards,
  }),
})

// Response includes personalized interpretation
const data = await response.json()
// data.interpretation - Personalized reading
// data.energyPatterns - Detected patterns
```

## 📈 Analytics & Insights

### User Profile Data
- Total readings count
- Dominant suit distribution
- Energy pattern history
- Last reading timestamp

### Pattern Tracking
- Recurring themes
- Energy shifts
- Suit preferences
- Reading frequency

## 🎯 Integration Points

### With Tarot Reading Engine
- After drawing cards, profile is updated
- Patterns are extracted and stored
- History is maintained

### With AI Interpretation
- Context is passed to AI
- Responses are personalized
- Continuity is maintained

### With Dashboard
- User profile data can be displayed
- Energy patterns can be visualized
- Reading history is accessible

## 📚 Documentation

- [`lib/database/user-profiles.sql`](lib/database/user-profiles.sql) - Database schema
- [`app/api/v1/ai/reading/route.ts`](app/api/v1/ai/reading/route.ts) - Enhanced AI API
- [`types/index.ts`](types/index.ts) - TypeScript interfaces

## 🚀 Next Steps

To activate the personalization engine:

1. **Run database migration**:
   ```sql
   -- Execute lib/database/user-profiles.sql in Supabase SQL editor
   ```

2. **Enable RLS policies** in Supabase dashboard

3. **Test the flow**:
   - Draw multiple cards over time
   - Notice personalized responses
   - Check energy pattern tracking

4. **Optional enhancements**:
   - Add profile visualization in dashboard
   - Add pattern analysis charts
   - Add reading recommendations based on history
   - Add energy pattern insights

---

**Your Personalization Engine is complete and ready to use! 🧠✨**
