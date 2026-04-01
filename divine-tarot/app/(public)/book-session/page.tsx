'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface Reader {
  id: string
  name: string
  avatar?: string
  specialty: string
  bio: string
  rating: number
  reviews: number
  price: number
  available: boolean
}

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  available: boolean
}

export default function BookSessionPage() {
  const { user } = useAuth()
  const [readers, setReaders] = useState<Reader[]>([])
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchReaders()
  }, [])

  useEffect(() => {
    if (selectedReader && selectedDate) {
      fetchTimeSlots()
    }
  }, [selectedReader, selectedDate])

  const fetchReaders = async () => {
    try {
      const response = await fetch('/api/v1/readers?available=true')
      const data = await response.json()

      if (response.ok) {
        setReaders(data.data)
      } else {
        setError('Failed to fetch readers')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchTimeSlots = async () => {
    if (!selectedReader || !selectedDate) return

    try {
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

      setTimeSlots(slots)
    } catch (err) {
      setError('Failed to generate time slots')
    }
  }

  const handleBooking = async () => {
    if (!user) {
      setError('Please login to book a session')
      return
    }

    if (!selectedReader || !selectedSlot) {
      setError('Please select a reader and time slot')
      return
    }

    setBookingLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          readerId: selectedReader.id,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setSelectedReader(null)
        setSelectedSlot(null)
        setSelectedDate('')
      } else {
        setError(data.error || 'Failed to book session')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setBookingLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold font-serif">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your session has been booked successfully. You will receive a confirmation email shortly.
          </p>
          <Button asChild>
            <a href="/dashboard">View My Bookings</a>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold font-serif mystical-gradient bg-clip-text text-transparent"
          >
            Book a Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Choose a reader and schedule your personalized tarot consultation
          </motion.p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
          >
            {error}
          </motion.div>
        )}

        {/* Step 1: Select Reader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold font-serif text-center">
            Step 1: Choose Your Reader
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readers.map((reader) => (
              <motion.div
                key={reader.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedReader?.id === reader.id
                    ? 'border-primary bg-primary/10 shadow-xl'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedReader(reader)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                    {reader.avatar || '👤'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{reader.name}</h3>
                    <p className="text-sm text-muted-foreground">{reader.specialty}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {reader.bio}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{reader.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({reader.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ${reader.price}/session
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step 2: Select Date */}
        {selectedReader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold font-serif text-center">
              Step 2: Choose a Date
            </h2>
            <div className="max-w-md mx-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Select Time Slot */}
        {selectedReader && selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold font-serif text-center">
              Step 3: Choose a Time Slot
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={!slot.available}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      selectedSlot?.id === slot.id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : slot.available
                        ? 'border-border hover:border-primary/50'
                        : 'border-border bg-muted cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="text-sm font-semibold">
                      {formatTime(slot.startTime)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(slot.endTime)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Booking Summary */}
        {selectedReader && selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold font-serif mb-6 text-center">
                Booking Summary
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reader</span>
                  <span className="font-semibold">{selectedReader.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold">
                    {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">30 minutes</span>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${selectedReader.price}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleBooking}
                disabled={bookingLoading || !user}
                className="w-full mt-6"
                size="lg"
              >
                {bookingLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Booking...
                  </span>
                ) : (
                  `Book Session - $${selectedReader.price}`
                )}
              </Button>
              {!user && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Please <a href="/login" className="text-primary hover:underline">login</a> to book a session
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
