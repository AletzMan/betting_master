import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
    //Remove the value and expire the cookie
    const options = {
        name: "session-soccer",
        value: "",
        maxAge: -1,
    }
    const cookiesStore = await cookies()
    cookiesStore.set(options)
    return NextResponse.json({}, { status: 200 })
}