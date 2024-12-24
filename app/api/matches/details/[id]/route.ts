import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const URL_API = "https://api.unidadeditorial.es/sports/v1/events/"


export async function GET(request: NextRequest, context: any) {
    const { params } = context

    try {
        const response = await axios.get(`${URL_API}${params.id}/full?site=19`)
        const data = response.data

        if (response.status === 204) {
            return NextResponse.json({}, { status: 204 })

        }
        if (response.status === 200) {
            return NextResponse.json({ data }, { status: 200 })
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(error.code)
        }
        return NextResponse.json({}, { status: 500 })
    }


}