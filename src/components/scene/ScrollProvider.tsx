'use client'

/**
 * ScrollProvider — 글로벌 WebGL 씬에 공유되는 스크롤/마우스/섹션 가중치 상태.
 *
 * 왜 context 인가: Canvas 내부의 useFrame 훅은 DOM scroll 이벤트를 직접 읽을 수
 * 없고, Hero 같은 2D 오버레이와도 동일한 progress 값을 공유해야 한다.
 *
 * 제공값:
 *   - scrollProgress.current (0..1): 전체 문서 스크롤 비율
 *   - sectionWeights.current: { [sectionId]: 0..1 } — 해당 섹션의 in-view 가중
 *   - mouse.current: { x, y } — 정규화(-1..1)
 *
 * mutable ref 로 노출한 이유: React state 변경 시 트리 리렌더가 발생하면
 * Canvas scene 도 재구성될 수 있어서 프레임에서 읽을 수 있는 ref 로만 전달.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react'

export type SectionWeights = Record<string, number>

type Ctx = {
  scrollProgress: RefObject<number>
  mouse: RefObject<{ x: number; y: number }>
  sectionWeights: RefObject<SectionWeights>
  reducedMotion: RefObject<boolean>
}

const ScrollCtx = createContext<Ctx | null>(null)

export function useSceneScroll(): Ctx {
  const ctx = useContext(ScrollCtx)
  if (!ctx) {
    throw new Error('useSceneScroll must be used inside <ScrollProvider>')
  }
  return ctx
}

// 안전 fallback — Canvas 가 SSR 되지 않는 경우 훅이 null 일 수 있음.
export function useOptionalSceneScroll(): Ctx | null {
  return useContext(ScrollCtx)
}

// IntersectionObserver 대상 섹션 ID 목록. layout 에서 data-section 으로 표기된 것.
const SECTIONS = [
  'hero',
  'problem',
  'promise',
  'live-demo',
  'couple',
  'ai-brain',
  'security',
  'voices',
  'pricing',
  'final-cta',
] as const

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollProgress = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const sectionWeights = useRef<SectionWeights>({})
  const reducedMotion = useRef(false)

  useEffect(() => {
    // reduced-motion 초기화 + 변동 감지
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mq.matches
    const onMq = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches
    }
    mq.addEventListener('change', onMq)

    // scroll progress (문서 전체 대비)
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // mouse — 정규화
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // 섹션 가중치 — intersection ratio 를 그대로 기록
    const observed: Element[] = []
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section
          if (!id) continue
          sectionWeights.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0
        }
      },
      {
        // 여러 threshold 로 연속적인 가중 제공
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const id of SECTIONS) {
      const el = document.querySelector<HTMLElement>(`[data-section="${id}"]`)
      if (el) {
        io.observe(el)
        observed.push(el)
        sectionWeights.current[id] = 0
      }
    }

    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('mousemove', onMouse)
      io.disconnect()
    }
  }, [])

  const value = useMemo<Ctx>(
    () => ({ scrollProgress, mouse, sectionWeights, reducedMotion }),
    [],
  )

  return <ScrollCtx.Provider value={value}>{children}</ScrollCtx.Provider>
}
