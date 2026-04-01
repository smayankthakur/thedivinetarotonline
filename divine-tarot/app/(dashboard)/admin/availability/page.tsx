'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface Reader {
  id: string
  name: string
  email: string
  specialty: string
  available: boolean
}

interface Availability {
  id: string
  readerId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  slotDuration: number
  isActive: boolean
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function AdminAvailabilityPage() {
  const { user } = useAuth()
  const [readers, setReaders] = useState<Reader[]>([])
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null)
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchReaders()
  }, [])

  useEffect(() => {
    if (selectedReader) {
      fetchAvailability()
    }
  }, [selectedReader])

  const fetchReaders = async () => {
    try {
      const response = await fetch('/api/v1/readers')
      const data = await response.json()

      if (response.ok) {
        setReaders(data.data)
        if (data.data.length > 0) {
          setSelectedReader(data.data[0])
        }
      } else {
        setError('Failed to fetch readers')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailability = async () => {
    if (!selectedReader) return

    try {
      const response = await fetch(`/api/v1/readers/${selectedReader.id}/availability`)
      const data = await response.json()

      if (response.ok) {
        setAvailability(data.data)
      } else {
        // Initialize with default availability if none exists
        const defaultAvailability: Availability[] = DAYS.map((_, index) => ({
          id: `default-${index}`,
          readerId: selectedReader.id,
          dayOfWeek: index,
          startTime: '09:00',
          endTime: '18:00',
          slotDuration: 30,
          isActive: index !== 0 && index !== 6, // Monday-Friday by default
        }))
        setAvailability(defaultAvailability)
      }
    } catch (err) {
      setError('Failed to fetch availability')
    }
  }

  const handleAvailabilityChange = (
    dayOfWeek: number,
    field: keyof Availability,
    value: string | number | boolean
  ) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.dayOfWeek === dayOfWeek
          ? { ...item, [field]: value }
          : item
      )
    )
  }

  const handleSave = async () => {
    if (!selectedReader) return

    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/v1/readers/${selectedReader.id}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save availability')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            Manage Availability
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Set your weekly availability for tarot consultations
          </motion.p>
        </div>

        {/* Error/Success */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600"
          >
            Availability saved successfully!
          </motion.div>
        )}

        {/* Reader Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold font-serif mb-4">Select Reader</h2>
            <select
              value={selectedReader?.id || ''}
              onChange={(e) => {
                const reader = readers.find((r) => r.id === e.target.value)
                setSelectedReader(reader || null)
              }}
              className="w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {readers.map((reader) => (
                <option key={reader.id} value={reader.id}>
                  {reader.name} - {reader.specialty}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Availability Grid */}
        {selectedReader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <h2 className="text-xl font-bold font-serif mb-6">Weekly Availability</h2>
              <div className="space-y-4">
                {availability.map((item) => (
                  <div
                    key={item.dayOfWeek}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-background"
                  >
                    <div className="w-32">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.isActive}
                          onChange={(e) =>
                            handleAvailabilityChange(item.dayOfWeek, 'isActive', e.target.checked)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="font-semibold">{DAYS[item.dayOfWeek]}</span>
                      </label>
                    </div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground">Start Time</label>
                        <input
                          type="time"
                          value={item.startTime}
                          onChange={(e) =>
                            handleAvailabilityChange(item.dayOfWeek, 'startTime', e.target.value)
                          }
                          disabled={!item.isActive}
                          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground">End Time</label>
                        <input
                          type="time"
                          value={item.endTime}
                          onChange={(e) =>
                            handleAvailabilityChange(item.dayOfWeek, 'endTime', e.target.value)
                          }
                          disabled={!item.isActive}
                          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <div className="w-32">
                        <label className="text-sm text-muted-foreground">Slot Duration</label>
                        <select
                          value={item.slotDuration}
                          onChange={(e) =>
                            handleAvailabilityChange(
                              item.dayOfWeek,
                              'slotDuration',
                              parseInt(e.target.value)
                            )
                          }
                          disabled={!item.isActive}
                          className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        >
                          <option value={15}>15 min</option>
                          <option value={30}>30 min</option>
                          <option value={45}>45 min</option>
                          <option value={60}>60 min</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-6"
                size="lg"
              >
                {saving ? (
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
                    Saving...
                  </span>
                ) : (
                  'Save Availability'
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
