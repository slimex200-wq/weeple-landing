'use client'

import { useEffect, useRef } from 'react'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'

type Feature = {
  idx: string
  label: string
  title: string
  copy: string
  formula: string
  formulaCaption: string
}

const FEATURES: Feature[] = [
  {
    idx: '01',
    label: 'NATURAL INPUT',
    title: '음성 · 영수증 · 한 줄.\nAI 가 나머지를.',
    copy:
      '“스벅 6500” 한 줄이면 끝. weeple 은 입력을 카테고리 · 금액 · 날짜로 분해하고, 커플 가계부에 즉시 반영합니다. 영수증 사진은 OCR 로, 대화는 음성 인식으로.',
    formula: 'H ≈ 92.4%',
    formulaCaption: 'classification confidence · weekly',
  },
  {
    idx: '02',
    label: 'COUPLE MODES',
    title: '세 가지 커플 구조.\n당신의 방식대로.',
    copy:
      'A — 전액 공동 예산, B — 공동 + 개인 지갑, C — 기여금 정산. 증여세 없이 투명하게, 통장은 분리한 채로. 매달 구조를 바꿔도 이력은 이어집니다.',
    formula: 'Shared ÷ Personal = 0.62',
    formulaCaption: 'couple ratio · Type B preset',
  },
  {
    idx: '03',
    label: 'AI INSIGHT',
    title: '3개 모델, 하나의 리포트.',
    copy:
      'Claude · GPT · Gemini 가 매달 지출을 교차 분석합니다. 월 1회 무료 리포트, 추가 분석은 크레딧 팩으로. 모델은 바뀌어도 포맷은 일정합니다.',
    formula: '10 · 50 · 100',
    formulaCaption: 'credit packs · one-time purchase',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap()
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const cards = section.querySelectorAll('[data-feature-card]')
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    })

    // Parallax bg
    const bg = section.querySelector('[data-feature-bg]') as HTMLElement | null
    if (bg) {
      gsap.to(bg, {
        backgroundPositionY: '30%',
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
      id="features"
      ref={sectionRef}
      className="relative section-anchor overflow-hidden"
      style={{
        background: 'var(--bg-dark)',
        padding: 'clamp(80px, 12vw, 180px) 0',
      }}
    >
      {/* Parallax desk bg (synthesized) */}
      <div
        data-feature-bg
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(212,98,42,0.14), transparent 70%), radial-gradient(ellipse 90% 70% at 80% 90%, rgba(43,30,20,0.8), transparent 60%), linear-gradient(180deg, #141210 0%, #0A0806 100%)',
          backgroundPositionY: '0%',
          backgroundSize: 'cover',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Header row */}
        <div className="grid md:grid-cols-12 gap-10 mb-20 md:mb-28">
          <div className="md:col-span-5 md:sticky md:top-32 self-start">
            <div className="eyebrow mb-6">FEATURES · 003</div>
            <h2
              className="display"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 84px)',
                color: 'var(--text-primary)',
              }}
            >
              하루 한 줄,
              <br />
              <span style={{ color: 'var(--accent-orange-light)' }}>한 달을 읽다.</span>
            </h2>
            <p
              style={{
                marginTop: 24,
                maxWidth: 380,
                color: 'var(--text-secondary)',
                fontSize: 15,
                lineHeight: 1.55,
              }}
            >
              weeple 은 기록의 부담을 없애고, 데이터를 기다리지 않습니다.
              입력은 한 줄로, 분석은 3개 모델로. 모든 기능이 커플 예산에
              맞춰 설계되었습니다.
            </p>

            {/* Circular arrow button */}
            <button
              type="button"
              className="mt-8 inline-flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
              style={{
                width: 56,
                height: 56,
                border: '1px solid var(--border-mid)',
                background: 'transparent',
                color: 'var(--text-primary)',
              }}
              aria-label="features tour"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 9H14M14 9L9 4M14 9L9 14"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="md:col-span-7 flex flex-col gap-8">
            {FEATURES.map((f) => (
              <article
                key={f.idx}
                data-feature-card
                className="rounded-2xl p-8 md:p-10 backdrop-glass"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                    {f.idx}
                  </div>
                  <div className="eyebrow">{f.label}</div>
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: 'clamp(24px, 2.8vw, 40px)',
                    color: 'var(--text-primary)',
                    whiteSpace: 'pre-line',
                    marginBottom: 20,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginBottom: 28,
                  }}
                >
                  {f.copy}
                </p>
                <div
                  className="flex items-baseline justify-between gap-4 pt-5"
                  style={{ borderTop: '1px dashed var(--border-soft)' }}
                >
                  <span
                    className="mono"
                    style={{
                      fontStyle: 'italic',
                      fontSize: 20,
                      color: 'var(--accent-orange-light)',
                    }}
                  >
                    {f.formula}
                  </span>
                  <span
                    className="eyebrow"
                    style={{ color: 'var(--text-muted)', fontSize: 10 }}
                  >
                    {f.formulaCaption}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
