const ASSETLINKS_JSON = JSON.stringify([
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.weeple.app',
      sha256_cert_fingerprints: [
        // Play App Signing cert — Play 배포 앱 (디바이스에서 실제 쓰는 cert)
        '59:CF:AD:22:38:9B:82:94:D3:07:ED:5F:B9:C6:F1:07:EE:11:CF:C7:2F:5E:B2:99:3D:1F:77:3D:AE:C9:96:C4',
        // EAS Upload cert — 직접 APK 설치/테스트용
        'F3:75:1C:B5:57:3D:99:CA:36:01:D4:21:FB:65:CD:39:1D:D1:FA:30:08:1A:72:AC:2C:73:FB:B2:6E:12:68:EB',
      ],
    },
  },
])

type AssetsBinding = {
  fetch: (request: Request) => Promise<Response>
}

type CloudflareRequest = Request & {
  cf?: {
    tlsVersion?: string
  }
}

function redirectToCanonical(request: Request, url: URL) {
  const cfVisitor = request.headers.get('cf-visitor')
  const cf = (request as CloudflareRequest).cf
  const wasHttpRequest =
    url.protocol !== 'https:' ||
    request.headers.get('x-forwarded-proto') === 'http' ||
    cfVisitor?.includes('"scheme":"http"') ||
    (url.hostname === 'weeple.app' && cf !== undefined && !cf.tlsVersion)
  const shouldRedirect = wasHttpRequest || url.hostname === 'www.weeple.app'

  if (!shouldRedirect) {
    return null
  }

  url.protocol = 'https:'
  url.hostname = 'weeple.app'

  return Response.redirect(url.toString(), 301)
}

export default {
  async fetch(request: Request, env: { ASSETS: AssetsBinding }): Promise<Response> {
    const url = new URL(request.url)
    const canonicalRedirect = redirectToCanonical(request, url)

    if (canonicalRedirect) {
      return canonicalRedirect
    }

    if (url.pathname === '/.well-known/assetlinks.json') {
      return new Response(ASSETLINKS_JSON, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }

    // /opengraph-image.png 는 src/app/opengraph-image.png/route.tsx route handler
    // 가 정적으로 생성. Cloudflare Workers Static Assets 가 .png 확장자로 Content-Type
    // 을 image/png 로 추론하므로 별도 override 불필요.
    return env.ASSETS.fetch(request)
  },
}
