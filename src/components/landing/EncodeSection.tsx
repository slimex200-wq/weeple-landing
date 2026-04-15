'use client'

// Section 4 — "encode/decode" interaction.
// User types "스벅 6500" → click → the canvas disc flips Y axis 180° →
// parsed result rendered on the reverse face via CanvasTexture.

import dynamic from 'next/dynamic'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'
import { ensureGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/reveal'

type FlipDiscHandle = {
  flip: () => void
  reset: () => void
}

const FlipDiscInner = forwardRef<
  FlipDiscHandle,
  { parsed: { category: string; amount: string; when: string } | null }
>(function FlipDiscInner({ parsed }, ref) {
  const groupRef = useRef<Group | null>(null)

  // Build the back-face texture from a 2D canvas.
  const backTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 1024
    const ctx = c.getContext('2d')!
    // background
    ctx.fillStyle = '#141210'
    ctx.fillRect(0, 0, 1024, 1024)
    // border ring
    ctx.strokeStyle = 'rgba(245,237,216,0.2)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(512, 512, 480, 0, Math.PI * 2)
    ctx.stroke()
    // eyebrow
    ctx.fillStyle = 'rgba(245,237,216,0.55)'
    ctx.font = '600 24px "Space Grotesk", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('PARSED · LEDGER ENTRY', 512, 340)
    // main result
    ctx.fillStyle = '#F5EDD8'
    ctx.font = 'bold 72px "Space Grotesk", sans-serif'
    const line = parsed ? `${parsed.category} · ${parsed.amount}` : '—'
    ctx.fillText(line, 512, 510)
    // caption
    ctx.fillStyle = '#D4622A'
    ctx.font = '500 34px "Space Grotesk", sans-serif'
    ctx.fillText(parsed ? parsed.when : 'awaiting input', 512, 580)
    // confidence bar
    ctx.fillStyle = 'rgba(245,237,216,0.15)'
    ctx.fillRect(260, 660, 504, 4)
    ctx.fillStyle = '#D4622A'
    ctx.fillRect(260, 660, 504 * 0.93, 4)
    ctx.fillStyle = 'rgba(245,237,216,0.55)'
    ctx.font = '500 22px "Space Grotesk", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('confidence', 260, 705)
    ctx.textAlign = 'right'
    ctx.fillText('93.4%', 764, 705)

    const tex = new THREE.CanvasTexture(c)
    tex.needsUpdate = true
    return tex
  }, [parsed])

  const frontMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E5D4B1',
        roughness: 0.82,
        metalness: 0.08,
      }),
    [],
  )

  const backMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: backTexture ?? undefined,
      roughness: 0.5,
      metalness: 0.1,
    })
  }, [backTexture])

  const edgeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2B1E14',
        roughness: 0.9,
        metalness: 0.05,
      }),
    [],
  )

  useImperativeHandle(ref, () => ({
    flip: () => {
      const { gsap } = ensureGsap()
      if (!groupRef.current) return
      gsap.to(groupRef.current.rotation, {
        y: groupRef.current.rotation.y + Math.PI,
        duration: 0.8,
        ease: 'power2.inOut',
      })
    },
    reset: () => {
      if (!groupRef.current) return
      groupRef.current.rotation.y = 0
    },
  }))

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.04
    }
  })

  return (
    <group ref={groupRef} scale={1.4}>
      {/* Front face — disc body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={frontMat}>
        <cylinderGeometry args={[1.4, 1.4, 0.08, 64]} />
      </mesh>
      {/* Back face — textured plane just behind */}
      <mesh position={[0, 0, -0.06]} rotation={[0, Math.PI, 0]} material={backMat}>
        <circleGeometry args={[1.38, 64]} />
      </mesh>
      {/* Edge ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={edgeMat}>
        <torusGeometry args={[1.4, 0.018, 16, 96]} />
      </mesh>
    </group>
  )
})

const FlipScene = dynamic(
  async () => {
    const Comp = function FlipScene({
      handleRef,
      parsed,
    }: {
      handleRef: React.Ref<FlipDiscHandle>
      parsed: { category: string; amount: string; when: string } | null
    }) {
      return (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        >
          <color attach="background" args={['#0A0806']} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 3]} intensity={1.4} color="#ffaa66" />
          <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#5a6b8a" />
          <Environment preset="sunset" />
          <FlipDiscInner ref={handleRef} parsed={parsed} />
        </Canvas>
      )
    }
    return Comp
  },
  { ssr: false },
)

function parseQuickInput(raw: string) {
  // Tiny heuristic — not real NLU, just enough for the demo.
  const trimmed = raw.trim()
  if (!trimmed) return null
  const match = trimmed.match(/(\d[\d,]*)/)
  const amount = match ? match[1].replace(/[^\d]/g, '') : ''
  const words = trimmed.replace(amount, '').trim()

  const categoryMap: { pattern: RegExp; label: string }[] = [
    { pattern: /(스벅|스타벅스|커피|카페|cafe)/i, label: '카페' },
    { pattern: /(점심|저녁|밥|식당|food|끼니)/i, label: '식비' },
    { pattern: /(택시|버스|지하철|대중교통|taxi|uber)/i, label: '교통' },
    { pattern: /(마트|쿠팡|편의점|gs|cu)/i, label: '생활' },
    { pattern: /(넷플릭스|유튜브|subscription|구독)/i, label: '구독' },
  ]
  const cat = categoryMap.find((c) => c.pattern.test(words))?.label ?? '기타'

  const formatted = amount
    ? `${Number(amount).toLocaleString('ko-KR')}원`
    : words || '—'

  return {
    category: cat,
    amount: formatted,
    when: '오늘',
  }
}

export default function EncodeSection() {
  const discHandle = useRef<FlipDiscHandle>(null)
  const [input, setInput] = useState('스벅 6500')
  const [flipped, setFlipped] = useState(false)
  const [parsed, setParsed] = useState<ReturnType<typeof parseQuickInput>>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { gsap } = ensureGsap()
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return
    gsap.fromTo(
      section.querySelectorAll('[data-encode-reveal]'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, [])

  const onAction = () => {
    if (!flipped) {
      setParsed(parseQuickInput(input))
      setTimeout(() => {
        discHandle.current?.flip()
      }, 40)
      setFlipped(true)
    } else {
      discHandle.current?.flip()
      setFlipped(false)
    }
  }

  return (
    <section
      id="encode"
      ref={sectionRef}
      className="relative section-anchor overflow-hidden"
      style={{
        background: 'var(--bg-darkest)',
        padding: 'clamp(100px, 14vw, 200px) 0',
        minHeight: '100vh',
      }}
    >
      {/* 3D stage */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 70% at 50% 55%, #000 40%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 70% at 50% 55%, #000 40%, transparent 75%)',
        }}
      >
        <FlipScene handleRef={discHandle} parsed={parsed} />
      </div>

      <div className="relative mx-auto max-w-[900px] px-6 md:px-10 text-center">
        <div className="eyebrow mb-6" data-encode-reveal>
          LIVE · AI CLASSIFIER
        </div>
        <h2
          data-encode-reveal
          className="display"
          style={{
            fontSize: 'clamp(36px, 6vw, 88px)',
            color: 'var(--text-primary)',
            marginBottom: 24,
          }}
        >
          한 줄을 던지면,
          <br />
          <span style={{ color: 'var(--accent-orange-light)' }}>
            AI 가 장부를 덮습니다.
          </span>
        </h2>
        <p
          data-encode-reveal
          style={{
            maxWidth: 540,
            margin: '0 auto 48px',
            color: 'var(--text-secondary)',
            fontSize: 16,
            lineHeight: 1.55,
          }}
        >
          직접 해 보세요. 지출 한 줄을 적고 버튼을 누르면, weeple 이 카테고리와
          금액으로 분해해 커플 가계부에 기록합니다.
        </p>

        {/* input + action */}
        <div
          data-encode-reveal
          className="mx-auto flex flex-col sm:flex-row items-stretch gap-3"
          style={{ maxWidth: 560 }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="스벅 6500"
            className="flex-1 px-5 py-4 outline-none"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-primary)',
              background: 'transparent',
              border: '1px dashed var(--border-mid)',
              borderRadius: 999,
              letterSpacing: 0,
            }}
            aria-label="지출 한 줄 입력"
          />
          <button
            type="button"
            onClick={onAction}
            className="px-7 py-4 transition-colors duration-300 whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: 999,
              border: '1px solid var(--text-primary)',
              color: flipped ? 'var(--bg-darkest)' : 'var(--text-primary)',
              background: flipped ? 'var(--text-primary)' : 'var(--bg-darkest)',
            }}
          >
            {flipped ? '다시 시도' : '분류 실행 →'}
          </button>
        </div>

        <div
          className="mt-10 eyebrow"
          data-encode-reveal
          style={{ color: 'var(--text-muted)' }}
        >
          {flipped
            ? 'FLIPPED · BACK FACE · READY'
            : 'TYPE · A · LINE · AND · TAP'}
        </div>
      </div>
    </section>
  )
}
