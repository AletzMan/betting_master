import styles from "@/bets/bets.module.scss"
import { useBet } from "@/config/zustand-store"
import { IMatch } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"
import React from "react"

interface PropsMatch {
	matchData: IMatch
	numberMatch: number
}

export function MatchBet({ matchData, numberMatch }: PropsMatch) {
	const setBets = useBet((state) => state.setBets);
	const bets = useBet((state) => state.bets);
	const isEmpty = useBet((state) => state.isEmpty);

	const HandleChangePrediction = (typePrediction: string) => {
		const newBets = bets.map((bet, index) => (index === numberMatch ? { id: crypto.randomUUID(), prediction: typePrediction } : bet))
		setBets(newBets)
	}

	return (
		<div className={` grid grid-cols-[2.5em_1fr_2.5em_1fr_2.5em] items-center justify-center  w-full border-1 bg-(--gray-900) border-(--surface-d) rounded-sm hover:bg-(--surface-hover) gap-x-2 px-2 py-2 ${isEmpty && bets[numberMatch].prediction === "" && styles.predictionsEmpty}`}>
			<div className="flex items-center justify-center relative bg-(--surface-b) w-10 h-10 border-1 border-(--surface-d) rounded-sm hover:bg-(--cyan-900)">
				<input
					className="w-10 h-10 opacity-0 z-2 cursor-pointer"
					checked={bets?.[numberMatch]?.prediction === "L"}
					name={`bet${matchData.startDate}`}
					onChange={() => HandleChangePrediction("L")}
					type="checkbox"
				/>
				{bets[numberMatch].prediction === "L" && <span className={`${styles.prediction_Letter}`}>L</span>}
			</div>
			<div className="flex flex-col items-center gap-y-1 w-full justify-center">
				{React.cloneElement(TeamsLogos[Number(matchData.homeTeam)].logo, { className: "h-9 w-9" })}
				<span className="text-sm uppercase font-bold text-center">{TeamsLogos[Number(matchData.homeTeam)].abbName}</span>
			</div>
			<div className="flex items-center justify-center relative bg-(--surface-b) w-10 h-10 border-1 border-(--surface-d) rounded-sm hover:bg-(--cyan-900)">
				<input
					className="w-10 h-10 opacity-0 z-2 cursor-pointer"
					checked={bets[numberMatch].prediction === "E"}
					name={`bet${matchData.startDate}`}
					onChange={() => HandleChangePrediction("E")}
					type="checkbox"
				/>
				{bets[numberMatch].prediction === "E" && <span className={`${styles.prediction_Letter}`}>E</span>}
			</div>
			<div className="flex flex-col items-center gap-y-1 w-full justify-center">
				{React.cloneElement(TeamsLogos[Number(matchData.awayTeam)].logo, { className: "h-9 w-9" })}
				<span className="text-sm uppercase font-bold text-center">{TeamsLogos[Number(matchData.awayTeam)].abbName}</span>
			</div>
			<div className="flex items-center justify-center relative bg-(--surface-b) w-10 h-10 border-1 border-(--surface-d) rounded-sm hover:bg-(--cyan-900)">
				<input
					className="w-10 h-10 opacity-0 z-2 cursor-pointer"
					checked={bets[numberMatch].prediction === "V"}
					name={`bet${matchData.startDate}`}
					onChange={() => HandleChangePrediction("V")}
					type="checkbox"
				/>
				{bets[numberMatch].prediction === "V" && <span className={`${styles.prediction_Letter}`}>V</span>}
			</div>
		</div>
	)
}
