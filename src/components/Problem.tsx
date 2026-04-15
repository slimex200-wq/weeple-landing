'use client'

/**
 * Problem — "왜 가계부는 3개월 안에 버려지는가" 섹션.
 *
 * 21st 패턴: 거대 숫자 카운트업 + 단어별 reveal (whileInView stagger).
 * 3가지 이유는 circle-bg 아이콘 없이 세로 리스트 + hairline divider 로 정리.
 * (anti-slop #9 — 3-column feature grid with circle-background icons 회피)
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'motion/react'

const HEADLINE_WORDS = ['왜', '가계부는', '3개월', '안에', '버려지는가']

type Reason = {
  title: string
  detail: string
}

const REASONS: Reason[] = [
  {
    title: '너무 복잡해',
    detail:
      '카테고리 분류만 5분. 입력 폼이 영수증보다 길다. 한 건 찍는데 탭이 여섯 번.',
  },
  {
    title: '너무 귀찮아',
    detail:
      '영수증 한 장 찾는 데 1분. 일주일 모이면 30분. 월말엔 그냥 포기.',
  },
  {
    title: '혼자 하기 싫어',
    detail:
      '커플이라면 더 힘든 이야기. 누가 얼마 냈는지 기억도 안 남. 결국 한쪽만 한다.',
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
      className="relative py-32 sm:py-40 px-6 overflow-hidden"
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
          문제
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

        {/* 거대 숫자 — v2 teal 그라디언트 */}
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
                'linear-gradient(180deg, #1A1A1A 0%, #0EA5A0 55%, #CCFBF1 100%)',
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

        {/* 3가지 이유 — 세로 리스트 + hairline divider. circle-bg 아이콘 없음. */}
        <div className="max-w-3xl mx-auto">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: 0.1 * i,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className={`grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 py-8 sm:py-10 ${
                i !== REASONS.length - 1 ? 'border-b border-border-light' : ''
              }`}
            >
              <div
                className="num text-sm font-semibold text-coral tracking-wider"
                aria-hidden
              >
                0{i + 1}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-fg leading-tight">
                {reason.title}
              </h3>
              <div className="hidden sm:block" aria-hidden />
              <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
                {reason.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
