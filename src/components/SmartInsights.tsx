'use client'

import { motion } from 'motion/react'
import Money from '@/components/Money'

type Insight = {
  icon: React.ReactNode
  color: 'mint' | 'violet' | 'sky'
  tagline: string
  title: string
  insight: string
  metric: { label: string; value: string }
}

const INSIGHTS: Insight[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    color: 'mint',
    tagline: '절약 코치',
    title: '안 쓰면 아끼는 돈',
    insight: '구독 서비스 3개가 기능이 겹칩니다. 사용 빈도가 낮은 하나를 해지하면 월 ₩32,000 절약. 이번 달 외식은 주 2회로 줄여보세요.',
    metric: { label: '월 절약 가능액', value: '₩32,000' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 6-10" />
      </svg>
    ),
    color: 'violet',
    tagline: '소비 패턴',
    title: '돈이 어디로 가는지',
    insight: '"주말 집중형" 소비 패턴. 평일 평균 ₩18,000, 주말 평균 ₩42,000 — 주말이 평일의 2.3배. 금요일 저녁부터 카페·외식·배달에 집중됩니다.',
    metric: { label: '주말/평일 비율', value: '2.3×' },
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    color: 'sky',
    tagline: '한 달 전망',
    title: '이번 달은 이렇게 될 거예요',
    insight: '현재 속도라면 월말 잔액 ₩430,000 예상. 외식 카테고리 과다 지출 경향. 주중 절제하면 저축 목표 달성 가능합니다.',
    metric: { label: '예상 월말 잔액', value: '43만' },
  },
]

const COLOR_MAP = {
  mint: {
    text: 'text-mint',
    bg: 'bg-mint-bg',
    border: 'border-[rgba(14,165,160,0.3)]',
  },
  violet: {
    text: 'text-violet',
    bg: 'bg-[rgba(129,140,248,0.08)]',
    border: 'border-[rgba(129,140,248,0.3)]',
  },
  sky: {
    text: 'text-sky',
    bg: 'bg-[rgba(125,211,252,0.08)]',
    border: 'border-[rgba(125,211,252,0.3)]',
  },
} as const

export default function SmartInsights() {
  return (
    <section
      id="smart-insights"
      className="relative py-20 sm:py-28 px-6"
      aria-label="AI 인사이트"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            AI Insights
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-normal mb-6">
            AI가 알려주는
            <br />
            <span className="text-fg-muted">돈 이야기.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed max-w-2xl">
            매월 무료 1회. 3가지 관점으로 소비를 분석하고, 절약 방법을 제안합니다.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {INSIGHTS.map((item, i) => {
            const colors = COLOR_MAP[item.color]
            return (
              <motion.div
                key={item.tagline}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className={`glass rounded-2xl p-5 sm:p-7 ${colors.border} hover:shadow-lg transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-5`}>
                  <div className="w-6 h-6">{item.icon}</div>
                </div>
                <div className={`text-xs font-semibold tracking-wider ${colors.text} uppercase mb-2`}>
                  {item.tagline}
                </div>
                <h3 className="text-xl font-bold text-fg mb-3">{item.title}</h3>
                <p className="text-sm text-fg-secondary leading-relaxed mb-6">
                  {item.insight}
                </p>
                <div className="pt-5 border-t border-divider">
                  <div className="text-[11px] text-fg-muted uppercase tracking-wider mb-1">
                    {item.metric.label}
                  </div>
                  <div className={`text-3xl font-extrabold ${colors.text}`}>
                    <Money value={item.metric.value} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
