import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // In a real app, you'd check for a session token/cookie here
    // For demo purposes, we're just checking if they came from login
    const referer = request.headers.get('referer')
    if (!referer || !referer.includes('/auth/login')) {
      // Allow access for now in demo mode
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}