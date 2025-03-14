/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { NotificationIcon } from "@/svg"
import styles from "@/components/styles.module.scss"
import { useRef, MouseEvent, useState } from "react"
import { SnackbarProvider } from "notistack"
import { MenuPages } from "./MenuPages"
import { useMenu } from "@/config/zustand-store"
import { useSession } from "next-auth/react"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { Skeleton } from "primereact/skeleton"
import { UserSession } from "@/types/types"
import Image from "next/image"
import useFcmToken from "@/hooks/useFcmToken"
import { Toast } from "primereact/toast"
import { OverlayPanel } from "primereact/overlaypanel"
import { Dialog } from "primereact/dialog"
import { Divider } from "primereact/divider"

export default function Header() {
	const session = useSession()
	const { openMenu, setOpenMenu } = useMenu()
	const { notificationPermissionStatus } = useFcmToken()
	const [openDialog, setOpenDialog] = useState(false)


	const HandleViewMenu = () => {
		const prev = !openMenu
		setOpenMenu(prev)
	}

	const handleActiveNotifications = () => {
		setOpenDialog(true)
	}


	return (
		<>
			<SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }} />
			<header className="flex fixed w-full border-b-1 border-b-(--surface-d) z-5 h-[2.65em] bg-(--surface-b) justify-between ">
				<Button
					label="Menu" icon="pi pi-bars"
					text severity="info" size="large"
					onClick={HandleViewMenu}>
				</Button>
				<div className="flex flex-row gap-2">
					{notificationPermissionStatus === "default" || notificationPermissionStatus === "denied" &&
						<>
							<Button className="relative" onClick={handleActiveNotifications} size="small" text severity="info">
								<NotificationIcon className={styles.notifications_icon} />
								<span className="absolute bottom-1.5 right-3 w-2.5 h-2.5 bg-red-600 rounded-xl"></span>
								<span className="absolute bottom-1.25 right-2.75 w-3 h-3 bg-red-600 rounded-xl animate-ping"></span>
							</Button>
						</>
					}
					{session.status && <div className="flex flex-row items-center justify-between gap-2 h-full pr-2 pl-2 w-max border-l-1 border-r-1 border-l-(--surface-d)  border-r-(--surface-d)">
						{/*session.status === "authenticated" && <Avatar image={(session.data?.user as UserSession).image} shape="circle" size="normal" />*/}
						{session.status === "authenticated" && <Image className="border-2 border-(--primary-color) rounded-md max-h-7 w-7" src={(session.data?.user as UserSession).image} alt="circle" width={25} height={25} />}
						{session.status === "unauthenticated" && <Avatar image={"/user-icon.png"} shape="circle" size="normal" />}
						{session.status === "loading" && <Skeleton height="24px" width="24px" />}
						<div className="flex flex-col">
							{session.status === "authenticated" && <span className="text-xs font-medium">{session.data?.user?.name && `${session.data?.user?.name?.split(" ")[0]} ${session.data?.user?.name?.split(" ")[1] || ""}` || "Invitado"}</span>}
							{session.status === "unauthenticated" && <span className="text-xs font-medium">{"Invitado"}</span>}
							{session.status === "loading" && <Skeleton height="20px" width="4em" />}
						</div>
					</div>}
				</div>
			</header>
			<MenuPages />
			<Dialog onHide={() => setOpenDialog(false)} visible={openDialog}>
				<div className="flex flex-col items-center">
					<header className="flex justify-end w-full mb-2.5">
						<h2 className="text-(--primary-color) w-full text-center font-semibold">¡No te pierdas ni una quiniela!</h2>
						<Button icon="pi pi-times" severity="danger" size="small" onClick={() => setOpenDialog(false)} />
					</header>
					<article className="flex flex-col items-center bg-(--surface-c) py-2 px-2 rounded-sm">
						<p className="text-balance text-center max-w-88 text-sm">Activa las notificaciones y recibe alertas instantáneas sobre las próximas quinielas y resultados.</p>
						<p className="text-balance text-center max-w-88 text-sm">¿No sabes cómo activar las notificaciones?</p>
						<p className="text-balance text-center max-w-88 text-sm">¡Mira este video!</p>
					</article>
					<Divider />
					<video
						className="h-[60svh] w-88 max-w-[90svw] bg-(--surface-c)"
						src="https://github.com/AletzMan/ImagesStorage/raw/refs/heads/main/bettinggame/notification_active.mp4"
						controls autoPlay={false}
					></video>
				</div>
			</Dialog>
		</>
	)
}
