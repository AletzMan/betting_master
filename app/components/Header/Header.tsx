import { AppLogo } from "@/app/svg"
import styles from "./header.module.scss"

export function Header() {
	return (
		<header className={styles.header}>
			<AppLogo className="" />
		</header>
	)
}
