import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import path from 'node:path'

export const dynamic = 'force-static'
export const alt = 'weeple - 둘이 쓰는 돈, 한눈에'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const fontsDir = path.join(process.cwd(), 'src/fonts')
const pretendardBold = readFileSync(path.join(fontsDir, 'Pretendard-Bold.woff'))
const pretendardRegular = readFileSync(path.join(fontsDir, 'Pretendard-Regular.woff'))

export default async function OG() {
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
      ...size,
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
