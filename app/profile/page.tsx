
import styles from "./profile.module.scss"
import { AdminPanel } from "./AdminPanel/AdminPanel"
import { SettingsProfile } from "./Settings/SettingsProfile"
import { BetsByUser } from "./BetsByUser/BetsByUser"
import AdminFinals from "./AdminFinals/AdminFinals"
import { AppConfig } from "./AppConfig/AppConfig"
import { AdminNotifications } from "./AdminNotifications/AdminNotifications"
import { GetCurrentMatchDay, GetInfoUser } from "../config/firebase"

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID

export default async function ProfilePage() {

	return (
		<main className={`${styles.main}   scrollbar`}>
			<section className={styles.section}>
				{<SettingsProfile />}
				{loading && user.uid === ADMIN_UID && <AppConfig />}
				{loading && user.uid === ADMIN_UID && <AdminPanel />}
				{loading && user.uid === ADMIN_UID && <AdminNotifications />}
				{loading && user.uid === ADMIN_UID && <BetsByUser />}
				{loading && user.uid === ADMIN_UID && <AdminFinals />}
			</section>
		</main>
	)
}
