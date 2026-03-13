import type { LegacyEvent, ModernEvent, RawCalendarEvent } from './types'
import { toDate, toNumberFromUid, toStringOrNull } from './utils'

export function toModernEvent(entry: RawCalendarEvent): ModernEvent | null {
  const uid = typeof entry.uid === 'string' ? entry.uid : ''
  const start = toDate(entry.start)
  if (!start) {
    return null
  }

  return {
    id: toNumberFromUid(uid),
    uid,
    title: toStringOrNull(entry.summary),
    start,
    end: toDate(entry.end),
    location: toStringOrNull(entry.location),
    description: toStringOrNull(entry.description),
    url: toStringOrNull(entry.url),
    created: toDate(entry.created) || toDate(entry.dtstamp),
    updated: toDate(entry.lastmodified),
    allDay: entry.datetype === 'date',
  }
}

export function toLegacyEvent(event: ModernEvent): LegacyEvent {
  return {
    id: event.id,
    user_id: null,
    name: event.title,
    created: event.created,
    starts: event.start,
    registration_starts: null,
    registration_ends: null,
    cancellation_starts: null,
    cancellation_ends: null,
    location: event.location,
    category: null,
    description: event.description,
    price: null,
    map: event.url,
    max_participants: null,
    realised_participants: null,
    membership_required: null,
    outsiders_allowed: null,
    template: null,
    responsible: null,
    show_responsible: null,
    avec: null,
    deleted: null,
  }
}
