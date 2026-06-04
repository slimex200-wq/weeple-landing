import { getClientCountry } from './clientCountry'

const TRACK_EVENT_URL = 'https://lflpwfgndgnxoydfvbms.supabase.co/functions/v1/track-event'
const SESSION_KEY = 'weeple_admin_traffic_session_id'
const EVENT_NAME_RE = /^[a-z][a-z0-9_.:-]{1,79}$/

type EventProperties = Record<string, unknown>

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

export function getAdminTrafficSessionId() {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const next = createSessionId()
    window.localStorage.setItem(SESSION_KEY, next)
    return next
  } catch {
    return createSessionId()
  }
}

function cleanProperties(properties?: EventProperties) {
  if (!properties) return {}

  return Object.fromEntries(
    Object.entries(properties)
      .filter(([, value]) => (
        value === null ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ))
      .slice(0, 24)
  )
}

export async function sendAdminEvent(path: string, eventName?: string, properties?: EventProperties) {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return
  if (eventName && !EVENT_NAME_RE.test(eventName)) return
  const country = await getClientCountry()

  const body = JSON.stringify({
    app_slug: 'weeple',
    surface: 'app',
    session_id: getAdminTrafficSessionId(),
    path,
    referrer: document.referrer || '',
    ...(country ? { country } : {}),
    ...(eventName ? { event_name: eventName, properties: cleanProperties(properties) } : {}),
  })

  void fetch(TRACK_EVENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: body.length < 60000,
  }).catch(() => {})
}
