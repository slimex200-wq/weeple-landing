'use client'

/**
 * Couple — Editorial Warm v2.
 *
 * 패턴 (unchanged):
 *   - 벤 다이어그램 SVG cx 애니메이션
 *   - 3 모드 탭 (100% 공동 / 부분 공동 / 기여금)
 *   - 라이브 알림 카드 pulse
 *
 * Editorial Warm:
 *   - 나 = deep teal (#0F766E)
 *   - 파트너 = warm brown (#8B6F47) — amber 대신 중립 톤으로 single-accent 규칙 유지
 *   - 탭: ink filled 활성, 비활성은 paper-warm bg + hairline
 *   - 알림 카드: white + teal border-left
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Mode = {
  id: 'full' | 'partial' | 'contribution'
  label: string
  sub: string
  detail: string
  overlap: number
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

// 커플 섹션 전용 톤 — teal (나) + partner-brown (파트너)
const TEAL = '#0F766E'
const PARTNER = '#8B6F47'

export default function Couple() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState<Mode>(MODES[1])

  // GlobalScene 의 CoupleSpheres 에게 overlap 값을 통지.
  // CoupleSpheres 는 window 'weeple:coupleOverlap' 이벤트를 구독한다.
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(
      new CustomEvent('weeple:coupleOverlap', {
        detail: { overlap: active.overlap },
      }),
    )
  }, [active.overlap])

  const gap = 90 * (1 - active.overlap)
  const leftCx = 120 - gap / 2 - 40
  const rightCx = 120 + gap / 2 + 40

  return (
    <section
      id="couple"
      className="relative py-32 sm:py-40 px-6 overflow-hidden"
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
          <div
            className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-5"
            style={{ color: 'var(--teal)' }}
          >
            <span
              aria-hidden
              className="inline-block w-7 h-px"
              style={{ background: 'var(--teal)' }}
            />
            Couple mode
          </div>
          <h2
            className="leading-[1.02] mb-6"
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
            }}
          >
            혼자도, 함께도.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--teal)' }}>
              용돈은 따로, 저축은 같이.
            </span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            커플마다 돈 관리 방식이 다르죠. weeple 은 3가지 모드 중 하나를
            선택하고, 언제든 갈아탈 수 있습니다.
          </p>
        </motion.div>

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
                <radialGradient id="teal-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(15,118,110,0.40)" />
                  <stop offset="100%" stopColor="rgba(15,118,110,0.05)" />
                </radialGradient>
                <radialGradient id="partner-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(139,111,71,0.40)" />
                  <stop offset="100%" stopColor="rgba(139,111,71,0.05)" />
                </radialGradient>
              </defs>

              {/* 왼쪽 원 — 나 (teal) */}
              <motion.circle
                cx={leftCx}
                cy="120"
                r="70"
                fill="url(#teal-grad)"
                stroke={TEAL}
                strokeWidth="1.5"
                animate={prefersReducedMotion ? undefined : { cx: leftCx }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              />
              {/* 오른쪽 원 — 파트너 (warm brown) */}
              <motion.circle
                cx={rightCx}
                cy="120"
                r="70"
                fill="url(#partner-grad)"
                stroke={PARTNER}
                strokeWidth="1.5"
                animate={prefersReducedMotion ? undefined : { cx: rightCx }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              />
              {/* 라벨 — serif italic */}
              <motion.text
                x={leftCx - 32}
                y="125"
                fill="#1A1410"
                fontSize="13"
                fontStyle="italic"
                fontFamily="var(--serif)"
                animate={prefersReducedMotion ? undefined : { x: leftCx - 32 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              >
                나
              </motion.text>
              <motion.text
                x={rightCx + 12}
                y="125"
                fill="#1A1410"
                fontSize="13"
                fontStyle="italic"
                fontFamily="var(--serif)"
                animate={prefersReducedMotion ? undefined : { x: rightCx + 12 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              >
                파트너
              </motion.text>
              {/* 중앙 공동 영역 라벨 */}
              <text
                x="120"
                y="115"
                textAnchor="middle"
                fill={TEAL}
                fontSize="10"
                fontWeight="600"
                letterSpacing="1.2"
                fontFamily="var(--sans)"
              >
                공동 지출
              </text>
              <text
                x="120"
                y="136"
                textAnchor="middle"
                fill="#1A1410"
                fontSize="15"
                fontFamily="var(--mono)"
                fontWeight="500"
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
                    className="px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={
                      isActive
                        ? {
                            background: 'var(--ink)',
                            color: 'var(--paper)',
                          }
                        : {
                            background: 'var(--white)',
                            color: 'var(--ink-2)',
                            border: '1px solid var(--rule)',
                          }
                    }
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
              className="rounded-2xl p-6 sm:p-8 mb-6"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--rule)',
                boxShadow: 'var(--shadow-1)',
              }}
            >
              <div
                className="text-xs font-semibold tracking-[0.14em] uppercase mb-3"
                style={{ color: 'var(--teal)' }}
              >
                {active.sub}
              </div>
              <h3
                className="mb-3"
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: '1.75rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                {active.label}
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--ink-2)' }}
              >
                {active.detail}
              </p>
            </motion.div>

            {/* 라이브 알림 카드 — white + teal border-left */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--rule)',
                borderLeft: '3px solid var(--teal)',
                boxShadow: 'var(--shadow-1)',
              }}
            >
              <motion.div
                className="absolute top-3 left-5 h-2 w-2 rounded-full"
                style={{ background: 'var(--teal)' }}
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
                <div
                  className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1.5"
                  style={{ color: 'var(--teal)' }}
                >
                  실시간
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--ink)' }}
                >
                  파트너가 방금{' '}
                  <span
                    className="num font-semibold"
                    style={{ color: 'var(--teal)' }}
                  >
                    ₩11,500
                  </span>{' '}
                  을{' '}
                  <span
                    style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                    }}
                  >
                    버거킹
                  </span>{' '}
                  에서 사용했어요.
                </div>
                <div
                  className="mt-2 text-[11px] num"
                  style={{ color: 'var(--ink-3)' }}
                >
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
