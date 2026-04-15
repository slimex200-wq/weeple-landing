'use client'

/**
 * CameraRig — 스크롤/마우스 연동 카메라.
 *
 * Apple 사이트 수준의 절제 — 전체 페이지 스크롤 0..1 에 대해 Y 2.5, Z 1.5, X 0.4
 * 내외의 미세한 이동. lookAt 도 살짝 내려가며 뷰포트 깊이감을 키운다.
 * 마우스는 +/-0.2 정도로 parallax.
 */

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'

export default function CameraRig() {
  const { scrollProgress, mouse, reducedMotion } = useSceneScroll()
  const { camera } = useThree()

  const target = useRef(new THREE.Vector3(0, 0, 0))
  const desired = useRef(new THREE.Vector3(0, 0, 6))

  useFrame((_, delta) => {
    const p = scrollProgress.current
    const mx = mouse.current.x
    const my = mouse.current.y

    if (reducedMotion.current) {
      // 고정 — 파격적 이동 없음
      camera.position.set(0, 0, 6)
      camera.lookAt(0, 0, 0)
      return
    }

    // desired 위치 계산. pricing 근처에서 카메라가 살짝 내려가고 뒤로 빠짐.
    const x = mx * 0.25 + (p - 0.5) * 0.4
    const y = my * 0.15 + -p * 2.0
    const z = 6 + p * 1.2 // 스크롤할수록 카메라가 살짝 뒤로

    desired.current.set(x, y, z)

    // lerp
    camera.position.x += (desired.current.x - camera.position.x) * Math.min(1, delta * 2.2)
    camera.position.y += (desired.current.y - camera.position.y) * Math.min(1, delta * 2.2)
    camera.position.z += (desired.current.z - camera.position.z) * Math.min(1, delta * 2.2)

    // lookAt target 도 부드럽게
    target.current.set(mx * 0.1, my * 0.08 - p * 1.5, 0)
    camera.lookAt(target.current)
  })

  return null
}
