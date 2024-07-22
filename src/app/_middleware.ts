// // middleware.ts

// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

//   const { pathname } = req.nextUrl

//   // If the user is authenticated, continue.
//   if (token) {
//     return NextResponse.next()
//   }

//   // Redirect to login page if not authenticated and trying to access a protected route
//   if (pathname.startsWith('/portal') || pathname.startsWith('/adminaccess')) {
//     const loginUrl = new URL('/login', req.url)
//     loginUrl.searchParams.set('callbackUrl', req.url)
//     return NextResponse.redirect(loginUrl)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/portal/:path*', '/adminaccess/:path*'], // Define which routes to apply this middleware to
// }
