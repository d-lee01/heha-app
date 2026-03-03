import { SignJWT, jwtVerify } from 'jose'
import type { SessionData } from './types'

const SESSION_SECRET = process.env.SESSION_SECRET!
const COOKIE_NAME = 'heha_session'

function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(SESSION_SECRET)
}

export async function createSession(data: SessionData): Promise<string> {
  return new SignJWT({ ...data })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())
}

export async function getSession(
  cookieValue: string | undefined,
): Promise<SessionData | null> {
  if (!cookieValue) return null

  try {
    const { payload } = await jwtVerify(cookieValue, getSecretKey())
    return payload as unknown as SessionData
  } catch {
    return null
  }
}

export function getSessionCookieName(): string {
  return COOKIE_NAME
}

export function sessionCookieOptions(token: string) {
  const isProduction = process.env.NODE_ENV === 'production'
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  }
}
