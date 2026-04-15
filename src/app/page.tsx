import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Promise from '@/components/Promise'
import LiveDemo from '@/components/LiveDemo'
import Couple from '@/components/Couple'
import AIBrain from '@/components/AIBrain'
import Security from '@/components/Security'
import Voices from '@/components/Voices'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

// Editorial Warm 섹션 마커 — "I. 문제", "II. 기능" 등 serif italic + 양옆 헤어라인.
function SectionMark({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-mark" aria-hidden>
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <SectionMark>I. 문제</SectionMark>
        <Problem />
        <Promise />
        <LiveDemo />
        <SectionMark>II. 기능</SectionMark>
        <Couple />
        <AIBrain />
        <Security />
        <SectionMark>III. 커플</SectionMark>
        <Voices />
        <SectionMark>IV. 가격</SectionMark>
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
