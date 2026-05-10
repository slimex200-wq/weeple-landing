import StructuredData from "@/components/StructuredData";
import StickyNav from "@/components/StickyNav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import LiveDemo from "@/components/LiveDemo";
import Couple from "@/components/Couple";
import SmartInsights from "@/components/SmartInsights";
import Trust from "@/components/Trust";
import Voices from "@/components/Voices";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <>
      <StructuredData />
      <StickyNav />
      <main className="ko-keep flex-1">
        <Hero />
        <Problem />
        <About />
        <LiveDemo />
        <Couple />
        <SmartInsights />
        <Trust />
        <Voices />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
