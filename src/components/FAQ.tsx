'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const ITEMS: { q: string; a: string }[] = [
  {
    q: '커플 둘 다 가입해야 하나요?',
    a: '공동 지출을 같이 보려면 파트너도 가입이 필요해요. 혼자 쓰는 가계부로도 대부분 기능을 그대로 사용할 수 있습니다.',
  },
  {
    q: '지출 내역은 어떻게 자동으로 들어오나요?',
    a: '카드/은행 문자 알림을 읽어 지출로 변환합니다. 자연어로 직접 입력하거나 엑셀/CSV를 불러와도 돼요. 알림 권한은 언제든 끌 수 있습니다.',
  },
  {
    q: 'AI 분석은 어떤 정보를 사용하나요?',
    a: '카테고리·금액·시간 같은 지출 메타데이터만 사용합니다. 민감한 세부 내용은 기기에서 처리되고, AI는 패턴만 파악해 대화 시작점을 제안합니다.',
  },
  {
    q: '데이터는 안전한가요?',
    a: '민감 데이터는 기기와 서버 양쪽에서 암호화됩니다. 전송 구간은 은행 수준 TLS로 보호되고, 개인 지출은 파트너에게 공유되지 않아요.',
  },
  {
    q: '해지하면 내 데이터는 어떻게 되나요?',
    a: '계정 삭제 요청 시 30일 내로 모든 데이터가 완전 삭제됩니다. 설정 → 계정 → 데이터 다운로드에서 JSON으로 내보낼 수 있어요.',
  },
  {
    q: 'iOS, Android 둘 다 지원하나요?',
    a: 'Android 는 현재 베타 배포 중이고, iOS 는 준비 중입니다. 두 플랫폼 모두 같은 데이터로 동기화됩니다.',
  },
  {
    q: '무료로 써볼 수 있나요?',
    a: '핵심 기능은 무료로 사용할 수 있습니다. AI 심층 분석·무제한 크레딧 같은 기능은 유료 플랜에서 제공돼요.',
  },
  {
    q: '혼자 써도 되나요?',
    a: '네. 개인 가계부로도 충분히 써요. 나중에 파트너가 생기면 초대 한 번으로 공동 지출 모드로 전환됩니다.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative py-16 sm:py-20 px-6"
      aria-label="자주 묻는 질문"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-12"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            자주 묻는 질문
          </h2>
        </motion.div>

        <div className="space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-mint-bg/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="text-base sm:text-lg font-semibold text-fg">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                    className="shrink-0 text-mint"
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-sm sm:text-base text-fg-secondary leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
