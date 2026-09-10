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

  if (error) {
    // Safely construct the redirect URL to avoid 0.0.0.0 host issues
    const url = new URL('/admin', request.url)
    url.searchParams.set('error', error.message)
    
    // Fallback to relative path if URL construction creates an invalid host
    const redirectUrl = url.hostname === '0.0.0.0' 
      ? `/admin?error=${encodeURIComponent(error.message)}` 
      : url.toString()

    return NextResponse.redirect(new URL(redirectUrl, request.url), {
      status: 301,
    })
  }

  // Success redirect
  const successUrl = new URL('/admin/dashboard', request.url)
  const finalUrl = successUrl.hostname === '0.0.0.0' 
    ? '/admin/dashboard' 
    : successUrl.toString()

  return NextResponse.redirect(new URL(finalUrl, request.url), {
    status: 301,
  })
}
