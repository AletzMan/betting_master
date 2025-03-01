/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { InTimeToBet, TimeRemainig } from "../functions/functions"
import { GetBetsByDay, GetCurrentMatchDay } from "../config/firebase"
import { IBetDocument, IMatch, IMatchDay } from "../types/types"
import { IMatchDayData, getMatchDayData } from "@/utils/fetchData"
import result from "postcss/lib/result"

export function useMatches() {
	const [loading, setLoading] = useState(true)
	//const [bets, setBets] = useState<IBetDocument[]>([])
	const [isInTime, setIsInTime] = useState({ available: false, time: "" })
	const [matchDayData, setMatchDayData] = useState<IMatchDayData>({ matchDay: {} as IMatchDay, matches: [] })

	/*useEffect(() => {
		GetMatches()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])*/



	useEffect(() => {
		GetDay()
	}, [])

	const GetDay = async () => {
		try {
			const matchDayData = await getMatchDayData();
			if (matchDayData) {
				setMatchDayData(matchDayData);
				const isTime = InTimeToBet(matchDayData.matches[0].startDate as Date)
				setIsInTime({ ...isInTime, available: isTime })
			}
		} catch (error) {

		} finally {
			setLoading(false);
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
		//bets,
		isInTime,
		//setBets,
	}
}
