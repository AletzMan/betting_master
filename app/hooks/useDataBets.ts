/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IBet, IMatchDay, UserSession } from "../types/types"
import { getMatchDayInfo } from "@/utils/fetchData"
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
	const [matchDayData, setMatchDayData] = useState<IMatchDay | null>(null)
	const [myBets, setMyBets] = useState<IMyBets>(EmptyMyBets)
	const session = useSession()
	const updateBets = useUpdateBets((state) => state.updateBets)


	useEffect(() => {
		if (session || updateBets)
			getData()
	}, [session, updateBets])

	useEffect(() => {
		getBets();
	}, [session, matchDayData])

	const getData = async () => {
		setLoading(true)
		try {
			await getDay();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const getDay = async () => {
		const matchDayData = await getMatchDayInfo();
		if (matchDayData) {
			setMatchDayData(matchDayData);
		}
	}

	const getBets = async () => {
		if (session.status === "authenticated") {
			if (matchDayData) {
				const arrayMyBets = matchDayData.bets?.filter(bet => bet.uid === (session.data?.user as UserSession).id)
				if (arrayMyBets) {
					const newMyBets: IMyBets = {
						bets: arrayMyBets,
						hasBets: arrayMyBets.length > 0,
						isNotBetsPaid: arrayMyBets.some(bet => bet.paid === false)
					}
					setMyBets(newMyBets);
				}

			}
		}
	}


	return {
		loading,
		matchDayInfo: matchDayData,
		myBets,
	}
}
