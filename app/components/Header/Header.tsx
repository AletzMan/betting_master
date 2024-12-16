/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { MenuIcon, NotificationIcon } from "@/app/svg"
import styles from "./header.module.scss"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useOrientation } from "@/app/hooks/useOrientation"
import { useLoggedUser } from "@/app/hooks/useLoggedUser"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { MenuPages } from "../MenuPages/MenuPages"
import { useMenu } from "@/app/config/zustand-store"

export function Header() {

	const pathname = usePathname()
	const { userLocal } = useLoggedUser()
	const { isLandscape } = useOrientation()
	const { openMenu, setOpenMenu } = useMenu()

	useEffect(() => {
		const color = localStorage.getItem("colorBettingGame")
		if (color) {
			document.documentElement.style.setProperty("--primaryColor", color)
			document.documentElement.style.setProperty("--primaryOpacityColor", `${color}55`)
		}
		setOpenMenu(false)
	}, [pathname])


	const HandleViewMenu = () => {
		const prev = !openMenu
		setOpenMenu(prev)
	}


	const HandleActiveNotifications = () => {
		const response = confirm("¡Activa las notificaciones y entérate cuando haya una nueva quiniela disponible!")
		if (response) {
			enqueueSnackbar("¡Notificaciones activadas con éxito!", { variant: "success" })
		}
	}

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
							<button className={styles.notifications} onClick={HandleActiveNotifications}>
								<NotificationIcon className={styles.notifications_icon} />
								<span className={styles.notifications_dot}></span>
							</button>
							<div className={styles.user}>
								<picture className={styles.user_picture}>
									<img
										className={styles.user_image}
										src={userLocal?.photo || "/user-icon.png"}
										alt="Imagen de perfil"
										loading="lazy"
										width={50}
										height={50}
									/>
								</picture>
								<div className={styles.user_info}>
									<span className={styles.user_name}>{userLocal.name && `${userLocal.name?.split(" ")[0]} ${userLocal.name?.split(" ")[1] || ""}` || "Invitado"}</span>
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
