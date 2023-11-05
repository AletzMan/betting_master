import { LoadingIcon } from "@/app/svg"
import styles from "./loading.module.scss"

export function Loading() {
	return (
		<div className={styles.loading}>
			<LoadingIcon className={styles.loading_icon} />
			<span className={styles.loading_text}>Cargando</span>
		</div>
	)
}
