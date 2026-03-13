export interface LegacyEvent {
  id: number | null
  user_id: number | null
  name: string | null
  created: Date | null
  starts: Date | null
  registration_starts: Date | null
  registration_ends: Date | null
  cancellation_starts: Date | null
  cancellation_ends: Date | null
  location: string | null
  category: string | null
  description: string | null
  price: string | null
  map: string | null
  max_participants: number | null
  realised_participants: number | null
  membership_required: boolean | null
  outsiders_allowed: boolean | null
  template: boolean | null
  responsible: string | null
  show_responsible: boolean | null
  avec: boolean | null
  deleted: boolean | null
}

export interface ModernEvent {
  id: number | null
  uid: string
  title: string | null
  start: Date
  end: Date | null
  location: string | null
  description: string | null
  url: string | null
  created: Date | null
  updated: Date | null
  allDay: boolean
}

export interface RawCalendarEvent {
  type?: unknown
  uid?: unknown
  summary?: unknown
  start?: unknown
  end?: unknown
  location?: unknown
  description?: unknown
  url?: unknown
  created?: unknown
  dtstamp?: unknown
  lastmodified?: unknown
  datetype?: unknown
}

export type LegacyCallback = (events: LegacyEvent[]) => void

export interface TkoAlyEvents {
  (): Promise<ModernEvent[]>
  /**
   * @deprecated Use Promise API instead: `const events = await tkoalyevents()`.
   */
  (cb: LegacyCallback): void
}
