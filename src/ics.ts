import ical from 'node-ical'
import type { RawCalendarEvent } from './types'

type CalendarEntries = Record<string, unknown>

function parseIcs(icsData: string): Promise<CalendarEntries> {
  return new Promise((resolve, reject) => {
    ical.parseICS(icsData, (error, data) => {
      if (error) {
        reject(error)
        return
      }

      if (!data) {
        reject(new Error('ICS parser returned no data'))
        return
      }

      resolve(data as CalendarEntries)
    })
  })
}

export async function extractRawEvents(icsData: string): Promise<RawCalendarEvent[]> {
  const calendar = await parseIcs(icsData)

  return Object.values(calendar).filter((entry): entry is RawCalendarEvent => {
    if (!entry || typeof entry !== 'object') {
      return false
    }

    return (entry as RawCalendarEvent).type === 'VEVENT'
  })
}
