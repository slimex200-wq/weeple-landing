'use client'

/**
 * CoupleSpheres — 커플 섹션 좌우 두 구.
 *
 * - 탭 state 는 Couple.tsx 가 관리 → 전역 window 이벤트 또는 localStorage 로
 *   전달하지 않고, coupleOverlap ref 를 export 해서 Couple 에서 직접 쓰도록.
 *   (scene 은 DOM 이벤트를 통해 ref 를 갱신)
 *
 * 이벤트: window.dispatchEvent(new CustomEvent('weeple:coupleOverlap', { detail: { overlap: number } }))
 * 유일한 cross-boundary 채널. Couple 섹션 가중치가 0 이면 투명.
 */

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'

export default function CoupleSpheres() {
  const { sectionWeights, reducedMotion } = useSceneScroll()
  const meLeft = useRef<THREE.Mesh>(null)
  const meRight = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const overlapRef = useRef(0.6) // default = partial
  const smooth = useRef(0.6)

  useEffect(() => {
    const onOverlap = (e: Event) => {
      const ev = e as CustomEvent<{ overlap: number }>
      if (typeof ev.detail?.overlap === 'number') {
        overlapRef.current = Math.max(0, Math.min(1, ev.detail.overlap))
      }
    }
    window.addEventListener('weeple:coupleOverlap', onOverlap)
    return () => window.removeEventListener('weeple:coupleOverlap', onOverlap)
  }, [])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g || !meLeft.current || !meRight.current) return

    const w = sectionWeights.current['couple'] ?? 0
    // 등장/퇴장 스케일
    const s = 0.6 + w * 0.7
    g.scale.x += (s - g.scale.x) * Math.min(1, delta * 3)
    g.scale.y = g.scale.x
    g.scale.z = g.scale.x

    // overlap lerp
    smooth.current += (overlapRef.current - smooth.current) * Math.min(1, delta * 3)
    const gap = (1 - smooth.current) * 1.8 // 0 일 때 gap 1.8, 1 일 때 완전 겹침
    const offset = 0.6 + gap * 0.5

    meLeft.current.position.x = -offset
    meRight.current.position.x = offset

    // 전체 그룹 — couple 섹션 우측으로 살짝
    const targetY = -2.2
    g.position.y += (targetY - g.position.y) * Math.min(1, delta * 2)
    g.position.x = -2.5
    g.position.z = -1.5

    if (!reducedMotion.current) {
      const t = performance.now() * 0.001
      meLeft.current.position.y = Math.sin(t * 0.8) * 0.08
      meRight.current.position.y = Math.cos(t * 0.8) * 0.08
    }
  })

  return (
    <group ref={groupRef} scale={0.001}>
      <mesh ref={meLeft}>
        <sphereGeometry args={[0.85, 48, 48]} />
        <meshStandardMaterial
          color="#0F766E"
          emissive="#0F766E"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.4}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh ref={meRight}>
        <sphereGeometry args={[0.85, 48, 48]} />
        <meshStandardMaterial
          color="#8B6F47"
          emissive="#8B6F47"
          emissiveIntensity={0.2}
          roughness={0.35}
          metalness={0.35}
          transparent
          opacity={0.82}
        />
      </mesh>
    </group>
  )
}
