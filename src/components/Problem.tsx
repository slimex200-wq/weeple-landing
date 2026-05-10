'use client'

import { motion } from 'motion/react'

const reasons = [
  {
    title: '기록은 한 명이 하는데, 돈은 둘이 씁니다',
    body: '한 사람이 더 꼼꼼하다는 이유로 모든 입력을 떠안으면 가계부는 관리 도구가 아니라 숙제가 됩니다.',
  },
  {
    title: '정산은 숫자인데, 대화는 감정입니다',
    body: '누가 더 냈는지보다 더 어려운 건 그 이야기를 꺼내는 순간입니다. 돈 얘기는 쉽게 방어적으로 변합니다.',
  },
  {
    title: '절약은 의지가 아니라 구조입니다',
    body: '각자 쓴 돈과 함께 쓴 돈이 섞이면 다음 소비를 줄일 기준도 흐려집니다. 먼저 보여야 할 것은 잔소리가 아니라 흐름입니다.',
  },
]

export default function Problem() {
  return (
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
          <h2 className="max-w-xl text-4xl font-black leading-[1.02] text-[#111513] sm:text-6xl">
            돈 얘기는
            <br />
            계산보다 먼저
            <br />
            분위기를 망칩니다.
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
              <div className="num text-sm font-bold text-[#f06a4e]">
                0{index + 1}
              </div>
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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="py-10"
          >
            <p className="max-w-3xl text-2xl font-black leading-snug text-[#111513] sm:text-4xl">
              좋은 가계부는 소비를 혼내는 앱이 아니라, 말하기 어려운 돈의 흐름을
              먼저 정리해 주는 앱이어야 합니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
