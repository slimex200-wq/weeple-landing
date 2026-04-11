'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * LenisProvider — 전역 smooth scroll.
 *
 * Mersi Architecture 참고. inertia 기반 부드러운 스크롤로 네이티브 scroll 을
 * 가로채고 lerp 로 보간한다. reduced-motion 시 비활성화.
 *
 * Hero 의 scroll hijack 과 충돌 방지:
 * Hero 의 `handleWheel` 은 팽창 완료 전에 `e.preventDefault()` 로 휠 이벤트를
 * 소비한다. Lenis 는 preventDefault 로 처리된 이벤트를 존중하므로 자동으로
 * 해당 구간에서 스크롤을 적용하지 않는다. 팽창 완료(progress = 1) 이후에는
 * Hero 가 더 이상 이벤트를 막지 않으므로 Lenis 가 부드러운 스크롤을 이어받는다.
 */
export default function LenisProvider() {
  useEffect(() => {
    // reduced-motion 체크 — Lenis 자체를 생성하지 않음
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
