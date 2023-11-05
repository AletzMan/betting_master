import { GetMatchDay } from "@/app/config/firebase";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, response: NextResponse) {

    try {
        const res = await GetMatchDay("0159")
        console.log(res)
        if (res) {
            return NextResponse.json({ data: res }, { status: 200 })
        } else {
            return NextResponse.json({ data: res }, { status: 500 })

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }


}