import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decodeJwt } from 'jose'
import { verifyToken } from "./features/auth/actions/verify-token";

const publicRoutes = [
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/auth/signin", whenAuthenticated: "redirect" }
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/auth/signin";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === pathName);
  const authToken = request.cookies.get("token")?.value;

  // Verifique se o token existe na URL (exclusivo para "/workspace")
  if (!authToken && pathName.startsWith("/workspace")) {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    const token = searchParams.get("token") ?? "";

    // Verifique se o token é válido
    const userPayload = await verifyToken(token);

    if (userPayload?.id) {
      const response = NextResponse.next();
      response.cookies.set("token", token, { httpOnly: true });
      response.cookies.set("user", JSON.stringify(userPayload), { httpOnly: true });
      return response;
    } 

    // Caso não seja válido, redirecione para a página de login
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Verifique os casos de autenticação para outras páginas
  if (!authToken && publicRoute || pathName.startsWith("/form")) {
    if (pathName === '/') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const decodedToken = decodeJwt(authToken);
    const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;

    if (Date.now() > expirationTime) {
      request.cookies.delete("token");

      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
      return NextResponse.redirect(redirectUrl);
    }
    
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/workspace/work";
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg$).*)',
  ],
}