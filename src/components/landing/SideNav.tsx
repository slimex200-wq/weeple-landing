'use client'

import { useEffect, useState } from 'react'

const DOTS = [
  { id: 'hero', label: 'Intro' },
  { id: 'rotation', label: 'Not just a ledger' },
  { id: 'features', label: 'Features' },
  { id: 'encode', label: 'AI Parse' },
  { id: 'testimonials', label: 'Voices' },
  { id: 'product', label: 'Product' },
]

export default function SideNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { threshold: 0.3, rootMargin: '-25% 0px -40% 0px' },
    )
    for (const { id } of DOTS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <aside
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 p-3 rounded-2xl"
      style={{
        background: 'rgba(10,8,6,0.45)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid var(--border-soft)',
      }}
      aria-label="페이지 섹션 네비게이션"
    >
      {DOTS.map((d) => (
        <a
          key={d.id}
          href={`#${d.id}`}
          title={d.label}
          className="flex items-center gap-3 group"
          aria-current={active === d.id ? 'true' : undefined}
        >
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
          >
            {d.label}
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background:
                active === d.id ? 'var(--accent-orange)' : 'rgba(245,237,216,0.25)',
              boxShadow:
                active === d.id ? '0 0 0 4px rgba(212,98,42,0.18)' : 'none',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
          />
        </a>
      ))}
    </aside>
  )
}
