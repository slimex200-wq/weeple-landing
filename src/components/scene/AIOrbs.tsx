'use client'

/**
 * AIOrbs — Claude(teal crystal) / GPT(warm brown) / Gemini(ink w/ rim) 세 구.
 *
 * AI Brain 섹션 가중치에 따라 등장. 가로로 배치, 각자 자체 오비트.
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'

function Orb({
  x,
  color,
  emissive,
  phase,
}: {
  x: number
  color: string
  emissive: string
  phase: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const { reducedMotion } = useSceneScroll()

  useFrame((_, delta) => {
    const m = ref.current
    if (!m) return
    if (reducedMotion.current) {
      m.rotation.set(0, 0, 0)
      return
    }
    m.rotation.y += delta * 0.3
    m.rotation.x += delta * 0.15
    const t = performance.now() * 0.001 + phase
    m.position.y = Math.sin(t * 0.8) * 0.15
  })

  return (
    <mesh ref={ref} position={[x, 0, 0]}>
      <icosahedronGeometry args={[0.7, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.3}
        roughness={0.25}
        metalness={0.55}
        flatShading
      />
    </mesh>
  )
}

export default function AIOrbs() {
  const { sectionWeights } = useSceneScroll()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return
    const w = sectionWeights.current['ai-brain'] ?? 0
    const s = 0.4 + w * 0.8
    g.scale.x += (s - g.scale.x) * Math.min(1, delta * 3)
    g.scale.y = g.scale.x
    g.scale.z = g.scale.x

    // 수평 이동 — 가로 pinned scroll 을 흉내내어 섹션 내에서 x 위치가 변화
    const sectionTop = document.querySelector<HTMLElement>('[data-section="ai-brain"]')
    if (sectionTop) {
      const rect = sectionTop.getBoundingClientRect()
      const vh = window.innerHeight
      const total = sectionTop.offsetHeight - vh
      const local = Math.max(0, Math.min(1, -rect.top / Math.max(1, total)))
      const targetX = 2.5 - local * 5 // 2.5 → -2.5
      g.position.x += (targetX - g.position.x) * Math.min(1, delta * 3)
    }
    g.position.y = -3.5
    g.position.z = -1.2
  })

  return (
    <group ref={groupRef} scale={0.001}>
      <Orb x={-2} color="#0F766E" emissive="#0F766E" phase={0} />
      <Orb x={0} color="#8B6F47" emissive="#8B6F47" phase={1.2} />
      <Orb x={2} color="#1A1410" emissive="#5A5149" phase={2.4} />
    </group>
  )
}
