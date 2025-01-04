import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './features/auth/actions/verify-token';
 
export async function middleware(request: NextRequest) {
  const patheName = request.nextUrl.pathname;
  const cookie = request.cookies.get('token');

  if (patheName === '/') {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (patheName.startsWith('/work') && !cookie?.value) {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const token = searchParams.get('token') ?? '';
    const userPayload = await verifyToken(token);
    
    if (!userPayload) { 
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    } else {
      const response = NextResponse.next();
      response.cookies.set('token', token, {
        httpOnly: true
      })
      response.cookies.set('user', JSON.stringify(userPayload), {
        httpOnly:true
      })

      return response
    }
  }

  if (!cookie?.value) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  } else {
    const validToken = await verifyToken(cookie.value);
    if (validToken) return NextResponse.next();
  }


  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next|static|public|favicon.ico|auth|logo.svg).*)',
  ],
}