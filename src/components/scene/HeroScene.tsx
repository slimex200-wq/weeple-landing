'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'
import LedgerDisc from './LedgerDisc'

function FloatingDisc() {
  const ref = useRef<Group | null>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.y = t * 0.2
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.08 - 0.25
      ref.current.position.y = Math.sin(t * 0.6) * 0.08
    }
  })
  return <LedgerDisc ref={ref} scale={1.4} />
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <color attach="background" args={['#0A0806']} />
      <fog attach="fog" args={['#0A0806', 5, 12]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.5}
        color="#ffaa66"
        castShadow
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#5a6b8a" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <FloatingDisc />
      </Suspense>
    </Canvas>
  )
}
