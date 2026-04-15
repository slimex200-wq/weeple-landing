'use client'

/**
 * Promise — Editorial Warm v2.
 *
 * 패턴 (unchanged):
 *   - 긴 한 문장 opacity reveal
 *   - 인라인 미니 UI 칩(키보드/카메라/영수증/커플/AI/잠금)
 *
 * Editorial Warm:
 *   - 본문: Pretendard
 *   - 액센트 단어: serif italic + teal
 *   - 칩: white + hairline + teal 하이라이트
 *   - 파트너 아바타: paper-warm + serif initial (teal / partner-brown)
 */

import { motion, useReducedMotion } from 'motion/react'

export default function Promise() {
  const reduced = useReducedMotion()

  return (
    <section
      id="promise"
      className="relative py-40 sm:py-52 px-6 overflow-hidden"
      aria-label="weeple 기능 요약"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-12"
          style={{ color: 'var(--teal)' }}
        >
          <span
            aria-hidden
            className="inline-block w-7 h-px"
            style={{ background: 'var(--teal)' }}
          />
          약속
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.4]"
          style={{
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
          }}
        >
          <Accent>3초</Accent> 만에 <InlineKeyboard /> 한 줄을 입력하면,{' '}
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
          <span style={{ color: 'var(--ink-3)' }}>모두 한 앱 안에.</span>
        </motion.p>
      </div>
    </section>
  )
}

// ===== 텍스트 액센트 =====
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: 'var(--serif)',
        fontStyle: 'italic',
        color: 'var(--teal)',
      }}
    >
      {children}
    </span>
  )
}

// ===== 인라인 미니 UI 요소 =====

function InlineKeyboard() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm align-middle"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--rule)',
        fontFamily: 'var(--mono)',
        color: 'var(--ink-2)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full animate-pulse"
        style={{ background: 'var(--teal)' }}
      />
      스벅 6500
    </span>
  )
}

function InlineCamera() {
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg align-middle"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--rule)',
        color: 'var(--teal)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs align-middle"
      style={{
        background: 'var(--teal-soft)',
        border: '1px solid var(--teal-soft)',
        fontFamily: 'var(--mono)',
        color: 'var(--teal)',
      }}
    >
      영수증 · 3건 자동
    </span>
  )
}

function InlineCouple() {
  return (
    <span className="inline-flex items-center align-middle">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm"
        style={{
          background: 'var(--teal-soft)',
          color: 'var(--teal)',
          border: '2px solid var(--paper)',
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
        }}
      >
        박
      </span>
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm -ml-2"
        style={{
          background: 'var(--partner-soft)',
          color: 'var(--partner)',
          border: '2px solid var(--paper)',
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
        }}
      >
        수
      </span>
    </span>
  )
}

function InlineBrain() {
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg align-middle"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--rule)',
        color: 'var(--teal)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg align-middle"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--rule)',
        color: 'var(--teal)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
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
