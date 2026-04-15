'use client'

/**
 * Pricing — Editorial Warm v2.
 *
 * THIS IS THE AMBER SECTION. Teal 대신 amber(#B45309) 가 유일한 액센트.
 * (Couple/Security 섹션과 시각적 대비 — 가격은 결정 모멘트라 온도를 올림)
 *
 * 패턴 (unchanged):
 *   - TiltCard 3D 틸트
 *   - 추천 카드 translateZ + scale (튀어나옴)
 *   - stagger reveal
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

function Arrow() {
  return (
    <span
      aria-hidden
      className="shrink-0 leading-none"
      style={{
        fontFamily: 'var(--serif)',
        fontStyle: 'italic',
        color: 'var(--amber)',
        fontSize: '1.1em',
      }}
    >
      →
    </span>
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
          <div
            className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-5 justify-center"
            style={{ color: 'var(--amber)' }}
          >
            <span
              aria-hidden
              className="inline-block w-7 h-px"
              style={{ background: 'var(--amber)' }}
            />
            크레딧 팩
          </div>
          <h2
            className="leading-[1.02] mb-5"
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
            }}
          >
            쓴 만큼만,
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--amber)' }}>
              한 번만 결제.
            </span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--ink-2)' }}
          >
            구독 없음. 사용기한 없음. AI 분석이 필요할 때 크레딧을 씁니다.
          </p>
        </motion.div>

        {/* 무료 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-2xl mx-auto mb-16 text-center"
        >
          <div
            className="inline-flex flex-wrap justify-center items-center gap-x-2 gap-y-1 px-5 py-3 rounded-full text-sm"
            style={{
              background: 'var(--amber-soft)',
              border: '1px solid var(--rule)',
              color: 'var(--ink-2)',
            }}
          >
            <span
              className="font-semibold"
              style={{ color: 'var(--amber)' }}
            >
              매월 AI 분석 1회 무료
            </span>
            <span style={{ color: 'var(--ink-3)' }}>›</span>
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
              <TiltCard className="h-full">
                <div
                  className="relative flex flex-col h-full rounded-3xl p-8"
                  style={
                    tier.highlighted
                      ? {
                          background: 'var(--white)',
                          border: '2px solid var(--amber)',
                          boxShadow: 'var(--shadow-3)',
                        }
                      : {
                          background: 'var(--white)',
                          border: '1px solid var(--rule)',
                          boxShadow: 'var(--shadow-1)',
                        }
                  }
                >
                  {tier.badge && (
                    <div
                      className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase num"
                      style={{
                        background: 'var(--amber)',
                        color: 'var(--white)',
                      }}
                    >
                      {tier.badge}
                    </div>
                  )}

                  {/* 이름 + 크레딧 + 가격 */}
                  <div className="mb-6">
                    <h3
                      className="mb-4"
                      style={{
                        fontFamily: 'var(--serif)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '1.25rem',
                        color: 'var(--ink-3)',
                      }}
                    >
                      {tier.name}
                    </h3>
                    <div
                      className="num text-sm font-medium mb-2"
                      style={{ color: 'var(--amber)' }}
                    >
                      {tier.credits}
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span
                        className="num tracking-tight"
                        style={{
                          color: 'var(--ink)',
                          fontSize: '2.75rem',
                          fontWeight: 500,
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {tier.price}
                      </span>
                    </div>
                    <div
                      className="num text-xs mb-3"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      {tier.unit}
                    </div>
                    <p
                      className="text-sm leading-relaxed pt-4"
                      style={{
                        color: 'var(--ink-2)',
                        borderTop: '1px solid var(--rule-soft)',
                      }}
                    >
                      {tier.description}
                    </p>
                  </div>

                  {/* 기능 */}
                  <ul className="flex-1 space-y-2.5 mb-8">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Arrow />
                        <span
                          className="leading-relaxed"
                          style={{ color: 'var(--ink-2)' }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#"
                    className="inline-flex items-center justify-center h-12 rounded-full text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={
                      tier.highlighted
                        ? {
                            background: 'var(--ink)',
                            color: 'var(--paper)',
                            border: '1px solid var(--ink)',
                          }
                        : {
                            background: 'var(--paper)',
                            color: 'var(--ink)',
                            border: '1px solid var(--rule)',
                          }
                    }
                  >
                    {tier.cta}
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p
          className="mt-14 text-center text-xs leading-relaxed max-w-lg mx-auto"
          style={{ color: 'var(--ink-3)' }}
        >
          부가세 포함. App Store / Google Play 수수료 별도 없음. 크레딧 사용기한 없음.
        </p>
      </div>
    </section>
  )
}
