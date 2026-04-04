import { google } from 'googleapis'
import { config } from '@/lib/config'

const googleClient = google as any
export const calendar = googleClient.calendar({
  version: 'v3',
  auth: new googleClient.auth.GoogleAuth({
    credentials: {
      client_email: config.calendar.google.clientEmail,
      private_key: config.calendar.google.privateKey?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  }),
})

export const CALENDAR_ID = config.calendar.google.calendarId || 'primary'

export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface CalendarEvent {
  id: string
  summary: string
  description: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  attendees?: Array<{ email: string }>
}

export async function getAvailableSlots(
  date: string,
  duration: number = 30
): Promise<TimeSlot[]> {
  try {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    // Get existing events for the day
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const existingEvents = response.data.items || []

    // Generate available slots (9 AM to 6 PM)
    const slots: TimeSlot[] = []
    const workStart = 9 // 9 AM
    const workEnd = 18 // 6 PM

    for (let hour = workStart; hour < workEnd; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        const slotStart = new Date(date)
        slotStart.setHours(hour, minute, 0, 0)

        const slotEnd = new Date(slotStart)
        slotEnd.setMinutes(slotEnd.getMinutes() + duration)

        // Check if slot conflicts with existing events
        const isAvailable = !existingEvents.some((event: any) => {
          const eventStart = new Date(event.start?.dateTime || '')
          const eventEnd = new Date(event.end?.dateTime || '')

          return (
            (slotStart >= eventStart && slotStart < eventEnd) ||
            (slotEnd > eventStart && slotEnd <= eventEnd) ||
            (slotStart <= eventStart && slotEnd >= eventEnd)
          )
        })

        slots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          available: isAvailable,
        })
      }
    }

    return slots
  } catch (error) {
    console.error('Error getting available slots:', error)
    throw error
  }
}

export async function createCalendarEvent(
  event: Omit<CalendarEvent, 'id'>
): Promise<CalendarEvent> {
  try {
    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
      sendUpdates: 'all',
    })

    return response.data as CalendarEvent
  } catch (error) {
    console.error('Error creating calendar event:', error)
    throw error
  }
}

export async function updateCalendarEvent(
  eventId: string,
  event: Partial<CalendarEvent>
): Promise<CalendarEvent> {
  try {
    const response = await calendar.events.patch({
      calendarId: CALENDAR_ID,
      eventId,
      requestBody: event,
      sendUpdates: 'all',
    })

    return response.data as CalendarEvent
  } catch (error) {
    console.error('Error updating calendar event:', error)
    throw error
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  try {
    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId,
      sendUpdates: 'all',
    })
  } catch (error) {
    console.error('Error deleting calendar event:', error)
    throw error
  }
}
