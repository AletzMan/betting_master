import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IBet, IBetDocument, IUserAndState } from "../types/types"

export function useSort(
	results: string[],
	bets: IBet[] | null,
	setFilterBets: Dispatch<SetStateAction<IBet[] | null>>
) {
	const [orderBets, setOrderBets] = useState<"name" | "asc" | "des" | "normal" | "myBets" | "">("")
	const [user, setUser] = useState<string>("")


	const SortByName = () => {
		if (bets && setFilterBets) {
			let newOrder = [...bets]
			newOrder?.sort((a, b) => {
				if (a.name > b.name) {
					return 1
				}
				if (a.name < b.name) {
					return -1
				}
				// a must be equal to b
				return 0
			})
			setFilterBets(newOrder)
		}
	}

	const SortNormal = () => {
		if (bets && setFilterBets) {
			let newOrder = [...bets]
			newOrder?.sort((a, b) => {
				if (a.uid > b.uid) {
					return -1
				}
				if (a.uid < b.uid) {
					return 1
				}
				// a must be equal to b
				return 0
			})
			setFilterBets(newOrder)
		}
	}

	const FiltertMyBets = () => {
		if (bets && setFilterBets) {
			const newOrder = bets.filter((bet) => bet.uid === user)
			setFilterBets(newOrder)
		}
	}

	return {
		orderBets,
		setOrderBets,
		setUser,
	}
}
