'use client'

/**
 * Problem — Editorial Warm v2.
 *
 * 21st 패턴 (unchanged):
 *   - 단어별 reveal 헤드라인 (stagger)
 *   - 거대 숫자 카운트업 (whileInView)
 *   - 3 reasons 세로 리스트 + hairline divider (no circle-bg icons)
 *
 * Editorial Warm:
 *   - Display: Instrument Serif (serif, near-black)
 *   - Stat 93: serif, solid ink + small sans-serif teal sup
 *   - 01/02/03 numbers: Geist Mono in teal
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
        {/* eyebrow — short leading rule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-8"
          style={{ color: 'var(--teal)' }}
        >
          <span
            aria-hidden
            className="inline-block w-7 h-px"
            style={{ background: 'var(--teal)' }}
          />
          문제
        </motion.div>

        {/* 단어별 reveal 헤드라인 — Instrument Serif */}
        <h2
          className="leading-[1.02] mb-16 sm:mb-20"
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            letterSpacing: '-0.025em',
            color: 'var(--ink)',
          }}
        >
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
              style={
                // "3개월" 만 italic teal 로 액센트
                w === '3개월'
                  ? { fontStyle: 'italic', color: 'var(--teal)' }
                  : undefined
              }
            >
              {w}
            </motion.span>
          ))}
        </h2>

        {/* 거대 숫자 — serif, solid ink + sup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-2"
        >
          <div
            className="leading-[0.82]"
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(10rem, 22vw, 22rem)',
              letterSpacing: '-0.04em',
              color: 'var(--ink)',
            }}
          >
            <CountUp target={93} />
            <sup
              className="align-top font-semibold"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.22em',
                color: 'var(--teal)',
                marginLeft: '0.08em',
                top: '0.5em',
                position: 'relative',
              }}
            >
              %
            </sup>
          </div>
        </motion.div>

        {/* 출처 설명 — hairline 위 캡션 스타일 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto text-center text-sm leading-relaxed mb-20 sm:mb-28 max-w-xl pt-4"
          style={{
            color: 'var(--ink-3)',
            borderTop: '1px solid var(--rule)',
          }}
        >
          통계청 가계금융복지조사 · 2024 — 가계부 시작 후 90일 내 포기 비율
        </motion.p>

        {/* 3가지 이유 — 세로 리스트 + hairline. circle-bg 없음. */}
        <div
          className="max-w-4xl mx-auto"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
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
              className="grid grid-cols-[80px_1fr] md:grid-cols-[90px_1fr_1.2fr] gap-x-8 gap-y-2 py-8 sm:py-10 items-baseline"
              style={{
                borderBottom: '1px solid var(--rule)',
              }}
            >
              <div
                className="num text-xs font-medium tracking-[0.08em]"
                style={{ color: 'var(--teal)' }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3
                className="leading-tight"
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.75rem, 2.4vw, 2rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                {reason.title}
              </h3>
              <p
                className="text-[15px] leading-relaxed col-start-2 md:col-start-3 md:row-start-1"
                style={{ color: 'var(--ink-2)' }}
              >
                {reason.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
