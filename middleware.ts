
import { NextRequest, NextResponse } from "next/server"
import authConfig from "./app/utils/auth.cofig"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
	const nameCookie =
		process.env.NODE_ENV === "development"
			? "next-auth.session-token"
			: "__Secure-authjs.session-token"
	let cookie = request.cookies.get(nameCookie)
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
	if (request.nextUrl.pathname.startsWith('/finals') && !cookie) {
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

