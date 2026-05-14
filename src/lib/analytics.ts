import { sendAdminEvent } from './adminEvents'

// GA4 measurement ID is a public client-side identifier.
export const GA_MEASUREMENT_ID = 'G-KVX9199YWY'

type GtagFn = (
  command: 'event' | 'config' | 'js' | 'set' | 'consent',
  target: string,
  params?: Record<string, unknown>,
) => void

declare global {
  interface Window {
    gtag?: GtagFn
    dataLayer?: unknown[]
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  sendAdminEvent(window.location.pathname || '/', name, params)

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
