import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest, response: NextResponse) {
	const session = request.cookies.get("session-soccer")
	const { pathname } = request.nextUrl

	//Return to / if have a session
	if (pathname.endsWith("/bets")) {
		if (!session) {
			request.nextUrl.pathname = "/auth/login"
			return NextResponse.redirect(request.nextUrl)
		} else {
			return NextResponse.next()
		}
	}

	if (pathname.endsWith("/profile")) {
		if (!session) {
			request.nextUrl.pathname = "/auth/login"
			return NextResponse.redirect(request.nextUrl)
		} else {
			return NextResponse.next()
		}
	}
}
//Add your protected routes

/*
export const config = {
    matcher: ["/protected/:path*", "/profile"],
};
*/
