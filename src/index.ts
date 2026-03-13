import sortBy from 'lodash.sortby'
import { ICS_URL } from './constants'
import { extractRawEvents } from './ics'
import { toLegacyEvent, toModernEvent } from './mappers'
import type { LegacyCallback, LegacyEvent, ModernEvent, TkoAlyEvents } from './types'
import { emitCallbackDeprecationWarning, emitCallbackRuntimeWarning } from './warnings'

async function fetchModernEvents(): Promise<ModernEvent[]> {
  const response = await fetch(ICS_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch events from ${ICS_URL}: ${response.status} ${response.statusText}`)
  }

  const icsData = await response.text()
  const rawEvents = await extractRawEvents(icsData)

  const events = rawEvents
    .map(toModernEvent)
    .filter((event): event is ModernEvent => event !== null)

  return sortBy(events, (event) => event.start.getTime())
}

const tkoalyevents = ((cb?: LegacyCallback) => {
  if (typeof cb === 'function') {
    emitCallbackDeprecationWarning()

    void fetchModernEvents()
      .then((events) => {
        cb(events.map(toLegacyEvent))
      })
      .catch((error) => {
        emitCallbackRuntimeWarning(error as Error)
        cb([])
      })

    return
  }

  return fetchModernEvents()
}) as TkoAlyEvents

namespace tkoalyevents {
  export type Event = ModernEvent
  export type CallbackEvent = LegacyEvent
}

export = tkoalyevents
