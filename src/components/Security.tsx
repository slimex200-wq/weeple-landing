'use client'

/**
 * Security — Editorial Warm v2.
 *
 * 패턴 (unchanged):
 *   - SVG lock + 흐름도 (pathLength 애니메이션)
 *   - 주변 4 노드 (기기/TLS/RLS/Supabase) fade-in
 *   - 3 포인트 리스트 with 인라인 SVG icons
 *
 * Editorial Warm:
 *   - 섹션 bg 상속 (paper), 상하 hairline border
 *   - 헤드라인: Instrument Serif + italic teal "숫자가 있습니다"
 *   - SVG 노드: white fill + teal stroke
 *   - 포인트 카드: white + hairline + shadow-1, circle-bg 아이콘 제거
 */

import { motion, useReducedMotion } from 'motion/react'

type Point = {
  num: string
  title: string
  body: string
  icon: React.ReactNode
}

const POINTS: Point[] = [
  {
    num: '01',
    title: '기기 내 토큰 보호',
    body: '로그인 토큰은 SecureStore (iOS Keychain / Android Keystore) 하드웨어 키 체인에만 저장됩니다. 앱이 삭제되면 함께 사라집니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="12" cy="16" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '커플 데이터 구획화',
    body: '거래마다 is_shared 플래그로 "공동" / "개인" 을 구분합니다. 파트너는 공유된 거래만 볼 수 있고, 개인 거래는 당신 계정에서만 보입니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="9" cy="10" r="3" />
        <circle cx="16" cy="10" r="3" />
        <path d="M4 20c0-2.8 2.2-5 5-5M12 20c0-2.8 2.2-5 5-5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Supabase RLS',
    body: 'Row Level Security 로 타인 데이터는 DB 쿼리 레벨에서 차단. TLS 1.3 전송 암호화가 기본입니다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
        <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
      </svg>
    ),
  },
]

export default function Security() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="security"
      className="relative py-32 px-6"
      style={{
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
      }}
      aria-label="보안"
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
            보안
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
            파트너와도 나누지 못하는
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--teal)' }}>
              숫자가 있습니다.
            </span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--ink-2)' }}
          >
            weeple 은 공동 지출과 개인 기록을 서버 단에서 분리합니다.
            공유할 것만 공유되고, 나머지는 당신만의 것.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          {/* 자물쇠 + 흐름도 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto w-full max-w-[460px] aspect-square"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              role="img"
              aria-label="기기 → TLS → Supabase → RLS 로 이어지는 암호화 흐름도"
            >
              <defs>
                <linearGradient id="lock-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F766E" />
                  <stop offset="100%" stopColor="#0B5E58" />
                </linearGradient>
              </defs>

              {/* 중앙 자물쇠 */}
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ transformOrigin: '200px 200px' }}
              >
                {/* 바디 — white fill + teal stroke */}
                <rect
                  x="140"
                  y="180"
                  width="120"
                  height="100"
                  rx="14"
                  fill="#FFFFFF"
                  stroke="url(#lock-grad)"
                  strokeWidth="2"
                />
                {/* Shackle */}
                <motion.path
                  d="M 160 180 L 160 150 Q 160 120 200 120 Q 240 120 240 150 L 240 180"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                />
                {/* 키홀 */}
                <circle cx="200" cy="220" r="7" fill="#0F766E" />
                <rect x="197" y="224" width="6" height="14" fill="#0F766E" />
              </motion.g>

              {/* 주변 노드 4개 — white fill, teal stroke */}
              {[
                { x: 60, y: 80, label: '기기' },
                { x: 340, y: 80, label: 'TLS' },
                { x: 60, y: 340, label: 'RLS' },
                { x: 340, y: 340, label: 'Supabase' },
              ].map((node, i) => (
                <motion.g
                  key={node.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="24"
                    fill="#FFFFFF"
                    stroke="#0F766E"
                    strokeWidth="1.2"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="#1A1410"
                    fontSize="10"
                    fontFamily="var(--sans)"
                    fontWeight="600"
                    letterSpacing="0.03em"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}

              {/* 흐름 화살표 */}
              {[
                'M 82 100 Q 150 140 170 180',
                'M 318 100 Q 250 140 230 180',
                'M 82 320 Q 150 260 170 280',
                'M 318 320 Q 250 260 230 280',
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                  initial={prefersReducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
                  whileInView={
                    prefersReducedMotion ? undefined : { pathLength: 1, opacity: 0.7 }
                  }
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 1.2,
                    delay: 1 + i * 0.18,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* 3 포인트 — hairline 구분, circle-bg 없음 */}
          <ol className="space-y-0">
            {POINTS.map((point, i) => (
              <motion.li
                key={point.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="flex gap-5 py-7"
                style={{
                  borderTop: i === 0 ? '1px solid var(--rule)' : 'none',
                  borderBottom: '1px solid var(--rule)',
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 flex items-start"
                  style={{ color: 'var(--teal)' }}
                >
                  <div className="w-7 h-7 mt-0.5">{point.icon}</div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span
                      className="num text-[11px] tracking-[0.08em]"
                      style={{ color: 'var(--teal)' }}
                    >
                      {point.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--serif)',
                        fontWeight: 400,
                        fontSize: '1.375rem',
                        letterSpacing: '-0.015em',
                        color: 'var(--ink)',
                        lineHeight: 1.15,
                      }}
                    >
                      {point.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--ink-2)' }}
                  >
                    {point.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
