'use client'

import { useEffect, useRef } from 'react'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'

type Review = {
  stars: number
  quote: string
  highlight: string
  name: string
  role: string
}

const REVIEWS: Review[] = [
  {
    stars: 5,
    quote:
      '통장을 합치지 못해서 매번 엑셀로 정산했는데, weeple 이후로 그 정산이 사라졌다. 증여세 걱정 없이 투명하게 쓸 수 있어서 좋다.',
    highlight: '증여세 걱정 없이',
    name: '민재, 주영',
    role: '동거 2년차 · 서울',
  },
  {
    stars: 5,
    quote:
      '결혼 준비하면서 공동 예산을 정하는 게 제일 어려웠다. 세 가지 커플 모드 중 B 를 골라서 한 달 썼더니 싸움이 확 줄었다.',
    highlight: '싸움이 확 줄었다',
    name: '현우, 수빈',
    role: '신혼 6개월 · 인천',
  },
  {
    stars: 5,
    quote:
      '음성으로 “스벅 6500” 말하면 바로 들어간다. 지하철에서 적던 메모가 필요 없어졌다. 입력이 빠르니까 기록이 끊기지 않는다.',
    highlight: '기록이 끊기지 않는다',
    name: '지안',
    role: '커플 1년 · 부산',
  },
  {
    stars: 5,
    quote:
      'AI 리포트가 월 1회 공짜인데도 통장을 보듯 자세하다. 크레딧은 처음 10 팩만 썼는데 한 달이 버틴다.',
    highlight: '한 달이 버틴다',
    name: '서연, 태민',
    role: '예비부부 · 판교',
  },
  {
    stars: 5,
    quote:
      '부분 공동 모드가 우리한테 딱이었다. 각자 통장은 유지하면서 공동 항목만 weeple 에 올려두니 서로 믿고 맡길 수 있다.',
    highlight: '믿고 맡길 수 있다',
    name: '정훈, 하늘',
    role: '동거 3년차 · 일산',
  },
  {
    stars: 5,
    quote:
      '영수증 찍는 것만으로 가계부가 채워지는 게 제일 신기하다. 일주일 밀려도 사진만 쌓아두면 된다.',
    highlight: '사진만 쌓아두면',
    name: '재원, 유진',
    role: '커플 4년 · 대구',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap()
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const reviews = section.querySelectorAll('[data-review]')
    gsap.fromTo(
      reviews,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    const photos = section.querySelectorAll('[data-photo]')
    gsap.fromTo(
      photos,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && section.contains(st.trigger as Node)) st.kill()
      })
    }
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative section-anchor overflow-hidden"
      style={{
        background: '#0D0B09',
        padding: 'clamp(100px, 14vw, 180px) 0',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 85% 20%, rgba(212,98,42,0.12), transparent 50%), radial-gradient(circle at 5% 80%, rgba(245,237,216,0.04), transparent 45%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Top meta bar */}
        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-14"
          style={{
            borderTop: '1px solid var(--border-soft)',
            borderBottom: '1px solid var(--border-soft)',
            padding: '14px 0',
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          <span>RATING &amp; REVIEWS</span>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <span>
            REVIEWS{' '}
            <span style={{ color: 'var(--text-primary)' }}>[127]</span>
          </span>
          <span style={{ color: 'var(--accent-orange-light)' }}>
            ★★★★★ [4.9/5]
          </span>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <span>WEEPLE IN USE</span>
        </div>

        {/* Massive heading */}
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <h2
            className="display md:col-span-8"
            style={{
              fontSize: 'clamp(40px, 6.4vw, 104px)',
              color: 'var(--text-primary)',
            }}
          >
            통장을 합칠 수 없었던
            <br />
            <span style={{ color: 'var(--accent-orange-light)' }}>
              우리에게 필요했던 것.
            </span>
          </h2>
          <p
            className="md:col-span-4 md:pt-6"
            style={{
              color: 'var(--text-secondary)',
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: 360,
            }}
          >
            동거, 신혼, 예비 부부 — 상황은 달라도 같은 고민을 하고 있었습니다.
            weeple 을 먼저 써본 127 팀의 이야기입니다.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left column — reviews */}
          <div className="md:col-span-7 flex flex-col">
            {REVIEWS.map((r, idx) => (
              <article
                key={idx}
                data-review
                className="py-8"
                style={{
                  borderTop: idx === 0 ? 'none' : '1px dashed var(--border-soft)',
                }}
              >
                <div
                  style={{
                    color: 'var(--accent-orange-light)',
                    letterSpacing: '0.2em',
                    fontSize: 14,
                    marginBottom: 16,
                  }}
                  aria-label={`별점 ${r.stars}점`}
                >
                  {'★'.repeat(r.stars)}
                </div>
                <p
                  style={{
                    fontSize: 'clamp(17px, 1.4vw, 22px)',
                    lineHeight: 1.55,
                    color: 'var(--text-primary)',
                    marginBottom: 20,
                  }}
                >
                  {renderHighlighted(r.quote, r.highlight)}
                </p>
                <div
                  className="flex items-baseline gap-4"
                  style={{ fontSize: 13, color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>{r.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>—</span>
                  <span>{r.role}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Right column — photo mosaic */}
          <div className="md:col-span-5 grid grid-cols-2 auto-rows-[140px] md:auto-rows-[180px] gap-3">
            {PHOTO_TILES.map((tile, idx) => (
              <div
                key={idx}
                data-photo
                className={`rounded-2xl relative overflow-hidden ${tile.span}`}
                style={{
                  background: tile.bg,
                  border: '1px solid var(--border-soft)',
                }}
              >
                <div
                  className="absolute left-3 top-3 eyebrow"
                  style={{ color: 'rgba(245,237,216,0.7)' }}
                >
                  {tile.label}
                </div>
                <div
                  className="absolute left-3 bottom-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                  }}
                >
                  {tile.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function renderHighlighted(text: string, highlight: string) {
  if (!highlight || !text.includes(highlight)) return text
  const parts = text.split(highlight)
  return (
    <>
      {parts[0]}
      <span style={{ color: 'var(--accent-orange)' }}>{highlight}</span>
      {parts[1]}
    </>
  )
}

const PHOTO_TILES = [
  {
    label: '01 · INPUT',
    title: '한 줄 입력',
    span: 'col-span-2 row-span-1',
    bg: 'linear-gradient(135deg, rgba(212,98,42,0.3), rgba(43,30,20,0.8))',
  },
  {
    label: '02 · SHARED',
    title: '공동 대시보드',
    span: 'col-span-1 row-span-2',
    bg: 'linear-gradient(180deg, rgba(245,237,216,0.1), rgba(20,18,16,0.8))',
  },
  {
    label: '03 · AI',
    title: '월간 리포트',
    span: 'col-span-1 row-span-1',
    bg: 'linear-gradient(135deg, rgba(43,30,20,0.9), rgba(212,98,42,0.2))',
  },
  {
    label: '04 · CREDITS',
    title: '크레딧 팩',
    span: 'col-span-1 row-span-1',
    bg: 'linear-gradient(45deg, rgba(212,98,42,0.2), rgba(20,18,16,0.9))',
  },
  {
    label: '05 · VOICE',
    title: '음성 입력',
    span: 'col-span-2 row-span-1',
    bg: 'linear-gradient(90deg, rgba(43,30,20,0.8), rgba(212,98,42,0.18), rgba(20,18,16,0.9))',
  },
]
