'use client'

/**
 * LiveDemo — Editorial Warm v2.
 *
 * 패턴 (unchanged):
 *   - 자동 타이핑 + 결과 카드 fade-in
 *   - 3 cases 루프 (스벅/버거킹/택시)
 *   - STEPS 3단 (01/02/03)
 *
 * Editorial Warm:
 *   - 헤드라인: Instrument Serif + italic teal accent
 *   - 폰 프레임(#1a1a1a) 유지 (실기기 색감)
 *   - 스텝 카드: white + hairline + soft shadow
 *   - 금액(.num) Geist Mono
 */

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type DemoCase = {
  input: string
  category: string
  amount: string
  icon: React.ReactNode
}

const CASES: DemoCase[] = [
  {
    input: '스벅 6500',
    category: '카페',
    amount: '₩6,500',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M8 2v4M16 2v4" strokeLinecap="round" />
        <path d="M4 8h13a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8z" />
      </svg>
    ),
  },
  {
    input: '버거킹 12000',
    category: '식비',
    amount: '₩12,000',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 10a8 8 0 0 1 16 0" strokeLinecap="round" />
        <path d="M3 14h18M5 18h14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    input: '택시 9800',
    category: '교통',
    amount: '₩9,800',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11M4 11h16v6H4z" />
        <circle cx="8" cy="15" r="1.2" fill="currentColor" />
        <circle cx="16" cy="15" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    n: '01',
    title: '한 줄 입력',
    body: '「스벅 6500」 같은 자연어 한 줄. 줄임말, 단위 생략 모두 인식.',
  },
  {
    n: '02',
    title: 'AI 자동 분류',
    body: '카테고리, 금액, 날짜를 분리해 바로 태깅. 92–94% 신뢰도.',
  },
  {
    n: '03',
    title: '대시보드 반영',
    body: '저축률, 남은 예산, 파트너 공유 기록이 즉시 업데이트.',
  },
]

export default function LiveDemo() {
  const prefersReducedMotion = useReducedMotion()
  const [caseIndex, setCaseIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [showResult, setShowResult] = useState(false)

  const currentCase = CASES[caseIndex]

  useEffect(() => {
    if (prefersReducedMotion) {
      setTyped(CASES[0].input)
      setShowResult(true)
      return
    }

    let charIndex = 0
    setTyped('')
    setShowResult(false)

    const typingTimer = setInterval(() => {
      charIndex += 1
      if (charIndex > currentCase.input.length) {
        clearInterval(typingTimer)
        setTimeout(() => setShowResult(true), 500)
        setTimeout(() => {
          setCaseIndex((i) => (i + 1) % CASES.length)
        }, 3000)
        return
      }
      setTyped(currentCase.input.slice(0, charIndex))
    }, 80)

    return () => clearInterval(typingTimer)
  }, [caseIndex, prefersReducedMotion, currentCase.input])

  return (
    <section
      id="live-demo"
      className="relative py-32 sm:py-40 px-6 overflow-hidden"
      aria-label="라이브 데모"
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
            라이브 데모
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
            3초면 끝.
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--teal)' }}>
              진짜로.
            </span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--ink-2)' }}
          >
            카테고리 고르지 마세요. 금액 칸 따로 찾지 마세요. 한 줄만 치세요.
            나머지는 weeple 이 합니다.
          </p>
        </motion.div>

        {/* 2열 레이아웃 */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* 폰 목업 — #1a1a1a 프레임 유지(실기기 색감) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex justify-center"
          >
            <div
              className="relative w-[320px] sm:w-[360px] rounded-[40px] border-8"
              style={{
                borderColor: '#1a1a1a',
                background: 'var(--white)',
                aspectRatio: '9/18',
                boxShadow:
                  '0 40px 100px -20px rgba(26,20,16,0.22), 0 0 0 1px var(--rule-soft)',
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full"
                style={{ background: '#1a1a1a' }}
                aria-hidden
              />
              {/* 내부 */}
              <div className="h-full w-full rounded-[32px] overflow-hidden flex flex-col p-5 pt-10">
                {/* 상단 바 */}
                <div
                  className="flex items-center justify-between text-[10px] mb-6"
                  style={{ color: 'var(--ink-3)' }}
                >
                  <span className="num">9:41</span>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-4 h-2 rounded-sm"
                      style={{ border: '1px solid var(--ink-3)' }}
                    >
                      <div
                        className="w-3/4 h-full rounded-sm"
                        style={{ background: 'var(--ink-3)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 타이틀 */}
                <h3
                  className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--ink-3)' }}
                >
                  새 거래
                </h3>

                {/* 입력 필드 */}
                <div
                  className="relative rounded-xl px-4 py-3.5 mb-5"
                  style={{
                    border: '1px solid var(--teal)',
                    background: 'var(--paper-warm)',
                  }}
                >
                  <div className="flex items-center gap-2 min-h-[1.25rem]">
                    <span
                      className="num text-base"
                      style={{ color: 'var(--ink)' }}
                    >
                      {typed}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="inline-block w-[2px] h-5"
                      style={{ background: 'var(--teal)' }}
                      aria-hidden
                    />
                  </div>
                </div>

                {/* 결과 카드 */}
                <motion.div
                  animate={{
                    opacity: showResult ? 1 : 0,
                    scale: showResult ? 1 : 0.92,
                    y: showResult ? 0 : 12,
                  }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className="rounded-xl p-4"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--rule)',
                    boxShadow: 'var(--shadow-1)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--teal-soft)' }}
                    >
                      <div
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--teal)' }}
                      >
                        {currentCase.icon}
                      </div>
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: 'var(--teal)' }}
                      >
                        {currentCase.category}
                      </span>
                    </div>
                    <span
                      className="text-[10px] num"
                      style={{ color: 'var(--ink-3)' }}
                    >
                      오늘
                    </span>
                  </div>
                  <div
                    className="num text-2xl tracking-tight"
                    style={{
                      color: 'var(--ink)',
                      fontWeight: 500,
                    }}
                  >
                    {currentCase.amount}
                  </div>
                  <div
                    className="mt-3 flex items-center gap-1.5 text-[10px]"
                    style={{ color: 'var(--teal)' }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden
                    >
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
                    </svg>
                    <span>저축률 실시간 반영 · 신뢰도 94%</span>
                  </div>
                </motion.div>

                {/* 하단 플레이스홀더 */}
                <div className="mt-auto space-y-2" aria-hidden>
                  <div
                    className="h-8 rounded-lg"
                    style={{ background: 'var(--paper-warm)' }}
                  />
                  <div
                    className="h-8 rounded-lg"
                    style={{ background: 'var(--paper-warm)' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 단계 설명 */}
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.12 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="flex gap-5 rounded-2xl p-6 transition-colors duration-300"
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--rule)',
                  boxShadow: 'var(--shadow-1)',
                }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center num text-sm font-medium"
                  style={{
                    background: 'var(--teal-soft)',
                    color: 'var(--teal)',
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <h4
                    className="mb-1.5"
                    style={{
                      fontFamily: 'var(--serif)',
                      fontWeight: 400,
                      fontSize: '1.375rem',
                      letterSpacing: '-0.015em',
                      color: 'var(--ink)',
                      lineHeight: 1.15,
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--ink-2)' }}
                  >
                    {step.body}
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
