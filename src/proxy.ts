import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/stories', '/chapters']
const AUTH_ROUTES = ['/login', '/register']
const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

async function isSessionValid(sessionCookie: string): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: { Cookie: `session_id=${sessionCookie}` },
        })
        return res.ok
    } catch {
        return false
    }
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const sessionCookie = request.cookies.get('session_id')?.value
    const hasSession = !!sessionCookie

    const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))

    // No cookie → simple check
    if (!hasSession) {
        if (isProtected) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }

    // Has cookie → validate it with the backend
    const valid = await isSessionValid(sessionCookie)

    if (!valid) {
        // Stale/expired session — clear the cookie
        const response = isProtected
            ? NextResponse.redirect(new URL('/login', request.url))
            : NextResponse.next()
        response.cookies.delete('session_id')
        return response
    }

    // Valid session on auth routes → redirect to dashboard
    if (isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/stories/:path*', '/chapters/:path*', '/login', '/register'],
}
