import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SortByHits } from "../functions/functions"
import { IBetDocument, IUserAndState } from "../types/types"


export function useSort(results: string[], bets: IBetDocument[], setBets: Dispatch<SetStateAction<IBetDocument[]>>) {
    const [orderBets, setOrderBets] = useState({ id: "name", name: "Por nombre" })

    useEffect(() => {
        if (bets.length > 0) {
            if (orderBets.id === "asc") {
                const newOrder = SortByHits("asc", bets, results)
                setBets(newOrder)
            } else if (orderBets.id === "des") {
                const newOrder = SortByHits("des", bets, results)
                setBets(newOrder)
            } else if (orderBets.id === "name") {
                SortByName()
            }
        }
    }, [orderBets])

    const SortByName = () => {
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

    return {
        orderBets,
        setOrderBets
    }
}