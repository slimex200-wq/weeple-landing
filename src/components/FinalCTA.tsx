'use client'

import { motion } from 'motion/react'
import { trackEvent, trackStoreClick } from '@/lib/analytics'
import { STORE_BADGES } from '@/lib/links'

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
          backgroundImage: 'url("/opengraph-image-20260510.png")',
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
        }}
      />
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
            Start solo, link later
          </div>
          <h2 className="max-w-4xl text-5xl font-black leading-[1.05] text-white [word-break:keep-all] sm:text-7xl sm:leading-[1.02]">
            혼자 시작하고, 필요할 때 둘이 봅니다.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/74 [word-break:keep-all]">
            개인 가계부로 먼저 정리하고, 함께 볼 돈이 생기면 파트너를 초대하세요.
            생활비와 데이트 비용은 함께 보고, 개인 소비는 각자의 영역으로 남깁니다.
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
            {['개인 가계부로 먼저 시작', '파트너 초대 후 공동 관리', 'Android 알림 확인 후 저장'].map((item, index) => (
              <div key={item} className="grid grid-cols-[3rem_1fr] gap-4 bg-[#111513]/86 py-4">
                <span className="num text-sm font-black text-[#f06a4e]">0{index + 1}</span>
                <span className="text-base font-black leading-7 text-white/90 [word-break:keep-all]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {STORE_BADGES.map((store) => (
              <a
                key={store.href}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackStoreClick(store.analyticsLabel, 'final_store_badge')}
                aria-label={`${store.label}에서 weeple 받기`}
                className="inline-flex h-12 w-fit items-center rounded-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111513]"
              >
                <img
                  src={store.src}
                  alt={`${store.label}에서 받기`}
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </a>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
