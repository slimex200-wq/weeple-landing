'use client'

// Rotation scene — the sticky canvas for Section 2.
// Exposes an imperative ref so the parent GSAP ScrollTrigger timeline can
// scrub rotation.x/z on the central disc.

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense, forwardRef, useImperativeHandle, useRef } from 'react'
import type { Group } from 'three'
import LedgerDisc from './LedgerDisc'

export type RotationHandle = {
  getGroup: () => Group | null
}

const RotationScene = forwardRef<RotationHandle>(function RotationScene(_, ref) {
  const groupRef = useRef<Group | null>(null)

  useImperativeHandle(ref, () => ({
    getGroup: () => groupRef.current,
  }))

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <color attach="background" args={['#0A0806']} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.6}
        color="#ffaa66"
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#5a6b8a" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <LedgerDisc ref={groupRef} scale={1.55} />
      </Suspense>
    </Canvas>
  )
})

export default RotationScene
