import { NextResponse } from "next/server"
import {
	INews,
	IUser,
	IUserInfo,
	LeagueMX,
	ResponseStatsLeagueMX,
} from "../types/types"
import axios from "axios"
import { ResponseDataResults, Results } from "../types/ResultsTypes"
import { DetailsData, ResponseDetailsMatch } from "../types/DetailsMatch"

export const IsLoggedUser = async (): Promise<{ isLogged: boolean; userInfo: IUserInfo }> => {
	try {
		const response = await fetch("/api/login", {
			method: "GET",
		})

		if (response.status === 200) {
			const responseData = await response.json()
			const userInfo = responseData.userInfo
			const isLogged = responseData.isLogged
			return { isLogged, userInfo }
		}
	} catch (error) {
		console.error(error)
		return { isLogged: false, userInfo: { uid: "", name: "", photo: "", email: "" } }
	}
	return { isLogged: false, userInfo: { uid: "", name: "", photo: "", email: "" } }
}

export const GetStats = async (tournamentId: string): Promise<LeagueMX[]> => {
	try {
		//const response = await axios.get<ResponseStatsLeagueMX>(`http://localhost:3000/api/teams/stats/${tournamentId}`, { method: "GET" })
		const response = await axios.get<ResponseStatsLeagueMX>(
			`/api/teams/stats/${tournamentId}`,
			{
				method: "GET",
			}
		)

		return response.data.data.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error(error.code)
		}
		return {} as LeagueMX[]
	}
}

export const GetResults = async (date: string): Promise<Results[]> => {
	try {
		const response = await axios.get<ResponseDataResults>(`/api/matches/${date}`, {
			method: "GET",
		})

		if (response.status === 200) {
			return response.data.data.data
		} else if (response.status === 204) {
			return {} as Results[]
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error(error)
		}
		return {} as Results[]
	}
	return {} as Results[]
}

export const GetResultsByTournament = async (
	date: string,
	tournament: string
): Promise<Results[]> => {
	try {
		const response = await axios.get<ResponseDataResults>(
			`/api/matches/${date}?tournament=${tournament}`,
			{ method: "GET" }
		)

		if (response.status === 200) {
			return response.data.data.data
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return {} as Results[]
		}
	}
	return {} as Results[]
}

export const GetMatchDetails = async (id: string): Promise<DetailsData> => {
	try {
		const response = await axios.get<ResponseDetailsMatch>(`/api/matches/details/${id}`, {
			method: "GET",
		})

		if (response.status === 200) {
			return response.data.data.data
		} else if (response.status === 204) {
			return {} as DetailsData
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error(error)
		}
		return {} as DetailsData
	}
	return {} as DetailsData
}

export const GetMatchDay = async (tournamentId: string): Promise<number> => {
	try {
		//const response = await axios.get<ResponseStatsLeagueMX>(`http://localhost:3000/api/teams/stats/${tournamentId}`, { method: "GET" })
		const response = await axios.get<ResponseStatsLeagueMX>(
			`/api/teams/stats/${tournamentId}`,
			{
				method: "GET",
			}
		)

		return response.data.data.data[0].classificationHead.matchDay
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error(error.code)
		}
		return 0
	}
}



export const GetNewsLigaMX = async (): Promise<INews[]> => {
	try {
		const response = await axios.get("https://www.marca.com/mx/ue-nydus/nydus-feeder.php?option=direct&content=mx%2Ffutbol%2Fliga-mx%2F2024%2F12%2F17%2F6760b4ca22601d9a648b45cc")

		if (response.status === 200) {
			return response.data.content
		} else if (response.status === 204) {
			return [] as INews[]
		}
	} catch (error) {
		console.error(error)
		if (axios.isAxiosError(error) && error.response) {
			console.error(error.cause)
		}
		return [] as INews[]
	}
	return {} as INews[]
}


export const SendNotifications = async (users: IUser[], day: string): Promise<number> => {
	try {
		const emails = users.map(user => user.email)
		const response = await axios.post(
			`/api/notifications`,
			{
				emails: emails,
				day: day
			}
		)
		if (response.status === 200) {
			return 1
		}
		return 0
	} catch (error) {
		console.error(error)
		if (axios.isAxiosError(error) && error.response) {
			console.error(error.code)
		}
		return 0
	}
}
