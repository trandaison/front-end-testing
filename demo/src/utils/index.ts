export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatDateTime(time: string, locale = 'en-US') {
  const date = new Date(time)

  const isValidDate = Number.isNaN(date.getTime())

  if (isValidDate) return null

  return date.toLocaleString(locale)
}

export function toRelativeTime(date: Date) {
  const current = new Date()
  const diff = current.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)

  if (seconds < 0) return `${-seconds} seconds from now`

  if (seconds > 0) return `${seconds} seconds ago`

  return 'just now'
}
