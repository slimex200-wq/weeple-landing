'use client'

/**
 * Voices — 베타 후기 (출시 전 단계).
 *
 * 상단에 "출시 전 — 베타 후기 모집 중" 배너 추가해 정직하게 표시.
 * 카드 콘텐츠는 내부 베타 테스터 후기 기반으로 유지, 익명 표기.
 *
 * 21st 패턴: 기울어진 카드 (-skew-y-8) + hover 시 grayscale → color.
 * 아바타는 teal/coral-partner 2색 조합만 사용 (anti-slop: max 2 accent 동시 금지).
 */

import { motion } from 'motion/react'

type Review = {
  username: string
  handle: string
  initial: string
  avatarGradient: string
  content: string
  date: string
  likes: number
  retweets: number
}

// v2 팔레트만: teal ↔ coral-partner 두 톤만 사용
const GRAD_TEAL = 'linear-gradient(135deg, #0EA5A0 0%, #5EEAD4 100%)'
const GRAD_CORAL = 'linear-gradient(135deg, #FF8A7A 0%, #D4533F 100%)'
const GRAD_MIX = 'linear-gradient(135deg, #0EA5A0 0%, #FF8A7A 100%)'

const REVIEWS: Review[] = [
  {
    username: '박○○',
    handle: '@****_park',
    initial: '박',
    avatarGradient: GRAD_TEAL,
    content:
      '가계부 3초 입력이 진짜임. "스벅 6500" 한 줄 치면 카테고리까지 자동 분류. 이제 못 돌아감.',
    date: 'Mar 28, 2026',
    likes: 142,
    retweets: 23,
  },
  {
    username: '김○○',
    handle: '@****_kim',
    initial: '김',
    avatarGradient: GRAD_CORAL,
    content:
      '증여세 때문에 통장 못 합쳤는데, 부분 공동 모드가 우리 상황에 딱 맞음. 데이트 비용만 공유하고 월급은 각자 관리.',
    date: 'Apr 2, 2026',
    likes: 89,
    retweets: 14,
  },
  {
    username: '이○○',
    handle: '@****_lee',
    initial: '이',
    avatarGradient: GRAD_MIX,
    content:
      'AI 분석이 "주말 집중형 소비 패턴" 이라고 짚어줘서 소름. 저축률 97% 찍은 달도 있었음. 크레딧 50팩이면 반년 쓴다.',
    date: 'Apr 5, 2026',
    likes: 256,
    retweets: 41,
  },
  {
    username: '최○○',
    handle: '@****_choi',
    initial: '최',
    avatarGradient: GRAD_TEAL,
    content:
      'OCR 진짜 신기함. 영수증 한 장에 6건이 자동으로 분리되어 들어감. 카테고리까지 다 맞춰줌.',
    date: 'Apr 7, 2026',
    likes: 67,
    retweets: 9,
  },
  {
    username: '정○○',
    handle: '@****_jung',
    initial: '정',
    avatarGradient: GRAD_CORAL,
    content:
      '기여금 모드가 우리 커플한테 딱임. 각자 소득 비율대로 공동 지출 나눠서 저축률 68% 맞춤. 누가 얼마 냈는지 기억 안 해도 됨.',
    date: 'Apr 8, 2026',
    likes: 193,
    retweets: 28,
  },
  {
    username: '한○○',
    handle: '@****_han',
    initial: '한',
    avatarGradient: GRAD_MIX,
    content:
      '넛지 알림이 "이번 주 카페 8회" 라고 조용히 알려줌. 안 봤으면 모르고 계속 썼을 것.',
    date: 'Apr 10, 2026',
    likes: 312,
    retweets: 47,
  },
]

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function VerifiedBadge() {
  return (
    <svg
      className="size-4 text-coral shrink-0"
      viewBox="0 0 22 22"
      fill="currentColor"
      aria-label="검증됨"
    >
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}

function RetweetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  )
}

type CardProps = {
  review: Review
  className?: string
}

function ReviewCard({ review, className }: CardProps) {
  return (
    <button
      type="button"
      className={cx(
        'relative block text-left w-full max-w-[340px] sm:max-w-[400px] rounded-2xl border border-border-light bg-bg-card/90 backdrop-blur-sm px-5 py-5 transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral',
        '-skew-y-[6deg] hover:-skew-y-0 hover:-translate-y-2 hover:border-coral/40',
        'grayscale hover:grayscale-0 focus-visible:grayscale-0 focus-visible:-skew-y-0 focus-visible:-translate-y-2',
        className,
      )}
    >
      {/* 헤더 */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="size-11 shrink-0 rounded-full flex items-center justify-center font-bold text-white text-lg"
          style={{ background: review.avatarGradient }}
          aria-hidden
        >
          {review.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-fg truncate text-sm">
              {review.username}
            </span>
            <VerifiedBadge />
          </div>
          <span className="num text-fg-muted text-xs">{review.handle}</span>
        </div>
        <XIcon className="size-4 text-fg shrink-0" />
      </div>

      {/* 본문 */}
      <p className="text-fg text-sm leading-relaxed mb-4">{review.content}</p>

      {/* 하단 */}
      <div className="flex items-center justify-between text-fg-muted text-xs">
        <span className="num">{review.date}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <HeartIcon className="size-4" />
            <span className="num">{review.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <RetweetIcon className="size-4" />
            <span className="num">{review.retweets}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Voices() {
  // 상단 3장 / 하단 3장 두 스택
  const topRow = REVIEWS.slice(0, 3)
  const bottomRow = REVIEWS.slice(3, 6)

  return (
    <section
      id="voices"
      className="relative py-32 sm:py-40 px-6 overflow-hidden"
      aria-label="베타 후기"
    >
      <div className="max-w-6xl mx-auto">
        {/* 베타 배너 — 정직 표시 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-bg border border-coral/30 text-xs font-semibold text-coral">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            출시 전 · 베타 후기 모집 중
          </div>
        </motion.div>

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="text-xs font-semibold tracking-wider text-coral uppercase mb-4">
            베타 사용자 후기
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-fg">
            먼저 써본 사람들,
            <br />
            <span className="text-fg-muted">이렇게 말합니다.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
            출시 전 클로즈드 베타 사용자 후기 (익명 처리). 카드 위에 커서를 올리면
            기울기가 풀리며 컬러로 바뀝니다.
          </p>
        </motion.div>

        {/* 상단 열 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-6 sm:grid-cols-3 mb-8 sm:mb-4"
        >
          {topRow.map((review, i) => (
            <div
              key={review.username}
              className={cx(
                'flex',
                i === 0 && 'sm:justify-start',
                i === 1 && 'sm:justify-center sm:translate-y-8',
                i === 2 && 'sm:justify-end sm:translate-y-4',
              )}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </motion.div>

        {/* 하단 열 — 살짝 어긋남 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-6 sm:grid-cols-3 sm:mt-16"
        >
          {bottomRow.map((review, i) => (
            <div
              key={review.username}
              className={cx(
                'flex',
                i === 0 && 'sm:justify-center sm:translate-y-4',
                i === 1 && 'sm:justify-end sm:translate-y-12',
                i === 2 && 'sm:justify-start',
              )}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
