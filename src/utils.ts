import isDate from 'lodash.isdate'

export function toNumberFromUid(uid: string): number | null {
  if (/^\d+$/.test(uid)) {
    return Number.parseInt(uid, 10)
  }

  const match = uid.match(/\d+/)
  if (!match) {
    return null
  }

  return Number.parseInt(match[0], 10)
}

export function toDate(value: unknown): Date | null {
  return isDate(value) ? value : null
}

export function toStringOrNull(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}
