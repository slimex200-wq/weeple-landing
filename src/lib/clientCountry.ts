const COUNTRY_RE = /^[A-Za-z]{2}$/
const CLIENT_COUNTRY_CACHE_KEY = 'weeple_client_country'

let clientCountry: string | null | undefined
let clientCountryRequest: Promise<string | null> | null = null

function normalizeCountry(value: unknown) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return COUNTRY_RE.test(trimmed) ? trimmed.toUpperCase() : null
}

function readCachedCountry() {
  if (typeof window === 'undefined') return null

  try {
    return normalizeCountry(window.sessionStorage.getItem(CLIENT_COUNTRY_CACHE_KEY))
  } catch {
    return null
  }
}

function cacheCountry(country: string | null) {
  clientCountry = country
  if (!country || typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(CLIENT_COUNTRY_CACHE_KEY, country)
  } catch {
    // Analytics should stay best-effort when browser storage is unavailable.
  }
}

export async function getClientCountry() {
  if (clientCountry !== undefined) return clientCountry
  if (typeof window === 'undefined') return null

  const cached = readCachedCountry()
  if (cached) {
    clientCountry = cached
    return cached
  }

  if (!clientCountryRequest) {
    clientCountryRequest = fetch('/api/geo', {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
    })
      .then(async (response) => {
        if (!response.ok) return null
        const data = await response.json().catch(() => null)
        return normalizeCountry(data?.country)
      })
      .catch(() => null)
      .then((country) => {
        cacheCountry(country)
        return country
      })
      .finally(() => {
        clientCountryRequest = null
      })
  }

  return clientCountryRequest
}
