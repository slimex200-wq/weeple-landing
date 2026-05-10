'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const reasons = [
  {
    title: '기록은 한 명이 하는데, 돈은 둘이 씁니다',
    body: '한 사람이 모든 입력을 떠안으면 가계부는 관리 도구가 아니라 숙제가 됩니다.',
  },
  {
    title: '정산은 숫자인데, 대화는 감정입니다',
    body: '누가 더 냈는지보다 더 어려운 건 그 이야기를 꺼내는 순간입니다.',
  },
  {
    title: '절약은 의지가 아니라 구조입니다',
    body: '각자 쓴 돈과 함께 쓴 돈이 섞이면 다음 소비를 줄일 기준도 흐려집니다.',
  },
]

const storySteps = [
  {
    id: 'live-demo',
    index: '01',
    eyebrow: 'Home summary',
    title: ['이번 달 상태를', '한 화면에서'],
    body:
      '월 지출, 오늘 소비, 이번 주 흐름, 예산 위험 신호를 첫 화면에서 바로 확인합니다. 작은 앱 화면 속 글자를 읽게 만들기보다, 중요한 판단만 크게 꺼내 보여줍니다.',
    image: '/product-proof/home-summary.png',
    alt: 'weeple 홈 요약 화면 목업',
    specs: ['월 지출 추적', '예산 위험 표시', '카테고리 TOP', '예상 지출 흐름'],
    callout: '오늘 얼마 썼고, 이번 달 위험 신호가 어디인지 먼저 보입니다.',
    featureTitle: '홈 요약',
    featureLead:
      '앱을 열자마자 월 지출, 오늘 소비, 예산 위험, 카테고리 흐름을 먼저 보여줍니다.',
    imageCaption: '홈 요약 화면',
    highlights: [
      {
        title: '월 지출과 예산 비교',
        body: '이번 달 지출이 예산 대비 어디까지 왔는지 먼저 확인합니다.',
      },
      {
        title: '오늘 소비와 예상 흐름',
        body: '오늘 쓴 돈과 이번 달 예상 지출을 한 화면에서 같이 봅니다.',
      },
      {
        title: '카테고리 TOP',
        body: '어느 항목이 지출을 끌어올리는지 바로 찾습니다.',
      },
    ],
  },
  {
    id: 'couple',
    index: '02',
    eyebrow: 'Record flow',
    title: ['찾고, 나누고,', '빠르게 기록'],
    body:
      '소비내역은 날짜와 카테고리로 찾고, 입력은 키보드·음성·영수증 흐름으로 짧게 끝냅니다. 개인 지출과 커플 지출은 기록 단계부터 분리합니다.',
    image: '/product-proof/transaction-history.png',
    alt: 'weeple 소비내역 필터 화면 목업',
    secondaryImage: '/product-proof/quick-input.png',
    secondaryAlt: 'weeple 빠른 입력 화면 목업',
    specs: ['날짜 캘린더', '카테고리 필터', '개인/커플 입력', '영수증 기록'],
    callout: '입력은 짧게, 구분은 처음부터 명확하게.',
    featureTitle: '지출 기록과 필터',
    featureLead:
      '지출 내역은 날짜와 카테고리로 찾고, 입력할 때부터 개인 지출과 커플 지출을 나눕니다.',
    imageCaption: '소비내역 필터',
    secondaryCaption: '빠른 입력',
    highlights: [
      {
        title: '날짜 캘린더',
        body: '월별 기록에서 원하는 날짜로 빠르게 이동합니다.',
      },
      {
        title: '카테고리 필터',
        body: '식비, 교통, 쇼핑처럼 보고 싶은 지출만 좁혀 봅니다.',
      },
      {
        title: '개인/커플 구분',
        body: '기록 단계에서부터 내 지출과 공동 지출을 분리합니다.',
      },
    ],
  },
  {
    id: 'insights',
    index: '03',
    eyebrow: 'Report & AI',
    title: ['리포트는 근거로,', 'AI는 대화의 시작점으로'],
    body:
      '리포트는 카테고리 비중과 공동 지출을 보여주고, AI는 패턴 포착·권장·긍정 신호를 짧게 정리합니다. 판단을 대신하기보다 둘이 이야기할 출발점을 만듭니다.',
    image: '/product-proof/report-dashboard.png',
    alt: 'weeple 리포트 화면 목업',
    secondaryImage: '/product-proof/ai-insights.png',
    secondaryAlt: 'weeple AI 분석 화면 목업',
    specs: ['카테고리 비중', '공동 지출 흐름', 'AI 패턴 포착', '절약 권장'],
    callout: '분석 결과는 잔소리가 아니라 다음 대화를 여는 문장입니다.',
    featureTitle: '리포트와 AI 인사이트',
    featureLead:
      '카테고리 비중과 공동 지출 흐름을 근거로, AI가 대화에 쓸 수 있는 짧은 신호를 정리합니다.',
    imageCaption: '리포트 화면',
    secondaryCaption: 'AI 분석 화면',
    highlights: [
      {
        title: '카테고리 비중',
        body: '어떤 항목이 지출의 대부분을 차지하는지 비율로 봅니다.',
      },
      {
        title: '공동 지출 흐름',
        body: '둘이 같이 쓴 돈과 개인 소비를 구분해서 확인합니다.',
      },
      {
        title: 'AI 패턴 포착',
        body: '주의할 소비 패턴과 긍정 신호를 짧은 문장으로 받습니다.',
      },
    ],
  },
  {
    id: 'budget',
    index: '04',
    eyebrow: 'Budget setting',
    title: ['예산은 큰 숫자보다,', '카테고리별 기준이 먼저입니다'],
    body:
      '월 예산과 수입, 매달 빠지는 고정 지출, 카테고리별 한도를 같은 화면에서 봅니다. 어디서 새는지보다 어디를 조정할지 빠르게 보이게 합니다.',
    image: '/product-proof/budget-settings.png',
    alt: 'weeple 예산 설정 화면 목업',
    specs: ['월 예산', '월 수입', '고정 지출', '카테고리 한도'],
    callout: '이번 달 돈이 어디에서 샐지보다, 어디를 조정할지 보이게 합니다.',
    featureTitle: '예산 설정',
    featureLead:
      '월 예산과 수입, 고정 지출, 카테고리별 한도를 한 화면에서 잡아 다음 소비 기준을 만듭니다.',
    imageCaption: '예산 설정 화면',
    highlights: [
      {
        title: '월 예산과 수입',
        body: '이번 달 쓸 수 있는 기준 금액을 먼저 정합니다.',
      },
      {
        title: '고정 지출 관리',
        body: '매달 빠지는 비용을 따로 묶어 예산 착시를 줄입니다.',
      },
      {
        title: '카테고리 한도',
        body: '교통, 주거, 교육처럼 항목별 한도를 직접 조정합니다.',
      },
    ],
  },
]

const founderPrinciples = [
  '공동 지출은 같이 보고, 개인 소비는 침범하지 않기',
  '입력은 짧게, 확인은 사람이 마지막에 하기',
  'AI는 판단자가 아니라 대화의 시작점으로 쓰기',
]

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div
      className={`mb-5 inline-flex items-center gap-2 border-y py-2 text-[11px] font-black uppercase tracking-[0.18em] ${
        dark ? 'border-white/70 text-white' : 'border-[#111513] text-[#111513]'
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-[#f06a4e]" aria-hidden />
      {children}
    </div>
  )
}

function Specs({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div
      className={`mt-8 grid gap-px overflow-hidden border-y ${
        dark ? 'border-white/20 bg-white/20' : 'border-[#111513]/15 bg-[#111513]/15'
      } sm:grid-cols-2`}
    >
      {items.map((item) => (
        <span
          key={item}
          className={`px-4 py-3 text-sm font-bold ${
            dark ? 'bg-[#111513] text-white/82' : 'bg-[#f7faf7] text-[#33423b]'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function StoryTitle({ lines, dark = false }: { lines: string[]; dark?: boolean }) {
  return (
    <h2
      className={`mt-4 max-w-xl text-4xl font-black leading-[1.03] [word-break:keep-all] sm:text-6xl ${
        dark ? 'text-white' : 'text-[#111513]'
      }`}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h2>
  )
}

function FeatureHighlights({
  items,
  compact = false,
}: {
  items: Array<{ title: string; body: string }>
  compact?: boolean
}) {
  return (
    <div className={compact ? 'mt-5 grid gap-2' : 'mt-6 grid gap-3'}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`grid gap-3 border-t border-[#111513]/12 ${
            compact ? 'grid-cols-[1.6rem_1fr] pt-3' : 'grid-cols-[2rem_1fr] pt-4'
          }`}
        >
          <span className="num text-sm font-black text-[#0f9f8f]">{index + 1}</span>
          <div>
            <p className="text-sm font-black leading-5 text-[#111513] [word-break:keep-all]">
              {item.title}
            </p>
            <p
              className={`mt-1 text-[#52645b] [word-break:keep-all] ${
                compact ? 'text-sm leading-6' : 'text-[15px] leading-6'
              }`}
            >
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProductImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-lg shadow-[0_28px_80px_rgba(17,21,19,0.12)] ${className}`}
    />
  )
}

function StickyProductStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const nextIndex = Number((visible.target as HTMLElement).dataset.stepIndex)
          if (!Number.isNaN(nextIndex)) {
            setActiveIndex(nextIndex)
          }
        }
      },
      {
        rootMargin: '-24% 0px -42% 0px',
        threshold: [0.18, 0.35, 0.55, 0.75],
      },
    )

    stepRefs.current.forEach((node) => {
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const activeStep = storySteps[activeIndex]

  return (
    <section
      id="live-demo"
      className="relative border-b border-[#111513]/10 bg-[#f8fbf8] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      aria-label="스크롤로 보는 weeple 앱 화면"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,159,143,0.08), transparent 42%, rgba(240,106,78,0.035) 100%), repeating-linear-gradient(0deg, rgba(17,21,19,0.028) 0 1px, transparent 1px 112px)',
        }}
      />

      <div className="mx-auto mb-14 max-w-7xl">
        <Eyebrow>product story</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <h2 className="max-w-2xl text-4xl font-black leading-[1.03] text-[#111513] sm:text-6xl">
            스크롤할수록, 앱 화면이 설명이 됩니다.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[#52645b] sm:text-lg">
            작은 스크린샷을 읽으라고 던지지 않습니다. 한 화면을 크게 붙잡아 두고,
            지금 봐야 하는 판단만 옆에서 큰 문장으로 꺼냅니다.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
        <div className="space-y-10 lg:space-y-0 lg:pb-[48vh]">
          {storySteps.map((step, index) => (
            <article
              key={step.id}
              id={index === 0 ? undefined : step.id}
              ref={(node) => {
                stepRefs.current[index] = node
              }}
              data-step-index={index}
              className="scroll-mt-24 py-12 lg:flex lg:min-h-[72vh] lg:items-center lg:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
                className={`w-full transition-opacity duration-300 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-42'
                }`}
              >
                <span className="num text-sm font-black text-[#0f9f8f]">{step.index}</span>
                <div className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#0f9f8f]">
                  {step.eyebrow}
                </div>
                <StoryTitle lines={step.title} />
                <p className="mt-6 max-w-xl text-base leading-8 text-[#52645b] sm:text-lg">
                  {step.body}
                </p>
                <div className="mt-7 border-l-2 border-[#f06a4e] pl-4 text-lg font-bold leading-8 text-[#33423b] [word-break:keep-all]">
                  {step.callout}
                </div>
                <div className="lg:hidden">
                  <FeatureHighlights items={step.highlights} compact />
                </div>
                <div className="mt-7 overflow-hidden rounded-lg border border-[#111513]/10 bg-white/72 shadow-[0_22px_70px_rgba(17,21,19,0.12)] lg:hidden">
                  <ProductImage src={step.image} alt={step.alt} className="shadow-none" />
                </div>
                {step.secondaryImage && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-[#111513]/10 bg-white/72 shadow-[0_22px_70px_rgba(17,21,19,0.12)] lg:hidden">
                    <ProductImage src={step.secondaryImage} alt={step.secondaryAlt ?? ''} className="shadow-none" />
                  </div>
                )}
                <div className="hidden lg:block">
                  <Specs items={step.specs} />
                </div>
              </motion.div>
            </article>
          ))}
        </div>

        <aside className="sticky top-20 hidden h-[calc(100svh-5rem)] items-center lg:flex">
          <div className="w-full overflow-hidden rounded-lg border border-[#111513]/10 bg-white/78 shadow-[0_42px_140px_rgba(17,21,19,0.14)] backdrop-blur">
            <div className="grid xl:grid-cols-[0.44fr_0.56fr]">
              <div className="flex min-h-[35rem] flex-col border-b border-[#111513]/10 p-5 xl:border-b-0 xl:border-r">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6f8f4] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0f9f8f]">
                  <span className="num">{activeStep.index}</span>
                  기능 설명
                </div>
                <h3 className="mt-5 text-3xl font-black leading-[1.05] text-[#111513] [word-break:keep-all]">
                  {activeStep.featureTitle}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#52645b] [word-break:keep-all]">
                  {activeStep.featureLead}
                </p>
                <FeatureHighlights items={activeStep.highlights} compact />
                <div className="mt-auto pt-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0f9f8f]">
                    핵심 한 줄
                  </p>
                  <p className="mt-2 border-l-2 border-[#f06a4e] pl-3 text-lg font-black leading-7 text-[#111513] [word-break:keep-all]">
                    {activeStep.callout}
                  </p>
                </div>
              </div>

              <div className="bg-[#edf8f5] p-4">
                <div className="relative overflow-hidden rounded-lg border border-[#111513]/10 bg-white shadow-[0_24px_80px_rgba(17,21,19,0.11)]">
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-white/82 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#0f9f8f] shadow-[0_10px_28px_rgba(17,21,19,0.08)] backdrop-blur">
                    {activeStep.imageCaption}
                  </div>
                  <div className="relative aspect-[16/9]">
                    {storySteps.map((step, index) => (
                      <img
                        key={step.id}
                        src={step.image}
                        alt={step.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-contain p-3 transition-all duration-700 ease-out ${
                          activeIndex === index
                            ? 'scale-100 opacity-100 blur-0'
                            : 'scale-[0.985] opacity-0 blur-[2px]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {activeStep.secondaryImage ? (
                  <div className="mt-3 grid grid-cols-[0.88fr_1.12fr] gap-3">
                    <div className="rounded-lg border border-[#111513]/10 bg-white/74 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0f9f8f]">
                        이어서 보는 화면
                      </p>
                      <p className="mt-2 text-xl font-black leading-tight text-[#111513] [word-break:keep-all]">
                        {activeStep.secondaryCaption}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#52645b] [word-break:keep-all]">
                        같은 흐름에서 다음 행동까지 이어집니다.
                      </p>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-[#111513]/10 bg-white">
                      <div className="relative aspect-[16/9]">
                        <img
                          src={activeStep.secondaryImage}
                          alt={activeStep.secondaryAlt ?? ''}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain p-2"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 grid gap-px overflow-hidden rounded-lg border border-[#111513]/10 bg-[#111513]/12 sm:grid-cols-2">
                    {activeStep.specs.slice(0, 4).map((item) => (
                      <span key={item} className="bg-white/78 px-4 py-3 text-sm font-bold text-[#33423b]">
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  {storySteps.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => {
                        stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }}
                      aria-label={`${step.eyebrow} 화면으로 이동`}
                      aria-current={activeIndex === index}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        activeIndex === index ? 'bg-[#0f9f8f]' : 'bg-[#111513]/14'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default function ProductProofSections() {
  return (
    <>
      <section
        id="problem"
        className="relative border-y border-[#111513]/10 bg-[#eef6f2] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
        aria-label="문제 인식"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#0f9f8f]">
              The real problem
            </div>
            <h2 className="max-w-xl text-4xl font-black leading-[1.03] text-[#111513] sm:text-6xl">
              돈 얘기는 계산보다 먼저 분위기를 망칩니다.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#52645b] sm:text-lg sm:leading-8">
              그래서 weeple은 더 많은 차트보다, 둘이 덜 피곤해지는 구조를 먼저 봅니다.
            </p>
          </motion.div>

          <div className="border-t border-[#111513]">
            {reasons.map((reason, index) => (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid gap-5 border-b border-[#111513]/15 py-8 sm:grid-cols-[7rem_1fr]"
              >
                <div className="num text-sm font-bold text-[#f06a4e]">0{index + 1}</div>
                <div>
                  <h3 className="text-2xl font-extrabold leading-tight text-[#111513]">
                    {reason.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-[#52645b]">
                    {reason.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <StickyProductStory />

      <section id="about" className="relative bg-[#111513] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10" aria-label="weeple을 만든 이유">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Eyebrow dark>founder note</Eyebrow>
            <h2 className="text-4xl font-black leading-[1.03] sm:text-5xl xl:text-6xl">
              비개발자 1인이, 돈 얘기 하나 때문에 만들기 시작했습니다.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-7"
          >
            <div className="max-w-2xl space-y-5 text-lg leading-9 text-white/76">
              <p>
                시작은 멋진 금융 서비스를 만들겠다는 계획이 아니었습니다. 둘이 같이 쓰는 돈을 이야기할 때마다,
                숫자보다 먼저 표정이 굳는 순간이 싫었습니다.
              </p>
              <p>
                그래서 weeple은 화려한 금융 기능보다 먼저, 둘 사이의 경계를 덜 다치게 하는 구조에서 시작했습니다.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border-y border-white/20 bg-white/20">
              {founderPrinciples.map((item, index) => (
                <div key={item} className="grid gap-4 bg-[#111513] py-5 sm:grid-cols-[4rem_1fr]">
                  <div className="num text-sm font-bold text-[#f06a4e]">0{index + 1}</div>
                  <p className="text-base font-semibold leading-7 text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
