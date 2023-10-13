"use client"

import { GoogleAuthProvider, User, reload, signInWithPopup, signOut } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { auth, GoogleProvider } from "@/app/config/firebase"
import styles from "./signin.module.scss"
import { useRouter } from "next/navigation"
import { useUser } from "@/app/config/zustand-store"
import { useEffect, useState } from "react"
import { IsLoggedUser } from "@/app/services/fetch_utils"
import { push } from "firebase/database"
import Link from "next/link"
import { AppLogo, CheckIcon, ExitLogo, GoogleLogo, StatsIcon } from "@/app/svg"
import { TeamsSlides } from "../TeamsSlides/TeamsSlides"
import { TeamsLogos } from "@/app/constants/constants"

export function SignIn() {
	const { user, setUser } = useUser()
	/*const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		const LoggedUser = async () => {
			const response = await IsLoggedUser()
			setIsLogged(response.isLogged)
			setUser(response.userInfo)

			return response
		}
		LoggedUser()
	}, [])
*/
	return (
		<article className={styles.signIn}>
			<AppLogo className={styles.signIn_logo} />
			<h3 className={styles.signIn_title}>{"Bienvenido a Betting Master"}</h3>
			<p className={styles.signIn_paragraph}>Donde las emocionantes apuestas de fútbol se vuelven realidad.</p>
			<p className={styles.signIn_paragraph}>¡Apostemos juntos y demostremos quién es el verdadero maestro!</p>
			<section className={styles.signIn_section}>
				{/*isLogged && (
					<button className={styles.signIn_google} onClick={HandleSignInWithGoogle}>
						<GoogleLogo className={styles.signIn_googleIcon} />
						Iniciar Sesión con Google
					</button>
				)*/}
				{/*isLogged && (
					<>
						<Link href={`/stats`} className={styles.signIn_google} onClick={HandleSignOut}>
							<StatsIcon className={styles.signIn_googleIcon} />
							Ver estadísticas
						</Link>
						<Link href={`/bets`} className={styles.signIn_google} onClick={HandleSignOut}>
							<CheckIcon className={styles.signIn_googleIcon} />
							Llenar quiniela
						</Link>
						<button className={styles.signIn_google} onClick={HandleSignOut}>
							<ExitLogo className={styles.signIn_googleIcon} />
							Cerrar Sesión
						</button>
					</>
				)*/}
			</section>
			<section className={styles.logos}>
				<TeamsSlides />
			</section>
			{/*TeamsLogos.map((logo) => (
				<div key={logo.id}>{logo.logo}</div>
			))*/}
			{/*<iframe   allow="autoplay; encrypted-media"  src="https://embed.librefutboltv.com/mpdk.html?get=aHR0cHM6Ly9kMXd3dHNrdnIxcjk4ay5jbG91ZGZyb250Lm5ldC9vdXQvdjEvNjQ3MTRmZDg0Mzk4NDU0ODg5NjQwYWE5MGU3ODg5YjUvaW5kZXgubXBk&amp;key=MWY5NWJkYjFiZTk5NDY4MTk0NzkyNzczN2NlMmRlYmQ=&amp;key2=NGQ3NWNmNGZlYzM0OWMxYWZhZjM3OTYxYWQ4ZGUxZWU="  ></iframe>*/}
		</article>
	)
}
