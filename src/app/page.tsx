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

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Problem />
        <Promise />
        <LiveDemo />
        <Couple />
        <AIBrain />
        <Security />
        <Voices />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
