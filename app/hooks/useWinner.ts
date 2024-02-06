import { useEffect, useState } from "react"
import { IBetDocument, ICurrentMatch, IUserAndState } from "../types/types"
import { SortByHits } from "../functions/functions"

export function useWinner(bets: IBetDocument[] | null, results: string[]) {
	const [winner, setWinner] = useState<string[]>([])
	useEffect(() => {
		if (bets && bets.length > 0) {
			const winners = GetWinner(bets)
			setWinner(winners)
		}
	}, [bets])

	const GetWinner = (betsArray: IBetDocument[]) => {
		let winners = [] as string[]
		try {
			const OrderBets = SortByHits("des", betsArray, results)
			const newBets = OrderBets.filter(
				(bets) => bets.hits >= OrderBets[0].hits && bets.hits !== 0
			)
			newBets.map((newBet) => {
				winners.push(newBet.id)
			})
			return winners
		} catch (error) {
			console.error(error)
			return []
		}
	}

	return {
		winner,
	}
}
