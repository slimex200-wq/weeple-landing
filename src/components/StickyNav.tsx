'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import WeepleLogo from './WeepleLogo'

const NAV_LINKS = [
  { label: '문제', href: '#problem' },
  { label: '데모', href: '#live-demo' },
  { label: '커플', href: '#couple' },
  { label: 'AI 분석', href: '#smart-insights' },
  { label: '가격', href: '#pricing' },
]

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(255,255,255,0.55)] backdrop-blur-[28px] backdrop-saturate-[140%] border-b border-[rgba(255,255,255,0.9)] shadow-[0_4px_20px_rgba(30,20,40,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2"
          aria-label="weeple 홈"
        >
          <WeepleLogo size={30} />
          <span
            className="font-extrabold text-xl tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #0EA5A0 0%, #5EEAD4 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            weeple
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-sm text-fg-secondary hover:text-mint hover:bg-mint-bg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#pricing"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-mint text-white text-sm font-semibold transition-all hover:scale-[1.03] hover:shadow-[0_8px_20px_-6px_rgba(14,165,160,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
        >
          시작하기
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.nav>
  )
}
