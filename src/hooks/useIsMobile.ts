'use client'

import { useEffect, useState } from 'react'

/** Simple breakpoint hook. Defaults to 768px. */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}
