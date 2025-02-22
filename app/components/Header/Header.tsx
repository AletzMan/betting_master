/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { MenuIcon, NotificationIcon } from "@/app/svg"
import styles from "./header.module.scss"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useOrientation } from "@/app/hooks/useOrientation"
import { useLoggedUser } from "@/app/hooks/useLoggedUser"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { MenuPages } from "../MenuPages/MenuPages"
import { useMenu } from "@/app/config/zustand-store"
import { CreateNotification, UpdateNotificationUser } from "@/app/config/firebase"
import { useSession } from "next-auth/react"

export default function Header() {

	const pathname = usePathname()
	const session = useSession()
	const { isLandscape } = useOrientation()
	const { openMenu, setOpenMenu } = useMenu()
	const [notifications, setNotifications] = useState(false)

	useEffect(() => {
		const color = localStorage.getItem("colorBettingGame")
		if (color) {
			document.documentElement.style.setProperty("--primaryColor", color)
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
	console.log(session)

	return (
		<>
			<SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }} />
			<header className={`${styles.header} ${isLandscape && styles.header_active}`}>
				<section className={styles.header_section}>
					<div className={styles.header_session}>
						<button
							className={`${styles.header_menu} ${openMenu && styles.header_menuActive}`}
							onClick={HandleViewMenu}>
							<MenuIcon className={styles.header_menuIcon} />
							<span className={styles.header_menuName}>Menu</span>
						</button>
						<div className={styles.header_buttons}>
							{!notifications &&
								<button className={styles.notifications} onClick={HandleActiveNotifications}>
									<NotificationIcon className={styles.notifications_icon} />
									<span className={styles.notifications_dot}></span>
								</button>
							}
							<div className={styles.user}>
								<picture className={styles.user_picture}>
									<img
										className={styles.user_image}
										src={session.data?.user?.image || "/user-icon.png"}
										alt="Imagen de perfil"
										loading="lazy"
										width={50}
										height={50}
									/>
								</picture>
								<div className={styles.user_info}>
									<span className={styles.user_name}>{session.data?.user?.name && `${session.data?.user?.name?.split(" ")[0]} ${session.data?.user?.name?.split(" ")[1] || ""}` || "Invitado"}</span>
								</div>
							</div>
						</div>

					</div>
				</section>
			</header>
			<MenuPages />
		</>
	)
}
