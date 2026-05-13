'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { trackEvent } from '@/lib/analytics'
import { PLAY_STORE_URL } from '@/lib/links'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const blocked = ['pricing', 'faq', 'final-cta'].some((id) => {
        const element = document.getElementById(id)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > window.innerHeight * 0.35
      })

      setVisible(window.scrollY > window.innerHeight * 1.5 && !blocked)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('cta_click', {
              location: 'sticky',
              label: 'google_play',
            })
          }
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed right-4 bottom-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-mint px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_28px_-10px_rgba(14,165,160,0.65)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 md:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </svg>
          Google Play
        </motion.a>
      )}
    </AnimatePresence>
  )
}
