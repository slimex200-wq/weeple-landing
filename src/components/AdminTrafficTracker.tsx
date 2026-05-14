'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const TRACK_EVENT_URL = 'https://lflpwfgndgnxoydfvbms.supabase.co/functions/v1/track-event'
const SESSION_KEY = 'weeple_admin_traffic_session_id'

function createSessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

function getSessionId() {
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

function sendTrafficEvent(path: string) {
  const body = JSON.stringify({
    app_slug: 'weeple',
    surface: 'app',
    session_id: getSessionId(),
    path,
    referrer: document.referrer || '',
  })

  void fetch(TRACK_EVENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: body.length < 60000,
  }).catch(() => {})
}

export default function AdminTrafficTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    sendTrafficEvent(`${pathname}${window.location.search}`)
  }, [pathname])

  return null
}
