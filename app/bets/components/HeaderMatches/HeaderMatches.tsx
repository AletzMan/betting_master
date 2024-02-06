import { FinishedIcon, UnstartedIcon } from "@/app/svg"
import styles from "./headermatches.module.scss"
import { ICurrentMatch } from "@/app/types/types"
import { TeamsLogos } from "@/app/constants/constants"

interface PropsHeaderMatches {
	match: ICurrentMatch
	index: number
}

export function HeaderMatches(props: PropsHeaderMatches) {
	const { match, index } = props

	return (
		<>
			{match &&
				<li
					className={`
			${styles.match} 
			${match.status === "Finalizado" && styles.matchEnd}  
			${match.status === "En juego" && styles.matchLive}
			${match.status === "Sin comenzar" && styles.matchUnstarted}`}
				>
					{TeamsLogos[match.teams.home].logo}
					<span className={`${styles.matchName} ${styles.matchNameHome}`}>{TeamsLogos[match.teams.home].abbName}</span>
					<span className={styles.matchVS}>VS</span>
					{TeamsLogos[match.teams.away].logo}
					<span className={`${styles.matchName} ${styles.matchNameAway}`}>{TeamsLogos[match.teams.away].abbName}</span>
					{match.status === "Finalizado" && <FinishedIcon className={styles.matchStatus} />}
					{match.status === "En juego" && <div className={`${styles.matchStatus} ${styles.matchStatusLive}`}></div>}
					{match.status === "Sin comenzar" && <UnstartedIcon className={styles.matchStatus} />}
				</li>
			}
		</>
	)
}
