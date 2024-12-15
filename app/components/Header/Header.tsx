/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { MenuIcon } from "@/app/svg"
import styles from "./header.module.scss"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useOrientation } from "@/app/hooks/useOrientation"
import { useLoggedUser } from "@/app/hooks/useLoggedUser"
import { SnackbarProvider } from "notistack"
import { MenuPages } from "../MenuPages/MenuPages"
import { useMenu } from "@/app/config/zustand-store"
import { LinksPage } from "@/app/constants/constants"

export function Header() {

	const pathname = usePathname()
	const { isLogged, setIsLogged, setUser, userLocal } = useLoggedUser()
	const { isLandscape } = useOrientation()
	const { openMenu, setOpenMenu } = useMenu()

	useEffect(() => {
		setOpenMenu(false)
	}, [pathname])


	const HandleViewMenu = () => {
		const prev = !openMenu
		setOpenMenu(prev)
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
				</section>
			</header>
			<MenuPages />
		</>
	)
}
