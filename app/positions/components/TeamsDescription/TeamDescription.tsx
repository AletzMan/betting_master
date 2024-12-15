import { ITournament, Rank } from "@/app/types/types"
import styles from "./teamdescription.module.scss"
import Image from "next/image"

interface PropsTeam {
	team: Rank
	position: number
	selectedLeague: ITournament
}

const ClassifiedPositions = {
	"Liga MX": [6, 10],
	"Champions League": [8, 24],
	"Premier League": [4, 5],
	"La Liga": [4, 5],
	"Bundesliga": [4, 5],
	"Liga Holandesa": [2, 3],
	"Serie A": [4, 5],
	"League 1": [3, 4]
}

export function TeamDescription(props: PropsTeam) {
	const { team, position, selectedLeague } = props
	const isConference = selectedLeague.name !== "Liga MX" && selectedLeague.name !== "Premier League" && selectedLeague.name !== "Champions League"
	return (
		<article className={styles.team}>
			<div
				className={`${styles.description} 
				${position <= ClassifiedPositions[selectedLeague.name][0] && styles.description_qualifiers} 
				${position > ClassifiedPositions[selectedLeague.name][0] && position <= ClassifiedPositions[selectedLeague.name][1] && styles.description_playoff}
				${isConference && (position === ClassifiedPositions[selectedLeague.name][1] + 1) && styles.description_conference}
				${(selectedLeague.name === "League 1" && position === 6) && styles.description_leagueone}`}
			>
				<p className={styles.description_position}>{position}</p>
				<Image
					className={styles.description_logo}
					src={team.images.urlLogo[0]}
					alt={`Imagen del logo del equipo ${team.fullName}`}
					width={50}
					height={50}
					loading="lazy"
				/>
				<p className={styles.description_name}>{team.name}</p>
			</div>
		</article>
	)
}
