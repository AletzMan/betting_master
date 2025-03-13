
import { NextRequest, NextResponse } from "next/server"
import authConfig from "./app/utils/auth.cofig"
import NextAuth from "next-auth"
import { NotAuthorizedError } from "./app/api/_services/errors"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
	let cookie = request.cookies.get('authjs.session-token')
	const url = request.nextUrl.clone();
	if (request.nextUrl.pathname.startsWith('/bets')) {
		if (cookie) {
			return NextResponse.next()
		}
		//return NotAuthorizedError();
		return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url.pathname)}`, request.url));
	}
	if (request.nextUrl.pathname.startsWith('/profile') && !cookie) {
		if (cookie) {
			return NextResponse.next()
		}
		//return NotAuthorizedError();
		return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(url.pathname)}`, request.url));
	}
	if (request.nextUrl.pathname.startsWith('/api/users')) {
		if (cookie) {
			return NextResponse.next()
		}
		//return NotAuthorizedError();
	}

})

