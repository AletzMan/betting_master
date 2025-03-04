/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IBet, IBetDocument, ICurrentMatch, IUserAndState } from "../types/types"
import { sortByHits } from "@/functions/functions"

export function useWinner(bets: IBet[] | null, results: string[]) {
	const [winner, setWinner] = useState<string[]>([])

	useEffect(() => {
		if (bets && bets.length > 0) {
			const winners = GetWinner(bets)
			setWinner(winners)
		}
	}, [bets])

	const GetWinner = (betsArray: IBet[]) => {
		let winners = [] as string[]
		try {
			const OrderBets = sortByHits("des", betsArray, results)
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
