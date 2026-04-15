'use client'

/**
 * GlobalSceneClient — Next.js App Router 에서 ssr:false dynamic import 를
 * 서버 컴포넌트(layout.tsx) 에서 직접 쓸 수 없으므로 client boundary 경유.
 *
 * r3f Canvas + three.js 는 SSR 에서 window/document 에 접근하므로 반드시
 * 클라이언트 전용으로 로드.
 */

import dynamic from 'next/dynamic'

const GlobalScene = dynamic(() => import('./GlobalScene'), {
  ssr: false,
  loading: () => null,
})

export default function GlobalSceneClient() {
  return <GlobalScene />
}
