import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/'] // contoh: halaman login

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    const isPublic = PUBLIC_PATHS.includes(pathname)

    // ⛔️ Jika user sudah login dan mengakses halaman login (/), redirect ke dashboard
    if (pathname === '/' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // ✅ Jika halaman publik (seperti /) dan user belum login, izinkan
    if (isPublic) {
        return NextResponse.next()
    }

    // ⛔️ Jika halaman private dan user belum login, redirect ke login (/)
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
