import { IStatistics } from "@/types/StatisticsTypes";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

//https://api.unidadeditorial.es/sports/v1/player-total-rank/sport/01/tournament/0159/sort/goals/current/?site=2&mn=50

const URL_STATISTICS = "https://api.unidadeditorial.es/sports/v1/player-total-rank/sport/01/tournament/"

export async function GET(request: NextRequest, { params }: { params: Promise<{ tournament: string, type: string }> }) {
    const tournament = (await params).tournament
    const type = (await params).type


    try {
        const response = await axios.get<IStatistics>(`${URL_STATISTICS}${tournament}/sort/${type}/current/?site=2&mn=50`) //168  - Espana=0101 -Mexico=0159

        return NextResponse.json({ data: response.data.data }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({}, { status: 500 })

    }

}