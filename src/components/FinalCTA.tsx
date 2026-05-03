'use client'

/**
 * FinalCTA — 마지막 푸쉬.
 *
 * 거대 coral→violet 그라디언트 배경 + 흰색 거대 타이포.
 * 섹션 전환의 클라이맥스. 다운로드 버튼은 흰 배경으로 반전해 최대 대비.
 */

import { motion } from 'motion/react'
import MagneticButton from '@/components/MagneticButton'

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative min-h-[70vh] flex items-center justify-center py-16 sm:py-24 px-6 overflow-hidden bg-gradient-to-br from-[#0EA5A0] via-[#5EEAD4] to-[#7DD3FC]"
      aria-label="앱 다운로드"
    >
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-wider text-white/90 uppercase mb-5 sm:mb-8"
        >
          Start today
        </motion.div>

        {/* 거대 타이포 */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-extrabold leading-[0.92] tracking-[-0.04em] mb-4 text-white"
          style={{ fontSize: 'clamp(2rem, 10vw, 10rem)' }}
        >
          오늘 입력한
          <br />
          한 줄이
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-extrabold leading-[0.92] tracking-[-0.04em] mb-8 sm:mb-12 text-white/80"
          style={{ fontSize: 'clamp(2rem, 10vw, 10rem)' }}
        >
          내일의 예산이
          <br />
          됩니다.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto text-sm sm:text-lg text-white/90 leading-relaxed mb-8 sm:mb-12"
        >
          회원가입 30초. 첫 거래 3초. 그게 전부입니다.
        </motion.p>

        {/* 듀얼 버튼 — 흰 배경으로 반전해 그라디언트 위에서 최대 대비 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
        >
          <MagneticButton
            as="a"
            href="#"
            className="group inline-flex items-center gap-2 px-7 h-14 rounded-full bg-white text-[#0EA5A0] font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.3)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0EA5A0]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 20.5V3.5c0-.6.3-1.1.8-1.4l12.3 9.9L3.8 21.9c-.5-.3-.8-.8-.8-1.4zm14.2-7.3l2.5-2-2.5-2 .1-.1 3.5 2-.1.1-3.5 2zM5.2 1.7l11.1 8.9-2.1 1.9L5.2 1.7zm0 20.6l9-10.8 2.1 1.9L5.2 22.3z" />
            </svg>
            Android 앱 다운로드
          </MagneticButton>
          <span
            aria-disabled="true"
            className="group inline-flex items-center gap-2 px-7 h-14 rounded-full border border-white/40 bg-white/5 text-white/70 font-semibold text-base backdrop-blur-sm cursor-not-allowed"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.05 12.04c-.02-2.42 1.98-3.58 2.07-3.64-1.13-1.66-2.89-1.88-3.52-1.91-1.5-.15-2.93.88-3.7.88-.76 0-1.95-.86-3.2-.84-1.64.03-3.16.96-4 2.44-1.71 2.96-.44 7.33 1.22 9.73.81 1.17 1.77 2.48 3.03 2.44 1.22-.05 1.68-.79 3.15-.79 1.47 0 1.89.79 3.18.76 1.32-.02 2.15-1.18 2.95-2.36.93-1.35 1.31-2.67 1.33-2.74-.03-.01-2.55-.98-2.57-3.89zM14.66 4.79c.66-.8 1.12-1.91.99-3.02-.96.04-2.12.64-2.81 1.44-.62.71-1.16 1.85-1.02 2.94 1.07.08 2.17-.55 2.84-1.36z" />
            </svg>
            iOS 준비 중
          </span>
        </motion.div>

        {/* 신뢰 지표 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/80"
        >
          <span className="inline-flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
            </svg>
            회원가입 30초
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
            </svg>
            카드 등록 불필요
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
            </svg>
            언제든 해지
          </span>
        </motion.div>
      </div>
    </section>
  )
}
