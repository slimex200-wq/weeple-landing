'use client'

import { motion } from 'motion/react'
import MagneticButton from '@/components/MagneticButton'
import { trackStoreClick } from '@/lib/analytics'
import { PLAY_STORE_URL } from '@/lib/links'

const notes = ['혼자 먼저 시작', '필요할 때 파트너 초대', '공동/개인 지출 분리']

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="weeple 소개"
      className="relative isolate min-h-[92svh] overflow-hidden px-5 pt-24 pb-14 sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 -z-20 bg-[#f7faf7]" />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[56%] overflow-hidden md:block"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 10%)',
        }}
      >
        <img
          src="/opengraph-image-20260510.png"
          alt=""
          className="h-full w-full object-cover object-right opacity-85"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f7faf7_0%,rgba(247,250,247,0.97)_34%,rgba(247,250,247,0.48)_56%,rgba(247,250,247,0.12)_74%,rgba(247,250,247,0.02)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(180deg,rgba(247,250,247,0)_0%,#f7faf7_88%)]"
      />

      <div className="mx-auto flex min-h-[calc(92svh-9.5rem)] max-w-7xl flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-[680px]"
        >
          <div className="mb-5 inline-flex items-center gap-2 border-y border-[#111513] py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111513]">
            <span className="h-2 w-2 rounded-full bg-[#f06a4e]" aria-hidden />
            Solo first, couple-ready
          </div>

          <h1 className="text-6xl font-black leading-[0.9] text-[#111513] sm:text-7xl lg:text-8xl">
            혼자{' '}
            <span className="whitespace-nowrap">시작해도,</span>
            <span className="mt-2 block">커플로 이어지는</span>
            <span className="mt-2 block text-[#0f9f8f]">weeple</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#33423b] [word-break:keep-all] sm:text-xl sm:leading-9">
            개인 가계부로 먼저 쓰다가, 필요할 때 파트너를 초대해 커플 가계부로
            연결하세요. 혼자 쓴 돈은 내 영역에, 함께 볼 돈은 공동 영역에 남깁니다.
          </p>

          <p className="mt-5 max-w-xl border-l-2 border-[#f06a4e] pl-4 text-base leading-7 text-[#5b453d] [word-break:keep-all]">
            혼자 써도 괜찮습니다. 둘이 관리할 시점이 오면 같은 기준으로 이어가면 됩니다.
          </p>

          <p className="mt-5 max-w-xl border-y border-[#111513]/15 py-4 text-base font-semibold leading-7 text-[#33423b] [word-break:keep-all]">
            <span className="mr-2 text-[#0f9f8f]">Android 알림 기록</span>
            카드·계좌·페이 알림을 감지해 거래 후보를 만들고, 사용자가 확인 후 저장할 수 있어요.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton
              as="a"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackStoreClick('play', 'hero')
              }
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#111513] px-6 text-sm font-bold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111513] focus-visible:ring-offset-2"
            >
              Google Play에서 받기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <a
              href="#product-home-screen"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#111513]/20 bg-white/60 px-6 text-sm font-bold text-[#111513] transition-colors hover:border-[#0f9f8f] hover:text-[#0f9f8f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9f8f] focus-visible:ring-offset-2"
            >
              앱 화면 보기
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-12 grid max-w-3xl gap-px overflow-hidden border-y border-[#111513]/15 bg-[#111513]/15 sm:grid-cols-3"
        >
          {notes.map((note) => (
            <div key={note} className="bg-[#f7faf7]/90 px-4 py-3 text-sm font-semibold text-[#33423b]">
              {note}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center text-xs font-semibold text-[#6a756f]">
        다음: 둘이 쓰는 돈의 기준
      </div>
    </section>
  )
}
