import { Rank } from "@/app/types/types"
import styles from "./teamdescription.module.scss"
import Image from "next/image"

interface PropsTeam {
	team: Rank
	position: number
}

export function TeamDescription(props: PropsTeam) {
	const { team, position } = props
	return (
		<article className={styles.team}>
			<div
				className={`${styles.description} ${position < 5 && styles.description_qualifiers} ${position > 4 && position < 13 && styles.description_playoff}`}
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
