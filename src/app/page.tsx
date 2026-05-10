import StructuredData from "@/components/StructuredData";
import StickyNav from "@/components/StickyNav";
import Hero from "@/components/Hero";
import ProductProofSections from "@/components/ProductProofSections";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
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
        <ProductProofSections />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
