'use client'

import { motion } from 'motion/react'

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 px-6"
      aria-label="weeple 소개"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            About
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
            둘이 쓰는 돈이 말이 되게,
            <br />
            <span className="text-fg-muted">우리를 피곤하지 않게.</span>
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-fg-secondary leading-relaxed max-w-2xl">
            <p>
              카드와 계좌는 공용인데, 가계부는 혼자 쓰는 게 기본이었어요.
              누가 썼는지 서로 따지지 않고도 둘의 지출을 한눈에 정리하고 싶었습니다.
            </p>
            <p>
              weeple 은 공동 지출만 자동으로 공유하고, 개인 지출은 당신의 것으로 남깁니다.
              AI 는 패턴을 읽어 대화의 시작점을 만들어 줘요. &ldquo;이번 달 왜 이렇게 썼어?&rdquo; 대신
              &ldquo;카페가 20% 늘었네, 같이 줄여볼까?&rdquo; 같은 대화를 목표로 합니다.
            </p>
            <p className="text-fg">
              <span className="font-semibold">둘이 쓰는 돈, 한눈에.</span>{' '}
              그게 우리가 만드는 단 하나의 제품입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
