import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value

  currentUser && console.log('currentUser:', currentUser);

  // if (!currentUser && request.nextUrl.pathname.match('/gameboard')) {
  //   console.log('redirecting to login', request.url);
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}