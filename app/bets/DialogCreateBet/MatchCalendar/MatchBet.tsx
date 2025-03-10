import Image from "next/image"
import styles from "./matchbet.module.scss"
import { StadiumIcon } from "@/svg"
import { Results } from "@/types/ResultsTypes"
import { FormattedCulbNames } from "@/functions/functions"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useBet } from "@/config/zustand-store"
import { ICurrentMatch } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"

const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" }

interface PropsMatch {
	matchData: ICurrentMatch
	numberMatch: number
}

export function MatchBet(props: PropsMatch) {
	const { matchData, numberMatch } = props
	const { setBets, bets, isEmpty } = useBet()


	const Status = matchData.status
	const StatusMatch =
		Status === "Sin comenzar" ? styles.match_statusNotStarted : Status === "Finalizado" ? styles.match_statusEnded : styles.match_statusStarted

	const HandleChangePrediction = (typePrediction: string) => {
		const newBets = bets.map((bet, index) => (index === numberMatch ? { id: crypto.randomUUID(), prediction: typePrediction } : bet))
		setBets(newBets)
	}

	return (
		<section className={styles.match}>
			<div className={`${styles.match_header} ${isEmpty && bets[numberMatch].prediction === "" && styles.predictionsEmpty}`}>
				<div className={styles.predictions_prediction}>
					<input
						className={`${styles.predictions_predictionInput}`}
						checked={bets?.[numberMatch]?.prediction === "L"}
						name={`bet${matchData.startDate}`}
						onChange={() => HandleChangePrediction("L")}
						type="checkbox"
					/>
					{bets[numberMatch].prediction === "L" && <span className={`${styles.predictions_predictionLetter}`}>L</span>}
				</div>
				<div className={styles.match_team}>
					{TeamsLogos[matchData.teams.home].logo}
					<span className={styles.match_teamName}>{TeamsLogos[matchData.teams.home].abbName}</span>
				</div>
				<div className={styles.predictions_prediction}>
					<input
						className={`${styles.predictions_predictionInput}`}
						checked={bets[numberMatch].prediction === "E"}
						name={`bet${matchData.startDate}`}
						onChange={() => HandleChangePrediction("E")}
						type="checkbox"
					/>
					{bets[numberMatch].prediction === "E" && <span className={`${styles.predictions_predictionLetter}`}>E</span>}
				</div>


				<div className={`${styles.match_team} ${styles.match_teamAway}`}>
					{TeamsLogos[matchData.teams.away].logo}
					<span className={styles.match_teamName}>{TeamsLogos[matchData.teams.away].abbName}</span>
				</div>
				<div className={styles.predictions_prediction}>
					<input
						className={`${styles.predictions_predictionInput}`}
						checked={bets[numberMatch].prediction === "V"}
						name={`bet${matchData.startDate}`}
						onChange={() => HandleChangePrediction("V")}
						type="checkbox"
					/>
					{bets[numberMatch].prediction === "V" && <span className={`${styles.predictions_predictionLetter}`}>V</span>}
				</div>
			</div>
			{/*<span className={`${styles.match_status} ${StatusMatch}`}>{sportEvent.status.alternateNames.esES}</span>
			{/*<div className={styles.match_stadium}>
				<StadiumIcon className={styles.match_stadiumIcon} />
				{sportEvent.location.name.replace("Estadio ", "").replace("Stadium", "")}
			</div>
			{/*<div className={styles.match_hour}>{new Date(matchData.startDate).toLocaleTimeString("es-MX", options)}</div>*/}
		</section>
	)
}
