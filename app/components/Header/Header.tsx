"use client"
import { AppLogo, ExitLogo, LiveIcon, LogInIcon, LogOutIcon, MenuIcon, ProfileIcon } from "@/app/svg"
import styles from "./header.module.scss"
import Image from "next/image"
import { useUser } from "@/app/config/zustand-store"
import { useEffect, useState } from "react"
import { IUserInfo } from "@/app/types/types"
import Link from "next/link"
import { LinksPage } from "@/app/constants/constants"
import { signOut } from "firebase/auth"
import { auth } from "@/app/config/firebase"
import { IsLoggedUser } from "@/app/services/fetch_utils"
import { usePathname } from "next/navigation"
import { useOrientation } from "@/app/hooks/useOrientation"
import { useLoggedUser } from "@/app/hooks/useLoggedUser"

export function Header() {
	const pathname = usePathname()
	const { isLogged, setIsLogged, setUser, userLocal } = useLoggedUser()
	const { isLandscape } = useOrientation()
	const [viewMenuProfile, setViewMenuProfile] = useState(false)

	useEffect(() => {
		setViewMenuProfile(false)
	}, [pathname])

	const HandleViewMenu = () => {
		setViewMenuProfile((prev) => !prev)
	}

	const HandleSignOut = async () => {
		try {
			await signOut(auth)
			const response = await fetch("/api/logout", {
				method: "POST",
			})

			if (response.status === 200) {
				setUser({ uid: "", name: "", photo: "" })
				setIsLogged(false)
				setViewMenuProfile(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<header className={`${styles.header} ${isLandscape && styles.header_active}`}>
			<section className={styles.header_section}>
				<div className={styles.header_session}>
					<Link href={`/lives`} className={styles.header_live} title="Ir a partidos en vivo">
						<LiveIcon className={styles.header_liveIcon} />
						<span className={styles.header_liveText}>En vivo</span>
					</Link>
					<Link href={"/"} title="Ir a inicio">
						<AppLogo className={styles.header_logo} />
					</Link>
					<button
						className={`${styles.header_menu} ${viewMenuProfile && styles.header_menuActive}`}
						onClick={HandleViewMenu}
						onMouseLeave={() => setViewMenuProfile(false)}
					>
						<MenuIcon className={styles.header_menuIcon} />
						<span className={styles.header_menuName}>Menu</span>
					</button>
					<nav
						className={`${styles.profile} ${viewMenuProfile && styles.profile_active}`}
						onMouseOver={() => setViewMenuProfile(true)}
						onMouseLeave={() => setViewMenuProfile(false)}
					>
						<div className={styles.profile_user}>
							<picture className={styles.profile_userPicture}>
								<img
									className={styles.profile_userImage}
									src={userLocal?.photo || "/user-icon.png"}
									alt="Imagen de perfil"
									loading="lazy"
									width={50}
									height={50}
								/>
							</picture>
							<span className={styles.profile_userName}>{userLocal.name || "Invitado"}</span>
						</div>
						<Link
							href={`/profile`}
							className={`${styles.profile_link} ${pathname === "/profile" && styles.profile_linkActive}`}
							title="Ir a sesión de perfil"
						>
							<ProfileIcon className={styles.profile_icon} />
							Perfil
						</Link>
						{LinksPage.map((link) => (
							<Link
								className={`${styles.profile_link} ${link.pathname === pathname && styles.profile_linkActive}`}
								key={link.id}
								href={link.href}
								title={link.title}
							>
								{link.icon}
								{link.text}
							</Link>
						))}
						{!isLogged && (
							<Link href={!isLogged ? "auth/login" : "/logout"} className={styles.profile_link} title={"Ir a sección iniciar sesión"}>
								<LogInIcon className={styles.profile_icon} />
								{"Iniciar sesión"}
							</Link>
						)}
						{isLogged && (
							<button onClick={HandleSignOut} className={styles.profile_link} title={"Cerrar sesión"}>
								<LogOutIcon className={styles.profile_icon} />
								{"Cerrar sesión"}
							</button>
						)}
					</nav>
				</div>
				{!isLandscape && (
					<nav className={styles.nav}>
						{LinksPage.map((link) => (
							<Link
								className={`${styles.nav_link} ${link.pathname === pathname && styles.nav_linkActive}`}
								key={link.id}
								href={link.href}
								title={link.title}
							>
								{link.text}
							</Link>
						))}
					</nav>
				)}
			</section>
		</header>
	)
}
