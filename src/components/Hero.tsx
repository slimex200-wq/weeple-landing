'use client'

import { motion } from 'motion/react'
import MagneticButton from '@/components/MagneticButton'
import { trackEvent } from '@/lib/analytics'

const notes = ['신혼 생활비 관리', '공동 지출과 개인 지출 분리', '비개발자 1인 제작']

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
            Built for newlywed money rules
          </div>

          <h1 className="text-6xl font-black leading-[0.9] text-[#111513] sm:text-7xl lg:text-8xl">
            커플{' '}
            <span className="whitespace-nowrap">가계부 앱,</span>
            <span className="mt-2 block text-[#0f9f8f]">weeple</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#33423b] sm:text-xl sm:leading-9">
            각자 통장은 따로, 가계부는 같이. 생활비와 데이트 비용은 한곳에서 보고,
            개인 소비는 각자의 영역으로 남겨둡니다.
          </p>

          <p className="mt-5 max-w-xl border-l-2 border-[#f06a4e] pl-4 text-base leading-7 text-[#5b453d]">
            신혼의 돈 관리는 아끼는 의지보다, 둘이 같은 기준을 보는 구조에서 시작합니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton
              as="a"
              href="#about"
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'hero',
                  label: 'founder_story',
                })
              }
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#111513] px-6 text-sm font-bold text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111513] focus-visible:ring-offset-2"
            >
              왜 만들었는지 보기
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <a
              href="#live-demo"
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
