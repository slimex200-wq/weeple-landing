'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

export default function ScrollProgress() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setEnabled(query.matches)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (!enabled) return null

  return <DesktopScrollProgress />
}

function DesktopScrollProgress() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

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
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-mint via-mint-end to-sky shadow-[0_2px_8px_rgba(14,165,160,0.35)]"
    />
  )
}
