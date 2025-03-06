
import { NextRequest, NextResponse } from "next/server"
import authConfig from "./app/utils/auth.cofig"
import NextAuth from "next-auth"
import { NotAuthorizedError } from "./app/api/_services/errors"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
	let cookie = request.cookies.get('authjs.session-token')
	if (request.nextUrl.pathname.startsWith('/bets')) {
		if (cookie) {
			return NextResponse.next()
		}
		//return NotAuthorizedError();
		return NextResponse.redirect(new URL('/login', request.url))
	}
	if (request.nextUrl.pathname.startsWith('/profile') && !cookie) {
		//return NextResponse.redirect(new URL('/login', request.url))
	}
	if (request.nextUrl.pathname.startsWith('/api/users')) {
		console.log(cookie)
		if (cookie) {
			return NextResponse.next()
		}
		//return NotAuthorizedError();
	}

})

