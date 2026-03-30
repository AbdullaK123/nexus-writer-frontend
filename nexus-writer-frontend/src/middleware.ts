import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/stories', '/chapters']
const AUTH_ROUTES = ['/login', '/register']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const hasSession = request.cookies.has('session_id')

    // Unauthenticated user trying to access protected routes → redirect to login
    const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
    if (isProtected && !hasSession) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // Authenticated user trying to access login/register → redirect to dashboard
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
    if (isAuthRoute && hasSession) {
        const dashboardUrl = new URL('/dashboard', request.url)
        return NextResponse.redirect(dashboardUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/stories/:path*', '/chapters/:path*', '/login', '/register'],
}
