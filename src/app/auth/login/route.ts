import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Extract host from headers to ensure redirect uses the actual client-facing address
  const rawHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000'
  // Clean up any 0.0.0.0 bind addresses into localhost
  const cleanHost = rawHost.includes('0.0.0.0') ? rawHost.replace(/0\.0\.0\.0/g, 'localhost') : rawHost
  const proto = request.headers.get('x-forwarded-proto') || (cleanHost.includes('localhost') || cleanHost.includes('127.0.0.1') ? 'http' : 'https')
  const origin = `${proto}://${cleanHost}`

  if (error) {
    return NextResponse.redirect(`${origin}/nomo?error=${encodeURIComponent(error.message)}`, {
      status: 303,
    })
  }

  // Redirect to dashboard with 303 (See Other)
  return NextResponse.redirect(`${origin}/nomo/dashboard`, {
    status: 303,
  })
}
