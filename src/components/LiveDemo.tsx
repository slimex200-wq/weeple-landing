'use client'

/**
 * LiveDemo — "3초 입력" 라이브 시연 섹션.
 *
 * 21st 패턴: 자동 타이핑 + 결과 카드 fade-in.
 * 실제 앱 자연어 입력 포맷(줄임말, 단위 생략 등)을 그대로 보여준다.
 *
 * 루프: 타이핑 → 카테고리 칩 pop-in → 2s 유지 → reset.
 * 폰 목업 프레임만 off-black 하드코딩 유지 (실제 기기 색감).
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
      // 정적: 첫 케이스 완성된 상태로 고정
      setTyped(CASES[0].input)
      setShowResult(true)
      return
    }

    let charIndex = 0
    setTyped('')
    setShowResult(false)

    // 글자별 타이핑
    const typingTimer = setInterval(() => {
      charIndex += 1
      if (charIndex > currentCase.input.length) {
        clearInterval(typingTimer)
        // 0.5s 대기 후 결과 카드 표시
        setTimeout(() => setShowResult(true), 500)
        // 2.5s 유지 후 다음 케이스로
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
          <div className="text-xs font-semibold tracking-wider text-coral uppercase mb-4">
            라이브 데모
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-fg">
            3초면 끝.
            <br />
            <span className="text-fg-muted">진짜로.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed max-w-2xl">
            카테고리 고르지 마세요. 금액 칸 따로 찾지 마세요. 한 줄만 치세요.
            나머지는 weeple 이 합니다.
          </p>
        </motion.div>

        {/* 2열 레이아웃 */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* 폰 목업 — off-black 프레임은 실제 기기 색감 표현용으로 하드코딩 유지 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex justify-center"
          >
            <div
              className="relative w-[320px] sm:w-[360px] rounded-[40px] border-8 border-[#1a1a1a] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.04)]"
              style={{ aspectRatio: '9/18' }}
            >
              {/* Notch — 기기 프레임 일부 */}
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-[#1a1a1a]"
                aria-hidden
              />
              {/* 내부 */}
              <div className="h-full w-full rounded-[32px] overflow-hidden flex flex-col p-5 pt-10">
                {/* 상단 바 */}
                <div className="flex items-center justify-between text-[10px] text-fg-muted mb-6">
                  <span className="num">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 rounded-sm border border-fg-muted">
                      <div className="w-3/4 h-full bg-fg-muted rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* 타이틀 */}
                <h3 className="text-[11px] font-semibold text-fg-muted uppercase tracking-wider mb-2">
                  새 거래
                </h3>

                {/* 입력 필드 */}
                <div className="relative rounded-xl border border-coral/40 bg-bg-input px-4 py-3.5 mb-5">
                  <div className="flex items-center gap-2 min-h-[1.25rem]">
                    <span className="num text-base text-fg">{typed}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="inline-block w-[2px] h-5 bg-coral"
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
                  className="rounded-xl border border-border-light bg-bg-card p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-coral-bg">
                      <div className="w-3.5 h-3.5 text-coral">
                        {currentCase.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-coral">
                        {currentCase.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-fg-muted num">오늘</span>
                  </div>
                  <div className="num text-2xl font-extrabold text-fg tracking-tight">
                    {currentCase.amount}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-coral">
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
                  <div className="h-8 rounded-lg bg-bg-input" />
                  <div className="h-8 rounded-lg bg-bg-input" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 단계 설명 */}
          <div className="space-y-6">
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
                className="flex gap-5 rounded-2xl p-6 bg-bg-card border border-border-light hover:border-coral/40 transition-colors duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl border border-coral/40 bg-coral-bg flex items-center justify-center num text-sm font-bold text-coral">
                  {step.n}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-fg mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-sm text-fg-secondary leading-relaxed">
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
