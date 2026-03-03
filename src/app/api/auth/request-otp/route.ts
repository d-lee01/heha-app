import { NextResponse } from 'next/server'
import { requestOtp } from '@/lib/auth/hx-client'

export async function POST(request: Request) {
  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { email } = body

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Missing required field: email' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
  }

  try {
    const result = await requestOtp(email)

    // If both SMS and email failed, report failure
    if (result.smsError && result.emailError) {
      return NextResponse.json(
        { success: false, error: 'Failed to send OTP', smsError: result.smsError, emailError: result.emailError },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      smsSentTo: result.smsSentToContactNumberEnding ?? null,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'OTP request failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
