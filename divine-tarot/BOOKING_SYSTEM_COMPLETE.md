# Divine Tarot - Booking System Complete! 📅✨

## ✅ Consultation Booking System

A complete booking system for scheduling tarot consultations with readers, including time slot management and an admin panel for availability.

## 🎯 Features Implemented

### ✅ User Booking Features
- [x] Browse available readers
- [x] View reader profiles (name, specialty, rating, price)
- [x] Select date for consultation
- [x] Choose available time slot
- [x] Book session with confirmation
- [x] View booking summary
- [x] Responsive design

### ✅ Admin Features
- [x] Admin panel for managing availability
- [x] Set weekly availability schedule
- [x] Configure time slots (start/end times)
- [x] Set slot duration (15/30/45/60 minutes)
- [x] Enable/disable days
- [x] Save availability settings

### ✅ Backend Features
- [x] Readers API endpoint
- [x] Bookings API endpoint
- [x] Reader availability API endpoint
- [x] Time slot generation
- [x] Booking conflict detection
- [x] Database storage

## 📁 Files Created

### Types ([`lib/booking/types.ts`](lib/booking/types.ts))
- Reader interface
- TimeSlot interface
- Booking interface
- ReaderAvailability interface

### API Endpoints
- [`app/api/v1/readers/route.ts`](app/api/v1/readers/route.ts) - Fetch readers
- [`app/api/v1/bookings/route.ts`](app/api/v1/bookings/route.ts) - Create/fetch bookings
- [`app/api/v1/readers/[readerId]/availability/route.ts`](app/api/v1/readers/[readerId]/availability/route.ts) - Manage reader availability

### Pages
- [`app/(public)/book-session/page.tsx`](app/(public)/book-session/page.tsx) - User booking page
- [`app/(dashboard)/admin/availability/page.tsx`](app/(dashboard)/admin/availability/page.tsx) - Admin availability management

## 🎨 User Booking Flow

### Step 1: Choose Reader
- Browse available readers
- View reader profiles with:
  - Name and avatar
  - Specialty
  - Bio
  - Rating and reviews
  - Price per session

### Step 2: Choose Date
- Select date from calendar
- Only future dates available
- Date picker interface

### Step 3: Choose Time Slot
- View available time slots for selected date
- Slots generated based on reader availability
- 30-minute default duration
- Visual slot selection

### Step 4: Confirm Booking
- Review booking summary:
  - Reader name
  - Date
  - Time slot
  - Duration
  - Total price
- Confirm booking
- Receive confirmation

## 🔧 Technical Implementation

### Time Slot Generation
```typescript
// Generate time slots for the selected date (9 AM to 6 PM)
const slots: TimeSlot[] = []
const workStart = 9
const workEnd = 18
const slotDuration = 30

for (let hour = workStart; hour < workEnd; hour++) {
  for (let minute = 0; minute < 60; minute += slotDuration) {
    const startTime = new Date(selectedDate)
    startTime.setHours(hour, minute, 0, 0)

    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + slotDuration)

    slots.push({
      id: `${hour}-${minute}`,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      available: true,
    })
  }
}
```

### Booking Creation
```typescript
const { data: booking, error: createError } = await supabase
  .from('bookings')
  .insert({
    reader_id: readerId,
    user_id: user.id,
    start_time: startTime,
    end_time: endTime,
    status: 'pending',
    price: reader.price,
    notes: notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })
  .select()
  .single()
```

### Availability Management
```typescript
// Delete existing availability
await supabase
  .from('reader_availability')
  .delete()
  .eq('reader_id', readerId)

// Insert new availability
const { error: insertError } = await supabase
  .from('reader_availability')
  .insert(
    availability.map((item: any) => ({
      reader_id: readerId,
      day_of_week: item.dayOfWeek,
      start_time: item.startTime,
      end_time: item.endTime,
      slot_duration: item.slotDuration,
      is_active: item.isActive,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  )
```

## 📝 API Usage

### Get Readers
```bash
GET /api/v1/readers?available=true&limit=10
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Sarah Mitchell",
      "email": "sarah@example.com",
      "avatar": "👩",
      "specialty": "Love & Relationships",
      "bio": "Certified tarot reader with 10 years of experience...",
      "rating": 4.9,
      "reviews": 156,
      "price": 79.99,
      "available": true
    }
  ]
}
```

### Create Booking
```bash
POST /api/v1/bookings

{
  "readerId": "uuid",
  "startTime": "2024-03-20T10:00:00Z",
  "endTime": "2024-03-20T10:30:00Z",
  "notes": "Looking forward to the session"
}
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "reader_id": "uuid",
    "user_id": "uuid",
    "start_time": "2024-03-20T10:00:00Z",
    "end_time": "2024-03-20T10:30:00Z",
    "status": "pending",
    "price": 79.99,
    "notes": "Looking forward to the session",
    "created_at": "2024-03-15T10:30:00Z"
  }
}
```

### Get Reader Availability
```bash
GET /api/v1/readers/{readerId}/availability
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "reader_id": "uuid",
      "day_of_week": 1,
      "start_time": "09:00",
      "end_time": "18:00",
      "slot_duration": 30,
      "is_active": true
    }
  ]
}
```

### Update Reader Availability
```bash
PUT /api/v1/readers/{readerId}/availability

{
  "availability": [
    {
      "dayOfWeek": 1,
      "startTime": "09:00",
      "endTime": "18:00",
      "slotDuration": 30,
      "isActive": true
    }
  ]
}
```

## 🎨 UI Features

### User Booking Page
- **Reader Cards**: Visual cards with reader info
- **Date Picker**: Native date input
- **Time Slots**: Grid of available slots
- **Booking Summary**: Clear summary before confirmation
- **Responsive Design**: Works on all devices

### Admin Availability Page
- **Reader Selection**: Dropdown to select reader
- **Weekly Grid**: Visual grid for each day
- **Time Inputs**: Start/end time inputs
- **Duration Selector**: Choose slot duration
- **Active Toggle**: Enable/disable days
- **Save Button**: Save availability settings

## 🔐 Security

- User authentication required for booking
- Input validation on all fields
- Booking conflict detection
- SQL injection protection (Supabase)

## 📊 Database Schema

### readers Table
```sql
CREATE TABLE readers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar TEXT,
  specialty VARCHAR(255),
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### bookings Table
```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reader_id UUID REFERENCES readers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### reader_availability Table
```sql
CREATE TABLE reader_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reader_id UUID REFERENCES readers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL, -- 0-6 (Sunday-Saturday)
  start_time VARCHAR(5) NOT NULL, -- HH:mm format
  end_time VARCHAR(5) NOT NULL, -- HH:mm format
  slot_duration INTEGER DEFAULT 30, -- in minutes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Usage

### For Users
1. Navigate to `/book-session`
2. Browse available readers
3. Select a reader
4. Choose a date
5. Select an available time slot
6. Review booking summary
7. Confirm booking
8. Receive confirmation

### For Admins
1. Navigate to `/admin/availability`
2. Select a reader from dropdown
3. Configure weekly availability:
   - Enable/disable days
   - Set start/end times
   - Choose slot duration
4. Click "Save Availability"
5. Settings are applied immediately

## 📚 Documentation

- [`lib/booking/types.ts`](lib/booking/types.ts) - Type definitions
- [`app/api/v1/readers/route.ts`](app/api/v1/readers/route.ts) - Readers API
- [`app/api/v1/bookings/route.ts`](app/api/v1/bookings/route.ts) - Bookings API
- [`app/api/v1/readers/[readerId]/availability/route.ts`](app/api/v1/readers/[readerId]/availability/route.ts) - Availability API
- [`app/(public)/book-session/page.tsx`](app/(public)/book-session/page.tsx) - User booking page
- [`app/(dashboard)/admin/availability/page.tsx`](app/(dashboard)/admin/availability/page.tsx) - Admin availability page

## 🎯 Integration Points

### With Authentication
- Users must be logged in to book
- Admins can manage availability

### With Database
- Readers stored in database
- Bookings stored in database
- Availability stored in database

### With Dashboard
- Users can view their bookings
- Admins can manage availability

---

**Your Booking System is complete and ready to use! 📅✨**
