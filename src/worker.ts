const ASSETLINKS_JSON = JSON.stringify([
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.weeple.app',
      sha256_cert_fingerprints: [
        '59:CF:AD:22:38:9B:82:94:D3:07:ED:5F:B9:C6:F1:07:EE:11:CF:C7:2F:5E:B2:99:3D:1F:77:3D:AE:C9:96:C4',
      ],
    },
  },
])

interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname === '/.well-known/assetlinks.json') {
      return new Response(ASSETLINKS_JSON, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }
    return env.ASSETS.fetch(request)
  },
}
