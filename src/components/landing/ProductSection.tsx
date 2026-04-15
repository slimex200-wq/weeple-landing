'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'

type Tier = 0 | 1 | 2

const ProductScene = dynamic(() => import('@/components/scene/ProductScene'), {
  ssr: false,
})

const TIERS: {
  key: string
  label: string
  badge?: string
  credits: string
  price: string
  perUse: string
  expiry: string
  pdf: string
  beta: string
}[] = [
  {
    key: 'WEEPLE-1',
    label: 'WEEPLE-1',
    credits: '10',
    price: '₩9,900',
    perUse: '₩990',
    expiry: '무제한',
    pdf: '✓',
    beta: '—',
  },
  {
    key: 'WEEPLE-1 PRO',
    label: 'WEEPLE-1 PRO',
    credits: '50',
    price: '₩38,900',
    perUse: '₩778',
    expiry: '무제한',
    pdf: '✓',
    beta: '—',
  },
  {
    key: 'WEEPLE-1 MAX',
    label: 'WEEPLE-1 MAX',
    badge: 'NEW',
    credits: '100',
    price: '₩68,900',
    perUse: '₩689',
    expiry: '무제한',
    pdf: '✓',
    beta: '✓',
  },
]

const ROWS: [string, 'credits' | 'price' | 'perUse' | 'expiry' | 'pdf' | 'beta'][] = [
  ['AI 분석 횟수', 'credits'],
  ['가격', 'price'],
  ['1회당', 'perUse'],
  ['사용 기한', 'expiry'],
  ['PDF 리포트', 'pdf'],
  ['베타 기능 우선 액세스', 'beta'],
]

export default function ProductSection() {
  const [tier, setTier] = useState<Tier>(1)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const brandRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap()
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    gsap.fromTo(
      section.querySelectorAll('[data-product-reveal]'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    if (brandRef.current) {
      gsap.to(brandRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && section.contains(st.trigger as Node)) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative section-anchor overflow-hidden"
      style={{
        background: 'var(--bg-darkest)',
        padding: 'clamp(120px, 16vw, 220px) 0 clamp(80px, 10vw, 140px)',
      }}
    >
      {/* Blueprint sketch bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          mixBlendMode: 'screen',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(212,98,42,0.35), transparent 35%),
            radial-gradient(circle at 80% 80%, rgba(212,98,42,0.18), transparent 40%),
            linear-gradient(90deg, transparent 49.5%, rgba(212,98,42,0.14) 50%, transparent 50.5%),
            linear-gradient(180deg, transparent 49.5%, rgba(212,98,42,0.14) 50%, transparent 50.5%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px',
        }}
      />

      {/* Giant brand typography */}
      <div
        ref={brandRef}
        aria-hidden="true"
        className="absolute inset-x-0 pointer-events-none select-none flex items-center justify-center"
        style={{
          top: '30%',
          zIndex: 0,
        }}
      >
        <span
          className="display"
          style={{
            fontSize: '20vw',
            fontWeight: 900,
            lineHeight: 0.85,
            color: 'rgba(245,237,216,0.04)',
            letterSpacing: '-0.05em',
          }}
        >
          weeple
        </span>
      </div>

      {/* 3D stage */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '38%', width: 'min(680px, 90vw)', height: 420, zIndex: 1 }}
        aria-hidden="true"
      >
        <ProductScene tier={tier} />
      </div>

      <div className="relative mx-auto max-w-[1080px] px-6 md:px-10" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="eyebrow mb-5" data-product-reveal>
            CHOOSE YOUR MODEL
          </div>
          <h2
            className="display"
            data-product-reveal
            style={{
              fontSize: 'clamp(36px, 5.5vw, 84px)',
              color: 'var(--text-primary)',
            }}
          >
            하나의 모델,
            <br />
            <span style={{ color: 'var(--accent-orange-light)' }}>세 가지 부피.</span>
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-[460px]"
          data-product-reveal
          role="tablist"
          aria-label="제품 팩 선택"
        >
          {TIERS.map((t, idx) => {
            const active = tier === idx
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTier(idx as Tier)}
                className="px-6 py-3 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  borderRadius: 999,
                  border: `1px solid ${active ? 'var(--accent-orange)' : 'rgba(245,237,216,0.3)'}`,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: active ? 'rgba(212,98,42,0.08)' : 'transparent',
                  position: 'relative',
                }}
              >
                {t.label}
                {t.badge && (
                  <span
                    className="absolute -top-2 -right-2 mono"
                    style={{
                      background: 'var(--accent-orange)',
                      color: 'var(--bg-darkest)',
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 999,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Spec table */}
        <div
          className="rounded-2xl overflow-hidden backdrop-glass"
          data-product-reveal
          style={{
            border: '1px solid var(--border-soft)',
          }}
        >
          <div
            className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-baseline px-5 md:px-8 py-5"
            style={{
              borderBottom: '1px solid var(--border-soft)',
              background: 'rgba(245,237,216,0.02)',
            }}
          >
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
              SPEC
            </span>
            {TIERS.map((t, idx) => (
              <span
                key={t.key}
                className="eyebrow text-center md:text-left"
                style={{
                  color: tier === idx ? 'var(--accent-orange-light)' : 'var(--text-secondary)',
                  fontWeight: 600,
                }}
              >
                {t.label}
              </span>
            ))}
          </div>
          {ROWS.map(([label, field], rowIdx) => (
            <div
              key={label}
              className="grid grid-cols-[1.4fr_repeat(3,1fr)] items-baseline px-5 md:px-8 py-4"
              style={{
                borderBottom:
                  rowIdx === ROWS.length - 1 ? 'none' : '1px solid var(--border-soft)',
                fontSize: 14,
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
              {TIERS.map((t, idx) => (
                <span
                  key={t.key}
                  className={field === 'price' || field === 'perUse' ? 'mono' : ''}
                  style={{
                    color: tier === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: field === 'price' ? 600 : 400,
                  }}
                >
                  {t[field]}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14" id="contact" data-product-reveal>
          <a
            href="mailto:support@weeple.app?subject=weeple%20출시%20알림"
            className="inline-flex items-center gap-3 px-8 py-5 transition-all"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: 999,
              background: 'var(--accent-orange)',
              color: 'var(--bg-darkest)',
              fontWeight: 700,
            }}
          >
            출시 알림 신청
            <span aria-hidden="true">→</span>
          </a>
          <p
            className="mt-6"
            style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em',
            }}
          >
            support@weeple.app · iOS &amp; Android · 2026 · 서울
          </p>
        </div>
      </div>
    </section>
  )
}
