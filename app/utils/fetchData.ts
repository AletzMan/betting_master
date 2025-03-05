
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

export const getMatchDayInfo = async (): Promise<IMatchDay | null> => {
    let matchDay: IMatchDay[] = []

    try {
        const response = await fetch(`${pathURL}api/matchdays`, { cache: "force-cache", next: { revalidate: 30000, tags: ['matchDayInfo'] } })
        if (response.status === 200) {
            const responseMatchDay = await response.json()
            matchDay = responseMatchDay.response
        }
        return matchDay[0]
    } catch (error) {
        console.error(error)
        return null
    }
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
        console.error(error)
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
        "paid": true,
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
            { "id": "a1", "prediction": "L", matchNumber: 0 },
            { "id": "a2", "prediction": "V", matchNumber: 1 },
            { "id": "a3", "prediction": "E", matchNumber: 2 },
            { "id": "a4", "prediction": "L", matchNumber: 3 },
            { "id": "a5", "prediction": "E", matchNumber: 4 },
            { "id": "a6", "prediction": "V", matchNumber: 5 },
            { "id": "a7", "prediction": "E", matchNumber: 6 },
            { "id": "a8", "prediction": "L", matchNumber: 7 },
            { "id": "a9", "prediction": "V", matchNumber: 8 },
        ],
    },
    {
        "id": "bet2",
        "uid": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
        "day": "12",
        "name": "Gatete",
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
            { "id": "b1", "prediction": "V", matchNumber: 0 },
            { "id": "b2", "prediction": "L", matchNumber: 1 },
            { "id": "b3", "prediction": "E", matchNumber: 2 },
            { "id": "b4", "prediction": "V", matchNumber: 3 },
            { "id": "b5", "prediction": "L", matchNumber: 4 },
            { "id": "b6", "prediction": "E", matchNumber: 5 },
            { "id": "b7", "prediction": "V", matchNumber: 6 },
            { "id": "b8", "prediction": "L", matchNumber: 7 },
            { "id": "b9", "prediction": "E", matchNumber: 8 },
        ],
    },
    {
        "id": "bet3",
        "uid": "4e01ce90-026a-4eff-af68-6e4e4dd5dcd6",
        "day": "15",
        "name": "El perrete",
        "season": "Clausura 2026",
        "paid": true,
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
            { "id": "c1", "prediction": "E", matchNumber: 0 },
            { "id": "c2", "prediction": "V", matchNumber: 1 },
            { "id": "c3", "prediction": "L", matchNumber: 2 },
            { "id": "c4", "prediction": "E", matchNumber: 3 },
            { "id": "c5", "prediction": "L", matchNumber: 4 },
            { "id": "c6", "prediction": "V", matchNumber: 5 },
            { "id": "c7", "prediction": "L", matchNumber: 6 },
            { "id": "c8", "prediction": "V", matchNumber: 7 },
            { "id": "c9", "prediction": "E", matchNumber: 8 },
        ],
    },
    {
        "id": "bet10",
        "uid": "9f87a321-b456-4cde-8901-23456789abcd",
        "day": "25",
        "name": "Raven",
        "season": "Clausura 2026",
        "paid": true,
        "tournament": "UEFA Champions League",
        "userInfo": {
            "id": "9f87a321-b456-4cde-8901-23456789abcd",
            "name": "Sofia Martinez",
            "email": "sofia.martinez@example.com",
            "image": "https://lh3.googleusercontent.com/a/ACg8ocJDiYiTwvDThHbJH8dSizEBcEqrvZcK1JEAp30AGTY87vDQ0A=s60-c-br100-rg-mo",
            "color": "#4caf50",
            "account": "standard",
            "total_bets": 12,
            "bets_won": 7,
            "finals_won": 3,
            "last_login": new Date("2025-03-05T15:30:00.000Z"),
            "emailVerified": new Date("2024-05-15T10:30:00.000Z"),
            "uid": "",
            "notifications": false
        },
        "predictions": [
            { "id": "p1", "prediction": "L", "matchNumber": 0 },
            { "id": "p2", "prediction": "V", "matchNumber": 1 },
            { "id": "p3", "prediction": "E", "matchNumber": 2 },
            { "id": "p4", "prediction": "L", "matchNumber": 3 },
            { "id": "p5", "prediction": "V", "matchNumber": 4 },
            { "id": "p6", "prediction": "E", "matchNumber": 5 },
            { "id": "p7", "prediction": "L", "matchNumber": 6 },
            { "id": "p8", "prediction": "V", "matchNumber": 7 },
            { "id": "p9", "prediction": "E", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet11",
        "uid": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        "day": "5",
        "name": "Alva",
        "season": "Apertura 2026",
        "paid": true,
        "tournament": "La Liga",
        "userInfo": {
            "id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
            "name": "Alva Majo",
            "email": "carlos.ruiz@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/5ro4-profile_image-0e6a30d25dd5f6ad-70x70.png",
            "color": "#2196f3",
            "account": "free",
            "total_bets": 8,
            "bets_won": 3,
            "finals_won": 0,
            "last_login": new Date("2025-03-03T12:45:00.000Z"),
            "emailVerified": new Date("2024-06-20T14:15:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "q1", "prediction": "V", "matchNumber": 0 },
            { "id": "q2", "prediction": "L", "matchNumber": 1 },
            { "id": "q3", "prediction": "E", "matchNumber": 2 },
            { "id": "q4", "prediction": "V", "matchNumber": 3 },
            { "id": "q5", "prediction": "L", "matchNumber": 4 },
            { "id": "q6", "prediction": "E", "matchNumber": 5 },
            { "id": "q7", "prediction": "V", "matchNumber": 6 },
            { "id": "q8", "prediction": "L", "matchNumber": 7 },
            { "id": "q9", "prediction": "E", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet12",
        "uid": "6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e",
        "day": "18",
        "name": "Midudev",
        "season": "Clausura 2026",
        "paid": true,
        "tournament": "Serie A",
        "userInfo": {
            "id": "6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e",
            "name": "Miguel Duran",
            "email": "laura.gomez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/ff538181-5311-4b24-8765-48630db88a93-profile_image-150x150.png",
            "color": "#ff9800",
            "account": "premium",
            "total_bets": 15,
            "bets_won": 10,
            "finals_won": 5,
            "last_login": new Date("2025-03-04T18:20:00.000Z"),
            "emailVerified": new Date("2024-07-01T09:00:00.000Z"),
            "uid": "",
            "notifications": false
        },
        "predictions": [
            { "id": "r1", "prediction": "V", "matchNumber": 0 },
            { "id": "r2", "prediction": "E", "matchNumber": 1 },
            { "id": "r3", "prediction": "L", "matchNumber": 2 },
            { "id": "r4", "prediction": "V", "matchNumber": 3 },
            { "id": "r5", "prediction": "L", "matchNumber": 4 },
            { "id": "r6", "prediction": "V", "matchNumber": 5 },
            { "id": "r7", "prediction": "E", "matchNumber": 6 },
            { "id": "r8", "prediction": "L", "matchNumber": 7 },
            { "id": "r9", "prediction": "V", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet14",
        "uid": "7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
        "day": "22",
        "name": "Aforina",
        "season": "Clausura 2026",
        "paid": true,
        "tournament": "Ligue 1",
        "userInfo": {
            "id": "7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
            "name": "Sara Montagud",
            "email": "isabel.fernandez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/863b2191-20a3-44c4-bd60-7fe8b59d2dab-profile_image-150x150.png",
            "color": "#673ab7",
            "account": "premium",
            "total_bets": 18,
            "bets_won": 12,
            "finals_won": 7,
            "last_login": new Date("2025-03-06T11:25:00.000Z"),
            "emailVerified": new Date("2024-08-01T15:45:00.000Z"),
            "uid": "",
            "notifications": false
        },
        "predictions": [
            { "id": "t1", "prediction": "V", "matchNumber": 0 },
            { "id": "t2", "prediction": "E", "matchNumber": 1 },
            { "id": "t3", "prediction": "L", "matchNumber": 2 },
            { "id": "t4", "prediction": "V", "matchNumber": 3 },
            { "id": "t5", "prediction": "E", "matchNumber": 4 },
            { "id": "t6", "prediction": "L", "matchNumber": 5 },
            { "id": "t7", "prediction": "V", "matchNumber": 6 },
            { "id": "t8", "prediction": "E", "matchNumber": 7 },
            { "id": "t9", "prediction": "L", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet15",
        "uid": "3b4c5d6e-7f8a-9b0c-1d2e-3f4a5b6c7d8e",
        "day": "15",
        "name": "Illo Juan",
        "season": "Apertura 2027",
        "paid": true,
        "tournament": "Major League Soccer",
        "userInfo": {
            "id": "3b4c5d6e-7f8a-9b0c-1d2e-3f4a5b6c7d8e",
            "name": "Juan Malagon",
            "email": "ricardo.lopez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/593b5641-c626-4ba4-ba49-11cb33f6c3e8-profile_image-70x70.png",
            "color": "#009688",
            "account": "standard",
            "total_bets": 9,
            "bets_won": 5,
            "finals_won": 2,
            "last_login": new Date("2025-03-07T14:10:00.000Z"),
            "emailVerified": new Date("2024-08-15T10:20:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "u1", "prediction": "E", "matchNumber": 0 },
            { "id": "u2", "prediction": "V", "matchNumber": 1 },
            { "id": "u3", "prediction": "L", "matchNumber": 2 },
            { "id": "u4", "prediction": "E", "matchNumber": 3 },
            { "id": "u5", "prediction": "V", "matchNumber": 4 },
            { "id": "u6", "prediction": "L", "matchNumber": 5 },
            { "id": "u7", "prediction": "E", "matchNumber": 6 },
            { "id": "u8", "prediction": "V", "matchNumber": 7 },
            { "id": "u9", "prediction": "L", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet16",
        "uid": "8d9e0f1a-2b3c-4d5e-6f7a-8b9c0d1e2f3a",
        "day": "8",
        "name": "Mouredev",
        "season": "Apertura 2027",
        "paid": true,
        "tournament": "Eredivisie",
        "userInfo": {
            "id": "8d9e0f1a-2b3c-4d5e-6f7a-8b9c0d1e2f3a",
            "name": "Brais Moure",
            "email": "elena.ramirez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/e10f71e1-f77e-4ccd-87fb-7cb7f33dc32b-profile_image-150x150.png",
            "color": "#ff5722",
            "account": "free",
            "total_bets": 6,
            "bets_won": 3,
            "finals_won": 0,
            "last_login": new Date("2025-03-08T16:35:00.000Z"),
            "emailVerified": new Date("2024-09-01T12:10:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "v1", "prediction": "L", "matchNumber": 0 },
            { "id": "v2", "prediction": "E", "matchNumber": 1 },
            { "id": "v3", "prediction": "V", "matchNumber": 2 },
            { "id": "v4", "prediction": "L", "matchNumber": 3 },
            { "id": "v5", "prediction": "E", "matchNumber": 4 },
            { "id": "v6", "prediction": "V", "matchNumber": 5 },
            { "id": "v7", "prediction": "L", "matchNumber": 6 },
            { "id": "v8", "prediction": "E", "matchNumber": 7 },
            { "id": "v9", "prediction": "V", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet18",
        "uid": "9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
        "day": "3",
        "name": "ProgramacionES",
        "season": "Apertura 2028",
        "paid": true,
        "tournament": "Brasileirão Série A",
        "userInfo": {
            "id": "9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
            "name": "Pedro Plascencia",
            "email": "marta.diaz@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/731610a2-828b-47d7-b3c1-3f7d14e27775-profile_image-150x150.png",
            "color": "#795548",
            "account": "free",
            "total_bets": 11,
            "bets_won": 6,
            "finals_won": 1,
            "last_login": new Date("2025-03-10T11:15:00.000Z"),
            "emailVerified": new Date("2024-10-01T10:00:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "x1", "prediction": "L", "matchNumber": 0 },
            { "id": "x2", "prediction": "V", "matchNumber": 1 },
            { "id": "x3", "prediction": "E", "matchNumber": 2 },
            { "id": "x4", "prediction": "L", "matchNumber": 3 },
            { "id": "x5", "prediction": "V", "matchNumber": 4 },
            { "id": "x6", "prediction": "E", "matchNumber": 5 },
            { "id": "x7", "prediction": "L", "matchNumber": 6 },
            { "id": "x8", "prediction": "V", "matchNumber": 7 },
            { "id": "x9", "prediction": "E", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet19sdsdsd",
        "uid": "ae6f7691-9c0d-1e2f-3c6g-5c6d7e8f9a9M",
        "day": "16",
        "name": "ValenWerle",
        "season": "Clausura 2028",
        "paid": true,
        "tournament": "J1 League",
        "userInfo": {
            "id": "ae6f7691-9c0d-1e2f-3c6g-5c6d7e8f9a9M",
            "name": "Valentina Werle",
            "email": "valenwer@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/89f5bbe8-b777-49a9-964c-54344db7e852-profile_image-70x70.png",
            "color": "#607d8b",
            "account": "premium",
            "total_bets": 22,
            "bets_won": 18,
            "finals_won": 12,
            "last_login": new Date("2025-03-11T13:40:00.000Z"),
            "emailVerified": new Date("2024-10-15T11:30:00.000Z"),
            "uid": "",
            "notifications": false
        },
        "predictions": [
            { "id": "y1", "prediction": "V", "matchNumber": 0 },
            { "id": "y2", "prediction": "L", "matchNumber": 1 },
            { "id": "y3", "prediction": "E", "matchNumber": 2 },
            { "id": "y4", "prediction": "V", "matchNumber": 3 },
            { "id": "y5", "prediction": "E", "matchNumber": 4 },
            { "id": "y6", "prediction": "E", "matchNumber": 5 },
            { "id": "y7", "prediction": "V", "matchNumber": 6 },
            { "id": "y8", "prediction": "L", "matchNumber": 7 },
            { "id": "y9", "prediction": "E", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet19",
        "uid": "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
        "day": "16",
        "name": "Sofi Dev",
        "season": "Clausura 2028",
        "paid": true,
        "tournament": "J1 League",
        "userInfo": {
            "id": "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
            "name": "Sofia Cruz",
            "email": "david.ruiz@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/372efdc2-cdd4-456b-a763-07a3a9737d71-profile_image-150x150.png",
            "color": "#607d8b",
            "account": "premium",
            "total_bets": 22,
            "bets_won": 18,
            "finals_won": 12,
            "last_login": new Date("2025-03-11T13:40:00.000Z"),
            "emailVerified": new Date("2024-10-15T11:30:00.000Z"),
            "uid": "",
            "notifications": false
        },
        "predictions": [
            { "id": "y1", "prediction": "V", "matchNumber": 0 },
            { "id": "y2", "prediction": "L", "matchNumber": 1 },
            { "id": "y3", "prediction": "E", "matchNumber": 2 },
            { "id": "y4", "prediction": "V", "matchNumber": 3 },
            { "id": "y5", "prediction": "L", "matchNumber": 4 },
            { "id": "y6", "prediction": "E", "matchNumber": 5 },
            { "id": "y7", "prediction": "V", "matchNumber": 6 },
            { "id": "y8", "prediction": "L", "matchNumber": 7 },
            { "id": "y9", "prediction": "E", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet20",
        "uid": "1d2e3f4a-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
        "day": "9",
        "name": "ManzDev",
        "season": "Apertura 2028",
        "paid": true,
        "tournament": "A-League",
        "userInfo": {
            "id": "1d2e3f4a-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
            "name": "J. Román",
            "email": "ana.perez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/86bd7a3b-b42f-4463-a428-e3f8d0614208-profile_image-150x150.png",
            "color": "#8bc34a",
            "account": "standard",
            "total_bets": 13,
            "bets_won": 8,
            "finals_won": 3,
            "last_login": new Date("2025-03-12T15:20:00.000Z"),
            "emailVerified": new Date("2024-10-20T14:45:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "z1", "prediction": "E", "matchNumber": 0 },
            { "id": "z2", "prediction": "V", "matchNumber": 1 },
            { "id": "z3", "prediction": "L", "matchNumber": 2 },
            { "id": "z4", "prediction": "E", "matchNumber": 3 },
            { "id": "z5", "prediction": "V", "matchNumber": 4 },
            { "id": "z6", "prediction": "L", "matchNumber": 5 },
            { "id": "z7", "prediction": "E", "matchNumber": 6 },
            { "id": "z8", "prediction": "V", "matchNumber": 7 },
            { "id": "z9", "prediction": "L", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet22",
        "uid": "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        "day": "11",
        "name": "Goncy P",
        "season": "Apertura 2029",
        "paid": true,
        "tournament": "Superliga Argentina",
        "userInfo": {
            "id": "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
            "name": "Gonzalo Pozzo",
            "email": "raquel.jimenez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/84b900ce-29a1-4293-82e6-c50aa47783a9-profile_image-150x150.png",
            "color": "#cddc39",
            "account": "standard",
            "total_bets": 14,
            "bets_won": 9,
            "finals_won": 4,
            "last_login": new Date("2025-03-14T19:45:00.000Z"),
            "emailVerified": new Date("2024-11-01T13:20:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "b1", "prediction": "E", "matchNumber": 0 },
            { "id": "b2", "prediction": "L", "matchNumber": 1 },
            { "id": "b3", "prediction": "V", "matchNumber": 2 },
            { "id": "b4", "prediction": "E", "matchNumber": 3 },
            { "id": "b5", "prediction": "L", "matchNumber": 4 },
            { "id": "b6", "prediction": "V", "matchNumber": 5 },
            { "id": "b7", "prediction": "E", "matchNumber": 6 },
            { "id": "b8", "prediction": "L", "matchNumber": 7 },
            { "id": "b9", "prediction": "V", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet23",
        "uid": "7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
        "day": "27",
        "name": "El Bicho",
        "season": "Clausura 2029",
        "paid": true,
        "tournament": "Russian Premier League",
        "userInfo": {
            "id": "7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
            "name": "Cristiano Ronaldo",
            "email": "manuel.ortega@example.com",
            "image": "https://yt3.ggpht.com/7HR7AS1zqCg3HDKKhU734Hoqaz277rXAkSkjJlui8cf_jrw31GZF2aPn3i9JS6Hhwgcxutp0jg=s176-c-k-c0x00ffffff-no-rj-mo",
            "color": "#ffeb3b",
            "account": "premium",
            "total_bets": 25,
            "bets_won": 20,
            "finals_won": 15,
            "last_login": new Date("2025-03-15T21:00:00.000Z"),
            "emailVerified": new Date("2024-11-15T15:30:00.000Z"),
            "uid": "",
            "notifications": false
        },
        "predictions": [
            { "id": "c1", "prediction": "V", "matchNumber": 0 },
            { "id": "c2", "prediction": "E", "matchNumber": 1 },
            { "id": "c3", "prediction": "L", "matchNumber": 2 },
            { "id": "c4", "prediction": "V", "matchNumber": 3 },
            { "id": "c5", "prediction": "E", "matchNumber": 4 },
            { "id": "c6", "prediction": "L", "matchNumber": 5 },
            { "id": "c7", "prediction": "V", "matchNumber": 6 },
            { "id": "c8", "prediction": "E", "matchNumber": 7 },
            { "id": "c9", "prediction": "L", "matchNumber": 8 }
        ]
    },
    {
        "id": "bet24",
        "uid": "3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b",
        "day": "4",
        "name": "DSimons",
        "season": "Apertura 2029",
        "paid": true,
        "tournament": "Primeira Liga",
        "userInfo": {
            "id": "3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b",
            "name": "David Simons",
            "email": "lucia.fernandez@example.com",
            "image": "https://static-cdn.jtvnw.net/jtv_user_pictures/8e5783b0-0880-4278-9439-97dc4a94b22d-profile_image-150x150.png",
            "color": "#03a9f4",
            "account": "free",
            "total_bets": 16,
            "bets_won": 11,
            "finals_won": 5,
            "last_login": new Date("2025-03-16T22:15:00.000Z"),
            "emailVerified": new Date("2024-11-20T17:45:00.000Z"),
            "uid": "",
            "notifications": true
        },
        "predictions": [
            { "id": "d1", "prediction": "V", "matchNumber": 0 },
            { "id": "d2", "prediction": "E", "matchNumber": 1 },
            { "id": "d3", "prediction": "E", "matchNumber": 2 },
            { "id": "d4", "prediction": "V", "matchNumber": 3 },
            { "id": "d5", "prediction": "V", "matchNumber": 4 },
            { "id": "d6", "prediction": "E", "matchNumber": 5 },
            { "id": "d7", "prediction": "L", "matchNumber": 6 },
            { "id": "d8", "prediction": "V", "matchNumber": 7 },
            { "id": "d9", "prediction": "E", "matchNumber": 8 }
        ]
    }
];