'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'motion/react'

type TiltCardProps = {
  children: ReactNode
  className?: string
}

/**
 * 마우스 호버 시 3D tilt 효과를 주는 래퍼 컴포넌트.
 * reduced-motion 시 정적 div로 동작.
 */
export default function TiltCard({ children, className }: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // x 위치 → rotateY, y 위치 → rotateX (반전)
  const rotateY = useTransform(x, [-0.5, 0.5], [15, -15])
  const rotateX = useTransform(y, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
