import type { AuthCookie, SignInResult } from './types'

const HX_AUTH_API_URL = process.env.HX_AUTH_API_URL!

interface SignInParams {
  email: string
  timestamp: number
  hash: string
  url?: string
  autocreate?: boolean
}

interface RedeemTokenParams {
  token: string
  url?: string
}

function parseSetCookieHeader(header: string): AuthCookie {
  const parts = header.split(';').map((p) => p.trim())
  const [nameValue, ...attributes] = parts
  const [name, ...valueParts] = nameValue.split('=')
  const value = valueParts.join('=')

  const cookie: AuthCookie = { name, value }

  for (const attr of attributes) {
    const [key, ...valParts] = attr.split('=')
    const attrKey = key.toLowerCase().trim()
    const attrVal = valParts.join('=')

    switch (attrKey) {
      case 'path':
        cookie.path = attrVal
        break
      case 'expires':
        cookie.expires = attrVal
        break
      case 'httponly':
        cookie.httpOnly = true
        break
      case 'secure':
        cookie.secure = true
        break
    }
  }

  return cookie
}

function extractCookies(response: Response): AuthCookie[] {
  const cookies: AuthCookie[] = []
  const setCookieHeaders = response.headers.getSetCookie()

  for (const header of setCookieHeaders) {
    cookies.push(parseSetCookieHeader(header))
  }

  return cookies
}

export async function signInWithEmailHash(
  params: SignInParams,
): Promise<SignInResult> {
  const searchParams = new URLSearchParams({
    email: params.email,
    timestamp: String(params.timestamp),
    hash: params.hash,
    url: params.url ?? 'https://www.holidayextras.com',
    ...(params.autocreate !== undefined && {
      autocreate: params.autocreate ? '1' : '0',
    }),
  })

  const response = await fetch(
    `${HX_AUTH_API_URL}/token_sign_in_email?${searchParams}`,
    { redirect: 'manual' },
  )

  const cookies = extractCookies(response)
  const redirectUrl = response.headers.get('location') ?? undefined

  // Parse success from the redirect URL query params
  let success = false
  if (redirectUrl) {
    try {
      const url = new URL(redirectUrl)
      success = url.searchParams.get('successfulLogin') === '1'
    } catch {
      // Invalid redirect URL, treat as failure
    }
  }

  return { success, cookies, redirectUrl }
}

export async function redeemSingleUseToken(
  params: RedeemTokenParams,
): Promise<SignInResult> {
  const searchParams = new URLSearchParams({
    token: params.token,
    ...(params.url && { url: params.url }),
  })

  const response = await fetch(
    `${HX_AUTH_API_URL}/redeem-singleuse-token?${searchParams}`,
    { redirect: 'manual' },
  )

  const cookies = extractCookies(response)
  const redirectUrl = response.headers.get('location') ?? undefined

  return {
    success: response.status >= 300 && response.status < 400,
    cookies,
    redirectUrl,
  }
}
