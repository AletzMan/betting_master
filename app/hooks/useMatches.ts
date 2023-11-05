import { useEffect, useState } from "react"
import { InTimeToBet, TimeRemainig } from "../functions/functions"
import { GetBetsByDay, GetCurrentMatchDay } from "../config/firebase"
import { IBetDocument, IMatchDay } from "../types/types"


export function useMatches() {
    const [matches, setMatches] = useState<IMatchDay>({} as IMatchDay)
    const [loading, setLoading] = useState(true)
    //const [bets, setBets] = useState<IBetDocument[]>([])
    const [isInTime, setIsInTime] = useState({ available: false, time: "" })


    useEffect(() => {
        GetMatches()
    }, [])

    useEffect(() => {
        if (matches.matches?.length > 0 && matches.matches[0]?.status === "Sin comenzar") {
            const intervalRemaining = setInterval(() => {
                const time = TimeRemainig(matches.matches[0].startDate)
                const isTime = InTimeToBet(matches.matches[0]?.startDate)
                setIsInTime({ available: isTime, time: time })
            }, 1000)

            return () => clearInterval(intervalRemaining)
        }
    }, [matches])

    const GetMatches = async () => {
        const result = await GetCurrentMatchDay("0159")
        setMatches(result)
        setLoading(false)
        //const documents = await GetBetsByDay(result.day.toString())
        //setBets(documents)
        const isTime = InTimeToBet(result.matches[0].startDate)
        setIsInTime({ ...isInTime, available: isTime })
    }
    return {
        loading,
        matches,
        //bets,
        isInTime,
        //setBets,
    }
}