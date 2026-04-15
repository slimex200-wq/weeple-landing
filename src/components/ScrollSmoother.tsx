'use client'

// Lenis smooth-scroll + GSAP ScrollTrigger sync.
// Mount once at the root of the page.

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'

export default function ScrollSmoother() {
  useEffect(() => {
    const { ScrollTrigger } = ensureGsap()
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Tie Lenis into GSAP's ticker so ScrollTrigger stays in sync.
    lenis.on('scroll', ScrollTrigger.update)

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
