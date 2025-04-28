// app/middleware.js
export function middleware(request) {
  const allowedOrigin = process.env.NEXT_PUBLIC_API_ORIGIN || '*';

  const response = new Response(null, {
    status: 204, // No Content
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

  // CORS preflight handling (OPTIONS)
  if (request.method === 'OPTIONS') {
    return response;
  }

  // Menambahkan header CORS ke response untuk semua API
  const newResponse = new Response(request.body, {
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

  return newResponse;
}

export const config = {
  matcher: '/api/*',
};
