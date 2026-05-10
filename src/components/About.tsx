'use client'

import { motion } from 'motion/react'

const principles = [
  '공동 지출은 같이 보고, 개인 소비는 침범하지 않기',
  '입력은 짧게, 확인은 사람이 마지막에 하기',
  'AI는 판단자가 아니라 대화의 시작점으로 쓰기',
]

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#111513] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10"
      aria-label="weeple을 만든 이유"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#78d8c8]">
            Founder note
          </div>
          <h2 className="text-4xl font-black leading-[1.03] sm:text-5xl xl:text-6xl">
            비개발자 1인이,
            <br />
            돈 얘기 하나 때문에
            <br />
            만들기 시작했습니다.
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
              시작은 멋진 금융 서비스를 만들겠다는 계획이 아니었습니다. 둘이 같이 쓰는
              돈을 이야기할 때마다, 숫자보다 먼저 표정이 굳는 순간이 싫었습니다.
            </p>
            <p>
              누가 더 썼는지 따지고 싶었던 게 아니라, 같은 상황을 보고 이야기하고
              싶었습니다. 그런데 기존 가계부는 혼자 쓰기에는 충분해도 둘이 쓰기에는
              너무 쉽게 피곤해졌습니다.
            </p>
            <p className="text-white">
              그래서 weeple은 화려한 금융 기능보다 먼저, 둘 사이의 경계를 덜 다치게
              하는 구조에서 시작했습니다.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border-y border-white/20 bg-white/20">
            {principles.map((item, index) => (
              <div key={item} className="grid gap-4 bg-[#111513] py-5 sm:grid-cols-[4rem_1fr]">
                <div className="num text-sm font-bold text-[#f06a4e]">0{index + 1}</div>
                <p className="text-base font-semibold leading-7 text-white/90">{item}</p>
              </div>
            ))}
          </div>

          <p className="max-w-2xl text-sm leading-7 text-white/54">
            이 소개는 거창한 창업 서사가 아니라 제품의 방향을 잊지 않기 위한 메모입니다.
            기능이 늘어나도 기준은 같습니다. 둘이 쓰는 돈은 같이 보고, 혼자 쓰는 돈은
            혼자 남겨두는 것.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
