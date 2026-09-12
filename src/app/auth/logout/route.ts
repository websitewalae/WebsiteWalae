import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const rawHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000'
  const cleanHost = rawHost.includes('0.0.0.0') ? rawHost.replace(/0\.0\.0\.0/g, 'localhost') : rawHost
  const proto = request.headers.get('x-forwarded-proto') || (cleanHost.includes('localhost') || cleanHost.includes('127.0.0.1') ? 'http' : 'https')
  const origin = `${proto}://${cleanHost}`

  return NextResponse.redirect(`${origin}/admin`, {
    status: 303,
  })
}
