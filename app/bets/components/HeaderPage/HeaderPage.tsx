import { Dispatch, SetStateAction } from "react"
import styles from "./headerpage.module.scss"
import { StarIcon, WinnerIcon } from "@/app/svg"

interface Props {
	isInTime: boolean
	setOpenDialog: Dispatch<SetStateAction<boolean>>
	timeFirstMatch: string
}

export function HeaderPage({ isInTime, setOpenDialog, timeFirstMatch }: Props) {

	return (
		<header className={styles.header}>
			{isInTime &&
				<button className={`${styles.headerButton}  `} onClick={() => setOpenDialog(true)}>
					Crear quiniela
				</button>}
			{!isInTime && <p className={styles.headerTime}>Tiempo agotado para enviar</p>}
			{isInTime &&
				<p className={styles.headerTimeRemainig}>
					<span>{!timeFirstMatch.includes("-") ? "Se cierra en" : ""}</span>
					{!timeFirstMatch.includes("-") && <span className={styles.headerTimeRemainigClock}>{` ${(timeFirstMatch)}`}</span>}
					{timeFirstMatch.includes("-") && <span className={styles.headerTimeRemainigClock}>{`Esta por comenzar`}</span>}
				</p>
			}
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
