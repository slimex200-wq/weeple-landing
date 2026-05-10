'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const reasons = [
  {
    title: '둘이 쓰는 생활비는 생겼는데, 기준은 아직 각자입니다',
    body: '생활비, 데이트비, 월세처럼 둘이 책임지는 돈과 각자 남겨둘 돈을 먼저 나눠야 합니다.',
  },
  {
    title: '공동 지출과 개인 소비가 섞이면 금방 피곤해집니다',
    body: '모든 지출을 다 공유하면 부담스럽고, 아무것도 공유하지 않으면 기준이 흐려집니다.',
  },
  {
    title: '예산은 혼자 정하면 오래 지키기 어렵습니다',
    body: '이번 달 어디까지 같이 쓰고, 어디부터 각자 조정할지 같은 화면에서 확인해야 합니다.',
  },
]

const moneyAreas = ['공동 생활비', '데이트비', '월세·고정지출', '각자 소비']
const flowItems = ['알림 후보', '상태 확인', '공동/개인 구분', '예산 기준', '리포트/AI']
const notificationSteps = [
  {
    title: '알림 감지',
    body: 'Android에서 카드·계좌·페이 알림을 감지합니다.',
  },
  {
    title: '후보 거래',
    body: '결제·출금은 지출 후보로, 입금·송금받음은 수입 후보로 분류합니다.',
  },
  {
    title: '확인 후 저장',
    body: '자동 저장이 아니라 사용자가 확인한 거래만 가계부에 남깁니다.',
  },
]

const storySteps = [
  {
    id: 'live-demo',
    index: '01',
    eyebrow: 'Home summary',
    title: ['이번 달 우리 집 돈을', '한 화면에서'],
    body:
      '월 지출, 오늘 소비, 이번 주 흐름, 예산 위험 신호를 첫 화면에서 바로 확인합니다. 커플·부부 돈 관리는 숫자를 많이 보는 일보다 둘이 같은 기준을 보는 일에 가깝습니다.',
    image: '/product-proof/home-summary.png',
    alt: 'weeple 홈 요약 화면 목업',
    specs: ['월 지출 추적', '예산 위험 표시', '카테고리 TOP', '예상 지출 흐름'],
    callout: '이번 달 우리 집 돈 상태를 둘이 같은 화면에서 봅니다.',
    featureTitle: '홈 요약',
    featureLead:
      '앱을 열자마자 생활비와 데이트비가 어디까지 왔는지, 이번 달 예산 위험이 있는지 먼저 확인합니다.',
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
    eyebrow: 'Shared boundary',
    title: ['같이 쓴 돈과', '각자 쓴 돈을 나눕니다'],
    body:
      '생활비와 데이트 비용은 함께 보고, 개인 약속이나 취미 비용은 각자의 영역으로 남깁니다. 입력은 짧게 끝내되, 공동 지출과 개인 지출은 처음부터 분리합니다.',
    image: '/product-proof/transaction-history.png',
    alt: 'weeple 소비내역 필터 화면 목업',
    secondaryImage: '/product-proof/quick-input.png',
    secondaryAlt: 'weeple 빠른 입력 화면 목업',
    specs: ['공동 지출', '개인 소비', '날짜 캘린더', '카테고리 필터'],
    callout: '생활비는 같이 보고, 개인 소비는 각자의 영역으로 남깁니다.',
    featureTitle: '공동/개인 구분',
    featureLead:
      '지출을 입력할 때부터 공동 지출과 개인 소비를 나눠서, 공유할 돈과 남겨둘 돈의 경계를 흐리지 않습니다.',
    imageCaption: '공동/개인 지출',
    secondaryCaption: '빠른 입력',
    highlights: [
      {
        title: '공동 지출',
        body: '월세, 식비, 데이트 비용처럼 같이 책임지는 돈을 함께 봅니다.',
      },
      {
        title: '개인 소비',
        body: '취미, 약속, 선물처럼 혼자 쓰는 돈은 각자의 영역으로 남깁니다.',
      },
      {
        title: '빠른 기록',
        body: '날짜와 카테고리로 찾고, 입력은 짧게 끝내 관리 부담을 줄입니다.',
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

type StoryStep = (typeof storySteps)[number]

const storySequence: StoryStep[] = [
  storySteps[0],
  storySteps[1],
  { ...storySteps[3], index: '03' },
  { ...storySteps[2], index: '04' },
]

const founderPrinciples = [
  '생활비와 데이트 비용은 같이 보고, 개인 소비는 침범하지 않기',
  '예산은 혼자 정하지 않고, 둘이 같은 화면에서 확인하기',
  'AI는 판단자가 아니라 다음 조정 포인트를 찾는 도구로 쓰기',
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

function TimelineChapter({ step, index }: { step: StoryStep; index: number }) {
  const ref = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'end 18%'],
  })
  const imageOpacity = useTransform(scrollYProgress, [0, 0.52, 0.64], [1, 1, 0])
  const imageY = useTransform(scrollYProgress, [0, 0.42, 0.64], [72, 0, -96])
  const imageScale = useTransform(scrollYProgress, [0, 0.42, 0.64], [0.97, 1, 0.97])
  const textOpacity = useTransform(scrollYProgress, [0.56, 0.68, 0.94], [0, 1, 1])
  const textY = useTransform(scrollYProgress, [0.56, 0.72, 0.94], [56, 0, -8])
  const textScale = useTransform(scrollYProgress, [0.56, 0.72], [0.98, 1])

  return (
    <article
      ref={ref}
      id={index === 0 ? undefined : step.id}
      className="relative min-h-[178svh] scroll-mt-20 border-t border-[#111513]/10 first:border-t-0"
    >
      <div className="sticky top-14 flex min-h-[calc(100svh-3.5rem)] items-center py-6 sm:top-16 sm:min-h-[calc(100svh-4rem)] sm:py-10">
        <div className="relative mx-auto w-full max-w-6xl">
          <motion.div
            style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
            className="relative z-10"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3 border-y border-[#111513]/12 py-3 sm:mb-6">
              <span className="num text-sm font-black text-[#0f9f8f]">{step.index}</span>
              <span className="rounded-full bg-[#dff8f3] px-4 py-2 text-xs font-black tracking-[0.12em] text-[#0f9f8f]">
                {step.featureTitle}
              </span>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#52645b]">
                {step.eyebrow}
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#111513]/10 bg-white/90 p-2 shadow-[0_42px_140px_rgba(17,21,19,0.14)] sm:p-4">
              <div className="relative aspect-[16/12] rounded-md bg-[#edf8f5] sm:aspect-[16/9]">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-contain p-1 sm:p-3"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: textOpacity, y: textY, scale: textScale }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="num text-sm font-black text-[#f06a4e]">{step.index}</span>
                <span className="rounded-full bg-[#111513] px-4 py-2 text-xs font-black tracking-[0.12em] text-white">
                  {step.featureTitle}
                </span>
              </div>
              <h3 className="mt-5 max-w-4xl text-4xl font-black leading-[1.04] text-[#111513] [word-break:keep-all] sm:mt-6 sm:text-6xl sm:leading-[1.02]">
                {step.callout}
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#52645b] [word-break:keep-all] sm:text-xl sm:leading-9">
                {step.featureLead}
              </p>
              <div className="mt-7 grid gap-0 border-y border-[#111513]/15 sm:grid-cols-3">
                {step.highlights.map((item) => (
                  <div key={item.title} className="border-b border-[#111513]/10 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0">
                    <p className="text-base font-black text-[#111513] [word-break:keep-all]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#52645b] [word-break:keep-all]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  )
}

function ScrollSequenceProductStory() {
  return (
    <section
      id="live-demo"
      className="relative border-b border-[#111513]/10 bg-[#f8fbf8] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
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

      <div className="mx-auto max-w-7xl">
        <Eyebrow>함께 관리하는 흐름</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
          <h2 className="max-w-3xl text-4xl font-black leading-[1.03] text-[#111513] [word-break:keep-all] sm:text-5xl">
            위플은 둘의 돈 관리를 이 흐름으로 정리합니다.
          </h2>
          <div>
            <p className="max-w-2xl text-base leading-8 text-[#52645b] [word-break:keep-all] sm:text-lg">
              Android 알림으로 거래 후보를 만들고, 이번 달 상태를 함께 보고, 공동 지출과 개인 소비를 나누고,
              예산 기준을 세운 뒤 리포트로 다음 조정 포인트를 확인합니다.
            </p>
            <div className="mt-6 grid gap-px overflow-hidden border-y border-[#111513]/14 bg-[#111513]/14 sm:grid-cols-5">
              {flowItems.map((item, index) => (
                <div key={item} className="bg-[#f8fbf8]/92 px-4 py-3">
                  <span className="num text-xs font-black text-[#f06a4e]">0{index + 1}</span>
                  <span className="ml-3 text-sm font-black text-[#111513] [word-break:keep-all]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl sm:mt-16">
        {storySequence.map((step, index) => (
          <TimelineChapter key={step.id} step={step} index={index} />
        ))}
      </div>
    </section>
  )
}

function NotificationProof() {
  return (
    <section
      id="notification-recording"
      className="relative border-b border-[#111513]/10 bg-[#111513] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10"
      aria-label="Android 알림 기반 기록"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Eyebrow dark>Android notification</Eyebrow>
          <h2 className="max-w-3xl text-4xl font-black leading-[1.03] [word-break:keep-all] sm:text-6xl">
            기록은 자동 후보로 시작하고, 저장은 직접 확인합니다.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="max-w-2xl text-lg leading-9 text-white/74 [word-break:keep-all]">
            Android에서는 카드·계좌·페이 알림을 감지해 거래 후보를 만들고,
            사용자가 확인 후 저장할 수 있어요. 카드나 계좌에 직접 연결하는 방식이 아니라,
            알림 권한을 켜고 필요한 거래만 남기는 흐름입니다.
          </p>
          <div className="mt-7 grid gap-px overflow-hidden border-y border-white/20 bg-white/20 sm:grid-cols-3">
            {notificationSteps.map((step, index) => (
              <div key={step.title} className="bg-[#111513] p-5">
                <span className="num text-sm font-black text-[#f06a4e]">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-black text-white [word-break:keep-all]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/68 [word-break:keep-all]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
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
              커플·부부의 첫 돈 기준
            </div>
            <h2 className="max-w-xl text-4xl font-black leading-[1.03] text-[#111513] [word-break:keep-all] sm:text-6xl">
              둘이 쓰는 생활비는 생겼는데, 기준은 아직 각자입니다.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#52645b] [word-break:keep-all] sm:text-lg sm:leading-8">
              weeple은 커플·부부가 생활비와 개인 소비의 기준을 함께 맞추기 위한 앱에 가깝습니다.
            </p>
            <div className="mt-8 flex max-w-md flex-wrap gap-2">
              {moneyAreas.map((item) => (
                <span
                  key={item}
                  className="border border-[#111513]/14 bg-white/52 px-3 py-2 text-sm font-bold text-[#33423b]"
                >
                  {item}
                </span>
              ))}
            </div>
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
                  <h3 className="text-2xl font-extrabold leading-tight text-[#111513] [word-break:keep-all]">
                    {reason.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-[#52645b] [word-break:keep-all]">
                    {reason.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <NotificationProof />

      <ScrollSequenceProductStory />

      <section id="about" className="relative bg-[#111513] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10" aria-label="weeple을 만든 이유">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Eyebrow dark>founder note</Eyebrow>
            <h2 className="text-4xl font-black leading-[1.03] [word-break:keep-all] sm:text-5xl xl:text-6xl">
              신혼부부 돈 관리를 잘하고 싶어서, 비개발자 1인이 만들기 시작했습니다.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-7"
          >
            <div className="max-w-2xl space-y-5 text-lg leading-9 text-white/76 [word-break:keep-all]">
              <p>
                시작은 멋진 금융 서비스를 만들겠다는 계획이 아니었습니다. 신혼 생활을 시작하면
                생활비, 데이트 비용, 고정 지출을 둘이 같은 기준으로 잘 관리하고 싶어집니다.
              </p>
              <p>
                그런데 기존 가계부는 혼자 쓰기에는 충분해도 둘이 쓰기에는 경계가 흐렸습니다.
                그래서 weeple은 누가 더 냈는지를 따지기보다, 같이 볼 돈과 각자 둘 돈을 먼저 나누는 구조에서 시작했습니다.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border-y border-white/20 bg-white/20">
              {founderPrinciples.map((item, index) => (
                <div key={item} className="grid gap-4 bg-[#111513] py-5 sm:grid-cols-[4rem_1fr]">
                  <div className="num text-sm font-bold text-[#f06a4e]">0{index + 1}</div>
                  <p className="text-base font-semibold leading-7 text-white/90 [word-break:keep-all]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
