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

// Fires the legacy generic cta_click (GA funnels, existing dashboards) plus a
// store-specific event the ops console counts as Store Clicks.
export function trackStoreClick(analyticsLabel: string, location: string) {
  const isPlay = analyticsLabel === 'google_play'
  trackEvent('cta_click', { location, label: analyticsLabel })
  trackEvent(isPlay ? 'play_store_click' : 'app_store_click', { location })
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  sendAdminEvent(window.location.pathname || '/', name, params)

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
