// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

// User Profile types for personalization engine
export interface UserProfile {
  id: string
  userId: string
  totalReadings: number
  dominantSuits: {
    major?: number
    wands?: number
    cups?: number
    swords?: number
    pentacles?: number
  }
  energyPatterns: string[]
  lastReadingAt: string | null
  createdAt: string
  updatedAt: string
}

// Reading types
export interface Reading {
  id: string
  type: 'single' | 'three-card' | 'celtic-cross' | 'love' | 'career'
  userId: string
  readerId?: string
  cards: TarotCard[]
  interpretation: string
  createdAt: string
}

export interface TarotCard {
  id: string
  name: string
  suit?: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'
  number?: number
  meaning: string
  reversed: boolean
  position?: string
}

// Session types
export interface Session {
  id: string
  readerId: string
  userId: string
  type: 'live-reading'
  scheduledAt: string
  duration: number
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
  price: number
  createdAt: string
}

// Reader types
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

// Booking types
export interface Booking {
  id: string
  type: string
  readerId: string
  userId: string
  scheduledAt: string
  status: 'confirmed' | 'completed' | 'cancelled'
  price: number
  createdAt: string
}

// Order types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number
}

// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'deck' | 'crystal' | 'book' | 'incense' | 'accessory'
  inStock: boolean
  createdAt: string
}

// Transaction types
export interface Transaction {
  id: string
  userId: string
  type: 'deposit' | 'withdrawal'
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

// Blog types
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  image?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
