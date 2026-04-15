'use client'

// Loading overlay: blocks first paint with a progress bar + 0→100 countup.
// Auto-dismisses after the first requestAnimationFrame cycle beyond 100%.

import { useEffect, useRef, useState } from 'react'
import { ensureGsap } from '@/lib/gsap'

export default function LoadingScreen({
  onReady,
}: {
  onReady?: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let rafId: number
    let start: number | null = null
    const duration = 1400 // ms

    function step(ts: number) {
      if (start === null) start = ts
      const elapsed = ts - start
      const t = Math.min(1, elapsed / duration)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setTimeout(() => {
          const { gsap } = ensureGsap()
          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: () => {
                setDone(true)
                onReady?.()
              },
            })
          } else {
            setDone(true)
            onReady?.()
          }
        }, 180)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [onReady])

  if (done) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-darkest)' }}
      aria-label="로딩 중"
    >
      <div className="flex flex-col items-center gap-6 w-[min(420px,80vw)]">
        <div className="eyebrow">WEEPLE · LOADING</div>
        <div
          className="mono text-text-primary"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 500, lineHeight: 1 }}
        >
          {String(progress).padStart(3, '0')}
          <span style={{ color: 'var(--accent-orange)' }}>%</span>
        </div>
        <div
          className="w-full"
          style={{
            height: 1,
            background: 'rgba(245,237,216,0.12)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${progress}%`,
              background: 'var(--accent-orange)',
              transition: 'width 40ms linear',
            }}
          />
        </div>
        <div className="eyebrow">INITIALIZING LEDGER MODEL</div>
      </div>
    </div>
  )
}
