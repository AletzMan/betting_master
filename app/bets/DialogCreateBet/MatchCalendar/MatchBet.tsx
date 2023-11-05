import Image from "next/image"
import styles from "./matchbet.module.scss"
import { StadiumIcon } from "@/app/svg"
import { Results } from "@/app/types/ResultsTypes"
import { FormattedCulbNames } from "@/app/functions/functions"
import { Dispatch, SetStateAction, useState } from "react"
import { useBet } from "@/app/config/zustand-store"
import { ICurrentMatch } from "@/app/types/types"
import { TeamsLogos } from "@/app/constants/constants"

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
		const newBets = bets.map((bet, index) => (index === numberMatch ? typePrediction : bet))
		setBets(newBets)
	}

	return (
		<section className={styles.match}>
			<div className={`${styles.match_header}`}>
				<div className={styles.match_team}>
					{TeamsLogos[matchData.teams.home].logo}
					<span className={styles.match_teamName}>{TeamsLogos[matchData.teams.home].abbName}</span>
				</div>
				<div className={`${styles.predictions} ${isEmpty && bets[numberMatch] === "" && styles.predictionsEmpty}`}>
					<div className={styles.predictions_prediction}>
						<input
							className={`${styles.predictions_predictionInput}`}
							checked={bets[numberMatch] === "G"}
							name={`bet${matchData.startDate}`}
							onChange={() => HandleChangePrediction("G")}
							type="checkbox"
						/>
						{bets[numberMatch] === "G" && <span className={`${styles.predictions_predictionLetter}`}>G</span>}
					</div>
					<div className={styles.predictions_prediction}>
						<input
							className={`${styles.predictions_predictionInput}`}
							checked={bets[numberMatch] === "E"}
							name={`bet${matchData.startDate}`}
							onChange={() => HandleChangePrediction("E")}
							type="checkbox"
						/>
						{bets[numberMatch] === "E" && <span className={`${styles.predictions_predictionLetter}`}>E</span>}
					</div>
					<div className={styles.predictions_prediction}>
						<input
							className={`${styles.predictions_predictionInput}`}
							checked={bets[numberMatch] === "P"}
							name={`bet${matchData.startDate}`}
							onChange={() => HandleChangePrediction("P")}
							type="checkbox"
						/>
						{bets[numberMatch] === "P" && <span className={`${styles.predictions_predictionLetter}`}>P</span>}
					</div>
				</div>
				<div className={`${styles.match_team} ${styles.match_teamAway}`}>
					{TeamsLogos[matchData.teams.away].logo}
					<span className={styles.match_teamName}>{TeamsLogos[matchData.teams.away].abbName}</span>
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
