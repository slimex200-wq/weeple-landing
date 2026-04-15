'use client'

/**
 * AIBrain — "3개 AI, 3가지 관점" 섹션.
 *
 * 21st 패턴: sticky horizontal pinned scroll. 섹션이 3 viewport 길이,
 * 내부가 sticky 로 고정되고 가로 translateX 로 카드가 이동한다.
 *
 * useReducedMotion 시 pin 해제 → 세로 스택으로 대체.
 */

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'

type AI = {
  name: string
  maker: string
  color: 'coral' | 'violet' | 'success'
  tagline: string
  insight: string
  metric: { label: string; value: string }
  icon: React.ReactNode
}

// weeple 의 실제 구현 기준 역할 (src/services/aiService.ts:PROVIDER_ROLES)
//   Claude → 절약 코치
//   GPT    → 패턴 분석
//   Gemini → 금전운 (점수 1~100)
const AIS: AI[] = [
  {
    name: 'Claude',
    maker: 'Anthropic',
    color: 'coral',
    tagline: '절약 코치',
    insight:
      '구독 서비스 3개가 기능이 겹칩니다. Netflix · Disney+ · Watcha 중 사용 빈도가 가장 낮은 하나를 해지하면 월 ₩32,000 절약. 이번 달 외식은 주 2회로 줄여보세요.',
    metric: { label: '월 절약 가능액', value: '₩32,000' },
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <path d="M24 4 L44 24 L24 44 L4 24 Z" opacity="0.9" />
        <path d="M24 12 L36 24 L24 36 L12 24 Z" fill="#0a0a0a" />
      </svg>
    ),
  },
  {
    name: 'GPT',
    maker: 'OpenAI',
    color: 'violet',
    tagline: '패턴 분석',
    insight:
      '"주말 집중형" 소비 패턴. 평일 평균 ₩18,000, 주말 평균 ₩42,000 — 주말이 평일의 2.3배. 금요일 저녁부터 지출이 급격히 올라가며, 주로 카페 · 외식 · 배달 카테고리에 집중됩니다.',
    metric: { label: '주말/평일 비율', value: '2.3×' },
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <path d="M24 4 L44 16 L44 32 L24 44 L4 32 L4 16 Z" opacity="0.9" />
        <path d="M24 12 L36 19 L36 29 L24 36 L12 29 L12 19 Z" fill="#0a0a0a" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    maker: 'Google',
    color: 'success',
    tagline: '금전운 스코어',
    insight:
      '이번 달 금전운 73점. 월 중반부터 외식 카테고리 약세 예상 — 주중 절제 권장, 주말 고정 지출 유지. 15일 이후 공동 지출 정산이 유리합니다.',
    metric: { label: '금전운 점수', value: '73/100' },
    icon: (
      <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden>
        <circle cx="24" cy="24" r="20" opacity="0.9" />
        <circle cx="24" cy="24" r="12" fill="#0a0a0a" />
      </svg>
    ),
  },
]

const COLOR_MAP = {
  coral: {
    text: 'text-coral',
    bg: 'bg-coral-bg',
    border: 'border-coral/40',
    shadow: 'shadow-[0_40px_80px_-20px_rgba(249,112,102,0.4)]',
  },
  violet: {
    text: 'text-violet',
    bg: 'bg-[rgba(129,140,248,0.12)]',
    border: 'border-[rgba(129,140,248,0.4)]',
    shadow: 'shadow-[0_40px_80px_-20px_rgba(129,140,248,0.4)]',
  },
  success: {
    text: 'text-success',
    bg: 'bg-[rgba(52,211,153,0.12)]',
    border: 'border-[rgba(52,211,153,0.4)]',
    shadow: 'shadow-[0_40px_80px_-20px_rgba(52,211,153,0.4)]',
  },
} as const

function AICard({ ai }: { ai: AI }) {
  const colors = COLOR_MAP[ai.color]
  return (
    <div
      className={`shrink-0 w-[85vw] sm:w-[70vw] max-w-[720px] h-auto rounded-3xl p-8 sm:p-12 bg-bg-card border ${colors.border} ${colors.shadow}`}
    >
      <div className="flex items-start justify-between mb-8">
        <div
          className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center ${colors.text}`}
        >
          <div className="w-10 h-10">{ai.icon}</div>
        </div>
        <div className="text-right">
          <div className={`text-[11px] font-semibold uppercase tracking-wider ${colors.text}`}>
            {ai.maker}
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-fg mt-1">{ai.name}</h3>
        </div>
      </div>

      <div className={`text-xs font-semibold tracking-wider ${colors.text} uppercase mb-3`}>
        {ai.tagline}
      </div>
      <p className="text-lg sm:text-xl text-fg leading-relaxed mb-8">
        {ai.insight}
      </p>

      <div className="pt-6 border-t border-border-light">
        <div className="text-[11px] text-fg-muted uppercase tracking-wider mb-2">
          {ai.metric.label}
        </div>
        <div className={`num text-4xl sm:text-5xl font-extrabold ${colors.text}`}>
          {ai.metric.value}
        </div>
      </div>
    </div>
  )
}

export default function AIBrain() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // 0 → -66% (3카드의 2/3 만큼 좌측 이동)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66%'])
  // 진행 바 3개 — 각 카드 구간. hooks 는 항상 최상위에서만 호출.
  const bar1 = useTransform(scrollYProgress, [0, 1 / 3], [0, 1])
  const bar2 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1])
  const bar3 = useTransform(scrollYProgress, [2 / 3, 1], [0, 1])
  const bars = [bar1, bar2, bar3]

  // Reduced motion: 세로 스택으로 fallback
  if (prefersReducedMotion) {
    return (
      <section
        id="ai-brain"
        className="relative py-32 px-6"
        aria-label="3개 AI 분석"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-xs font-semibold tracking-wider text-coral uppercase mb-4">
              AI Brain
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              3개 AI, 3가지 역할.
            </h2>
            <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
              매월 무료 1회. Claude 는 절약 코치, GPT 는 패턴 분석, Gemini 는
              금전운 스코어(1~100점). 동일한 소비 데이터를 서로 다른 역할로.
              추가 분석은 크레딧 팩(10개 ₩9,900부터).
            </p>
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
            <div className="text-xs font-semibold tracking-wider text-coral uppercase mb-3">
              AI Brain
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
              3개 AI, 3가지 역할.
            </h2>
            <p className="text-sm sm:text-base text-fg-secondary leading-relaxed max-w-2xl">
              절약 코치 · 패턴 분석 · 금전운 — 스크롤해서 하나씩 넘겨보세요.
            </p>
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
              className="h-1 w-8 rounded-full bg-border-app overflow-hidden"
              aria-hidden
            >
              <motion.div
                className="h-full bg-coral"
                style={{ scaleX: bar, transformOrigin: '0% 50%' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
