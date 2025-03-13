
"use client"
import { AdminPanel } from "@/profile/AdminPanel"
import { SettingsProfile } from "@/profile/SettingsProfile"
import { PaymentsAndBets } from "@/profile//PaymentsAndBets"
import AdminFinals from "@/profile/AdminFinals"
import { AdminNotifications } from "@/profile//AdminNotifications/AdminNotifications"
import { TabPanel, TabView } from "primereact/tabview"
import { useSession } from "next-auth/react"

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID

export default function ProfilePage() {
	const session = useSession()

	return (
		<main className={`sectionContainer scrollbar `}>
			<TabView className="w-full h-full" scrollable>
				<TabPanel header="Perfil" leftIcon="pi pi-user mr-2">
					<SettingsProfile />
				</TabPanel>
				{session.data?.user?.id === ADMIN_UID && <TabPanel header="Quiniela" leftIcon="pi pi-cog  mr-2">
					<AdminPanel />
				</TabPanel>}
				{/*session.data?.user?.id === ADMIN_UID && <TabPanel header="Ajustes" leftIcon="pi pi-cog  mr-2">
					<AppConfig />
	</TabPanel>*/}
				{session.data?.user?.id === ADMIN_UID && <TabPanel header="Notificaciones" leftIcon="pi pi-bell  mr-2">
					<AdminNotifications />
				</TabPanel>}
				{session.data?.user?.id === ADMIN_UID && <TabPanel header="Pagos" leftIcon="pi pi-dollar  mr-2">
					<PaymentsAndBets />
				</TabPanel>}
				{session.data?.user?.id === ADMIN_UID && <TabPanel header="Sorteo" leftIcon="pi pi-gift  mr-2">
					<AdminFinals />
				</TabPanel>}
			</TabView>
		</main>
	)
}
