'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

/**
 * 상단 고정 1px coral progress bar.
 * 페이지 스크롤 진행률을 scaleX(0→1)로 표시한다.
 * prefers-reduced-motion 이 켜지면 렌더를 건너뛴다.
 */
export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // spring 으로 부드럽게 감쇠 — 날뛰는 걸 방지
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  })

  if (prefersReducedMotion) return null

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: '0% 50%',
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-coral via-coral to-violet"
    />
  )
}
