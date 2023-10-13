"use client"
import { AppLogo, ExitLogo, LiveIcon, ProfileIcon } from "@/app/svg"
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

export function Header() {
	const { user, setUser } = useUser()
	const [userLocal, setUserLocal] = useState<IUserInfo>({ uid: "", name: "", photo: "" })
	const [viewMenuProfile, setViewMenuProfile] = useState(false)

	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		const LoggedUser = async () => {
			const response = await IsLoggedUser()
			setIsLogged(response.isLogged)
			setUser(response.userInfo)

			return response
		}
		LoggedUser()
	}, [])

	useEffect(() => {
		setUserLocal(user)
		if (user.name !== "") {
			setIsLogged(true)
		}
	}, [user])

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
				//router.push("/login")
				setUser({ uid: "", name: "", photo: "" })
				setIsLogged(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<header className={styles.header}>
			<section className={styles.header_section}>
				<Link href={"/"} title="Ir a inicio">
					<AppLogo className={styles.header_logo} />
				</Link>
				<div className={styles.header_session}>
					<Link href={`/lives`} className={styles.header_live} title="Ir a partidos en vivo">
						<LiveIcon className={styles.header_liveIcon} />
						<span className={styles.header_liveText}>Partidos en vivo</span>
					</Link>
					<button className={styles.header_user} onClick={HandleViewMenu} onMouseLeave={() => setViewMenuProfile(false)}>
						<picture className={styles.header_picture}>
							<Image className={styles.header_image} src={userLocal?.photo || "/user-icon.png"} alt="Imagen de perfil" width={50} height={50} />
						</picture>
						<span className={styles.header_name}>{userLocal.name || "Invitado"}</span>
					</button>
					<nav
						className={`${styles.profile} ${viewMenuProfile && styles.profile_active}`}
						onMouseOver={() => setViewMenuProfile(true)}
						onMouseLeave={() => setViewMenuProfile(false)}
					>
						<Link href={`/profile`} className={styles.profile_link} title="Ir a sesión de perfil">
							<ProfileIcon className={styles.profile_icon} />
							Perfil
						</Link>
						{!isLogged && (
							<Link href={!isLogged ? "auth/login" : "/logout"} className={styles.profile_link} title={"Ir a sección iniciar sesión"}>
								<ExitLogo className={styles.profile_icon} />
								{"Iniciar sesión"}
							</Link>
						)}
						{isLogged && (
							<button onClick={HandleSignOut} className={styles.profile_link} title={"Cerrar sesión"}>
								<ExitLogo className={styles.profile_icon} />
								{"Cerrar sesión"}
							</button>
						)}
					</nav>
				</div>
				<nav className={styles.nav}>
					{LinksPage.map((link) => (
						<Link className={`${styles.nav_link} ${link.id === 0 && styles.nav_linkActive}`} key={link.id} href={link.href} title={link.title}>
							{link.text}
						</Link>
					))}
				</nav>
			</section>
		</header>
	)
}
