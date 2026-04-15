'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/landing/LoadingScreen'
import Nav from '@/components/landing/Nav'
import SideNav from '@/components/landing/SideNav'
import Hero from '@/components/landing/Hero'
import Footer from '@/components/landing/Footer'
import ScrollSmoother from '@/components/ScrollSmoother'
import { ensureGsap } from '@/lib/gsap'

// Heavy sections below the fold are dynamically imported so the initial
// Hero + Nav bundle stays lean.
const RotationSection = dynamic(() => import('@/components/landing/RotationSection'), {
  ssr: false,
})
const Features = dynamic(() => import('@/components/landing/Features'), {
  ssr: false,
})
const EncodeSection = dynamic(() => import('@/components/landing/EncodeSection'), {
  ssr: false,
})
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), {
  ssr: false,
})
const ProductSection = dynamic(() => import('@/components/landing/ProductSection'), {
  ssr: false,
})

export default function Home() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Initialize GSAP + ScrollTrigger as early as possible.
    ensureGsap()
  }, [])

  return (
    <>
      <LoadingScreen onReady={() => setReady(true)} />
      {ready && <ScrollSmoother />}
      <Nav />
      <SideNav />
      <main>
        <Hero />
        <RotationSection />
        <Features />
        <EncodeSection />
        <Testimonials />
        <ProductSection />
      </main>
      <Footer />
    </>
  )
}
