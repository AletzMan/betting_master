import { IStatistics } from "@/app/types/StatisticsTypes";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

//https://api.unidadeditorial.es/sports/v1/player-total-rank/sport/01/tournament/0159/sort/goals/current/?site=2&mn=50

const URL_STATISTICS = "https://api.unidadeditorial.es/sports/v1/player-total-rank/sport/01/tournament/"

export async function GET(request: NextRequest, context: any) {
    const { params } = context


    try {
        const response = await axios.get<IStatistics>(`${URL_STATISTICS}${params.tournament}/sort/${params.type}/current/?site=2&mn=50`) //168  - Espana=0101 -Mexico=0159

        return NextResponse.json({ data: response.data.data }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({}, { status: 500 })

    }

}