import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: any) {
    const { params } = context

    try {
        const response = await axios.get(`https://api.unidadeditorial.es/sports/v1/classifications/current/?site=2&type=10&tournament=${params.id}`) //168  - Espana=0101 -Mexico=0159


        return NextResponse.json({ data: response.data }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({}, { status: 500 })

    }

}