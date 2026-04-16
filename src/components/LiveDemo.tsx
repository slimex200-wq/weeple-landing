'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function LiveDemo() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="live-demo"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      aria-label="3D 인터랙티브 데모"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl mb-12 sm:mb-16 mx-auto text-center"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            Experience
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-fg">
            직접 만져보는
            <br />
            <span className="text-fg-muted">앱 체험.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
            드래그로 회전, ▶ 버튼으로 각 화면의 데모 시연. 7개 화면 모두 진짜 앱 UI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative w-full rounded-3xl overflow-hidden glass shadow-[0_60px_120px_-30px_rgba(14,165,160,0.25)]"
          style={{ aspectRatio: isMobile ? '4/5' : '16/10' }}
        >
          {isMobile === false && (
            <iframe
              src="/weeple-3d-promo.html"
              title="weeple 3D 데모"
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
          {isMobile === true && (
            <div className="absolute inset-0 flex flex-col">
              <div
                className="flex-1 bg-center bg-cover"
                style={{ backgroundImage: 'url(/demo-fallback.png)' }}
                aria-hidden
              />
              <a
                href="/weeple-3d-promo.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 bg-mint text-white font-semibold text-sm"
              >
                360° 체험하기
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
