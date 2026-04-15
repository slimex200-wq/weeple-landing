'use client'

/**
 * PostFX — EffectComposer + Bloom + Vignette.
 *
 * - Bloom 은 아주 서브틀하게 (0.4 intensity, 0.85 threshold) — Hero particle
 *   코어와 pricing crystal 류에만 반응.
 * - Vignette 는 paper 톤 유지를 위해 offset 0.5, darkness 0.5 수준.
 * - tier='low' 일 때는 PostFX 를 건너뛰어 GPU fragment 부담을 없앰.
 */

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function PostFX({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.2}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.35} darkness={0.45} />
    </EffectComposer>
  )
}
