import { NextResponse } from 'next/server'

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request) {
  // Handle preflighted requests (OPTIONS)
  const isPreflight = request.method === 'OPTIONS'

  if (isPreflight) {
    const preflightHeaders = {
      'Access-Control-Allow-Origin': '*',  // Allow any origin
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Handle simple requests (GET, POST, PUT, DELETE)
  const response = NextResponse.next()

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')  // Allow any origin
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*', // Make sure to apply this to your API routes
}
