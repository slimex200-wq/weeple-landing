'use client'

/**
 * FinalCTA — 마지막 푸쉬 (출시 전).
 *
 * 출시 전 단계 — "다운로드" 가 아닌 "출시 알림 신청" 이 정답.
 * DESIGN.md v2: One CTA per screen 원칙. 단일 primary CTA + 가격 보기 보조 링크.
 * 배경은 teal→mint 부드러운 그라디언트 (3색 스톱).
 */

import { motion } from 'motion/react'
import MagneticButton from '@/components/MagneticButton'

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative min-h-[90vh] flex items-center justify-center py-32 px-6 overflow-hidden bg-gradient-to-br from-[#0EA5A0] via-[#14B8B0] to-[#5EEAD4]"
      aria-label="출시 알림 신청"
    >
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-xs font-semibold tracking-wider text-white/90 uppercase mb-8"
        >
          출시 준비 중
        </motion.div>

        {/* 거대 타이포 */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-extrabold leading-[0.92] tracking-[-0.04em] mb-4 text-white"
          style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
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
          className="font-extrabold leading-[0.92] tracking-[-0.04em] mb-12 text-white/85"
          style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
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
          className="max-w-xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed mb-12"
        >
          출시 알림을 신청하시면 베타 초대와 런칭 소식을 가장 먼저 보내드립니다.
        </motion.p>

        {/* 단일 Primary CTA — DESIGN.md v2 one-CTA 원칙 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-5 mb-10"
        >
          <MagneticButton
            as="a"
            href="mailto:support@weeple.app?subject=weeple%20%EC%B6%9C%EC%8B%9C%20%EC%95%8C%EB%A6%BC%20%EC%8B%A0%EC%B2%AD"
            className="group inline-flex items-center gap-2 px-8 h-14 rounded-full bg-white text-coral font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0EA5A0]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            출시 알림 신청
          </MagneticButton>

          <a
            href="#pricing"
            className="inline-flex items-center gap-1 text-sm text-white/85 font-medium hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0EA5A0] rounded-sm px-1"
          >
            크레딧 팩 먼저 보기 ›
          </a>
        </motion.div>

        {/* 신뢰 지표 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/85"
        >
          <span className="inline-flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
            </svg>
            구독 없음
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
            크레딧 사용기한 없음
          </span>
        </motion.div>
      </div>
    </section>
  )
}
