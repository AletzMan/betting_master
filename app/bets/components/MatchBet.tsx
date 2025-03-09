import styles from "@/bets/bets.module.scss"
import { useBet } from "@/config/zustand-store"
import { IMatch } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"
import React, { useEffect, useState } from "react"

interface PropsMatch {
	matchData: IMatch
	numberMatch: number
	invalid?: boolean
}

export function MatchBet({ matchData, numberMatch, invalid }: PropsMatch) {
	const [invalidInternal, setInvalidInternal] = useState(invalid);
	const setBets = useBet((state) => state.setBets);
	const bets = useBet((state) => state.bets);

	useEffect(() => {
		setInvalidInternal(invalid)
	}, [invalid])

	const HandleChangePrediction = (typePrediction: string) => {
		const newBets = bets.map((bet, index) => (index === numberMatch ? typePrediction : bet));
		setInvalidInternal(false);
		setBets(newBets);
	}

	return (
		<div className={` grid grid-cols-[2.5em_1fr_2.5em_1fr_2.5em] items-center justify-center  w-full border-1 bg-(--surface-a) rounded-sm hover:bg-(--surface-hover) gap-x-2 px-2 py-2 ${invalidInternal ? "border-[#FF000085]" : "border-(--surface-d)"}`}>
			<div className="flex items-center justify-center relative bg-(--surface-b) w-10 h-10 border-1 border-(--surface-d) rounded-sm hover:bg-(--cyan-900)">
				<input
					className="w-10 h-10 opacity-0 z-2 cursor-pointer"
					checked={bets?.[numberMatch] === "L"}
					name={`bet${matchData.startDate}`}
					onChange={() => HandleChangePrediction("L")}
					type="checkbox"
				/>
				{bets[numberMatch] === "L" && <span className={`${styles.prediction_Letter}`}>L</span>}
			</div>
			<div className="flex flex-col items-center gap-y-1 w-full justify-center">
				{React.cloneElement(TeamsLogos[Number(matchData.homeTeam)].logo, { className: "h-9 w-9" })}
				<span className="text-sm uppercase font-bold text-center">{TeamsLogos[Number(matchData.homeTeam)].abbName}</span>
			</div>
			<div className="flex items-center justify-center relative bg-(--surface-b) w-10 h-10 border-1 border-(--surface-d) rounded-sm hover:bg-(--cyan-900)">
				<input
					className="w-10 h-10 opacity-0 z-2 cursor-pointer"
					checked={bets[numberMatch] === "E"}
					name={`bet${matchData.startDate}`}
					onChange={() => HandleChangePrediction("E")}
					type="checkbox"
				/>
				{bets[numberMatch] == "E" && <span className={`${styles.prediction_Letter}`}>E</span>}
			</div>
			<div className="flex flex-col items-center gap-y-1 w-full justify-center">
				{React.cloneElement(TeamsLogos[Number(matchData.awayTeam)].logo, { className: "h-9 w-9" })}
				<span className="text-sm uppercase font-bold text-center">{TeamsLogos[Number(matchData.awayTeam)].abbName}</span>
			</div>
			<div className="flex items-center justify-center relative bg-(--surface-b) w-10 h-10 border-1 border-(--surface-d) rounded-sm hover:bg-(--cyan-900)">
				<input
					className="w-10 h-10 opacity-0 z-2 cursor-pointer"
					checked={bets[numberMatch] === "V"}
					name={`bet${matchData.startDate}`}
					onChange={() => HandleChangePrediction("V")}
					type="checkbox"
				/>
				{bets[numberMatch] === "V" && <span className={`${styles.prediction_Letter}`}>V</span>}
			</div>
		</div>
	)
}
