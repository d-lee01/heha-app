import { NextRequest, NextResponse } from 'next/server'
import { getSession, getSessionCookieName } from '@/lib/auth/session'

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get(getSessionCookieName())?.value
  const session = await getSession(cookieValue)

  if (!session || !session.isAuthenticated) {
    return NextResponse.json({
      authenticated: false,
    })
  }

  return NextResponse.json({
    authenticated: true,
    email: session.email,
    userId: session.userId,
    userHash: session.userHash,
  })
}
