import { NextResponse } from 'next/server'
import { clearSessionCookieOptions } from '@/lib/auth/session'

export async function POST() {
  const cookieOpts = clearSessionCookieOptions()
  const response = NextResponse.json({ success: true })

  response.cookies.set(cookieOpts.name, cookieOpts.value, {
    httpOnly: cookieOpts.httpOnly,
    path: cookieOpts.path,
    maxAge: cookieOpts.maxAge,
  })

  return response
}
