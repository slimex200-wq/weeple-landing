'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import type { Group } from 'three'
import LedgerDisc from './LedgerDisc'
import { ensureGsap } from '@/lib/gsap'

type Tier = 0 | 1 | 2

function ProductDisc({ tier }: { tier: Tier }) {
  const ref = useRef<Group | null>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y += 0.004
    ref.current.position.y = Math.sin(t * 0.6) * 0.05
  })

  useEffect(() => {
    const { gsap } = ensureGsap()
    if (!ref.current) return
    // tier 0/1/2 map to slight tilt + scale differences so the disc "morphs"
    const cfg = [
      { rotX: -0.15, scale: 1.15 },
      { rotX: 0.05, scale: 1.3 },
      { rotX: -0.3, scale: 1.45 },
    ][tier]
    gsap.to(ref.current.rotation, {
      x: cfg.rotX,
      duration: 1.1,
      ease: 'power3.inOut',
    })
    gsap.to(ref.current.scale, {
      x: cfg.scale,
      y: cfg.scale,
      z: cfg.scale,
      duration: 1.1,
      ease: 'power3.inOut',
    })
  }, [tier])

  return <LedgerDisc ref={ref} />
}

export default function ProductScene({ tier }: { tier: Tier }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <color attach="background" args={['#0A0806']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 3]} intensity={1.5} color="#ffaa66" />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#5a6b8a" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <ProductDisc tier={tier} />
      </Suspense>
    </Canvas>
  )
}
