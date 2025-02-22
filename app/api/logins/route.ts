import { NextRequest, NextResponse } from "next/server"
import { cookies, headers } from "next/headers"
import { auth } from "firebase-admin"
import { InitApp } from "@/app/config/firebase-admin"
import { FirebaseError } from "firebase/app"
import { AuthCredential } from "firebase/auth"
import { ErrorFactory } from "@firebase/util"
import { FirestoreError } from "firebase/firestore"


/*
InitApp()

export async function POST(request: NextRequest) {
	const authorization = request.headers.get("Authorization")

	if (authorization?.startsWith("Bearer ")) {
		const idToken = authorization.split("Bearer ")[1]
		const decodedToken = await auth().verifyIdToken(idToken)

		try {
			if (decodedToken) {
				//Generar session cookie
				const expiresIn = 60 * 60 * 24 * 5 * 1000
				const sessionCookie = await auth().createSessionCookie(idToken, {
					expiresIn,
				})
				const options = {
					name: "session-soccer",
					value: sessionCookie,
					maxAge: expiresIn,
					httpOnly: true,
					secure: true,
				}
				const cookiesStore = await cookies()
				cookiesStore.set(options)
			}
			return NextResponse.json({}, { status: 200 })
		} catch (error) {
			return NextResponse.json({ error }, { status: 401 })
		}
	}
}

export async function GET(request: NextRequest) {
	try {
		const cookiesStore = await cookies()
		const session = cookiesStore.get("session-soccer")?.value || ""

		//Validate if the cookie exist
		if (!session) {
			return NextResponse.json({ isLogged: false }, { status: 401 })
		}

		//Validate the session cookie
		const decodedSession = await auth().verifySessionCookie(session, true)

		if (!decodedSession) {
			return NextResponse.json({ isLogged: false }, { status: 401 })
		}

		return NextResponse.json(
			{
				isLogged: true,
				userInfo: {
					uid: decodedSession.uid,
					name: decodedSession.name,
					photo: decodedSession.picture,
					email: decodedSession.email,
				},
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error(error instanceof Error)
		if (error instanceof Error) {
			const cookiesStore = await cookies()
			cookiesStore.delete("session-soccer")
			return NextResponse.json({ isLogged: false, message: error.message }, { status: 401 })
		}
	}
}
*/