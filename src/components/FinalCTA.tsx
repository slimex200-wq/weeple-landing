'use client'

import { motion } from 'motion/react'
import MagneticButton from '@/components/MagneticButton'
import { trackEvent } from '@/lib/analytics'
import { PLAY_STORE_URL } from '@/lib/links'

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[#111513] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10"
      aria-label="앱 다운로드"
    >
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.34] lg:block"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 28%, black 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 28%, black 100%)',
        }}
      >
        <img
          src="/opengraph-image-20260510.png"
          alt=""
          className="h-full w-full object-cover object-right"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,#111513_0%,rgba(17,21,19,0.96)_42%,rgba(17,21,19,0.74)_72%,rgba(17,21,19,0.58)_100%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_0.78fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 border-y border-white/70 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white">
            <span className="h-2 w-2 rounded-full bg-[#f06a4e]" aria-hidden />
            Start with one month
          </div>
          <h2 className="max-w-4xl text-5xl font-black leading-[0.98] text-white [word-break:keep-all] sm:text-7xl">
            둘이 같은 기준을 보는 첫 달부터.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/74 [word-break:keep-all]">
            생활비와 데이트 비용은 함께 보고, 개인 소비는 각자의 영역으로 남깁니다.
            위플은 커플·부부의 돈 관리를 더 빨리 정리하기 위한 작은 시작점입니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          className="border-y border-white/20 py-6"
        >
          <div className="grid gap-px overflow-hidden bg-white/16">
            {['Android 알림 확인 후 저장', '공동/개인 지출 분리', '카드 등록 없이 시작'].map((item, index) => (
              <div key={item} className="grid grid-cols-[3rem_1fr] gap-4 bg-[#111513]/86 py-4">
                <span className="num text-sm font-black text-[#f06a4e]">0{index + 1}</span>
                <span className="text-base font-black leading-7 text-white/90 [word-break:keep-all]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <MagneticButton
              as="a"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'final',
                  label: 'google_play',
                })
              }
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#0f9f8f] px-6 text-base font-black text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9f8f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111513]"
            >
              Google Play에서 받기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <span
              aria-disabled="true"
              className="inline-flex h-14 cursor-not-allowed items-center justify-center rounded-full border border-white/24 px-6 text-base font-black text-white/62"
            >
              iOS 준비 중
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
