'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'hero', label: 'Intro', href: '#hero' },
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'product', label: 'Product', href: '#product' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = LINKS.map((l) => l.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id)
          }
        }
      },
      { threshold: 0.35, rootMargin: '-20% 0px -40% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,8,6,0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
      }}
    >
      <a
        href="#hero"
        className="font-display text-text-primary"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        weeple
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {LINKS.map((link) => (
          <li key={link.id}>
            <a href={link.href} className="nav-link" data-active={active === link.id}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div
        className="vertical-tab hidden md:block absolute top-full right-6 md:right-10 mt-4"
        aria-hidden="true"
      >
        WEEPLE-1 MODEL · COUPLE LEDGER
      </div>
    </nav>
  )
}
