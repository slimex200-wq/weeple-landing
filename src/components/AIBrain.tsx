'use client'

/**
 * AIBrain — Editorial Warm v2.
 *
 * 패턴 (unchanged):
 *   - Sticky horizontal pinned scroll (300vh 섹션, translateX 로 카드 이동)
 *   - Reduced-motion fallback: 세로 스택
 *   - 3 카드: Claude / GPT / Gemini
 *
 * Editorial Warm:
 *   - 섹션 bg 상속 (paper)
 *   - 카드: white + hairline + shadow-2 (glass 제거)
 *   - 헤드라인: Instrument Serif + italic teal accent
 *   - 아이콘 cutout: paper 로 변경 (ink 위 cutout 효과)
 *   - 이 섹션의 single accent = teal. 세 provider 는 보조 틴트
 *     (Claude: teal / GPT: partner-brown / Gemini: ink) 로만 구분.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'

type Tint = 'teal' | 'partner' | 'ink'

type AI = {
  name: string
  maker: string
  tint: Tint
  tagline: string
  insight: string
  metric: { label: string; value: string }
  icon: React.ReactNode
}

// weeple 의 실제 구현 기준 역할 (src/services/aiService.ts:PROVIDER_ROLES)
const AIS: AI[] = [
  {
    name: 'Claude',
    maker: 'Anthropic',
    tint: 'teal',
    tagline: '절약 코치',
    insight:
      '구독 서비스 3개가 기능이 겹칩니다. Netflix · Disney+ · Watcha 중 사용 빈도가 가장 낮은 하나를 해지하면 월 ₩32,000 절약. 이번 달 외식은 주 2회로 줄여보세요.',
    metric: { label: '월 절약 가능액', value: '₩32,000' },
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <path d="M24 4 L44 24 L24 44 L4 24 Z" opacity="0.95" />
        <path d="M24 12 L36 24 L24 36 L12 24 Z" fill="var(--paper)" />
      </svg>
    ),
  },
  {
    name: 'GPT',
    maker: 'OpenAI',
    tint: 'partner',
    tagline: '패턴 분석',
    insight:
      '"주말 집중형" 소비 패턴. 평일 평균 ₩18,000, 주말 평균 ₩42,000 — 주말이 평일의 2.3배. 금요일 저녁부터 지출이 급격히 올라가며, 주로 카페 · 외식 · 배달 카테고리에 집중됩니다.',
    metric: { label: '주말/평일 비율', value: '2.3×' },
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <path d="M24 4 L44 16 L44 32 L24 44 L4 32 L4 16 Z" opacity="0.95" />
        <path d="M24 12 L36 19 L36 29 L24 36 L12 29 L12 19 Z" fill="var(--paper)" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    maker: 'Google',
    tint: 'ink',
    tagline: '금전운 스코어',
    insight:
      '이번 달 금전운 73점. 월 중반부터 외식 카테고리 약세 예상 — 주중 절제 권장, 주말 고정 지출 유지. 15일 이후 공동 지출 정산이 유리합니다.',
    metric: { label: '금전운 점수', value: '73/100' },
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <circle cx="24" cy="24" r="20" opacity="0.95" />
        <circle cx="24" cy="24" r="12" fill="var(--paper)" />
      </svg>
    ),
  },
]

const TINT_MAP: Record<
  Tint,
  { color: string; softBg: string; label: string }
> = {
  teal: {
    color: 'var(--teal)',
    softBg: 'var(--teal-soft)',
    label: 'var(--teal)',
  },
  partner: {
    color: 'var(--partner)',
    softBg: 'var(--partner-soft)',
    label: 'var(--partner)',
  },
  ink: {
    color: 'var(--ink)',
    softBg: 'rgba(26, 20, 16, 0.06)',
    label: 'var(--ink)',
  },
}

function AICard({ ai }: { ai: AI }) {
  const tint = TINT_MAP[ai.tint]
  return (
    <div
      className="shrink-0 w-[85vw] sm:w-[70vw] max-w-[720px] rounded-3xl p-8 sm:p-12"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--rule)',
        boxShadow: 'var(--shadow-2)',
      }}
    >
      <div className="flex items-start justify-between mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: tint.softBg,
            color: tint.color,
          }}
        >
          <div className="w-10 h-10">{ai.icon}</div>
        </div>
        <div className="text-right">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: tint.label }}
          >
            {ai.maker}
          </div>
          <h3
            className="mt-1"
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.4vw, 2.75rem)',
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}
          >
            {ai.name}
          </h3>
        </div>
      </div>

      <div
        className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
        style={{ color: tint.color }}
      >
        {ai.tagline}
      </div>
      <p
        className="text-lg sm:text-xl leading-relaxed mb-8"
        style={{ color: 'var(--ink)', fontFamily: 'var(--sans)' }}
      >
        {ai.insight}
      </p>

      <div
        className="pt-6"
        style={{ borderTop: '1px solid var(--rule)' }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.12em] mb-2"
          style={{ color: 'var(--ink-3)' }}
        >
          {ai.metric.label}
        </div>
        <div
          className="num"
          style={{
            color: tint.color,
            fontSize: 'clamp(2.5rem, 4vw, 3rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          {ai.metric.value}
        </div>
      </div>
    </div>
  )
}

function Header({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div
        className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-4"
        style={{ color: 'var(--teal)' }}
      >
        <span
          aria-hidden
          className="inline-block w-7 h-px"
          style={{ background: 'var(--teal)' }}
        />
        AI Brain
      </div>
      <h2
        className={`leading-[1.02] ${compact ? 'mb-4' : 'mb-6'}`}
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: compact
            ? 'clamp(2rem, 4.5vw, 3.75rem)'
            : 'clamp(2.5rem, 5.5vw, 5rem)',
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
        }}
      >
        3개 AI,{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--teal)' }}>
          3가지 역할.
        </span>
      </h2>
      <p
        className="text-sm sm:text-base leading-relaxed max-w-2xl"
        style={{ color: 'var(--ink-2)' }}
      >
        절약 코치 · 패턴 분석 · 금전운 — 동일한 소비 데이터를 서로 다른 관점에서.
        매월 1회 무료, 추가는 크레딧 팩(10개 ₩9,900부터).
      </p>
    </>
  )
}

export default function AIBrain() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66%'])
  const bar1 = useTransform(scrollYProgress, [0, 1 / 3], [0, 1])
  const bar2 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1])
  const bar3 = useTransform(scrollYProgress, [2 / 3, 1], [0, 1])
  const bars = [bar1, bar2, bar3]

  if (prefersReducedMotion) {
    return (
      <section
        id="ai-brain"
        className="relative py-32 px-6"
        aria-label="3개 AI 분석"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <Header />
          </div>
          <div className="space-y-6">
            {AIS.map((ai) => (
              <AICard key={ai.name} ai={ai} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="ai-brain"
      className="relative h-[300vh]"
      aria-label="3개 AI 분석"
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* 상단 제목 */}
        <div className="pt-20 sm:pt-28 px-6 mb-8 sm:mb-12">
          <div className="max-w-6xl mx-auto">
            <Header compact />
          </div>
        </div>

        {/* 카드 레일 */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-10 pl-6 sm:pl-20"
          >
            {AIS.map((ai) => (
              <AICard key={ai.name} ai={ai} />
            ))}
          </motion.div>
        </div>

        {/* 진행 표시 */}
        <div className="flex items-center justify-center gap-2 pb-10">
          {bars.map((bar, i) => (
            <div
              key={i}
              className="h-1 w-8 rounded-full overflow-hidden"
              style={{ background: 'var(--rule)' }}
              aria-hidden
            >
              <motion.div
                className="h-full"
                style={{
                  background: 'var(--teal)',
                  scaleX: bar,
                  transformOrigin: '0% 50%',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
