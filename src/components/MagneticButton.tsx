'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type MagneticButtonProps = {
  children: ReactNode
  as?: 'a' | 'button'
  href?: string
  target?: string
  rel?: string
  className?: string
  onClick?: () => void
}

/**
 * 마우스 위치에 따라 버튼이 자석처럼 끌리는 컴포넌트.
 * reduced-motion 시 정적 래퍼로 동작.
 */
export default function MagneticButton({
  children,
  as = 'a',
  href,
  target,
  rel,
  className,
  onClick,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rawX.set((e.clientX - centerX) * 0.3)
    rawY.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  // reduced-motion: 정적 래퍼만 렌더
  if (prefersReducedMotion) {
    if (as === 'a') {
      return (
        <a href={href} target={target} rel={rel} className={className} onClick={onClick}>
          {children}
        </a>
      )
    }
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    )
  }

  const Tag = as === 'a' ? 'a' : 'button'

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-flex' }}
    >
      <motion.div style={{ x, y }}>
        <Tag
          href={as === 'a' ? href : undefined}
          target={as === 'a' ? target : undefined}
          rel={as === 'a' ? rel : undefined}
          className={className}
          onClick={onClick}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  )
}
