"use client"
import { AppLogo, GoogleLogo, TwitterLogo } from "@/app/svg"
import styles from "./login.module.scss"
import { AuthProvider, GoogleAuthProvider, TwitterAuthProvider, User, signInWithPopup, } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { useUser } from "@/app/config/zustand-store"
import { useEffect, useState } from "react"
import { auth, GoogleProvider, TwitterProvider, } from "@/app/config/firebase"
import { useRouter } from "next/navigation"
import { useOrientation } from "@/app/hooks/useOrientation"
import axios from "axios"

export default function LoginPage() {
	const { isLandscape } = useOrientation()
	const router = useRouter()
	const { user, setUser } = useUser()
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		if (user.uid) {
			router.push('/profile') // Redirige a la página protegida
		}
	}, [user, router]);

	const HandleSignInWithGoogle = async (provider: AuthProvider) => {
		try {
			let token: string | undefined = ""
			let userInfo = {} as User
			const result = await signInWithPopup(auth, provider)
			if (provider.providerId === "twitter.com") {
				const credential = TwitterAuthProvider.credentialFromResult(result)
				token = credential?.accessToken
				userInfo = result.user
			}
			if (provider.providerId === "google.com") {
				const credential = GoogleAuthProvider.credentialFromResult(result)
				token = credential?.accessToken
				userInfo = result.user
			}

			const response = await axios.post("/api/login", {}, {
				headers: {
					Authorization: `Bearer ${await userInfo.getIdToken()}`,
				}
			})

			if (response.status === 200) {
				setUser({ uid: userInfo.uid, name: userInfo.displayName, photo: userInfo.photoURL, email: userInfo.email })
				setIsLogged(true)
			}
		} catch (error) {
			console.log("ERROR FIREBASE OK:", error)
			if (error as FirebaseError) {
				const credential = GoogleAuthProvider.credentialFromError(error as FirebaseError)
			}
		}
	}

	return (
		<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
			<section className={styles.main_section}>
				<AppLogo className={styles.icon} />
				<h1 className={styles.header_title}>Iniciar Sesión</h1>
				<article className={styles.main_article}>
					<p className={`${styles.main_message} ${styles.main_messageDown}`}>Elige una opción para iniciar sesión.</p>
					<button className={`${styles.button} ${styles.button_google}`} onClick={() => HandleSignInWithGoogle(GoogleProvider)}>
						<GoogleLogo className={`${styles.button_icon} ${styles.button_iconGoogle}`} />
						<span className={`${styles.button_text} ${styles.button_textGoogle}`}>Continuar con Google</span>
					</button>
					<button className={`${styles.button} ${styles.button_twitter}`} onClick={() => HandleSignInWithGoogle(TwitterProvider)}>
						<TwitterLogo className={`${styles.button_icon} ${styles.button_iconTwitter}`} />
						<span className={`${styles.button_text} ${styles.button_textTwitter}`}>Continuar con X</span>
					</button>
				</article>
			</section>
		</main>
	)
}
