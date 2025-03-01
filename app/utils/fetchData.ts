
"use server"

import { IBet, IMatch, IMatchDay } from "@/types/types"
import { revalidateTag } from "next/cache"

const pathURL = process.env.NEXTAUTH_URL



export async function RevalidatePath(tag: string) {
    revalidateTag(tag)
}


export interface IMatchDayData {
    matchDay: IMatchDay
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



export const getBetsByDay = async (): Promise<IBet[] | null> => {
    try {
        let bets: IBet[] = arrayBets
        /*const response = await fetch(`${pathURL}api/bets`, { cache: 'force-cache', next: { revalidate: 30000, tags: ['bets'] } })
        if (response.status === 200) {
            const responseBets = await response.json();
            bets = responseBets.response;
        }*/
        return bets;
    } catch (error) {
        return null;
    }
}
const arrayBets: IBet[] = [
    {
        "id": "bet1",
        "uid": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
        "day": "10",
        "name": "Chicharron",
        "season": "Clausura 2025",
        "paid": false,
        "tournament": "Liga MX",
        "userInfo": {
            "id": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
            "name": "Alejandro Garcia",
            "email": "alejo2986@gmail.com",
            "image": "https://lh3.googleusercontent.com/a/ACg8ocKKLVezbm-dQP4Zy2rlFVCWb5KZfCC-0o5x94G9yKNpdH6Ua6Er=s96-c",
            "color": "#64b5f6",
            "account": "",
            "total_bets": 0,
            "bets_won": 0,
            "finals_won": 0,
            "last_login": new Date("2025-02-28T18:19:26.210Z"),
            "emailVerified": new Date(),
            "uid": "",
            "notifications": false,
        },
        "predictions": [
            { "id": "a1", "prediction": "L" },
            { "id": "a2", "prediction": "V" },
            { "id": "a3", "prediction": "E" },
            { "id": "a4", "prediction": "L" },
            { "id": "a5", "prediction": "E" },
            { "id": "a6", "prediction": "V" },
            { "id": "a7", "prediction": "E" },
            { "id": "a8", "prediction": "L" },
            { "id": "a9", "prediction": "V" },
        ],
    },
    {
        "id": "bet2",
        "uid": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
        "day": "12",
        "name": "Quiniela 2",
        "season": "Apertura 2025",
        "paid": true,
        "tournament": "Premier League",
        "userInfo": {
            "id": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
            "name": "Alejandro Garcia",
            "email": "alejo2986@gmail.com",
            "image": "https://lh3.googleusercontent.com/a/ACg8ocKKLVezbm-dQP4Zy2rlFVCWb5KZfCC-0o5x94G9yKNpdH6Ua6Er=s96-c",
            "color": "#ffc107",
            "account": "premium",
            "total_bets": 5,
            "bets_won": 2,
            "finals_won": 1,
            "last_login": new Date("2025-03-01T10:00:00.000Z"),
            "emailVerified": new Date(),
            "uid": "",
            "notifications": true,
        },
        "predictions": [
            { "id": "b1", "prediction": "V" },
            { "id": "b2", "prediction": "L" },
            { "id": "b3", "prediction": "E" },
            { "id": "b4", "prediction": "V" },
            { "id": "b5", "prediction": "L" },
            { "id": "b6", "prediction": "E" },
            { "id": "b7", "prediction": "V" },
            { "id": "b8", "prediction": "L" },
            { "id": "b9", "prediction": "E" },
        ],
    },
    {
        "id": "bet3",
        "uid": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
        "day": "15",
        "name": "Quiniela 3",
        "season": "Clausura 2026",
        "paid": false,
        "tournament": "La Liga",
        "userInfo": {
            "id": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
            "name": "Alejandro Garcia",
            "email": "alejo2986@gmail.com",
            "image": "https://lh3.googleusercontent.com/a/ACg8ocKKLVezbm-dQP4Zy2rlFVCWb5KZfCC-0o5x94G9yKNpdH6Ua6Er=s96-c",
            "color": "#4caf50",
            "account": "",
            "total_bets": 10,
            "bets_won": 7,
            "finals_won": 2,
            "last_login": new Date("2025-03-02T15:30:00.000Z"),
            "emailVerified": new Date(),
            "uid": "",
            "notifications": false,
        },
        "predictions": [
            { "id": "c1", "prediction": "E" },
            { "id": "c2", "prediction": "V" },
            { "id": "c3", "prediction": "L" },
            { "id": "c4", "prediction": "E" },
            { "id": "c5", "prediction": "L" },
            { "id": "c6", "prediction": "V" },
            { "id": "c7", "prediction": "L" },
            { "id": "c8", "prediction": "V" },
            { "id": "c9", "prediction": "E" },
        ],
    },
];