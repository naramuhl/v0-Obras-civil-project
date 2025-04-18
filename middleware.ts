import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verifica se o usuário está tentando acessar uma página protegida
  const isProtectedRoute = !pathname.startsWith("/login") && !pathname.startsWith("/api/auth")

  // Verifica se o usuário está autenticado
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Se a rota é protegida e o usuário não está autenticado, redireciona para o login
  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Se o usuário já está autenticado e tenta acessar a página de login, redireciona para o dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configuração para que o middleware seja executado em todas as rotas
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth/callback).*)"],
}
