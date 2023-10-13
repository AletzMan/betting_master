import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
    const session = request.cookies.get("session-soccer")
    const { pathname } = request.nextUrl

    //Return to /login if don't have a session
    /* if (!session) {
         return NextResponse.redirect(new URL("auth/login", request.url))
     }*/

    //Call the authentication endpoint
    const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
        headers: {
            Cookie: `session-soccer=${session?.value}`,
        },
    });



    //Return to /login if token is not authorized
    if (responseAPI.status === 200 && pathname.endsWith("/auth/login")) {
        console.log("RESUME", responseAPI.status, pathname)
        request.nextUrl.pathname = "/"
        return NextResponse.redirect(request.nextUrl)
    }
    /*
    
    else {
        if (pathname.startsWith("/auth/login")) {
            request.nextUrl.pathname = "/"
            return NextResponse.redirect(request.nextUrl)

        }
    }
    
    */

    //return NextResponse.next()
}



//Add your protected routes

/*
export const config = {
    matcher: ["/protected/:path*", "/profile"],
};

*/