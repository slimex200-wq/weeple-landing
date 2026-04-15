'use client'

/**
 * ParticleField — 2000개 기본, tier 에 따라 다운샘플링.
 *
 * - BufferGeometry + ShaderMaterial 로 GPU 포인트 렌더.
 * - 마우스 약한 어트랙션: CPU 사이드에서 중심값만 uniform 전달하면 되지만,
 *   구현 단순화를 위해 useFrame 에서 아주 약하게 position 에 보간만 적용.
 * - Problem 섹션 in-view 시 "93" 실루엣으로 target 변환 — useFrame 에서 lerp.
 *
 * tier:
 *   - high: 2400, size 22
 *   - mid:  1400, size 18
 *   - low:   700, size 14
 */

import { useMemo, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useSceneScroll } from './ScrollProvider'
import { particleFragment, particleVertex } from './shaders/particles.glsl'

export type ParticleTier = 'high' | 'mid' | 'low'

const TIER_COUNT: Record<ParticleTier, number> = {
  high: 2400,
  mid: 1400,
  low: 700,
}
const TIER_SIZE: Record<ParticleTier, number> = {
  high: 24,
  mid: 18,
  low: 14,
}

function randomInCloud(i: number, total: number): THREE.Vector3 {
  // Hero 근처(=카메라 근처, z≈0..-1)에 밀집시키고 하단으로 넓게 퍼지게.
  const t = i / total
  const radius = 3.5 + 6 * Math.sqrt(Math.random())
  const angle = Math.random() * Math.PI * 2
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    (Math.random() - 0.3) * 8 - t * 6, // Hero 쪽 위로, 뒤로 갈수록 아래
    -Math.random() * 10 + 1,
  )
}

// "93" 샘플링 — 1024x512 offscreen 캔버스에 대문자 93 을 그려 픽셀 알파 > 0 을 target 으로.
function sampleDigits(text: string, targetCount: number): Float32Array {
  if (typeof document === 'undefined') return new Float32Array(targetCount * 3)
  const W = 512
  const H = 320
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${H * 0.9}px Georgia, serif`
  ctx.fillText(text, W / 2, H / 2)

  const img = ctx.getImageData(0, 0, W, H).data
  const pixels: Array<[number, number]> = []
  // 4픽셀 간격으로 서브샘플 — 성능용
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      const idx = (y * W + x) * 4
      if (img[idx] > 80) pixels.push([x, y])
    }
  }

  const out = new Float32Array(targetCount * 3)
  if (pixels.length === 0) return out

  for (let i = 0; i < targetCount; i++) {
    const [px, py] = pixels[i % pixels.length]
    // world 좌표로 맵핑 (대략 -4..4 x, 2..-2 y 범위로)
    const wx = (px / W - 0.5) * 8
    const wy = -(py / H - 0.5) * 4.5
    out[i * 3 + 0] = wx
    out[i * 3 + 1] = wy + 0.8
    out[i * 3 + 2] = 0.5
  }
  return out
}

export default function ParticleField({ tier = 'mid' as ParticleTier }: { tier?: ParticleTier }) {
  const { scrollProgress, mouse, sectionWeights, reducedMotion } = useSceneScroll()
  const { gl } = useThree()

  const count = TIER_COUNT[tier]
  const size = TIER_SIZE[tier]

  // base positions (드리프트 중심), target positions (Problem swarm 시 사용)
  const { geometry, basePositions, swarmTargets } = useMemo(() => {
    const base = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const v = randomInCloud(i, count)
      base[i * 3 + 0] = v.x
      base[i * 3 + 1] = v.y
      base[i * 3 + 2] = v.z
      seeds[i] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(base.slice(), 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const targets = sampleDigits('93', count)

    return { geometry: g, basePositions: base, swarmTargets: targets }
  }, [count])

  // 메모리 해제
  useEffect(() => () => geometry.dispose(), [geometry])

  const matRef = useRef<THREE.ShaderMaterial>(null)
  const amberSmooth = useRef(0)
  const swarmSmooth = useRef(0)

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_reduced: { value: 0 },
      u_pixelRatio: { value: Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 1) },
      u_size: { value: size },
      u_amber: { value: 0 },
    }),
    [size],
  )

  useFrame((_, delta) => {
    const mat = matRef.current
    if (!mat) return
    uniforms.u_time.value += delta
    uniforms.u_reduced.value = reducedMotion.current ? 1 : 0

    const amberTarget = Math.min(1, sectionWeights.current['pricing'] ?? 0)
    amberSmooth.current += (amberTarget - amberSmooth.current) * Math.min(1, delta * 3)
    uniforms.u_amber.value = amberSmooth.current

    // Problem 섹션 가중 → swarm 정도(0..1). 0.5 이상일 때 최대값 근처까지만.
    const problemW = sectionWeights.current['problem'] ?? 0
    const swarmTarget = reducedMotion.current ? 0 : Math.min(1, problemW * 1.4)
    swarmSmooth.current += (swarmTarget - swarmSmooth.current) * Math.min(1, delta * 2)

    const amt = swarmSmooth.current
    if (amt > 0.001 || amt < -0.001) {
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array
      // 마우스 약한 드리프트
      const mx = mouse.current.x * 0.4
      const my = mouse.current.y * 0.3
      const scrollDrift = scrollProgress.current * 1.2
      for (let i = 0; i < count; i++) {
        const bx = basePositions[i * 3 + 0] + mx
        const by = basePositions[i * 3 + 1] + my - scrollDrift
        const bz = basePositions[i * 3 + 2]
        const tx = swarmTargets[i * 3 + 0]
        const ty = swarmTargets[i * 3 + 1]
        const tz = swarmTargets[i * 3 + 2]
        arr[i * 3 + 0] = bx + (tx - bx) * amt
        arr[i * 3 + 1] = by + (ty - by) * amt
        arr[i * 3 + 2] = bz + (tz - bz) * amt
      }
      posAttr.needsUpdate = true
    } else {
      // swarm 없을 때는 마우스+스크롤 드리프트만 가볍게
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array
      const mx = mouse.current.x * 0.4
      const my = mouse.current.y * 0.3
      const scrollDrift = scrollProgress.current * 1.2
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 0] = basePositions[i * 3 + 0] + mx
        arr[i * 3 + 1] = basePositions[i * 3 + 1] + my - scrollDrift
        arr[i * 3 + 2] = basePositions[i * 3 + 2]
      }
      posAttr.needsUpdate = true
    }
  })

  // additive blend 로 코어가 살짝 빛나 보이도록
  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
  void gl // (tree-shake 방지용 보존, 필요시 확장)
}
