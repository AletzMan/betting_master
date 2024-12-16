import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const URL_NEWS = "https://www.marca.com/mx/ue-nydus/nydus-feeder.php?option=direct&content=mx%2Ffutbol%2Fliga-mx%2F2024%2F12%2F17%2F6760b4ca22601d9a648b45cc"
export async function GET(request: NextRequest, context: any) {

    try {
        const response = await axios.get(URL_NEWS)

        if (response.status === 200) {
            return NextResponse.json({ data: response.data }, { status: 200 })
        }
    } catch (error) {

    }
}