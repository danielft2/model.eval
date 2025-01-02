import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './features/auth/actions/verify-token';
 
export async function middleware(request: NextRequest) {
  const patheName = request.nextUrl.pathname;
  const cookie = request.cookies.get('token');

  if (!cookie?.value) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  } else {
    const validToken = await verifyToken(cookie.value);
    if (validToken) return NextResponse.next();
  }

  if (patheName.startsWith('/work')) {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const token = searchParams.get('token') ?? '';
    const validToken = await verifyToken(token);
    
    if (!validToken) { 
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    } else {
      const response = NextResponse.next();
      response.cookies.set('token', token, {
        httpOnly: true
      })

      return response
    }
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)',
  ],
}