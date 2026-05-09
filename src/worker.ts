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

    // Next.js image metadata file conventions output extensionless files.
    // Keep .png aliases alive too, because existing crawlers may already have
    // cached share metadata that points at the extensionful URL.
    if (
      url.pathname === '/opengraph-image' ||
      url.pathname === '/opengraph-image.png' ||
      url.pathname === '/twitter-image' ||
      url.pathname === '/twitter-image.png'
    ) {
      const assetUrl = new URL(request.url)
      assetUrl.pathname = url.pathname.replace(/\.png$/, '')
      const response = await env.ASSETS.fetch(new Request(assetUrl, request))
      const headers = new Headers(response.headers)
      headers.set('Content-Type', 'image/png')
      headers.set('Cache-Control', 'public, max-age=3600, must-revalidate')
      return new Response(response.body, {
        status: response.status,
        headers,
      })
    }
    return env.ASSETS.fetch(request)
  },
}
