import StickyNav from '@/components/StickyNav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import LiveDemo from '@/components/LiveDemo'
import Couple from '@/components/Couple'
import SmartInsights from '@/components/SmartInsights'
import Trust from '@/components/Trust'
import Voices from '@/components/Voices'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import StickyCTA from '@/components/StickyCTA'

export default function Home() {
  return (
    <>
      <StickyNav />
      <main className="flex-1">
        <Hero />
        <Problem />
        <LiveDemo />
        <Couple />
        <SmartInsights />
        <Trust />
        <Voices />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
