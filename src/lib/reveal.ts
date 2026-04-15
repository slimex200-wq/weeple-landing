'use client'

// Shared helpers for scroll-driven reveal animations.

import { ensureGsap } from './gsap'

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function revealOnScroll(
  target: Element | Element[] | NodeListOf<Element> | null,
  opts: { stagger?: number; y?: number; start?: string; duration?: number; delay?: number } = {},
) {
  if (!target) return
  const { gsap } = ensureGsap()
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 })
    return
  }

  const triggerEl =
    target instanceof Element
      ? target
      : Array.isArray(target)
        ? target[0]
        : (target as NodeListOf<Element>)[0]

  return gsap.fromTo(
    target,
    { opacity: 0, y: opts.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.8,
      ease: 'power2.out',
      stagger: opts.stagger ?? 0.08,
      delay: opts.delay ?? 0,
      scrollTrigger: triggerEl
        ? {
            trigger: triggerEl,
            start: opts.start ?? 'top 82%',
            toggleActions: 'play none none reverse',
          }
        : undefined,
    },
  )
}
