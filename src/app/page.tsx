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

/**
 * data-section 래퍼 — GlobalScene 의 IntersectionObserver 가 가중치 산출.
 * 각 섹션 컴포넌트가 자체적으로 id 를 가지고 있지만(anchor 스크롤용), scene
 * 트래킹 대상은 래퍼로 통일해서 예측가능한 경계 유지.
 */
function SceneSection({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <div data-section={id} className="relative">
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <main className="flex-1 relative">
        <SceneSection id="hero">
          <Hero />
        </SceneSection>
        <SectionMark>I. 문제</SectionMark>
        <SceneSection id="problem">
          <Problem />
        </SceneSection>
        <SceneSection id="promise">
          <Promise />
        </SceneSection>
        <SceneSection id="live-demo">
          <LiveDemo />
        </SceneSection>
        <SectionMark>II. 기능</SectionMark>
        <SceneSection id="couple">
          <Couple />
        </SceneSection>
        <SceneSection id="ai-brain">
          <AIBrain />
        </SceneSection>
        <SceneSection id="security">
          <Security />
        </SceneSection>
        <SectionMark>III. 커플</SectionMark>
        <SceneSection id="voices">
          <Voices />
        </SceneSection>
        <SectionMark>IV. 가격</SectionMark>
        <SceneSection id="pricing">
          <Pricing />
        </SceneSection>
        <SceneSection id="final-cta">
          <FinalCTA />
        </SceneSection>
      </main>
      <Footer />
    </>
  )
}
