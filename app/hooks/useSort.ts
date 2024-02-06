import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SortByHits } from "../functions/functions"
import { IBetDocument, IUserAndState } from "../types/types"

export function useSort(
	results: string[],
	bets: IBetDocument[] | null,
	setBets: Dispatch<SetStateAction<IBetDocument[] | null>>
) {
	const [orderBets, setOrderBets] = useState<"name" | "asc" | "des" | "normal" | "">("")

	useEffect(() => {
		if (bets && setBets && bets.length > 0) {
			if (orderBets === "asc") {
				const newOrder = SortByHits("asc", bets, results)
				setBets(newOrder)
			} else if (orderBets === "des") {
				const newOrder = SortByHits("des", bets, results)
				setBets(newOrder)
			} else if (orderBets === "name") {
				SortByName()
			} else if (orderBets === "normal") {
				SortNormal()
			}
		}
	}, [orderBets])

	const SortByName = () => {
		if (bets && setBets) {
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
			setBets(newOrder)
		}
	}

	const SortNormal = () => {
		if (bets && setBets) {
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
			setBets(newOrder)
		}
	}

	return {
		orderBets,
		setOrderBets,
	}
}
