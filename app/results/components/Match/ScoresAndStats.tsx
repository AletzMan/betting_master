"use client"
import { RedCardIcon, SoccerBallIcon } from "@/svg"

import styles from "./match.module.scss"
import { DetailsData } from "@/types/DetailsMatch"
import { DefineTypeGoal } from "@/functions/functions"

interface PropsScores {
	details: DetailsData
}

export function ScoresAndStats(props: PropsScores) {
	const { details } = props
	return (
		<div className={styles.goalsAndCards}>
			<div className={`${styles.goalsAndCards_team} ${styles.goalsAndCards_teamHome}`}>
				{details?.event?.scoreDetails?.goals?.homeTeam?.map((goal) => (
					<div key={goal._id} className={styles.goalsAndCards_goal}>
						<SoccerBallIcon className={`${styles.goalsAndCards_goalIcon}`} />
						<span className={`${styles.goalsAndCards_goalMinute}`}>{`${goal.matchTime}'`}</span>
						<span className={`${styles.goalsAndCards_goalPlayer}`}>{`${goal.playerCommonName} ${DefineTypeGoal(goal.type.typeName)}`}</span>
					</div>
				))}
				{details?.event?.statsDetails?.discipline?.homeTeam?.redCards.map((goal) => (
					<div key={goal._id} className={styles.goalsAndCards_card}>
						<RedCardIcon className={`${styles.goalsAndCards_cardIcon}`} />
						<span className={`${styles.goalsAndCards_cardMinute}`}>{`${goal.matchTime}'`}</span>
						<span className={`${styles.goalsAndCards_cardPlayer}`}>{goal.playerCommonName}</span>
					</div>
				))}
			</div>
			<div className={`${styles.goalsAndCards_team} ${styles.goalsAndCards_teamAway}`}>
				{details?.event?.scoreDetails?.goals?.awayTeam?.map((goal) => (
					<div key={goal._id} className={styles.goalsAndCards_goal}>
						<SoccerBallIcon className={`${styles.goalsAndCards_goalIcon}`} />
						<span className={`${styles.goalsAndCards_goalMinute}`}>{`${goal.matchTime}'`}</span>
						<span className={`${styles.goalsAndCards_goalPlayer}`}>{`${goal.playerCommonName} ${DefineTypeGoal(goal.type.typeName)}`}</span>
					</div>
				))}
				{details?.event?.statsDetails?.discipline?.awayTeam?.redCards.map((goal) => (
					<div key={goal._id} className={styles.goalsAndCards_card}>
						<RedCardIcon className={`${styles.goalsAndCards_cardIcon}`} />
						<span className={`${styles.goalsAndCards_cardMinute}`}>{`${goal.matchTime}'`}</span>
						<span className={`${styles.goalsAndCards_cardPlayer}`}>{goal.playerCommonName}</span>
					</div>
				))}
			</div>
		</div>
	)
}
