'use client'

/**
 * Hero — Opal Tadpole 스타일 멀티 챕터 히어로.
 *
 * 구조:
 *   - Sticky container (h-screen) 가 섹션 안에 고정
 *   - 왼쪽: 4 챕터 텍스트가 순차적으로 아래→위로 올라오며 교체
 *   - 오른쪽: 3D promo iframe 이 항상 보임 (팽창 없음, 정적 사이즈)
 *   - 오른쪽 상단: 작은 플로팅 "다운로드" 카드
 *   - 섹션은 200svh → 각 챕터 50vh 스크롤
 *
 * 이전 버전의 "중앙 타이틀 ↔ iframe 팽창" 구조는 겹침 발생으로 폐기.
 * Opal 의 "왼쪽 텍스트 swap + 오른쪽 제품 상주" 패턴만 차용.
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
  {
    eyebrow: 'Couple mode',
    title: '혼자도, 함께도.',
    accent: '용돈은 따로, 저축은 같이.',
    body: '실시간 공유, 3가지 커플 타입 (전액 공동 · 부분 공동 · 기여금), 파트너 프라이버시는 지키면서.',
  },
  {
    eyebrow: 'AI + Alerts',
    title: '결제 알림,',
    accent: '스와이프로 기록.',
    body: '카드사 푸시를 자동 파싱해서 오른쪽 스와이프는 기록, 왼쪽은 무시. AI 3개 모델이 소비 패턴을 분석.',
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

  // native scroll 기반 progress
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

  // 배경 fade (은은한 변화)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.75])
  const starOpacity = useTransform(scrollYProgress, [0, 0.7], [0.5, 0.25])

  // 워터마크는 초반에만
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.15], [0.08, 0])

  // iframe 은 챕터 1이 끝나면서 등장하고 계속 유지
  const iframeOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1])
  const iframeScale = useTransform(scrollYProgress, [0.08, 0.22], [0.9, 1])

  return (
    <section
      ref={sectionRef}
      aria-label="weeple 히어로"
      className="relative"
      style={{
        minHeight: prefersReducedMotion ? '100svh' : '320svh',
      }}
    >
      {/* Sticky viewport 컨테이너 */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 배경 gradient */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            opacity: bgOpacity,
            background: `
              radial-gradient(ellipse 70% 60% at 25% 30%, rgba(249, 112, 102, 0.16), transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 70%, rgba(129, 140, 248, 0.12), transparent 60%),
              radial-gradient(ellipse 100% 80% at 50% 100%, rgba(249, 112, 102, 0.06), transparent 70%),
              #0a0a0a
            `,
          }}
        />

        {/* 별 */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            opacity: starOpacity,
            backgroundImage: `
              radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 80% 10%, rgba(255,255,255,0.9), transparent),
              radial-gradient(1px 1px at 15% 65%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.6), transparent)
            `,
            backgroundSize: '600px 600px',
          }}
        />

        {/* 거대 워터마크 */}
        <motion.div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ opacity: watermarkOpacity }}
        >
          <span
            className="font-extrabold tracking-[-0.05em] whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(14rem, 30vw, 36rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(250, 250, 250, 0.35)',
              lineHeight: 0.9,
            }}
          >
            weeple
          </span>
        </motion.div>

        {/* 상단 네비 */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 py-6">
          <div className="flex items-center gap-3">
            <div
              className="font-extrabold text-xl sm:text-2xl tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #fafafa 0%, #F97066 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              weeple
            </div>
            <span className="hidden sm:inline text-[11px] text-fg-muted tracking-wide">
              스마트 커플 가계부
            </span>
          </div>

          {/* 플로팅 다운로드 카드 (Opal 오른쪽 상단 참고) */}
          <div className="hidden md:flex items-center gap-4 rounded-xl border border-border-light bg-bg-card/90 backdrop-blur-md px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #F97066 0%, #D4533F 100%)',
                }}
                aria-hidden
              >
                <span className="text-white text-[11px] font-extrabold">w</span>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-fg">weeple iOS · Android</div>
                <div className="num text-[10px] text-fg-muted">무료 · iOS 17+ / Android 12+</div>
              </div>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-coral text-white text-[11px] font-semibold transition-all hover:scale-[1.03] hover:shadow-[0_8px_20px_-6px_rgba(249,112,102,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              시작하기
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* SR 전용 제목 */}
        <h1 className="sr-only">
          둘이 쓰는 돈, 한눈에 weeple. 개인부터 커플 공동 예산까지.
        </h1>

        {/* 메인 레이아웃: 좌 텍스트 / 우 iframe */}
        <div className="relative h-full grid grid-cols-1 md:grid-cols-[0.85fr_1.5fr] lg:grid-cols-[0.8fr_1.6fr] gap-6 md:gap-10 items-center px-6 sm:px-10 pt-24 pb-10">
          {/* LEFT — 4 챕터 absolute 스택 */}
          <div className="relative min-h-[320px] md:min-h-[420px]">
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
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
            style={{
              opacity: iframeOpacity,
              scale: iframeScale,
              height: isMobile ? '50vh' : '78vh',
              minHeight: isMobile ? 320 : 520,
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
  // 각 챕터는 section progress 안에서 1/total 구간을 차지
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

  // 첫 챕터는 section 시작 시 0 progress 에서 opacity 1 로 시작해야 함
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
      <div className="text-xs font-semibold tracking-[0.15em] text-coral uppercase mb-5">
        {chapter.eyebrow}
      </div>
      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.96] tracking-[-0.04em] mb-2 sm:mb-3"
        style={{
          background: 'linear-gradient(135deg, #fafafa 0%, #a3a3a3 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {chapter.title}
      </h2>
      {chapter.accent && (
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.96] tracking-[-0.04em] mb-6"
          style={{
            background: 'linear-gradient(135deg, #F97066 0%, #D4533F 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {chapter.accent}
        </h2>
      )}
      <p className="max-w-md text-base sm:text-lg text-fg-secondary leading-relaxed">
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
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fg-muted text-xs pointer-events-none"
    >
      <span className="tracking-wider">스크롤해서 더 보기</span>
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        }
        className="w-[1px] h-8 bg-gradient-to-b from-fg-muted to-transparent"
        aria-hidden
      />
    </motion.div>
  )
}
