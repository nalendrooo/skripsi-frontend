// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose' // menggunakan jose untuk verifikasi JWT

const PUBLIC_PATHS = ['/', '/login', '/static', '/favicon.ico']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    const isPublic = PUBLIC_PATHS.includes(pathname)

    if (isPublic) {
        return NextResponse.next()
    }

    // jika butuh proteksi khusus, redirect bila belum login
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Verifikasi token JWT
    // try {
    //     await jwtVerify(token, new TextEncoder().encode(process.env.ACCESS_TOKEN))
    //     return NextResponse.next()
    // } catch (err) {
    //     // token invalid atau expired
    //     const response = NextResponse.redirect(new URL('/', request.url))
    //     response.cookies.delete('token')
    //     return response
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
