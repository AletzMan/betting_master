"use client"
import { BallIcon, GoogleLogo, LogInIcon, TwitterLogo } from "@/app/svg"
import styles from "./login.module.scss"
import { AuthProvider, GoogleAuthProvider, TwitterAuthProvider, User, signInWithPopup } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { useUser } from "@/app/config/zustand-store"
import { useState } from "react"
import { auth, GoogleProvider, TwitterProvider } from "@/app/config/firebase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
	const router = useRouter()
	const { user, setUser } = useUser()
	const [isLogged, setIsLogged] = useState(false)

	const HandleSignInWithGoogle = async (provider: AuthProvider) => {
		console.log(provider.providerId)
		try {
			let token: string | undefined = ""
			//User info
			let userInfo = {} as User
			const result = await signInWithPopup(auth, provider)
			console.log(result)
			if (provider.providerId === "google.com") {
				const credential = GoogleAuthProvider.credentialFromResult(result)
				token = credential?.accessToken
				userInfo = result.user
			}
			if (provider.providerId === "twitter.com") {
				const credential = TwitterAuthProvider.credentialFromResult(result)
				token = credential?.accessToken
				userInfo = result.user
			}

			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await userInfo.getIdToken()}`,
				},
			})

			if (response.status === 200) {
				setUser({ uid: userInfo.uid, name: userInfo.displayName, photo: userInfo.photoURL })
				setIsLogged(true)
				router.push("/")
			}
		} catch (error) {
			console.log(error)
			if (error as FirebaseError) {
				const credential = GoogleAuthProvider.credentialFromError(error as FirebaseError)
			} else {
				console.log(error)
			}
		}
	}
	return (
		<main className={styles.main}>
			<section className={styles.main_section}>
				<BallIcon className={styles.main_sectionBall} />
				<header className={styles.header}>
					<h1 className={styles.header_title}>Iniciar Sesión</h1>
					<LogInIcon className={styles.header_icon} />
				</header>
				<article className={styles.main_article}>
					<p className={styles.main_message}>Accede para llenar quinielas y mantenerte al tanto de los resultados.</p>
					<p className={`${styles.main_message} ${styles.main_messageDown}`}>Elige una opción para iniciar sesión en la aplicación.</p>
					<button className={`${styles.button} ${styles.button_google}`} onClick={() => HandleSignInWithGoogle(GoogleProvider)}>
						<GoogleLogo className={`${styles.button_icon} ${styles.button_iconGoogle}`} />
						<span className={`${styles.button_text} ${styles.button_textGoogle}`}>Iniciar Sesión con Google</span>
					</button>
					<button className={`${styles.button} ${styles.button_twitter}`} onClick={() => HandleSignInWithGoogle(TwitterProvider)}>
						<TwitterLogo className={`${styles.button_icon} ${styles.button_iconTwitter}`} />
						<span className={`${styles.button_text} ${styles.button_textTwitter}`}>Iniciar Sesión con X</span>
					</button>
				</article>
			</section>
		</main>
	)
}
