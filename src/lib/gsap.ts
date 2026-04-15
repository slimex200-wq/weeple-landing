'use client'

// Central GSAP + ScrollTrigger init.
// Import this anywhere you need gsap — it guarantees the plugin is registered
// exactly once.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function ensureGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

export { gsap, ScrollTrigger }
