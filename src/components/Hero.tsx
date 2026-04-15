'use client'

/**
 * Hero — Editorial Warm v2 멀티 챕터 히어로.
 *
 * 구조(unchanged):
 *   - Sticky viewport (h-screen) 안에 4 챕터가 순차로 교체
 *   - 왼쪽: 챕터 텍스트 absolute 스택 (아래→위 slide + fade)
 *   - 오른쪽: 3D promo iframe 상주
 *   - 섹션 높이 320svh → 각 챕터 ~80svh 스크롤
 *
 * Editorial Warm 톤:
 *   - Paper bg (body::before 가 담당, 섹션은 투명)
 *   - 타이틀: Instrument Serif, 검정 solid (그라디언트 제거)
 *   - 액센트: Instrument Serif italic + deep teal
 *   - Watermark: barely-there ink stroke
 *   - Download card: white + shadow (glass 제거)
 */

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

const CHAPTERS: Chapter[] = [
  {
    eyebrow: '커플 가계부',
    title: '각자 통장은 따로,',
    accent: '대시보드는 같이.',
    body: '증여세 부담으로 통장 합치기 어려운 신혼·동거 커플을 위한 가계부. 공동 소비만 실시간 공유하고 개인 영역은 그대로 지켜요.',
  },
  {
    eyebrow: '자연어 입력',
    title: '말하거나, 찍거나,',
    accent: '한 줄이면 끝.',
    body: '음성으로 말해도, 영수증만 찍어도, "스벅 6500" 한 줄만 쳐도 AI가 카테고리·날짜·금액까지 자동 분류. 신뢰도 92–94%.',
  },
  {
    eyebrow: '함께 그리고 따로',
    title: '용돈은 따로,',
    accent: '목표는 같이.',
    body: '커플 타입 3가지(전액 공동·부분 공동·기여금)로 재정 스타일 맞춤. 파트너 개인 거래는 공유되지 않아요.',
  },
  {
    eyebrow: 'AI 분석',
    title: '왜 돈이 새는지,',
    accent: '3줄로.',
    body: '저축률, 카테고리 패턴, 다음달 예상을 한 번에. 월 1회 무료, 더 필요하면 크레딧 팩(10개 ₩9,900부터).',
  },
]

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const totalScroll = section.offsetHeight - viewportHeight
      if (totalScroll <= 0) {
        scrollYProgress.set(0)
        return
      }
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScroll))
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

  // Watermark 은 초반에만 은은하게 (paper 위의 warm ink stroke)
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // iframe 은 챕터 1이 끝나면서 등장하고 계속 유지
  const iframeOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1])
  const iframeScale = useTransform(scrollYProgress, [0.08, 0.22], [0.94, 1])

  return (
    <section
      ref={sectionRef}
      aria-label="weeple 히어로"
      className="relative"
      style={{
        minHeight: prefersReducedMotion ? '100svh' : '320svh',
      }}
    >
      {/* Sticky viewport — paper bg 비쳐 보임 */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 거대 워터마크 — warm ink stroke, 거의 안 보이게 */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ opacity: watermarkOpacity }}
        >
          <span
            className="whitespace-nowrap select-none italic"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(14rem, 30vw, 36rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(26, 20, 16, 0.06)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            weeple
          </span>
        </motion.div>

        {/* 상단 네비 */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 py-6">
          <div className="flex items-center gap-3">
            <div
              className="tracking-tight text-xl sm:text-2xl"
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}
            >
              weeple
              <span style={{ color: 'var(--teal)', fontStyle: 'normal' }}>.</span>
            </div>
            <span
              className="hidden sm:inline text-[11px] tracking-wide"
              style={{ color: 'var(--ink-3)' }}
            >
              커플 · 통장 따로, 대시보드는 같이
            </span>
          </div>

          {/* 플로팅 다운로드 카드 — white + hairline + soft shadow (no glass) */}
          <div
            className="hidden md:flex items-center gap-4 px-4 py-2.5 rounded-xl"
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule)',
              boxShadow: 'var(--shadow-2)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: 'var(--teal)',
                  color: 'var(--paper)',
                }}
                aria-hidden
              >
                <span
                  className="text-[12px]"
                  style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}
                >
                  w
                </span>
              </div>
              <div>
                <div
                  className="text-[11px] font-semibold"
                  style={{ color: 'var(--ink)' }}
                >
                  weeple · iOS · Android
                </div>
                <div
                  className="num text-[10px]"
                  style={{ color: 'var(--ink-3)' }}
                >
                  출시 준비 중 · iOS 17+ / Android 12+
                </div>
              </div>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
              }}
            >
              알림 신청
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* SR 전용 제목 */}
        <h1 className="sr-only">
          weeple — 각자 통장은 따로, 대시보드는 같이. 증여세 부담 없이 커플 재정 관리.
        </h1>

        {/* 메인 레이아웃: 좌 텍스트 / 우 iframe */}
        <div className="relative h-full grid grid-cols-1 md:grid-cols-[0.85fr_1.5fr] lg:grid-cols-[0.8fr_1.6fr] gap-6 md:gap-10 items-center px-6 sm:px-10 pt-24 pb-10">
          {/* LEFT — 4 챕터 absolute 스택 */}
          <div className="relative min-h-[360px] md:min-h-[460px]">
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

          {/* RIGHT — iframe 항상 보임 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              opacity: iframeOpacity,
              scale: iframeScale,
              height: isMobile ? '50vh' : '78vh',
              minHeight: isMobile ? 320 : 520,
              border: '1px solid var(--rule)',
              boxShadow: 'var(--shadow-3)',
              background: 'var(--white)',
            }}
          >
            <iframe
              src="/weeple-3d-promo.html"
              title="weeple 3D 미리보기"
              loading="lazy"
              className="w-full h-full block"
              style={{ border: 'none' }}
            />
          </motion.div>
        </div>

        {/* 스크롤 힌트 — 첫 챕터에만 */}
        <ScrollHint progress={scrollYProgress} prefersReducedMotion={!!prefersReducedMotion} />
      </div>
    </section>
  )
}

// ===== 챕터 블록 =====
function ChapterBlock({
  chapter,
  index,
  total,
  progress,
  prefersReducedMotion,
}: {
  chapter: Chapter
  index: number
  total: number
  progress: MotionValue<number>
  prefersReducedMotion: boolean
}) {
  const slot = 1 / total
  const start = index * slot
  const end = start + slot
  const enterEnd = start + slot * 0.25
  const exitStart = end - slot * 0.25

  const opacity = useTransform(
    progress,
    [start, enterEnd, exitStart, end],
    prefersReducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0],
  )
  const y = useTransform(
    progress,
    [start, enterEnd, exitStart, end],
    prefersReducedMotion ? [0, 0, 0, 0] : [60, 0, 0, -60],
  )

  const firstChapterOpacity = useTransform(
    progress,
    [0, enterEnd, exitStart, end],
    prefersReducedMotion ? [1, 1, 1, 1] : [1, 1, 1, 0],
  )
  const firstChapterY = useTransform(
    progress,
    [0, enterEnd, exitStart, end],
    prefersReducedMotion ? [0, 0, 0, 0] : [0, 0, 0, -60],
  )

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{
        opacity: index === 0 ? firstChapterOpacity : opacity,
        y: index === 0 ? firstChapterY : y,
      }}
    >
      {/* Eyebrow with short leading rule — editorial signature */}
      <div
        className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-6"
        style={{ color: 'var(--teal)' }}
      >
        <span
          aria-hidden
          className="inline-block w-7 h-px"
          style={{ background: 'var(--teal)' }}
        />
        {chapter.eyebrow}
      </div>

      <h2
        className="leading-[0.96] mb-1 sm:mb-2"
        style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
        }}
      >
        {chapter.title}
      </h2>
      {chapter.accent && (
        <h2
          className="leading-[0.96] mb-7"
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
            letterSpacing: '-0.025em',
            color: 'var(--teal)',
          }}
        >
          {chapter.accent}
        </h2>
      )}
      <p
        className="max-w-md text-base sm:text-lg leading-relaxed"
        style={{ color: 'var(--ink-2)' }}
      >
        {chapter.body}
      </p>
    </motion.div>
  )
}

// ===== 스크롤 힌트 =====
function ScrollHint({
  progress,
  prefersReducedMotion,
}: {
  progress: MotionValue<number>
  prefersReducedMotion: boolean
}) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0])
  return (
    <motion.div
      style={{ opacity, color: 'var(--ink-3)' }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs pointer-events-none"
    >
      <span className="tracking-wider">스크롤해서 더 보기</span>
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        }
        className="w-px h-8"
        style={{
          background:
            'linear-gradient(to bottom, var(--ink-3), transparent)',
        }}
        aria-hidden
      />
    </motion.div>
  )
}
