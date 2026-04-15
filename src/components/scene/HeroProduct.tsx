'use client'

/**
 * HeroProduct — Hero 오른쪽에 떠 있는 스타일라이즈드 폰 메시.
 *
 * - drei 의 RoundedBox 대체로 BoxGeometry + MeshStandardMaterial 간단 구성.
 *   (drei 는 이미 의존성, Text 등 필요시 추가)
 * - Hero 섹션 가중치(sectionWeights['hero']) 로 opacity/scale 을 제어.
 * - 마우스로 약한 tilt, 시간에 따라 slow yaw.
 */

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'

export default function HeroProduct() {
  const { sectionWeights, mouse, reducedMotion, scrollProgress } = useSceneScroll()
  const groupRef = useRef<THREE.Group>(null)
  const screenMatRef = useRef<THREE.MeshStandardMaterial>(null)

  const screenColor = useMemo(() => new THREE.Color('#0F766E'), [])
  const frameColor = useMemo(() => new THREE.Color('#1A1410'), [])
  const paperColor = useMemo(() => new THREE.Color('#F5F1EA'), [])

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return

    const w = sectionWeights.current['hero'] ?? 0
    // scale 은 Hero in-view 일 때만 등장
    const targetScale = 0.85 + w * 0.15
    g.scale.x += (targetScale - g.scale.x) * Math.min(1, delta * 3)
    g.scale.y = g.scale.x
    g.scale.z = g.scale.x

    // 위치 — Hero 에서는 오른쪽, 스크롤하면서 오른쪽으로 슬라이드 아웃
    const targetX = 2.4 + scrollProgress.current * 2.5
    const targetY = -0.3 - scrollProgress.current * 1.5
    g.position.x += (targetX - g.position.x) * Math.min(1, delta * 2.5)
    g.position.y += (targetY - g.position.y) * Math.min(1, delta * 2.5)
    g.position.z = -0.5

    // rotation — yaw slow, mouse tilt
    if (!reducedMotion.current) {
      g.rotation.y += delta * 0.08
      g.rotation.x += (-mouse.current.y * 0.15 - g.rotation.x) * Math.min(1, delta * 3)
    } else {
      g.rotation.set(0, -0.2, 0)
    }
  })

  // 폰 대략 치수 (iPhone 비율). width 1, height 2.1, depth 0.12
  return (
    <group ref={groupRef} position={[2.4, -0.3, -0.5]} scale={0.85}>
      {/* 프레임 */}
      <mesh castShadow>
        <boxGeometry args={[1.05, 2.15, 0.14]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>
      {/* 스크린 (살짝 앞쪽) */}
      <mesh position={[0, 0, 0.072]}>
        <planeGeometry args={[0.92, 2.02]} />
        <meshStandardMaterial
          ref={screenMatRef}
          color={screenColor}
          emissive={screenColor}
          emissiveIntensity={0.35}
          roughness={0.2}
        />
      </mesh>
      {/* w 로고 플레이트 */}
      <mesh position={[0, 0, 0.073]}>
        <planeGeometry args={[0.55, 0.55]} />
        <meshBasicMaterial color={paperColor} transparent opacity={0.92} />
      </mesh>
      {/* 스크린 아래 paper 영역 (카드 느낌) */}
      <mesh position={[0, -0.55, 0.0725]}>
        <planeGeometry args={[0.78, 0.55]} />
        <meshBasicMaterial color={paperColor} transparent opacity={0.88} />
      </mesh>
    </group>
  )
}
