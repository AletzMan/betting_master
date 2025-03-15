/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IBet } from "../types/types"
import { sortByHits } from "@/functions/functions"

export function useWinner(bets: IBet[] | null, results: string[]) {
	const [winner, setWinner] = useState<string[]>([])

	useEffect(() => {
		if (bets) {
			const winners = GetWinner(bets)
			setWinner(winners)
		}
	}, [bets, results])

	const GetWinner = (betsArray: IBet[]) => {
		let winners = [] as string[]
		try {
			const OrderBets = sortByHits("desc", betsArray, results)
			console.log(OrderBets)
			const newBets = OrderBets.filter(
				(bets) => bets.hits >= OrderBets[0].hits && bets.hits !== 0
			)
			console.log(newBets)
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
