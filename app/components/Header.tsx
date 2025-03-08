/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { NotificationIcon } from "@/svg"
import styles from "@/components/styles.module.scss"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { SnackbarProvider } from "notistack"
import { MenuPages } from "./MenuPages"
import { useMenu } from "@/config/zustand-store"
import { useSession } from "next-auth/react"
import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { Skeleton } from "primereact/skeleton"
import { UserSession } from "@/types/types"
import Image from "next/image"

export default function Header() {

	const pathname = usePathname()
	const session = useSession()
	const { openMenu, setOpenMenu } = useMenu()
	const [notifications, setNotifications] = useState(false)

	useEffect(() => {
		const color = localStorage.getItem("colorBettingGame")
		if (color) {
			document.documentElement.style.setProperty("--primary-color", color)
			document.documentElement.style.setProperty("--primaryOpacityColor", `${color}55`)
		}
		const notifi = localStorage.getItem("bettingNotifications")
		if (notifi) {
			setNotifications(notifi === "true")
		}
		setOpenMenu(false)
	}, [pathname])


	const HandleViewMenu = () => {
		const prev = !openMenu
		setOpenMenu(prev)
	}


	const HandleActiveNotifications = async () => {
		const response = confirm("¡Activa las notificaciones y entérate cuando haya una nueva quiniela disponible!")
		if (response) {
			/*const response = await CreateNotification(userLocal.uid, { ...userLocal, notifications: true, account: "", last_login: new Date().toISOString(), finals_won: 0, total_bets: 0, bets_won: 0 })
			if (response === "OK") {
				localStorage.setItem("bettingNotifications", `${true}`)
				setNotifications(true)
				enqueueSnackbar("¡Notificaciones activadas con éxito!", { variant: "success" })
			} else {
				enqueueSnackbar("Error al activar las notificaciones. Por favor, inténtalo de nuevo.", { variant: "error" });
			}*/
		}
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
					{!notifications &&
						<button className={styles.notifications} onClick={HandleActiveNotifications}>
							<NotificationIcon className={styles.notifications_icon} />
							<span className="absolute bottom-1.5 right-1.25 w-2.5 h-2.5 bg-red-600 rounded-xl"></span>
						</button>
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
		</>
	)
}
