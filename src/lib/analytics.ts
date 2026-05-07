// GA4 측정 ID — public (HTML <script> 에 노출되는 client-side identifier).
// secret 이 아니라 hardcode 가 운영상 단순. ID 변경 시 코드 PR 로 진행.
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
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', name, params)
}
