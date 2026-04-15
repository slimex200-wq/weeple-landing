'use client'

/**
 * PricingCrystals — 가격 카드 뒤에 떠 있는 3개 크리스털.
 *
 * - octahedron + standard material (emissive amber).
 * - 중간(best value) 은 scale 1.15, emissiveIntensity 0.55 로 강화.
 * - pricing 섹션 가중에 따라 등장.
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'

function Crystal({
  x,
  highlighted,
  phase,
}: {
  x: number
  highlighted?: boolean
  phase: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const { reducedMotion } = useSceneScroll()

  useFrame((_, delta) => {
    const m = ref.current
    if (!m) return
    if (!reducedMotion.current) {
      m.rotation.y += delta * (highlighted ? 0.4 : 0.22)
      m.rotation.x += delta * 0.12
      const t = performance.now() * 0.001 + phase
      m.position.y = Math.sin(t * 0.7) * 0.12
    }
  })

  return (
    <mesh ref={ref} position={[x, 0, 0]} scale={highlighted ? 1.2 : 1}>
      <octahedronGeometry args={[0.65, 0]} />
      <meshStandardMaterial
        color="#B45309"
        emissive="#B45309"
        emissiveIntensity={highlighted ? 0.55 : 0.28}
        roughness={0.2}
        metalness={0.7}
        flatShading
      />
    </mesh>
  )
}

export default function PricingCrystals() {
  const { sectionWeights } = useSceneScroll()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return
    const w = sectionWeights.current['pricing'] ?? 0
    const s = 0.3 + w * 0.9
    g.scale.x += (s - g.scale.x) * Math.min(1, delta * 3)
    g.scale.y = g.scale.x
    g.scale.z = g.scale.x
    // pricing 근처 위치
    g.position.set(0, -5.2, -2.5)
  })

  return (
    <group ref={groupRef} scale={0.001}>
      <Crystal x={-2.2} phase={0} />
      <Crystal x={0} highlighted phase={1} />
      <Crystal x={2.2} phase={2} />
    </group>
  )
}
