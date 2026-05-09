import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import path from 'node:path'

// 동적 OG 를 file convention (`opengraph-image.tsx`) 대신 route handler 로 노출.
// file convention 은 og:image meta 를 확장자 없는 URL (`/opengraph-image?<hash>`)
// 로 자동 주입하는데, 카카오톡 등 스크레이퍼가 og:image URL 의 .png 확장자를
// 신뢰 신호로 사용하므로 .png 가 붙은 정적 경로를 직접 노출.
export const dynamic = 'force-static'

const fontsDir = path.join(process.cwd(), 'src/fonts')
const pretendardBold = readFileSync(path.join(fontsDir, 'Pretendard-Bold.woff'))
const pretendardRegular = readFileSync(path.join(fontsDir, 'Pretendard-Regular.woff'))

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #F0F4F1 0%, #E5EDE8 100%)',
          padding: '80px 100px',
          fontFamily: 'Pretendard',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #0EA5A0, #5EEAD4)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          weeple
        </div>

        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            둘이 쓰는 돈,
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            한눈에.
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: '#4a5a50',
              marginTop: 40,
              lineHeight: 1.4,
            }}
          >
            커플·부부 공동 가계부 + AI 분석
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: '#4a5a50',
              lineHeight: 1.4,
            }}
          >
            자연어 한 줄로 3초 기록
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 28,
            color: '#5f6f65',
          }}
        >
          <div style={{ fontWeight: 700 }}>weeple.app</div>
          <div>Android 우선 출시</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: pretendardBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Pretendard',
          data: pretendardRegular,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )
}
