/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IBet, IBetDocument, IUserAndState } from "../types/types"
import { useSearchParams } from "next/navigation";

export function useSort(
	bets: IBet[] | null,
) {
	const searchParams = useSearchParams();
	const [orderBets, setOrderBets] = useState<IBet[] | null>(bets)
	const [user, setUser] = useState<string>("")

	useEffect(() => {
		if (bets)
			setOrderBets(bets)
	}, [bets])

	useEffect(() => {
		if (searchParams.has("sortBy")) {
			const sortBy = searchParams.get("sortBy")
			if (sortBy === "name") {
				sortByName();
			}
		}
	}, [searchParams])




	const sortByName = () => {
		if (bets) {
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
			setOrderBets(newOrder)
		}
	}

	const sortNormal = () => {
		if (bets) {
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
			setOrderBets(newOrder)
		}
	}

	const filtertMyBets = () => {
		if (bets) {
			const newOrder = bets.filter((bet) => bet.uid === user)
			setOrderBets(newOrder)
		}
	}

	return {
		orderBets,
		setOrderBets,
		setUser,
	}
}
