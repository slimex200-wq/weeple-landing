'use client'

/**
 * Problem — "왜 가계부는 3개월 안에 버려지는가" 섹션.
 *
 * 21st 패턴: 거대 숫자 카운트업 + 단어별 reveal (whileInView stagger).
 * 코드는 통으로 가져오지 않고 motion/react 로 직접 작성.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'motion/react'

const HEADLINE_WORDS = ['왜', '가계부는', '3개월', '안에', '버려지는가']

type Reason = {
  title: string
  detail: string
  icon: React.ReactNode
}

const REASONS: Reason[] = [
  {
    title: '너무 복잡해',
    detail: '카테고리 분류만 5분. 입력 폼이 영수증보다 길다.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
        <circle cx="20" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: '너무 귀찮아',
    detail: '영수증 한 장 찾는 데 1분. 일주일 모이면 30분.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: '혼자 하기 싫어',
    detail: '커플·신혼·부부라면 더 힘든 이야기. 누가 얼마 냈는지 기억도 안 남.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="9" cy="10" r="3" />
        <circle cx="16" cy="10" r="3" />
        <path d="M4 20c0-2.8 2.2-5 5-5M12 20c0-2.8 2.2-5 5-5" strokeLinecap="round" />
      </svg>
    ),
  },
]

function CountUp({ target }: { target: number }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(prefersReducedMotion ? target : 0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      setValue(target)
      return
    }
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, prefersReducedMotion])

  return <span ref={ref}>{value}</span>
}

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative py-32 sm:py-40 px-6 overflow-hidden bg-[#050505]"
      aria-label="문제 인식"
    >
      <div className="max-w-6xl mx-auto">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-wider text-coral uppercase mb-6 text-center"
        >
          The Problem
        </motion.div>

        {/* 단어별 reveal 헤드라인 */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-center mb-16 sm:mb-20">
          {HEADLINE_WORDS.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: 0.08 * i,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </h2>

        {/* 거대 숫자 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-4"
        >
          <div
            className="num font-extrabold tracking-[-0.05em] leading-[0.85]"
            style={{
              fontSize: 'clamp(10rem, 22vw, 22rem)',
              background:
                'linear-gradient(180deg, #F97066 0%, #D4533F 60%, rgba(212,83,63,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            <CountUp target={93} />
            <span className="text-[0.4em] align-top ml-2">%</span>
          </div>
        </motion.div>

        {/* 출처 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center text-sm sm:text-base text-fg-muted mb-20 sm:mb-28 max-w-xl mx-auto leading-relaxed"
        >
          통계청 가계금융복지조사 · 2024 — 가계부 시작 후 90일 내 포기 비율
        </motion.p>

        {/* 3가지 이유 */}
        <div className="grid gap-6 sm:grid-cols-3">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: 0.1 * i,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="relative rounded-2xl p-8 bg-bg-card border border-border-light hover:border-coral/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-coral-bg flex items-center justify-center text-coral mb-5">
                <div className="w-6 h-6">{reason.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-fg mb-3">{reason.title}</h3>
              <p className="text-sm text-fg-secondary leading-relaxed">
                {reason.detail}
              </p>
              <div
                className="num absolute top-6 right-6 text-xs text-fg-muted"
                aria-hidden
              >
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
