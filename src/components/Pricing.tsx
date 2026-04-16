'use client'

/**
 * Pricing — weeple 3단 가격 구조.
 *
 * 21st 패턴: 3D tilt 카드 + 추천 카드 translateZ 로 앞으로 튀어나옴.
 * 월/연간 토글 — period 변경 시 price motion.span re-mount 애니메이션.
 * 연간 = 월간 × 10 (2개월 무료, 17% 할인).
 */

import { useState } from 'react'
import { motion } from 'motion/react'
import TiltCard from '@/components/TiltCard'

type Period = 'monthly' | 'yearly'

type Tier = {
  name: string
  price: {
    monthly: string
    yearly: string
  }
  period: {
    monthly: string
    yearly: string
  }
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
}

const TIERS: Tier[] = [
  {
    name: 'Free',
    price: { monthly: '₩0', yearly: '₩0' },
    period: { monthly: '영원히', yearly: '영원히' },
    description: '기본적인 가계부 기능. 개인 사용자에게 충분합니다.',
    features: [
      '자연어 빠른 입력',
      '월 OCR 스캔 3회',
      'AI 분석 1회 / 월',
      '개인 예산 관리',
      '기본 넛지',
    ],
    cta: '앱 다운로드',
  },
  {
    name: 'Premium',
    price: { monthly: '₩2,900', yearly: '₩29,000' },
    period: { monthly: '/월', yearly: '/년' },
    description: '모든 기능을 무제한으로. 혼자 또는 커플 모두.',
    features: [
      'Free 의 모든 기능',
      'OCR 스캔 무제한',
      'AI 멀티모델 분석 무제한',
      '프리미엄 넛지 전체',
      '실시간 파트너 공유',
      '결제 알림 자동 인식',
    ],
    cta: '프리미엄 시작',
    highlighted: true,
    badge: '가장 인기',
  },
  {
    name: 'Couple Plus',
    price: { monthly: '₩4,900', yearly: '₩49,000' },
    period: { monthly: '/월 (2인)', yearly: '/년 (2인)' },
    description: '두 사람이 함께 쓰는 프리미엄. 1인당 약 ₩2,450.',
    features: [
      'Premium 의 모든 기능 × 2',
      '공동 목표 무제한',
      '커플 리포트 PDF',
      '기념일 리마인더',
      '우선 고객지원',
    ],
    cta: '커플로 시작',
  },
]

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-mint shrink-0"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Pricing() {
  const [period, setPeriod] = useState<Period>('monthly')

  return (
    <section
      id="pricing"
      className="relative py-32 px-6"
      style={{ perspective: '1200px' }}
      aria-label="가격"
    >
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5">
            필요한 만큼만,
            <br />
            <span className="text-fg-muted">단순하게.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
            언제든 업그레이드, 언제든 해지. 숨은 비용 없음.
          </p>
        </motion.div>

        {/* 빌링 주기 토글 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <button
            type="button"
            onClick={() => setPeriod('monthly')}
            aria-pressed={period === 'monthly'}
            className={cx(
              'inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              period === 'monthly'
                ? 'bg-mint text-white shadow-[0_8px_24px_-8px_rgba(14,165,160,0.5)]'
                : 'glass text-fg-muted border border-border-app hover:text-fg',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            월간
          </button>
          <button
            type="button"
            onClick={() => setPeriod('yearly')}
            aria-pressed={period === 'yearly'}
            className={cx(
              'inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              period === 'yearly'
                ? 'bg-mint text-white shadow-[0_8px_24px_-8px_rgba(14,165,160,0.5)]'
                : 'glass text-fg-muted border border-border-app hover:text-fg',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            연간 <span className="text-xs opacity-80 ml-1">17% 할인</span>
          </button>
        </motion.div>

        {/* 카드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              style={{
                transformStyle: 'preserve-3d',
                transform: tier.highlighted
                  ? 'translateZ(40px) scale(1.04)'
                  : 'translateZ(0)',
                zIndex: tier.highlighted ? 10 : 1,
              }}
            >
              <TiltCard
                className={`relative flex flex-col h-full rounded-3xl p-8 ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-mint-bg to-bg-surface border border-mint/40 shadow-[0_60px_120px_-30px_rgba(14,165,160,0.5)]'
                    : 'glass border border-border-app hover:border-mint/30 transition-colors duration-300'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-mint text-white text-[11px] font-bold tracking-wide uppercase shadow-[0_8px_20px_-4px_rgba(14,165,160,0.6)]">
                    {tier.badge}
                  </div>
                )}

                {/* 이름 + 가격 */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-3">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <motion.span
                      key={period}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="num text-5xl font-extrabold tracking-tight text-fg"
                    >
                      {tier.price[period]}
                    </motion.span>
                    <motion.span
                      key={`period-${period}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="text-sm text-fg-muted num"
                    >
                      {tier.period[period]}
                    </motion.span>
                  </div>
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* 기능 */}
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check />
                      <span className="text-fg-secondary leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className={`inline-flex items-center justify-center h-12 rounded-full text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                    tier.highlighted
                      ? 'bg-mint text-white hover:scale-[1.02] hover:shadow-[0_12px_30px_-6px_rgba(14,165,160,0.6)]'
                      : 'border border-mint/40 text-mint bg-mint-bg hover:bg-mint-bg-strong hover:border-mint'
                  }`}
                >
                  {tier.cta}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-fg-muted">
          모든 가격은 부가세 포함. 앱 스토어 결제 수수료 별도 없음. iOS 와 Android 동일.
        </p>
      </div>
    </section>
  )
}
