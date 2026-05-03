'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'

type Chapter = {
  eyebrow: string
  title: string
  accent?: string
  body: string
}

type DemoCase = {
  input: string
  category: string
  amount: string
  icon: React.ReactNode
}

const CHAPTERS: Chapter[] = [
  {
    eyebrow: 'Smart couple budget',
    title: '둘이 쓰는 돈,',
    accent: '한눈에 weeple.',
    body: '개인 소비부터 커플 공동 예산까지. 자연어 빠른 입력, 영수증 OCR, 실시간 공유, AI 분석이 한 앱에.',
  },
  {
    eyebrow: 'Natural input',
    title: '3초면 끝.',
    accent: '진짜로.',
    body: '"스타벅스 4500원" 한 줄만 치면 카테고리 · 날짜 · 금액까지 자동 분류. 이제 가계부 앱 못 돌아감.',
  },
]

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

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const scrollYProgress = useMotionValue(0)
  const [caseIndex, setCaseIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const currentCase = CASES[caseIndex]

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const viewportHeight = window.innerHeight
      const totalScroll = section.offsetHeight - viewportHeight
      if (totalScroll <= 0) { scrollYProgress.set(0); return }
      const rect = section.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, -rect.top / totalScroll))
      scrollYProgress.set(p)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [scrollYProgress])

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
      ref={sectionRef}
      aria-label="weeple 히어로"
      className="relative"
      style={{ minHeight: (prefersReducedMotion || isMobile) ? '100svh' : '150svh' }}
    >
      <div className={`${isMobile ? '' : 'sticky top-0'} h-screen w-full overflow-hidden`}>
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 20% 20%, rgba(14,165,160,0.12), transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 70%, rgba(125,211,252,0.1), transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(94,234,212,0.08), transparent 70%)
            `,
          }}
        />

        <h1 className="sr-only">둘이 쓰는 돈, 한눈에 weeple.</h1>

        <div className="relative h-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 md:gap-12 items-center px-5 sm:px-10 pt-16 sm:pt-24 pb-6 sm:pb-10 max-w-6xl mx-auto">
          {isMobile ? (
            <div className="flex flex-col justify-center">
              <div className="text-[10px] font-semibold tracking-[0.15em] text-mint uppercase mb-3">
                {CHAPTERS[0].eyebrow}
              </div>
              <h2 className="text-3xl font-extrabold leading-[0.96] tracking-[-0.04em] mb-1.5 text-fg">
                {CHAPTERS[0].title}
              </h2>
              {CHAPTERS[0].accent && (
                <h2
                  className="text-3xl font-extrabold leading-[0.96] tracking-[-0.04em] mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #0EA5A0 0%, #5EEAD4 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {CHAPTERS[0].accent}
                </h2>
              )}
              <p className="max-w-md text-sm text-fg-secondary leading-relaxed">
                {CHAPTERS[0].body}
              </p>
              <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-mint/30 bg-mint-bg px-3 py-1 text-xs font-semibold text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
                Android 우선 출시 · iOS 준비 중
              </div>
            </div>
          ) : (
            <div className="relative min-h-[280px] md:min-h-[360px]">
              {CHAPTERS.map((c, i) => (
                <ChapterBlock
                  key={i}
                  chapter={c}
                  index={i}
                  total={CHAPTERS.length}
                  progress={scrollYProgress}
                  prefersReducedMotion={!!prefersReducedMotion}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="hidden sm:flex justify-center"
          >
            <div
              className="relative w-[180px] sm:w-[280px] md:w-[320px] rounded-[32px] sm:rounded-[40px] glass p-2 sm:p-3 shadow-[0_40px_100px_-20px_rgba(14,165,160,0.2)]"
              style={{ aspectRatio: '9/18' }}
            >
              <div className="h-full w-full rounded-[26px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#F0F4F1] to-[#E5EDE8] flex flex-col p-3 pt-5 sm:p-5 sm:pt-8">
                <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-fg-muted mb-3 sm:mb-6">
                  <span className="num">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 rounded-sm border border-fg-muted">
                      <div className="w-3/4 h-full bg-fg-muted rounded-sm" />
                    </div>
                  </div>
                </div>

                <h3 className="text-[9px] sm:text-[11px] font-semibold text-fg-muted uppercase tracking-wider mb-1.5 sm:mb-2">
                  새 거래
                </h3>

                <div className="relative rounded-xl border border-mint/40 bg-white/50 px-3 py-2.5 sm:px-4 sm:py-3.5 mb-3 sm:mb-5">
                  <div className="flex items-center gap-2 min-h-[1rem] sm:min-h-[1.25rem]">
                    <span className="num text-sm sm:text-base text-fg">{typed}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-[2px] h-5 bg-mint"
                      aria-hidden
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{
                    opacity: showResult ? 1 : 0,
                    scale: showResult ? 1 : 0.92,
                    y: showResult ? 0 : 12,
                  }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className="rounded-xl glass p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-mint-bg">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-mint">
                        {currentCase.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-mint">
                        {currentCase.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-fg-muted num">오늘</span>
                  </div>
                  <div className="num text-lg sm:text-2xl font-extrabold text-fg tracking-tight">
                    {currentCase.amount}
                  </div>
                  <div className="mt-2 sm:mt-3 flex items-center gap-1.5 text-[9px] sm:text-[10px] text-[#0f766e]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
                    </svg>
                    <span>저축률 실시간 반영</span>
                  </div>
                </motion.div>

                <div className="mt-auto space-y-2" aria-hidden>
                  <div className="h-8 rounded-lg bg-white/30" />
                  <div className="h-8 rounded-lg bg-white/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ScrollHint progress={scrollYProgress} prefersReducedMotion={!!prefersReducedMotion} />
      </div>
    </section>
  )
}

function ChapterBlock({
  chapter, index, total, progress, prefersReducedMotion,
}: {
  chapter: Chapter; index: number; total: number;
  progress: MotionValue<number>; prefersReducedMotion: boolean;
}) {
  const slot = 1 / total
  const start = index * slot
  const end = start + slot
  const enterEnd = start + slot * 0.25
  const exitStart = end - slot * 0.25

  const opacity = useTransform(
    progress,
    index === 0 ? [0, enterEnd, exitStart, end] : [start, enterEnd, exitStart, end],
    index === 0
      ? (prefersReducedMotion ? [1,1,1,1] : [1,1,1,0])
      : (prefersReducedMotion ? [1,1,1,1] : [0,1,1,0]),
  )
  const y = useTransform(
    progress,
    index === 0 ? [0, enterEnd, exitStart, end] : [start, enterEnd, exitStart, end],
    index === 0
      ? (prefersReducedMotion ? [0,0,0,0] : [0,0,0,-60])
      : (prefersReducedMotion ? [0,0,0,0] : [60,0,0,-60]),
  )

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <div className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-mint uppercase mb-3 sm:mb-5">
        {chapter.eyebrow}
      </div>
      <h2 className="text-2xl sm:text-5xl md:text-6xl font-extrabold leading-[0.96] tracking-[-0.04em] mb-1.5 sm:mb-3 text-fg">
        {chapter.title}
      </h2>
      {chapter.accent && (
        <h2
          className="text-2xl sm:text-5xl md:text-6xl font-extrabold leading-[0.96] tracking-[-0.04em] mb-3 sm:mb-6"
          style={{
            background: 'linear-gradient(135deg, #0EA5A0 0%, #5EEAD4 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {chapter.accent}
        </h2>
      )}
      <p className="max-w-md text-sm sm:text-lg text-fg-secondary leading-relaxed mb-4 sm:mb-6">
        {chapter.body}
      </p>
      {index === 0 && (
        <div className="mb-4 sm:mb-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-mint/30 bg-mint-bg px-3 py-1 text-xs font-semibold text-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
          Android 우선 출시 · iOS 준비 중
        </div>
      )}
      {index === 1 && (
        <div className="space-y-2 sm:space-y-3 max-w-md">
          {[
            { n: '01', title: '한 줄 입력', body: '자연어 한 줄. 콤마·단위 자유.' },
            { n: '02', title: 'AI 자동 분류', body: '카테고리·금액·날짜 바로 태깅.' },
            { n: '03', title: '대시보드 반영', body: '저축률·예산·공유 기록 즉시 업데이트.' },
          ].map((s) => (
            <div
              key={s.n}
              className="flex gap-2 sm:gap-3 rounded-xl p-2 sm:p-3 glass"
            >
              <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg border border-mint/40 bg-mint-bg flex items-center justify-center num text-[9px] sm:text-[11px] font-bold text-mint">
                {s.n}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-fg leading-tight">{s.title}</h4>
                <p className="text-[10px] sm:text-xs text-fg-secondary leading-snug mt-0.5">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function ScrollHint({ progress, prefersReducedMotion }: { progress: MotionValue<number>; prefersReducedMotion: boolean }) {
  const opacity = useTransform(progress, [0, 0.15], [1, 0])
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted text-xs pointer-events-none"
    >
      <span className="tracking-wider">스크롤해서 더 보기</span>
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[1px] h-8 bg-gradient-to-b from-fg-muted to-transparent"
        aria-hidden
      />
    </motion.div>
  )
}
