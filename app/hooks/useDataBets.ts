/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { InTimeToBet, TimeRemainig } from "../functions/functions"
import { GetBetsByDay, GetCurrentMatchDay } from "../config/firebase"
import { IBet, IBetDocument, IMatch, IMatchDay, UserSession } from "../types/types"
import { IMatchDayData, getBetsByDay, getMatchDayData } from "@/utils/fetchData"
import result from "postcss/lib/result"
import { useSession } from "next-auth/react"

export interface IMyBets {
	bets: IBet[]
	hasBets: boolean
	isNotBetsPaid: boolean
}

const EmptyMyBets: IMyBets = {
	bets: [],
	hasBets: false,
	isNotBetsPaid: true
}

export function useDataBets() {
	const [loading, setLoading] = useState(true)
	const [bets, setBets] = useState<IBet[] | null>(null)
	const [isInTime, setIsInTime] = useState({ available: false, time: "" })
	const [matchDayData, setMatchDayData] = useState<IMatchDayData>({ matchDay: {} as IMatchDay, matches: [] })
	const [myBets, setMyBets] = useState<IMyBets>(EmptyMyBets)
	const session = useSession()

	/*useEffect(() => {
		GetMatches()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])*/



	useEffect(() => {
		if (session)
			getData()
	}, [session])

	const getData = async () => {
		setLoading(true)
		try {
			await getDay();
			await getBets();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const getDay = async () => {
		const matchDayData = await getMatchDayData();
		if (matchDayData) {
			setMatchDayData(matchDayData);
			const isTime = InTimeToBet(matchDayData.matches[0].startDate as Date)
			setIsInTime({ ...isInTime, available: isTime })
		}
	}

	const getBets = async () => {
		if (session.status === "authenticated") {
			const response = await getBetsByDay();
			if (response) {
				setBets(response)
				const arrayMyBets = response?.filter(bet => bet.uid === (session.data?.user as UserSession).id)
				if (arrayMyBets) {
					const newMyBets: IMyBets = {
						bets: arrayMyBets,
						hasBets: true,
						isNotBetsPaid: arrayMyBets.some(bet => !bet.paid)
					}
					setMyBets(newMyBets);
				}

			}
		}
	}



	useEffect(() => {
		if (matchDayData.matches.length > 0 && matchDayData.matches[0].status === "not started") {
			const intervalRemaining = setInterval(() => {
				console.log()
				const time = TimeRemainig(matchDayData.matches[0].startDate as Date)
				//const isTime = InTimeToBet(matches.matches[0]?.startDate)
				const isTime = true
				setIsInTime({ available: isTime, time: time })
			}, 1000)

			return () => clearInterval(intervalRemaining)
		}
	}, [matchDayData])

	/*const GetMatches = async () => {
		const currentMonth = new Date().getMonth() + 1
		const tournament = currentMonth < 7 ? "0168" : "0159"
		const result = await GetCurrentMatchDay(tournament)

		if (result === undefined) {
			const emptyMatches: IMatchDay = {
				day: 0,
				matches: [],
				tournament: "",
				results: [],
				isAvailable: false,
				isFinishGame: false,
			}
			//setMatches(emptyMatches)
			setIsInTime({ available: false, time: "" })
		} else {
			//setMatches(result)
			const isTime = InTimeToBet(result.matches[0].startDate)
			setIsInTime({ ...isInTime, available: isTime })
		}
		setLoading(false)
	}*/

	return {
		loading,
		matches: matchDayData.matches,
		matchDayInfo: matchDayData.matchDay,
		bets,
		myBets,
		isInTime,
		//setBets,
	}
}
