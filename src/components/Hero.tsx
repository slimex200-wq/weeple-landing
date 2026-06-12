'use client'

import { trackStoreClick } from '@/lib/analytics'
import { STORE_BADGES } from '@/lib/links'

const notes = ['혼자 먼저 시작', '필요할 때 파트너 초대', '공동/개인 지출 분리']

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="weeple 소개"
      className="relative isolate overflow-hidden px-5 pt-24 pb-12 sm:px-8 md:min-h-[92svh] md:pb-14 lg:px-10"
    >
      <div className="absolute inset-0 -z-20 bg-[#f7faf7]" />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[56%] overflow-hidden md:block"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 10%)',
          backgroundImage: 'url("/opengraph-image-20260510.png")',
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f7faf7_0%,rgba(247,250,247,0.97)_34%,rgba(247,250,247,0.48)_56%,rgba(247,250,247,0.12)_74%,rgba(247,250,247,0.02)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(180deg,rgba(247,250,247,0)_0%,#f7faf7_88%)]"
      />

      <div className="mx-auto flex max-w-7xl flex-col md:min-h-[calc(92svh-9.5rem)] md:justify-end">
        <div className="max-w-[680px]">
          <div className="mb-5 inline-flex items-center gap-2 border-y border-[#111513] py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111513]">
            <span className="h-2 w-2 rounded-full bg-[#f06a4e]" aria-hidden />
            Solo first, couple-ready
          </div>

          <h1 className="max-w-full text-[3.1rem] font-black leading-[1] text-[#111513] sm:text-7xl lg:text-8xl">
            <span className="block">혼자 시작해도,</span>
            <span className="mt-2 block sm:hidden">커플로</span>
            <span className="mt-2 block sm:hidden">이어지는</span>
            <span className="mt-2 hidden sm:block lg:whitespace-nowrap">커플로 이어지는</span>
            <span className="mt-2 block text-[#0f9f8f]">weeple</span>
          </h1>

          <p className="mt-7 max-w-xl break-words text-base leading-8 text-[#33423b] sm:text-xl sm:leading-9 sm:[word-break:keep-all]">
            개인 가계부로 먼저 쓰다가, 필요할 때 파트너를 초대해 커플 가계부로
            연결하세요. 혼자 쓴 돈은 내 영역에, 함께 볼 돈은 공동 영역에 남깁니다.
          </p>

          <p className="mt-5 max-w-xl break-words border-l-2 border-[#f06a4e] pl-4 text-base leading-7 text-[#5b453d] sm:[word-break:keep-all]">
            혼자 써도 괜찮습니다. 둘이 관리할 시점이 오면 같은 기준으로 이어가면 됩니다.
          </p>

          <p className="mt-5 max-w-xl break-words border-y border-[#111513]/15 py-4 text-base font-semibold leading-7 text-[#33423b] sm:[word-break:keep-all]">
            <span className="mr-2 text-[#0f9f8f]">Android 알림 기록</span>
            카드·계좌·페이 알림을 감지해 거래 후보를 만들고, 사용자가 확인 후 저장할 수 있어요.
          </p>

          <div className="mt-7 flex flex-row flex-wrap items-center gap-3 sm:mt-8">
            {STORE_BADGES.map((store) => (
              <a
                key={store.href}
                href={store.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackStoreClick(store.analyticsLabel, 'hero')}
                aria-label={`${store.label}에서 weeple 받기`}
                className="inline-flex h-12 w-fit items-center rounded-md transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111513] focus-visible:ring-offset-2 sm:h-14"
              >
                <img src={store.src} alt={`${store.label}에서 받기`} className="h-12 w-auto sm:h-14" />
              </a>
            ))}
            <a
              href="#product-home-screen"
              className="inline-flex h-12 w-fit min-w-[120px] items-center justify-center rounded-md border border-[#111513]/20 bg-white/72 px-4 text-sm font-bold text-[#111513] transition-colors hover:border-[#0f9f8f] hover:text-[#0f9f8f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9f8f] focus-visible:ring-offset-2 sm:h-14 sm:min-w-[132px] sm:px-5"
            >
              앱 화면 보기
            </a>
          </div>
        </div>

        <div className="mt-12 grid max-w-3xl gap-px overflow-hidden border-y border-[#111513]/15 bg-[#111513]/15 sm:grid-cols-3">
          {notes.map((note) => (
            <div key={note} className="bg-[#f7faf7]/90 px-4 py-3 text-sm font-semibold text-[#33423b]">
              {note}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center text-xs font-semibold text-[#6a756f]">
        다음: 둘이 쓰는 돈의 기준
      </div>
    </section>
  )
}
