import { Rank } from "@/app/types/types"
import styles from "./teamstatistics.module.scss"

interface PropsTeam {
	team: Rank
	position: number
}

export function TeamStatistics(props: PropsTeam) {
	const { team, position } = props
	const differenceGoals = parseInt(team.standing.for) - parseInt(team.standing.against)
	return (
		<article className={styles.team}>
			<div className={styles.statistics}>
				<span className={styles.statistics_games}>{team.standing.played}</span>
				<span className={styles.statistics_win}>{team.standing.won}</span>
				<span className={styles.statistics_drawn}>{team.standing.drawn}</span>
				<span className={styles.statistics_lost}>{team.standing.lost}</span>
				<span className={styles.statistics_for}>{team.standing.for}</span>
				<span className={styles.statistics_against}>{team.standing.against}</span>
				<span
					className={`${styles.statistics_difference} ${differenceGoals < 0 && styles.statistics_differenceNeg} ${
						differenceGoals > 0 && styles.statistics_differencePos
					}`}
				>
					{differenceGoals}
				</span>
				<span className={styles.statistics_points}>{team.standing.points}</span>
			</div>
		</article>
	)
}
