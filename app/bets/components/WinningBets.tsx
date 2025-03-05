
import ConfettiExplosion from "react-confetti-explosion"
import { IBet, IMatchDay } from "@/types/types"
import WinnerCard from "./WinnerCard"
import { useWinner } from "@/hooks/useWinner"
import { useEffect, useState } from "react"

interface Props {
    bets: IBet[] | null
    matches: IMatchDay
}

export function WinningBets({ bets, matches }: Props) {
    const { winner } = useWinner(bets, matches.results)
    const [winners, setWinners] = useState<IBet[] | null>(null)

    useEffect(() => {
        const newWinners = bets?.filter(bet => winner.includes(bet.id))
        if (newWinners)
            setWinners(newWinners)
    }, [bets, winner])

    return (
        <div className="flex flex-col items-center">
            <ConfettiExplosion duration={3000} force={0.6} particleCount={150} width={1000} />
            <section className="flex flex-wrap flex-row justify-center gap-3 p-2">
                {
                    winners?.map(win => (
                        <WinnerCard key={win.id} participant={win?.userInfo} name_bet={win.name} />
                    ))
                }
            </section>
        </div>
    )
}