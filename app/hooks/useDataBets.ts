/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { InTimeToBet, TimeRemainig } from "../functions/functions"
import { IBet, IMatchDay, UserSession } from "../types/types"
import { IMatchDayData, getBetsByDay, getMatchDayData } from "@/utils/fetchData"
import { useSession } from "next-auth/react"
import { useUpdateBets } from "@/config/zustand-store"

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
	const updateBets = useUpdateBets((state) => state.updateBets)


	useEffect(() => {
		if (session || updateBets)
			getData()
	}, [session, updateBets])

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
			const isTime = InTimeToBet(matchDayData.matches[0].startDate)
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
		if (matchDayData.matches.length > 0 && matchDayData.matchDay.results[0] === "-") {
			const intervalRemaining = setInterval(() => {
				const time = TimeRemainig(matchDayData.matches[0].startDate as Date)
				const isTime = InTimeToBet(matchDayData.matches[0]?.startDate as Date)
				setIsInTime({ available: isTime, time: time })
			}, 1000)

			return () => clearInterval(intervalRemaining)
		} else {
			setIsInTime({ available: false, time: "-" })
		}
	}, [matchDayData])


	return {
		loading,
		matches: matchDayData.matches,
		matchDayInfo: matchDayData.matchDay,
		bets,
		myBets,
		isInTime,
	}
}
