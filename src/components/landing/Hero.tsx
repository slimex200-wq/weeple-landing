'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'

const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), {
  ssr: false,
})

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const brandRef = useRef<HTMLHeadingElement | null>(null)
  const copyRef = useRef<HTMLParagraphElement | null>(null)
  const eyebrowRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLDivElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap } = ensureGsap()
    if (prefersReducedMotion()) {
      gsap.set(
        [
          eyebrowRef.current,
          brandRef.current,
          copyRef.current,
          cardRef.current,
          videoRef.current,
          scrollHintRef.current,
        ],
        { opacity: 1, y: 0 },
      )
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.1 },
    )
      .fromTo(
        brandRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1 },
        '-=0.3',
      )
      .fromTo(
        copyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.7',
      )
      .fromTo(
        [cardRef.current, videoRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        '-=0.5',
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3',
      )
  }, [])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative w-full overflow-hidden section-anchor"
      style={{ height: '100vh', minHeight: 640, background: 'var(--bg-darkest)' }}
    >
      {/* 3D background */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroScene />
      </div>

      {/* vignette gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, rgba(212,98,42,0.12) 0%, rgba(10,8,6,0) 45%), linear-gradient(180deg, rgba(10,8,6,0) 40%, rgba(10,8,6,0.6) 100%)',
        }}
      />

      {/* Top center tagline */}
      <div
        ref={eyebrowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 pt-28 md:pt-24 text-center"
        style={{ width: 'max-content', opacity: 0 }}
      >
        <div className="eyebrow">WEEPLE · COUPLE LEDGER · 2026</div>
      </div>

      {/* Right vertical tab — below the nav vertical tab */}
      <div
        className="vertical-tab absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:block"
        aria-hidden="true"
        style={{ color: 'var(--text-muted)' }}
      >
        WEEPLE-1 MODEL
      </div>

      {/* Left bottom — massive brand */}
      <h1
        ref={brandRef}
        className="display absolute bottom-6 md:bottom-10 left-6 md:left-10"
        style={{
          fontSize: 'clamp(80px, 12vw, 180px)',
          color: 'var(--text-primary)',
          opacity: 0,
        }}
      >
        weeple
      </h1>

      {/* Right middle — copy */}
      <p
        ref={copyRef}
        className="absolute right-6 md:right-20 hidden md:block"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(18px, 2.2vw, 32px)',
          maxWidth: 420,
          lineHeight: 1.35,
          color: 'var(--text-primary)',
          fontWeight: 300,
          opacity: 0,
          fontFamily: 'var(--font-body)',
        }}
      >
        통장은 따로,<br />
        대시보드는 같이.
      </p>

      {/* Left bottom glass card — credits */}
      <div
        ref={cardRef}
        className="absolute left-6 md:left-10 bottom-[calc(clamp(80px,12vw,180px)+2.5rem)] md:bottom-[calc(clamp(80px,12vw,180px)+3rem)] backdrop-glass rounded-2xl px-5 py-4 max-w-[320px]"
        style={{ opacity: 0 }}
      >
        <div className="eyebrow mb-2">CREDITS · 2026</div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            lineHeight: 1.5,
            color: 'var(--text-primary)',
          }}
        >
          A couple budgeting app<br />
          for partners who{' '}
          <span style={{ color: 'var(--accent-orange-light)' }}>can&apos;t merge accounts</span>
          <span className="block mt-1" style={{ color: 'var(--text-secondary)', fontSize: 11 }}>
            증여세 없이, 투명하게.
          </span>
        </div>
      </div>

      {/* Right bottom — video thumbnail placeholder */}
      <div
        ref={videoRef}
        className="absolute right-6 md:right-10 bottom-6 md:bottom-10 hidden md:flex items-center gap-3 cursor-pointer group"
        style={{ opacity: 0 }}
      >
        <div
          className="rounded-xl overflow-hidden relative flex items-center justify-center transition-transform group-hover:scale-[1.02]"
          style={{
            width: 180,
            height: 110,
            border: '1px solid var(--border-soft)',
            background:
              'linear-gradient(135deg, rgba(212,98,42,0.16), rgba(43,30,20,0.5))',
          }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: 'var(--text-primary)',
              color: 'var(--bg-darkest)',
              display: 'grid',
              placeItems: 'center',
              transition: 'transform 0.3s ease',
            }}
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2L11 7L3 12V2Z" fill="currentColor" />
            </svg>
          </span>
          <span
            className="eyebrow absolute left-3 bottom-2"
            style={{ color: 'var(--text-primary)' }}
          >
            WATCH · 0:48
          </span>
        </div>
        <div className="flex flex-col">
          <span className="eyebrow">FILM</span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              color: 'var(--text-primary)',
            }}
          >
            weeple in 48s
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <div className="eyebrow">SCROLL TO CONTINUE</div>
        <div className="arrow-bounce" style={{ color: 'var(--text-secondary)' }}>
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
            <path
              d="M6 1V16M6 16L1 11M6 16L11 11"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
