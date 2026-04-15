'use client'

/**
 * Pricing — weeple 크레딧 팩 3단 구조.
 *
 * 구독 아님. 크레딧 팩만 판매. 사용기한 없음.
 * 기본 기능(자연어 입력, OCR, 커플 공유, 목표) 은 전부 무료,
 * 매월 AI 분석 1회 무료 제공. AI 분석 더 돌리려면 크레딧.
 *
 * 21st 패턴: 3D tilt 카드 + 추천 카드 translateZ 로 앞으로 튀어나옴.
 */

import { motion } from 'motion/react'
import TiltCard from '@/components/TiltCard'

type Tier = {
  name: string
  credits: string
  price: string
  unit: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    credits: '10 크레딧',
    price: '₩9,900',
    unit: '1회당 ₩990',
    description: 'AI 분석 10회 — 맛보기용. 한두 달 써보고 결정하세요.',
    features: [
      'AI 멀티모델 분석 10회',
      '모든 기본 기능 포함',
      '사용기한 없음',
      '언제든 추가 구매',
    ],
    cta: '10 크레딧 받기',
  },
  {
    name: 'Couple',
    credits: '50 크레딧',
    price: '₩38,900',
    unit: '1회당 ₩778',
    description: '월 4회 × 6개월 기준. 커플이 제일 많이 고르는 팩.',
    features: [
      'AI 멀티모델 분석 50회',
      '1회당 ₩778 — 22% 절약',
      '모든 기본 기능 포함',
      '사용기한 없음',
    ],
    cta: '50 크레딧 받기',
    highlighted: true,
    badge: 'BEST VALUE',
  },
  {
    name: 'Heavy',
    credits: '100 크레딧',
    price: '₩68,900',
    unit: '1회당 ₩689',
    description: 'AI 분석 100회 — 장기 사용자용. 1회당 최저가.',
    features: [
      'AI 멀티모델 분석 100회',
      '1회당 ₩689 — 30% 절약',
      '모든 기본 기능 포함',
      '사용기한 없음',
    ],
    cta: '100 크레딧 받기',
  },
]

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
      className="text-coral shrink-0"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Pricing() {
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
          className="text-center max-w-2xl mx-auto mb-6"
        >
          <div className="text-xs font-semibold tracking-wider text-coral uppercase mb-4">
            크레딧 팩
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5">
            쓴 만큼만,
            <br />
            <span className="text-fg-muted">한 번만 결제.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
            구독 없음. 사용기한 없음. AI 분석이 필요할 때 크레딧을 씁니다.
          </p>
        </motion.div>

        {/* 무료 안내 — 토글 자리 대체 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-5 py-3 rounded-2xl bg-coral-bg border border-coral/25 text-sm text-fg-secondary">
            <span className="font-semibold text-coral">매월 AI 분석 1회 무료</span>
            <span className="text-fg-muted">›</span>
            <span>자연어 입력 · 영수증 OCR · 커플 공유 · 목표 전부 무료</span>
          </div>
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
                    ? 'bg-gradient-to-b from-coral-bg to-bg-card border border-coral/40 shadow-[0_60px_120px_-30px_rgba(14,165,160,0.45)]'
                    : 'bg-bg-card border border-border-light hover:border-coral/30 transition-colors duration-300'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-coral text-white text-[11px] font-bold tracking-wide uppercase shadow-[0_8px_20px_-4px_rgba(14,165,160,0.5)]">
                    {tier.badge}
                  </div>
                )}

                {/* 이름 + 크레딧 + 가격 */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-3">
                    {tier.name}
                  </h3>
                  <div className="num text-sm font-semibold text-fg-secondary mb-2">
                    {tier.credits}
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="num text-5xl font-extrabold tracking-tight text-fg">
                      {tier.price}
                    </span>
                  </div>
                  <div className="num text-xs text-fg-muted mb-3">
                    {tier.unit}
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
                  className={`inline-flex items-center justify-center h-12 rounded-full text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                    tier.highlighted
                      ? 'bg-coral text-white hover:scale-[1.02] hover:shadow-[0_12px_30px_-6px_rgba(14,165,160,0.55)]'
                      : 'border border-border-app bg-bg hover:border-coral hover:text-coral'
                  }`}
                >
                  {tier.cta}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-fg-muted leading-relaxed">
          부가세 포함. App Store / Google Play 수수료 별도 없음. 크레딧 사용기한 없음.
        </p>
      </div>
    </section>
  )
}
