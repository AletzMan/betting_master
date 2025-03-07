
"use server"

import { IBet, IMatch, IMatchDay, IUser, UserSession } from "@/types/types"
import { UserType } from "@/validations/userUpdateSchema"
import axios from "axios"
import { revalidateTag } from "next/cache"

const pathURL = process.env.NEXTAUTH_URL



export async function RevalidatePath(tag: string) {
    revalidateTag(tag)
}


export interface IMatchDayData {
    matchDay: IMatchDay
    matches: IMatch[]
}

export const getAllUsers = async (): Promise<IUser[] | null> => {
    try {
        const response = await fetch(`${pathURL}api/users`, { cache: "force-cache", next: { revalidate: 60000, tags: ['users'] } })
        if (response.status === 200) {
            const responseUsers = await response.json()
            let users: IUser[] = responseUsers.response
            return users
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const deleteUserByID = async (id: string): Promise<IUser[] | null> => {
    try {
        const response = await axios.delete(`${pathURL}api/users/${id}`)
        if (response.status === 200) {
            let users: IUser[] = response.data
            return users
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const updateUserByID = async (id: string, data: UserType): Promise<IUser | null> => {
    try {
        const response = await axios.patch(`${pathURL}api/users/${id}`, {
            ...data
        })
        if (response.status === 200) {
            let users: IUser = response.data.data
            return users
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getMatchDayInfo = async (): Promise<IMatchDay | null> => {
    let matchDay: IMatchDay[] = []

    try {
        const response = await fetch(`${pathURL}api/matchdays`, { cache: "force-cache", next: { revalidate: 60000, tags: ['matchDayInfo'] } })
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


export const deleteMatchDay = async (): Promise<IMatchDay | null> => {
    let matchDay: IMatchDay | null = null

    try {
        const response = await fetch(`${pathURL}api/matchdays`, { method: "DELETE" })
        if (response.status === 200) {
            const responseMatchDay = await response.json()
            console.log(responseMatchDay)
            matchDay = responseMatchDay.response
        }
        return matchDay
    } catch (error) {
        console.error(error)
        return null
    }
}


export const getMatchDayData = async (): Promise<IMatchDayData | null> => {
    let matchDay: IMatchDay[] = []
    let matches: IMatch[] = []

    try {
        const response = await fetch(`${pathURL}api/matchdays`, { cache: "force-cache", next: { revalidate: 60000, tags: ['matchDays'] } })
        if (response.status === 200) {
            const responseMatchDay = await response.json()
            matchDay = responseMatchDay.response
            const responseMatches = await fetch(`${pathURL}api/matchdays/${matchDay[0].id}/matches?sortBy=startDate&sortOrder=asc`, { cache: "force-cache", next: { revalidate: 60000, tags: ['matches'] } })
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
        let bets: IBet[] = []
        const response = await fetch(`${pathURL}api/bets`, { cache: 'force-cache', next: { revalidate: 60000, tags: ['bets'] } })
        if (response.status === 200) {
            const responseBets = await response.json();
            bets = responseBets.response;
        }
        return bets;
    } catch (error) {
        return null;
    }
}

export const updateBetByID = async (id: string, isPaid: boolean): Promise<IBet | null> => {
    try {
        const response = await axios.patch(`${pathURL}api/bets/${id}`, {
            paid: isPaid
        })
        if (response.status === 200) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.error(error)
        return null

    }
}

export const deleteBetByID = async (id: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`${pathURL}api/bets/${id}`)
        if (response.status === 200) {
            return true
        }
        return false
    } catch (error) {
        console.error(error)
        return false

    }
}
