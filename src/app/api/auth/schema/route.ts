import { NextResponse } from 'next/server'
import { introspectSchema } from '@/lib/auth'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 })
  }

  try {
    const schema = await introspectSchema()
    return NextResponse.json(schema)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Introspection failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
