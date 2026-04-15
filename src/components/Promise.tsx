'use client'

/**
 * Promise — "The promise" 섹션.
 *
 * Opal Tadpole 참고 — 본문 문장 안에 인라인 미니 UI 요소(칩/아이콘)를 삽입해
 * 사용자가 sentence 를 읽는 동안 앱 기능 요소가 자연스럽게 스쳐 지나가게 한다.
 * Opal 의 코드/이미지/텍스트 는 그대로 가져오지 않고 weeple 기능 기반으로 재작성.
 *
 * useReducedMotion 시 motion 은 정적 렌더. 인라인 칩은 CSS animate-pulse 만 살짝.
 */

import { motion, useReducedMotion } from 'motion/react'

export default function Promise() {
  const reduced = useReducedMotion()

  return (
    <section
      id="promise"
      className="relative py-40 sm:py-52 px-6 bg-bg overflow-hidden"
      aria-label="weeple 기능 요약"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-wider text-coral uppercase mb-12"
        >
          약속
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.4] tracking-tight text-fg"
          style={{ letterSpacing: '-0.02em' }}
        >
          <span className="text-coral font-semibold">3초</span> 만에{' '}
          <InlineKeyboard /> 한 줄을 입력하면,{' '}
          <br className="hidden md:inline" />
          사진 한 장 <InlineCamera /> 으로 영수증 OCR <InlineReceipt /> 이 끝납니다.{' '}
          <br className="hidden md:inline" />
          파트너와 <InlineCouple /> 실시간 공유하고,{' '}
          <br className="hidden md:inline" />
          AI <InlineBrain /> 가 소비 패턴을 분석하며,{' '}
          <br className="hidden md:inline" />
          모든 데이터는 <InlineLock /> E2E 암호화됩니다.
          <br />
          <br />
          <span className="text-fg-muted">모두 한 앱 안에.</span>
        </motion.p>
      </div>
    </section>
  )
}

// ===== 인라인 미니 UI 요소 — 각자 작은 chip 모양 =====

function InlineKeyboard() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-bg-card border border-border-light text-sm font-mono text-fg-secondary align-middle">
      <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
      스벅 6500
    </span>
  )
}

function InlineCamera() {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg-card border border-coral/40 text-coral align-middle">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    </span>
  )
}

function InlineReceipt() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-coral-bg border border-coral-bg-strong text-xs font-mono text-coral align-middle">
      영수증 · 3건 자동
    </span>
  )
}

function InlineCouple() {
  return (
    <span className="inline-flex items-center align-middle">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#0EA5A0] to-[#5EEAD4] text-white text-xs font-bold border-2 border-bg">
        박
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#FF8A7A] to-[#D4533F] text-white text-xs font-bold border-2 border-bg -ml-2">
        수
      </span>
    </span>
  )
}

function InlineBrain() {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg-card border border-violet/40 text-violet align-middle">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5v1a4.5 4.5 0 0 0-4 4.47v0a4.5 4.5 0 0 0 4 4.47v1a4.5 4.5 0 0 0 4.5 4.5 4.5 4.5 0 0 0 4.5-4.5v-1a4.5 4.5 0 0 0 4-4.47 4.5 4.5 0 0 0-4-4.47v-1A4.5 4.5 0 0 0 12 2Z" />
        <path d="M12 2v20M8 10h8M8 14h8" />
      </svg>
    </span>
  )
}

function InlineLock() {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bg-card border border-success/40 text-success align-middle">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </span>
  )
}
