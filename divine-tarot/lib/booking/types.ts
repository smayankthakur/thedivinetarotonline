export interface Reader {
  id: string
  name: string
  email: string
  avatar?: string
  specialty: string
  bio: string
  rating: number
  reviews: number
  price: number
  available: boolean
  createdAt: string
}

export interface TimeSlot {
  id: string
  readerId: string
  startTime: string
  endTime: string
  available: boolean
  date: string
}

export interface Booking {
  id: string
  readerId: string
  userId: string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  price: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ReaderAvailability {
  id: string
  readerId: string
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  slotDuration: number // in minutes
  isActive: boolean
}
