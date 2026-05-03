'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function LiveDemo() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

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
              <iframe
                src="/weeple-3d-promo.html"
                title="weeple 3D 데모"
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
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
      <div className="relative mx-auto w-full max-w-[300px]">
        <div
          className="relative w-full rounded-[40px] border-[10px] border-[#101417] bg-gradient-to-b from-[#7edaf5] to-[#d5f5e9] overflow-hidden shadow-[0_40px_80px_-20px_rgba(14,165,160,0.35)]"
          style={{ aspectRatio: '9/18.5' }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-[#101417] z-10" />
          <div className="h-full w-full p-4 pt-9 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-[10px] text-[#101417]/70 num">
              <span>9:41</span>
              <span className="font-bold">우리 가계부 · D+17</span>
            </div>
            <div className="rounded-2xl bg-white/65 backdrop-blur-sm px-3.5 py-2.5 shadow-sm">
              <div className="text-[9px] font-bold text-[#07978e] uppercase tracking-wide mb-0.5">
                개인 · 카테고리 자동 분류
              </div>
              <div className="text-[13px] font-semibold text-[#161a1c]">
                점심 김치찌개 8000원
              </div>
            </div>
            <div className="grid grid-cols-3 rounded-full bg-white/35 p-1 text-[10px] font-bold text-[#637472] text-center">
              <span className="rounded-full bg-white/85 text-[#101417] py-1.5">요약</span>
              <span className="py-1.5">리포트</span>
              <span className="py-1.5">AI 분석</span>
            </div>
            <div className="rounded-2xl bg-white/55 px-3.5 py-3">
              <div className="text-[9px] text-[#426966] font-bold">
                2026-05 · 이번 달 지출
              </div>
              <div className="num text-[22px] font-extrabold text-[#101417] mt-0.5">
                ₩1,111,797
              </div>
              <div className="h-2 rounded-full bg-gradient-to-r from-mint to-[#ff7f73] my-2" />
              <div className="text-[9px] text-[#426966]">
                예상 ₩1,450,170 · 하루 ₩48,339
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/65 px-3 py-2">
                <div className="text-[9px] text-fg-muted font-bold">오늘</div>
                <div className="num text-[14px] font-extrabold text-[#101417] mt-0.5">
                  ₩49,800
                </div>
              </div>
              <div className="rounded-xl bg-white/65 px-3 py-2">
                <div className="text-[9px] text-fg-muted font-bold">이번 주</div>
                <div className="num text-[14px] font-extrabold text-[#101417] mt-0.5">
                  ₩36.4만
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white/70 px-3 py-2.5 text-[11px] font-bold text-[#263432] leading-snug">
              이번 달 소비의 85%가 쇼핑에 집중돼요
              <span className="block text-[10px] text-[#078f86] font-bold mt-0.5">
                카테고리별 분석 보기
              </span>
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
