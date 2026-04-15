'use client'

/**
 * FinalCTA — Editorial Warm v2.
 *
 * 단일 primary CTA. 패턴(stagger reveal) 유지.
 *
 * Editorial Warm:
 *   - 배경: paper (mint 그라디언트 제거)
 *   - 섹션 상단 hairline (편집 느낌)
 *   - 타이포: Instrument Serif 거대 헤드라인 + italic teal "가볍게"
 *   - CTA: ink bg / paper fg, rounded-full
 *   - 복사 보강: "오늘 입력한 한 줄이 내일의 예산이 됩니다" 유지
 *     + 출시 알림 CTA 위 "가볍게 시작하세요" 라인 추가
 */

import { motion } from 'motion/react'
import MagneticButton from '@/components/MagneticButton'

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative flex items-center justify-center py-40 sm:py-52 px-6 overflow-hidden"
      style={{
        borderTop: '1px solid var(--rule)',
      }}
      aria-label="출시 알림 신청"
    >
      <div className="max-w-5xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] uppercase mb-10 justify-center"
          style={{ color: 'var(--teal)' }}
        >
          <span
            aria-hidden
            className="inline-block w-7 h-px"
            style={{ background: 'var(--teal)' }}
          />
          출시 준비 중
        </motion.div>

        {/* 거대 타이포 */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="leading-[0.96] mb-2"
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 9.5vw, 9rem)',
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
          }}
        >
          오늘 입력한
          <br />한 줄이
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="leading-[0.96] mb-12"
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 9.5vw, 9rem)',
            letterSpacing: '-0.03em',
            color: 'var(--teal)',
          }}
        >
          내일의 예산이 됩니다.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-12"
          style={{ color: 'var(--ink-2)' }}
        >
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              color: 'var(--teal)',
            }}
          >
            가볍게
          </span>{' '}
          시작하세요. 출시 알림을 신청하시면 베타 초대와 런칭 소식을 가장 먼저 보내드립니다.
        </motion.p>

        {/* 단일 Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-5 mb-12"
        >
          <MagneticButton
            as="a"
            href="mailto:support@weeple.app?subject=weeple%20%EC%B6%9C%EC%8B%9C%20%EC%95%8C%EB%A6%BC%20%EC%8B%A0%EC%B2%AD"
            className="group inline-flex items-center gap-2 px-8 h-14 rounded-full font-medium text-[15px] transition-all hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-ink text-paper"
          >
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            출시 알림 신청
          </MagneticButton>

          <a
            href="#pricing"
            className="inline-flex items-center gap-1 text-sm transition-colors"
            style={{ color: 'var(--ink-2)' }}
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
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs"
          style={{ color: 'var(--ink-3)' }}
        >
          {['구독 없음', '카드 등록 불필요', '크레딧 사용기한 없음'].map(
            (t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden
                  style={{ color: 'var(--teal)' }}
                >
                  <path d="M20 6 9 17l-5-5" strokeLinecap="round" />
                </svg>
                {t}
              </span>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}
