'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import type { RotationHandle } from '@/components/scene/RotationScene'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'
import { useIsMobile } from '@/hooks/useIsMobile'

const RotationScene = dynamic(() => import('@/components/scene/RotationScene'), {
  ssr: false,
})

export default function RotationSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<RotationHandle | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const copyRef = useRef<HTMLParagraphElement | null>(null)
  const specListRef = useRef<HTMLUListElement | null>(null)

  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return // use fallback image branch below
    const { gsap, ScrollTrigger } = ensureGsap()
    const section = sectionRef.current
    if (!section) return

    let rafProbe: number | null = null

    // wait for the r3f canvas group to mount
    const setup = () => {
      const group = sceneRef.current?.getGroup()
      if (!group) {
        rafProbe = requestAnimationFrame(setup)
        return
      }

      // Reset
      group.rotation.set(-0.25, 0, 0)

      if (prefersReducedMotion()) {
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      })

      // Timeline maps roughly to the 0-1 progress buckets in the spec.
      tl.to(group.rotation, { x: -Math.PI / 2, duration: 0.2, ease: 'none' })
        .to(group.rotation, { x: -Math.PI, duration: 0.2, ease: 'none' })
        .to(group.rotation, { z: Math.PI, duration: 0.2, ease: 'none' })
        .to(group.rotation, { x: -Math.PI * 1.5, duration: 0.2, ease: 'none' })
        .to(group.rotation, { x: -0.25, y: 0, z: 0, duration: 0.2, ease: 'none' })

      // Heading + copy fade-in pinned to scroll
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 10%',
            scrub: 1.2,
          },
        },
      )
      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            end: 'top 5%',
            scrub: 1.2,
          },
        },
      )
      if (specListRef.current) {
        const items = specListRef.current.querySelectorAll('li')
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      ScrollTrigger.refresh()
    }

    setup()

    return () => {
      if (rafProbe) cancelAnimationFrame(rafProbe)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [isMobile])

  return (
    <section
      id="rotation"
      ref={sectionRef}
      className="relative section-anchor"
      style={{
        height: isMobile ? '100vh' : '600vh',
        background: 'var(--bg-darkest)',
      }}
    >
      {/* Sticky stage */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* 3D canvas (desktop) */}
        {!isMobile && (
          <div className="absolute inset-0" aria-hidden="true">
            <RotationScene ref={sceneRef} />
          </div>
        )}

        {/* Mobile fallback — static gradient composition */}
        {isMobile && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 55%, rgba(212,98,42,0.25), rgba(10,8,6,0) 55%), radial-gradient(circle at 50% 55%, rgba(245,237,216,0.08), rgba(10,8,6,0) 35%), var(--bg-darkest)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '55%',
                width: 220,
                height: 220,
                marginLeft: -110,
                marginTop: -110,
                borderRadius: 999,
                background:
                  'radial-gradient(circle at 40% 40%, #F5EDD8, #B89C6A 70%, #2B1E14)',
                boxShadow: '0 40px 120px rgba(212,98,42,0.35)',
              }}
            />
          </div>
        )}

        {/* soft vignette over 3d */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,8,6,0.35) 0%, rgba(10,8,6,0) 25%, rgba(10,8,6,0) 75%, rgba(10,8,6,0.45) 100%)',
          }}
        />

        {/* Left big heading */}
        <h2
          ref={headingRef}
          className="display absolute left-6 md:left-14 top-20 md:top-28 max-w-[680px]"
          style={{
            fontSize: 'clamp(44px, 7.5vw, 112px)',
            color: 'var(--text-primary)',
            opacity: 0,
          }}
        >
          그냥 가계부가
          <br />
          <span style={{ color: 'var(--accent-orange-light)' }}>아닙니다.</span>
        </h2>

        {/* Right paragraph + specs */}
        <div
          className="absolute right-6 md:right-14 bottom-14 md:bottom-20 max-w-[400px]"
          aria-hidden="false"
        >
          <p
            ref={copyRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              marginBottom: 28,
              opacity: 0,
            }}
          >
            통장을 합치지 못해도 괜찮습니다. weeple 은 두 사람의 소비를
            하나의 대시보드에 모으고, AI 가 그 흐름을 읽어 예산을 제안합니다.
            데이터는 암호화되고, 기여금은 투명합니다.
          </p>
          <ul
            ref={specListRef}
            className="mono grid gap-2"
            style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {[
              ['AI 신뢰도', '92–94%'],
              ['커플 타입', 'A · B · C'],
              ['크레딧 팩', '10 · 50 · 100'],
              ['모델', 'Claude · GPT · Gemini'],
            ].map(([k, v]) => (
              <li
                key={k}
                className="flex items-baseline justify-between gap-4 pb-2"
                style={{ borderBottom: '1px dashed var(--border-soft)' }}
              >
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ color: 'var(--text-primary)' }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right vertical tab */}
        <div
          className="vertical-tab absolute right-4 md:right-6 top-1/2 -translate-y-1/2 hidden md:block"
          aria-hidden="true"
        >
          COUPLE LEDGER · MODEL
        </div>
      </div>
    </section>
  )
}
