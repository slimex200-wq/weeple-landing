'use client'

// The iconic central weeple object — a stacked "couple ledger" disc.
// Two interlocking discs (warm paper + charred edge) with subtle bevel via
// cylinder + torus ring. Exposed ref for parent scroll/interaction timelines.

import { forwardRef, useMemo } from 'react'
import * as THREE from 'three'
import type { Group } from 'three'

type Props = {
  scale?: number
}

const LedgerDisc = forwardRef<Group, Props>(function LedgerDisc({ scale = 1 }, ref) {
  // Gradient-like roughness map: cheap procedural texture, no asset load.
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E5D4B1'),
      roughness: 0.82,
      metalness: 0.08,
    })
  }, [])

  const edgeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2B1E14'),
      roughness: 0.9,
      metalness: 0.05,
    })
  }, [])

  const accentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4622A'),
      roughness: 0.35,
      metalness: 0.6,
      emissive: new THREE.Color('#D4622A'),
      emissiveIntensity: 0.25,
    })
  }, [])

  const innerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F5EDD8'),
      roughness: 0.55,
      metalness: 0.0,
    })
  }, [])

  return (
    <group ref={ref} scale={scale}>
      {/* Top disc — cream paper */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow material={material}>
        <cylinderGeometry args={[1.4, 1.4, 0.12, 64]} />
      </mesh>
      {/* Dark underlayer */}
      <mesh position={[0, -0.02, 0]} castShadow receiveShadow material={edgeMaterial}>
        <cylinderGeometry args={[1.42, 1.42, 0.08, 64]} />
      </mesh>
      {/* Second disc offset — interlocking */}
      <mesh position={[0.45, 0.22, -0.1]} castShadow receiveShadow material={innerMaterial}>
        <cylinderGeometry args={[1.05, 1.05, 0.1, 64]} />
      </mesh>
      {/* Accent ring — orange */}
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]} material={accentMaterial}>
        <torusGeometry args={[1.28, 0.015, 24, 96]} />
      </mesh>
      {/* Central dot */}
      <mesh position={[0.45, 0.3, -0.1]} material={accentMaterial}>
        <sphereGeometry args={[0.07, 32, 32]} />
      </mesh>
      {/* Thin etched line */}
      <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]} material={edgeMaterial}>
        <torusGeometry args={[0.95, 0.006, 16, 96]} />
      </mesh>
    </group>
  )
})

export default LedgerDisc
