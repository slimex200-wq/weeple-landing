'use client'

/**
 * LiveDemo — "3초 입력" 라이브 시연 섹션.
 *
 * 라이트 모드 섹션 (#fafafa 배경). 다른 다크 섹션들 사이에서 강한 대비를 만든다.
 * 21st 패턴: 자동 타이핑 + 결과 카드 fade-in (터미널/입력창 데모).
 *
 * 루프: 타이핑 → 카테고리 칩 pop-in → 2s 유지 → reset.
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
    input: '스타벅스 4500원',
    category: '카페',
    amount: '₩4,500',
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
    body: '「스타벅스 4500원」 같은 자연어 한 줄. 콤마, 단위 표기 자유.',
  },
  {
    n: '02',
    title: 'AI 자동 분류',
    body: '카테고리, 금액, 날짜를 분리해 바로 태깅. 수동 선택 필요 없음.',
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
      className="relative py-32 sm:py-40 px-6 overflow-hidden bg-[#fafafa]"
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
          <div className="text-xs font-semibold tracking-wider text-[#D4533F] uppercase mb-4">
            Live demo
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-[#0a0a0a]">
            3초면 끝.
            <br />
            <span className="text-[#808080]">진짜로.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#606060] leading-relaxed max-w-2xl">
            카테고리 고르지 마세요. 금액 칸 따로 찾지 마세요. 한 줄만 치세요.
            나머지는 weeple 이 합니다.
          </p>
        </motion.div>

        {/* 2열 레이아웃 */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* 폰 목업 */}
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
              {/* Notch */}
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-[#1a1a1a]"
                aria-hidden
              />
              {/* 내부 */}
              <div className="h-full w-full rounded-[32px] overflow-hidden flex flex-col p-5 pt-10">
                {/* 상단 바 */}
                <div className="flex items-center justify-between text-[10px] text-[#808080] mb-6">
                  <span className="num">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 rounded-sm border border-[#808080]">
                      <div className="w-3/4 h-full bg-[#808080] rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* 타이틀 */}
                <h3 className="text-[11px] font-semibold text-[#808080] uppercase tracking-wider mb-2">
                  새 거래
                </h3>

                {/* 입력 필드 */}
                <div className="relative rounded-xl border border-coral/40 bg-[#f8f8f8] px-4 py-3.5 mb-5">
                  <div className="flex items-center gap-2 min-h-[1.25rem]">
                    <span className="num text-base text-[#0a0a0a]">{typed}</span>
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
                  className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-coral/10">
                      <div className="w-3.5 h-3.5 text-[#D4533F]">
                        {currentCase.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-[#D4533F]">
                        {currentCase.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#808080] num">오늘</span>
                  </div>
                  <div className="num text-2xl font-extrabold text-[#0a0a0a] tracking-tight">
                    {currentCase.amount}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#0f766e]">
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
                    <span>저축률 실시간 반영</span>
                  </div>
                </motion.div>

                {/* 하단 플레이스홀더 */}
                <div className="mt-auto space-y-2" aria-hidden>
                  <div className="h-8 rounded-lg bg-[#f0f0f0]" />
                  <div className="h-8 rounded-lg bg-[#f0f0f0]" />
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
                className="flex gap-5 rounded-2xl p-6 bg-white border border-[#e5e5e5] hover:border-coral/40 transition-colors duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl border border-coral/40 bg-coral/10 flex items-center justify-center num text-sm font-bold text-[#D4533F]">
                  {step.n}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0a0a0a] mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#606060] leading-relaxed">
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
