/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { IBet } from "../types/types"
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { sortByHits } from "@/functions/functions";

export function useSort(
	bets: IBet[] | null,
	results: string[] | undefined
) {
	const searchParams = useSearchParams();
	const [orderBets, setOrderBets] = useState<IBet[] | null>(null)
	const session = useSession()

	useEffect(() => {
		if (bets)
			setOrderBets(bets)
	}, [bets, searchParams])

	useEffect(() => {
		if (searchParams.has("sortBy") && session.status === "authenticated") {
			const sortBy = searchParams.get("sortBy")
			const order = searchParams.get("order")
			if (sortBy === "normal") {
				if (searchParams.has("order")) {
					sortNormal(order === "asc" ? "desc" : "asc");
				} else {
					sortNormal("desc");
				}
			}
			if (sortBy === "name") {
				if (searchParams.has("order")) {
					sortByName(order === "asc" ? "desc" : "asc");
				} else {
					sortByName("desc");
				}
			}
			if (sortBy === "myBets") {
				if (searchParams.has("order")) {
					filtertMyBets(order === "asc" ? "desc" : "asc");
				} else {
					filtertMyBets("desc");
				}
			}
			if (sortBy === "hits") {
				if (searchParams.has("order") && bets && results) {
					const betsHits = sortByHits(order === "asc" ? "desc" : "asc", bets, results);

					const newOrder = betsHits.map((bet, index) => {
						return bets.find(betSearch => betSearch.id === bet.id)
					})
					setOrderBets(newOrder as IBet[]);
				} else {
					if (bets && results) {
						const betsHits = sortByHits("desc", bets, results);
						const newOrder = betsHits.map((bet, index) => {
							return bets.find(betSearch => betSearch.id === bet.id)
						})
						setOrderBets(newOrder as IBet[]);
					}
				}
			}
		}
	}, [searchParams, bets, session])




	const sortByName = (order: "asc" | "desc") => {
		if (bets) {
			let newOrder = [...bets];

			newOrder.sort((a, b) => {
				const comparison = a.name.localeCompare(b.name);
				return order === "desc" ? comparison : -comparison;
			});

			setOrderBets(newOrder);
		}
	}

	const sortNormal = (order: "asc" | "desc") => {
		if (bets) {
			let newOrder = [...bets]

			newOrder.sort((a, b) => {
				const comparison = a.userInfo.name.localeCompare(b.userInfo.name);
				return order === "desc" ? comparison : -comparison;
			});
			setOrderBets(newOrder)
		}
	}

	const filtertMyBets = (order: "asc" | "desc") => {
		if (bets) {
			const newOrder = bets.filter((bet) => bet.uid === session.data?.user?.id)
			const sort = newOrder.sort((a, b) => {
				const comparison = a.name.localeCompare(b.name);
				return order === "desc" ? comparison : -comparison;
			});
			setOrderBets(sort)
		}
	}

	return {
		orderBets,
		setOrderBets,
	}
}
