'use client'

/**
 * Security — 커플 데이터 분리 + 서버 보안 섹션.
 *
 * weeple 실제 보안 스택:
 *   - 기기: SecureStore (iOS Keychain / Android Keystore) 로 토큰 저장
 *   - 전송: Supabase TLS 1.3
 *   - 서버: Row Level Security + is_shared 플래그로 커플 데이터 구획화
 *
 * 21st 패턴: SVG path + pathLength 애니메이션 (선이 그려지는 효과).
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
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
      className="relative py-32 px-6 border-y border-border-light"
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
          <div className="text-xs font-semibold tracking-wider text-coral uppercase mb-4">
            보안
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            파트너와도 나누지 못하는
            <br />
            <span className="text-fg-muted">숫자가 있습니다.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
            weeple 은 공동 지출과 개인 기록을 서버 단에서 분리합니다.
            공유할 것만 공유되고, 나머지는 당신만의 것.
          </p>
        </motion.div>

        {/* 2열 — SVG 흐름도 + 3 포인트 */}
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
                  <stop offset="0%" stopColor="#0EA5A0" />
                  <stop offset="100%" stopColor="#5EEAD4" />
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
                {/* 자물쇠 바디 */}
                <rect
                  x="140"
                  y="180"
                  width="120"
                  height="100"
                  rx="14"
                  fill="url(#lock-grad)"
                  opacity="0.15"
                  stroke="url(#lock-grad)"
                  strokeWidth="2"
                />
                {/* Shackle — closed path */}
                <motion.path
                  d="M 160 180 L 160 150 Q 160 120 200 120 Q 240 120 240 150 L 240 180"
                  fill="none"
                  stroke="#0EA5A0"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? undefined : { pathLength: 0 }}
                  whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                />
                {/* 키홀 */}
                <circle cx="200" cy="220" r="7" fill="#0EA5A0" />
                <rect x="197" y="224" width="6" height="14" fill="#0EA5A0" />
              </motion.g>

              {/* 주변 노드 4개 */}
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
                    r="22"
                    fill="#F7F9F4"
                    stroke="rgba(14,165,160,0.3)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="#4A4F58"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}

              {/* 흐름 화살표 — strokeDasharray 로 "그려지는" 효과 */}
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
                  stroke="#0EA5A0"
                  strokeWidth="1.5"
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

          {/* 3 포인트 */}
          <div className="space-y-5">
            {POINTS.map((point, i) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="flex gap-5 rounded-2xl p-6 bg-bg-card border border-border-light hover:border-coral/30 transition-colors duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-coral-bg text-coral flex items-center justify-center">
                  <div className="w-6 h-6">{point.icon}</div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="num text-xs text-fg-muted">{point.num}</span>
                    <h3 className="text-lg font-bold text-fg">{point.title}</h3>
                  </div>
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
