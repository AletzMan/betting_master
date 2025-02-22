
"use client"
import styles from "./profile.module.scss"
import { AdminPanel } from "./AdminPanel/AdminPanel"
import { SettingsProfile } from "./Settings/SettingsProfile"
import { BetsByUser } from "./BetsByUser/BetsByUser"
import AdminFinals from "./AdminFinals/AdminFinals"
import { AppConfig } from "./AppConfig/AppConfig"
import { AdminNotifications } from "./AdminNotifications/AdminNotifications"
import { useUser } from "../config/zustand-store"

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID

export default function ProfilePage() {
	const { user } = useUser()

	return (
		<main className={`sectionContainer scrollbar`}>
			<section className="flex flex-col gap-2 w-full max-w-125 p-2 border-1 border-(--surface-d) rounded-b-md bg-(--surface-e)">
				{<SettingsProfile />}
				{user.uid === ADMIN_UID && <AppConfig />}
				{user.uid === ADMIN_UID && <AdminPanel />}
				{user.uid === ADMIN_UID && <AdminNotifications />}
				{user.uid === ADMIN_UID && <BetsByUser />}
				{user.uid === ADMIN_UID && <AdminFinals />}
			</section>
		</main>
	)
}
