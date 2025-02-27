
"use server"

import { IMatch, IMatchDay } from "@/types/types"

const pathURL = process.env.NEXTAUTH_URL


import { revalidateTag } from "next/cache"

export async function RevalidatePath(tag: string) {
    revalidateTag(tag)
}


interface IMatchDayData {
    matchDay: IMatchDay | null
    matches: IMatch[]
}

export const getMatchDayData = async (): Promise<IMatchDayData | null> => {
    let matchDay: IMatchDay[] = []
    let matches: IMatch[] = []

    try {
        const response = await fetch(`${pathURL}api/matchdays`, { cache: "force-cache", next: { revalidate: 30000, tags: ['matchDays'] } })
        if (response.status === 200) {
            const responseMatchDay = await response.json()
            matchDay = responseMatchDay.response
            const responseMatches = await fetch(`${pathURL}api/matchdays/${matchDay[0].id}/matches?sortBy=startDate&sortOrder=asc`, { cache: "force-cache", next: { revalidate: 30000, tags: ['matches'] } })
            if (responseMatches.status === 200) {
                const matchesResponse = await responseMatches.json()
                matches = matchesResponse.response
            }
        }
        return { matchDay: matchDay[0], matches: matches }
    } catch (error) {
        console.log(error)
        return null
    }
}