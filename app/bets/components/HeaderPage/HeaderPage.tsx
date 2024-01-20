import { Dispatch, SetStateAction } from "react"
import styles from "./headerpage.module.scss"
import { StarIcon, WinnerIcon } from "@/app/svg"

interface Props {
	isInTime: {
		time: string
		available: boolean
	}
	setOpenDialog: Dispatch<SetStateAction<boolean>>
}

export function HeaderPage(props: Props) {
	const { setOpenDialog, isInTime } = props

	return (
		<header className={styles.header}>
			{/*<button className={`${styles.headerButton}  `} onClick={() => setOpenDialog(true)}>
					Crear quiniela
	</button>*/}
			{<p className={styles.headerTime}>Tiempo agotado para enviar</p>}
			{/*
				<p className={styles.headerTimeRemainig}>
					Se cierra en <span className={styles.headerTimeRemainigClock}>{isInTime.time}</span>
				</p>
*/}
			<div className={styles.headerOptions}>
				<div className={styles.headerOptionsOption}>
					<WinnerIcon className={`${styles.headerOptionsIcon} ${styles.headerOptionsIconWin}`} />
					<span className={`${styles.headerOptionsText} ${styles.headerOptionsTextWin}`}>Ganador</span>
				</div>
				<div className={styles.headerOptionsOption}>
					<StarIcon className={styles.headerOptionsIcon} />
					<span className={styles.headerOptionsText}>Tus quinielas</span>
				</div>
			</div>
		</header>
	)
}
