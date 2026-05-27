'use client'

import { motion, useReducedMotion } from 'motion/react'

const POINTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: '기기를 잃어도 안전',
    detail: '모든 데이터는 기기 내 암호화 저장. 분실해도 제3자가 접근할 수 없습니다.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: '전송 중에도 보호',
    detail: '서버와 기기 사이 모든 통신은 은행 수준 암호화. 누구도 중간에서 엿볼 수 없어요.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    title: '다른 사람은 절대 못 봐요',
    detail: '커플이어도 개인 지출은 완전 분리. 공동 지출만 공유되고, 나머지는 당신만의 것.',
  },
]

export default function Trust() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="trust"
      className="relative py-16 sm:py-20 px-6"
      aria-label="보안과 프라이버시"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
              Trust & Privacy
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-normal mb-6">
              파트너와도
              <br />
              나누지 못하는
              <br />
              <span className="text-fg-muted">숫자가 있습니다.</span>
            </h2>
            <p className="text-base sm:text-lg text-fg-secondary leading-relaxed max-w-xl">
              weeple 은 민감 데이터를 기기와 서버 양쪽에서 암호화합니다.
              공동 지출은 공유, 개인 기록은 당신만의 것.
            </p>
          </motion.div>

          {/* Right — shield + cards */}
          <div className="space-y-4">
            {/* Shield visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex justify-center mb-6"
            >
              <div className="relative w-20 h-24 sm:w-24 sm:h-28">
                <svg viewBox="0 0 96 112" fill="none" className="w-full h-full">
                  <motion.path
                    d="M48 4L8 24v32c0 28 40 48 40 48s40-20 40-48V24L48 4z"
                    stroke="#0EA5A0"
                    strokeWidth="2"
                    fill="rgba(14,165,160,0.08)"
                    initial={{ pathLength: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M36 56l8 8 16-16"
                    stroke="#0EA5A0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Cards */}
            {POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="glass rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-mint-bg flex items-center justify-center text-mint shrink-0">
                  <div className="w-5 h-5">{point.icon}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="num text-[10px] text-fg-muted">0{i + 1}</span>
                    <h3 className="text-base font-bold text-fg">{point.title}</h3>
                  </div>
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    {point.detail}
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
