import { useEffect, useState } from "react"
import { InTimeToBet, TimeRemainig } from "../functions/functions"
import { GetBetsByDay, GetCurrentMatchDay } from "../config/firebase"
import { IBetDocument, IMatchDay } from "../types/types"

export function useMatches() {
	const [matches, setMatches] = useState<IMatchDay>({} as IMatchDay)
	const [loading, setLoading] = useState(true)
	//const [bets, setBets] = useState<IBetDocument[]>([])
	const [isInTime, setIsInTime] = useState({ available: false, time: "" })

	useEffect(() => {
		GetMatches()
	}, [])

	useEffect(() => {
		if (matches.matches?.length > 0 && matches.matches[0]?.status === "Sin comenzar") {
			const intervalRemaining = setInterval(() => {
				const time = TimeRemainig(matches.matches[0].startDate)
				//const isTime = InTimeToBet(matches.matches[0]?.startDate)
				const isTime = true
				setIsInTime({ available: isTime, time: time })
			}, 1000)

			return () => clearInterval(intervalRemaining)
		}
	}, [matches])

	const GetMatches = async () => {
		const currentMonth = new Date().getMonth() + 1
		const tournament = currentMonth < 8 ? "0168" : "0159"
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
			setMatches(emptyMatches)
			setIsInTime({ available: false, time: "" })
		} else {
			setMatches(result)
			const isTime = InTimeToBet(result.matches[0].startDate)
			setIsInTime({ ...isInTime, available: isTime })
		}
		setLoading(false)
	}
	return {
		loading,
		matches,
		//bets,
		isInTime,
		//setBets,
	}
}
