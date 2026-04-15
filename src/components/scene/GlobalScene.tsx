'use client'

/**
 * GlobalScene — layout.tsx 최상단에 한 번만 마운트되는 풀스크린 WebGL 레이어.
 *
 * 구조:
 *   <ScrollProvider>                (context, scroll/mouse/section 가중)
 *     fixed wrapper (z-index:-1, pointer-events:none, aria-hidden)
 *       <Canvas dpr={[1,2]}>
 *         <PerformanceMonitor/>      tier 결정(high/mid/low)
 *         <CameraRig/>
 *         <ambient/directional light>
 *         <ShaderBackground/>
 *         <ParticleField tier={...}/>
 *         <HeroProduct/>
 *         <CoupleSpheres/>
 *         <AIOrbs/>
 *         <PricingCrystals/>
 *         <PostFX enabled={tier!=='low'}/>
 *       </Canvas>
 *   </ScrollProvider>
 *
 * Reduced-motion: ShaderBackground/ParticleField 내부에서 uniform 통해 감쇠.
 *                 CameraRig 는 완전 정지.
 *
 * Perf: <PerformanceMonitor> 로 fps < ~45 일 때 tier 다운그레이드.
 *       dpr 은 [1,2] 로 캡, bloom 은 mipmapBlur, multisampling 0.
 */

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'

import ScrollProvider from './ScrollProvider'
import ShaderBackground from './ShaderBackground'
import ParticleField, { type ParticleTier } from './ParticleField'
import CameraRig from './CameraRig'
import PostFX from './PostFX'
import HeroProduct from './HeroProduct'
import CoupleSpheres from './CoupleSpheres'
import AIOrbs from './AIOrbs'
import PricingCrystals from './PricingCrystals'

export default function GlobalScene() {
  const [tier, setTier] = useState<ParticleTier>('mid')
  // PerformanceMonitor 는 factor 0..1 을 준다. 낮을수록 느림.
  // incline 시 tier 를 한 단계 올리고, decline 시 내린다.
  const onIncline = () => {
    setTier((prev) => (prev === 'low' ? 'mid' : prev === 'mid' ? 'high' : 'high'))
  }
  const onDecline = () => {
    setTier((prev) => (prev === 'high' ? 'mid' : prev === 'mid' ? 'low' : 'low'))
  }

  return (
    <ScrollProvider>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -1 }}
      >
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 50 }}
            style={{ background: 'transparent' }}
          >
            <PerformanceMonitor onIncline={onIncline} onDecline={onDecline} />

            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 6, 5]} intensity={0.8} />
            <directionalLight position={[-4, -2, 3]} intensity={0.35} color="#B45309" />

            <CameraRig />
            <ShaderBackground />
            <ParticleField tier={tier} />

            <HeroProduct />
            <CoupleSpheres />
            <AIOrbs />
            <PricingCrystals />

            <PostFX enabled={tier !== 'low'} />
          </Canvas>
        </Suspense>
      </div>
    </ScrollProvider>
  )
}
