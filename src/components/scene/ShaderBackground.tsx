'use client'

/**
 * ShaderBackground — 풀스크린 GLSL fluid gradient 플레인.
 *
 * - Canvas 내부에서만 동작.
 * - u_scroll / u_mouse / u_amber / u_time / u_reduced uniform 을 프레임마다 갱신.
 * - 카메라 바로 앞에 고정 — orthographic 스타일로 화면 채우기 위해 vertex 는
 *   NDC 를 그대로 쓰지 않고 perspective 카메라의 near plane 에 맞춘 큰 plane 사용.
 */

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'
import { gradientFragment, gradientVertex } from './shaders/gradient.glsl'

// amber 가중을 pricing 섹션에 몰아줌. (필요시 final-cta 일부도 섞을 수 있지만
// 디자인 스펙상 amber 는 pricing 전용.)
function computeAmber(weights: Record<string, number>): number {
  return Math.min(1, weights['pricing'] ?? 0)
}

export default function ShaderBackground() {
  const { scrollProgress, mouse, sectionWeights, reducedMotion } = useSceneScroll()
  const { viewport } = useThree()

  const matRef = useRef<THREE.ShaderMaterial>(null)

  // uniforms 를 한 번만 만들고 ref 로 업데이트
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_scroll: { value: 0 },
      u_amber: { value: 0 },
      u_reduced: { value: 0 },
    }),
    [],
  )

  // 부드러운 보간용 내부 상태
  const smoothAmber = useRef(0)
  const smoothMouse = useRef(new THREE.Vector2(0, 0))

  useFrame((_, delta) => {
    const mat = matRef.current
    if (!mat) return

    // 시간은 reduced-motion 시에도 약간은 흘려서 완전 정지 방지 (셰이더 내부에서 감쇠)
    uniforms.u_time.value += delta

    uniforms.u_scroll.value = scrollProgress.current

    // 마우스 lerp (과반응 방지)
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * Math.min(1, delta * 4)
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * Math.min(1, delta * 4)
    uniforms.u_mouse.value.copy(smoothMouse.current)

    // amber lerp
    const targetAmber = computeAmber(sectionWeights.current)
    smoothAmber.current += (targetAmber - smoothAmber.current) * Math.min(1, delta * 3)
    uniforms.u_amber.value = smoothAmber.current

    uniforms.u_reduced.value = reducedMotion.current ? 1 : 0
  })

  // 카메라 뒤쪽에 고정 — z = -10 plane, viewport 크기에 맞춰 스케일.
  // 카메라 absolute 위치 변화와 무관하게 항상 보이도록 renderOrder 를 -1 로.
  return (
    <mesh position={[0, 0, -8]} renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[viewport.width * 2.2, viewport.height * 2.2, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={gradientVertex}
        fragmentShader={gradientFragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </mesh>
  )
}
