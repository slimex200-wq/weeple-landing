'use client'

/**
 * Couple — "혼자도, 함께도" 커플 모드 섹션.
 *
 * 21st 패턴: 두 원이 겹치는 벤 다이어그램 인터랙션 (SVG cx 애니메이션).
 * 3 탭(100% 공동 / 부분 공동 / 기여금) 클릭 시 overlap 변경.
 * 라이브 알림 카드는 pulse.
 */

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Mode = {
  id: 'full' | 'partial' | 'contribution'
  label: string
  sub: string
  detail: string
  overlap: number // 0..1 (원 간격 제어)
}

const MODES: Mode[] = [
  {
    id: 'full',
    label: '100% 공동',
    sub: '모든 지출, 한 지갑',
    detail: '신혼 커플, 동거 커플에게 추천. 모든 소비를 한 풀로 관리하고 저축 목표까지 묶음.',
    overlap: 1,
  },
  {
    id: 'partial',
    label: '부분 공동',
    sub: '용돈은 따로, 저축은 같이',
    detail: '가장 인기 있는 모드. 각자 자유 소비는 숨기고, 공동 지출(월세/식재료/데이트)만 함께.',
    overlap: 0.6,
  },
  {
    id: 'contribution',
    label: '기여금',
    sub: '수입 비율대로 자동 계산',
    detail: '수입 차이가 있는 커플용. 월 수입 비율을 입력하면 weeple 이 공동 지출 분담금을 자동 산정.',
    overlap: 0.35,
  },
]

export default function Couple() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState<Mode>(MODES[1])

  // overlap 값에 따른 원 cx 계산 (100 = 중심, 거리가 멀수록 덜 겹침)
  const gap = 90 * (1 - active.overlap) // 0 → 겹침 최대, 90 → 거의 떨어짐
  const leftCx = 120 - gap / 2 - 40
  const rightCx = 120 + gap / 2 + 40

  return (
    <section
      id="couple"
      className="relative py-20 sm:py-28 px-6 overflow-hidden"
      aria-label="커플 모드"
    >
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            Couple mode
          </div>
          <h2 className="text-[32px] sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            혼자도, 함께도.
            <br />
            <span className="text-fg-muted">
              용돈은 따로,
              <br className="sm:hidden" /> 저축은 같이.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed max-w-2xl">
            커플마다 돈 관리 방식이 다르죠. weeple 은 3가지 모드 중 하나를
            선택하고, 언제든 갈아탈 수 있습니다.
          </p>
        </motion.div>

        {/* 2열 — 벤 다이어그램 + 탭 */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
          {/* 벤 다이어그램 SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full aspect-square max-w-[520px] mx-auto"
          >
            <svg
              viewBox="0 0 240 240"
              className="w-full h-full"
              role="img"
              aria-label={`${active.label} 모드 — 두 원의 겹침으로 공동 지출 범위 표현`}
            >
              <defs>
                <radialGradient id="mint-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(14,165,160,0.6)" />
                  <stop offset="100%" stopColor="rgba(14,165,160,0.1)" />
                </radialGradient>
                <radialGradient id="sky-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(125,211,252,0.6)" />
                  <stop offset="100%" stopColor="rgba(125,211,252,0.1)" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 왼쪽 원 — 나 */}
              <motion.circle
                cx={leftCx}
                cy="120"
                r="70"
                fill="url(#mint-grad)"
                stroke="#0EA5A0"
                strokeWidth="1.5"
                animate={prefersReducedMotion ? undefined : { cx: leftCx }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                filter="url(#glow)"
              />
              {/* 오른쪽 원 — 파트너 */}
              <motion.circle
                cx={rightCx}
                cy="120"
                r="70"
                fill="url(#sky-grad)"
                stroke="#7DD3FC"
                strokeWidth="1.5"
                animate={prefersReducedMotion ? undefined : { cx: rightCx }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                filter="url(#glow)"
              />
              {/* 라벨 — 원 위쪽으로 배치, 중앙 라벨과 충돌 방지 */}
              <text
                x={leftCx}
                y="55"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="700"
              >
                나
              </text>
              <text
                x={rightCx}
                y="55"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="12"
                fontWeight="700"
              >
                파트너
              </text>
              {/* 중앙 공동 영역 라벨 */}
              <text
                x="120"
                y="118"
                textAnchor="middle"
                fill="#0EA5A0"
                fontSize="10"
                fontWeight="700"
                letterSpacing="1"
              >
                공동 지출
              </text>
              <text
                x="120"
                y="135"
                textAnchor="middle"
                fill="#1A1A1A"
                fontSize="13"
                fontWeight="800"
                fontFamily="var(--font-mono)"
              >
                ₩{Math.round(active.overlap * 850).toLocaleString()},000
              </text>
            </svg>
          </motion.div>

          {/* 탭 + 상세 */}
          <div>
            <div className="flex gap-2 mb-6 flex-wrap">
              {MODES.map((mode) => {
                const isActive = mode.id === active.id
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActive(mode)}
                    aria-pressed={isActive}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                      isActive
                        ? 'bg-mint text-white shadow-[0_8px_24px_-6px_rgba(14,165,160,0.5)]'
                        : 'glass text-fg-secondary hover:border-mint hover:text-mint'
                    }`}
                  >
                    {mode.label}
                  </button>
                )
              })}
            </div>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl p-6 sm:p-8 glass mb-6"
            >
              <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-3">
                {active.sub}
              </div>
              <h3 className="text-2xl font-bold text-fg mb-3">{active.label}</h3>
              <p className="text-sm sm:text-base text-fg-secondary leading-relaxed">
                {active.detail}
              </p>
            </motion.div>

            {/* 라이브 알림 카드 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl p-5 glass border border-mint/30 overflow-hidden"
            >
              <motion.div
                className="absolute top-3 left-3 h-2 w-2 rounded-full bg-success"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                }
                aria-hidden
              />
              <div className="pl-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-success mb-1.5">
                  실시간
                </div>
                <div className="text-sm text-fg leading-relaxed">
                  파트너가 방금{' '}
                  <span className="num font-bold text-mint">₩11,500</span> 을{' '}
                  <span className="font-semibold">버거킹</span> 에서 사용했어요.
                </div>
                <div className="mt-2 text-[11px] text-fg-muted num">
                  공동 예산 · 2초 전
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
