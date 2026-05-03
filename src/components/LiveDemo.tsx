'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function LiveDemo() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="live-demo"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      aria-label="앱 체험"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-8 sm:mb-16 mx-auto text-center"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            Experience
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-fg">
            직접 만져보는
            <br />
            <span className="text-fg-muted">앱 체험.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed sm:block hidden">
            드래그로 회전, ▶ 버튼으로 각 화면의 데모 시연. 7개 화면 모두 진짜 앱 UI.
          </p>
          <p className="text-base text-fg-secondary leading-relaxed sm:hidden">
            모바일에서는 실제 앱의 홈 요약 화면을 정적으로 미리 봅니다. 데스크톱에서는
            7개 화면을 드래그로 회전하며 체험할 수 있어요.
          </p>
        </motion.div>

        {isMobile === true ? (
          <MobileAppPreview />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full rounded-3xl overflow-hidden glass shadow-[0_60px_120px_-30px_rgba(14,165,160,0.25)]"
            style={{ aspectRatio: '16/10' }}
          >
            {isMobile === false && (
              activated ? (
                <iframe
                  src="/weeple-3d-promo.html"
                  title="weeple 3D 데모"
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActivated(true)}
                  className="group absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                  aria-label="3D 데모 시작 — 클릭하면 인터랙티브 데모를 불러옵니다"
                >
                  <img
                    src="/demo-fallback.png"
                    alt="weeple 3D 데모 미리보기 — 7개 앱 화면이 회전하는 캐러셀"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors duration-300 group-hover:bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-mint text-white font-semibold text-sm shadow-[0_12px_36px_-8px_rgba(14,165,160,0.6)] transition-transform duration-300 group-hover:scale-[1.04]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      3D 데모 체험
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] text-white/85 font-medium drop-shadow">
                    클릭하면 로드됩니다 · 약 700KB
                  </div>
                </button>
              )
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function MobileAppPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto w-full max-w-[420px]"
    >
      <div className="relative mx-auto w-full max-w-[320px]">
        <div
          className="relative w-full rounded-[40px] glass p-3 shadow-[0_40px_100px_-20px_rgba(14,165,160,0.2)]"
          style={{ aspectRatio: '9/18.5' }}
        >
          <div className="h-full w-full rounded-[32px] overflow-hidden bg-gradient-to-b from-[#F0F4F1] to-[#E5EDE8] flex flex-col p-4 pt-5">
            <div className="flex items-center justify-between text-[10px] text-fg-muted mb-3">
              <span className="num">9:41</span>
              <span className="font-semibold text-fg">우리 가계부 · D+17</span>
            </div>

            <div className="rounded-xl border border-mint/40 bg-white/60 px-3 py-2.5 mb-3">
              <div className="text-[10px] font-semibold text-mint uppercase tracking-wider mb-1">
                개인 · 카테고리 자동 분류
              </div>
              <div className="text-sm font-semibold text-fg">
                점심 김치찌개 8000원
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1 rounded-full glass p-1 mb-3">
              <span className="rounded-full bg-mint text-white text-[11px] font-semibold py-1 text-center">
                요약
              </span>
              <span className="text-fg-muted text-[11px] font-semibold py-1 text-center">
                리포트
              </span>
              <span className="text-fg-muted text-[11px] font-semibold py-1 text-center">
                AI 분석
              </span>
            </div>

            <div className="rounded-xl glass p-3 mb-3">
              <div className="text-[10px] text-fg-muted num mb-0.5">
                2026-05 · 이번 달 지출
              </div>
              <div className="num text-2xl font-extrabold text-fg tracking-tight">
                ₩1,111,797
              </div>
              <div className="h-1.5 rounded-full bg-gradient-to-r from-mint to-mint-end my-2" />
              <div className="text-[10px] text-fg-muted num">
                예상 ₩1,450,170 · 하루 ₩48,339
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="rounded-xl glass px-3 py-2">
                <div className="text-[10px] text-fg-muted font-semibold">오늘</div>
                <div className="num text-base font-extrabold text-fg mt-0.5">
                  ₩49,800
                </div>
              </div>
              <div className="rounded-xl glass px-3 py-2">
                <div className="text-[10px] text-fg-muted font-semibold">이번 주</div>
                <div className="num text-base font-extrabold text-fg mt-0.5">
                  ₩36.4만
                </div>
              </div>
            </div>

            <div className="rounded-xl glass p-3">
              <div className="text-xs font-semibold text-fg leading-snug">
                이번 달 소비의 85%가 쇼핑에 집중돼요
              </div>
              <div className="text-[10px] text-mint font-semibold mt-1 inline-flex items-center gap-1">
                카테고리별 분석 보기
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-2.5">
        {[
          { n: '1', t: '이번 달 상태 확인', d: '예상 지출, 오늘 소비, 카테고리 TOP 을 한 화면에서.' },
          { n: '2', t: '알림 또는 직접 입력', d: 'Android 결제 알림은 확인 후 저장, 현금·이체는 직접 기록.' },
          { n: '3', t: 'AI 가 월간 흐름 요약', d: '패턴, 권장 사항, 긍정 신호를 짧게 정리.' },
        ].map((s) => (
          <div
            key={s.n}
            className="flex gap-3 rounded-xl glass p-3"
          >
            <div className="shrink-0 w-7 h-7 rounded-lg border border-mint/40 bg-mint-bg flex items-center justify-center num text-[11px] font-bold text-mint">
              {s.n}
            </div>
            <div>
              <h4 className="text-sm font-bold text-fg leading-tight">{s.t}</h4>
              <p className="text-xs text-fg-secondary leading-snug mt-0.5">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
