import { Rank } from "@/types/StatisticsTypes"
import styles from "./playerstatistics.module.scss"
import { IOptions } from "@/types/types"

interface Props {
	player: Rank
	options: IOptions
}

export function PlayerStatistics(props: Props) {
	const { player, options } = props

	return (
		<div className={styles.player}>
			<span className={`${styles.player_position} ${styles.player_text}`}>{player[options.rank]}</span>
			<span className={`${styles.player_name}  ${styles.player_text}`}>{player.knownName}</span>
			<span className={`${styles.player_name}  ${styles.player_text}`}>{player.teamName}</span>
			<span className={`${styles.player_goals}  ${styles.player_text}`}>{player[options.statistic]}</span>
			<span className={`${styles.player_games}  ${styles.player_text}`}>
				{options.totals === "passes" ? player[options.totals] - (player[options.statistic] || 0) : player[options.totals]}
			</span>
			<span className={`${styles.player_average}  ${styles.player_text}`}>{player[options.average]}</span>
		</div>
	)
}
