import { ReactNode } from "react"
import styles from "./match.module.scss"

interface props {
	children: ReactNode
}

export function Field(props: props) {
	const { children } = props
	return (
		<div className={styles.lineups_field}>
			<div className={styles.lineups_fieldChildren}>{children}</div>
			<div className={`${styles.lineups_fieldCircle} ${styles.lineups_fieldCircleTwo}`}></div>
			<div className={styles.lineups_fieldFirst}>
				<div className={styles.lineups_fieldFirstAreaLarge}>
					<div className={styles.lineups_fieldFirstAreaSmall}></div>
				</div>
			</div>
			<div className={styles.lineups_fieldSecond}>
				<div className={styles.lineups_fieldFirstAreaLarge}>
					<div className={styles.lineups_fieldFirstAreaSmall}></div>
				</div>
			</div>
			<div className={`${styles.lineups_fieldCircle} ${styles.lineups_fieldCircleOne}`}></div>
			<div className={`${styles.lineups_fieldCircle}`}></div>
			{/*<div className={`${styles.lineups_fieldCircle} ${styles.lineups_fieldCircleCornerOne}`}></div>
			<div className={`${styles.lineups_fieldCircle} ${styles.lineups_fieldCircleCornerTwo}`}></div>
			<div className={`${styles.lineups_fieldCircle} ${styles.lineups_fieldCircleCornerThree}`}></div>
	<div className={`${styles.lineups_fieldCircle} ${styles.lineups_fieldCircleCornerFour}`}></div>*/}
		</div>
	)
}
