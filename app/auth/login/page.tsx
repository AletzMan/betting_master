"use client"
import { BallIcon, FacebookIcon, GoogleLogo, LogInIcon, TwitterLogo } from "@/app/svg"
import styles from "./login.module.scss"
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, User, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { useUser } from "@/app/config/zustand-store"
import { useState } from "react"
import { auth, FacebookProvider, GoogleProvider, TwitterProvider } from "@/app/config/firebase"
import { useRouter } from "next/navigation"
import { useOrientation } from "@/app/hooks/useOrientation"
import axios from "axios"

export default function LoginPage() {
	const { isLandscape } = useOrientation()
	const router = useRouter()
	const { user, setUser } = useUser()
	const [isLogged, setIsLogged] = useState(false)

	const HandleSignInWithGoogle = async (provider: AuthProvider) => {
		console.log(provider)
		try {
			let token: string | undefined = ""
			//User info
			let userInfo = {} as User
			/*await signInWithRedirect(auth, provider)
			if (provider.providerId === "google.com") {
				//const credential = GoogleAuthProvider.credentialFromResult(result)
				const result = await getRedirectResult(auth)
				if (result) {
					const credentials = GoogleAuthProvider.credentialFromResult(result)
					token = credentials?.accessToken
					userInfo = result.user
				}
			}
			if (provider.providerId === "twitter.com") {
				const result = await getRedirectResult(auth)
				if (result) {
					const credentials = TwitterAuthProvider.credentialFromResult(result)
					token = credentials?.accessToken
					userInfo = result.user
				}
			}*/
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
			/*if (provider.providerId === "twitter.com") {
				const credential = TwitterAuthProvider.credentialFromResult(result)
				token = credential?.accessToken
				userInfo = result.user
			}
			if (provider.providerId === "facebook.com") {
				const credential = FacebookAuthProvider.credentialFromResult(result)
				token = credential?.accessToken
				userInfo = result.user
			}*/

			console.log(userInfo)

			const response = await axios.post("/api/login", {}, {
				headers: {
					Authorization: `Bearer ${await userInfo.getIdToken()}`,
				}
			})

			if (response.status === 200) {
				setUser({ uid: userInfo.uid, name: userInfo.displayName, photo: userInfo.photoURL })
				setIsLogged(true)
				router.push("/")
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
				<BallIcon className={styles.main_sectionBall} />
				<h1 className={styles.header_title}>Iniciar Sesión</h1>
				<article className={styles.main_article}>
					{/*<p className={styles.main_message}>Accede para llenar quinielas y mantenerte al tanto de los resultados.</p>*/}
					<p className={`${styles.main_message} ${styles.main_messageDown}`}>Elige una opción para iniciar sesión en la aplicación.</p>
					<button className={`${styles.button} ${styles.button_google}`} onClick={() => HandleSignInWithGoogle(GoogleProvider)}>
						<GoogleLogo className={`${styles.button_icon} ${styles.button_iconGoogle}`} />
						<span className={`${styles.button_text} ${styles.button_textGoogle}`}>Iniciar con Google</span>
					</button>
					<button className={`${styles.button} ${styles.button_twitter}`} onClick={() => HandleSignInWithGoogle(TwitterProvider)}>
						<TwitterLogo className={`${styles.button_icon} ${styles.button_iconTwitter}`} />
						<span className={`${styles.button_text} ${styles.button_textTwitter}`}>Iniciar con X</span>
					</button>
					{/*<button className={`${styles.button} ${styles.button_facebook}`} onClick={() => HandleSignInWithGoogle(FacebookProvider)}>
						<FacebookIcon className={`${styles.button_icon} ${styles.button_iconFacebook}`} />
						<span className={`${styles.button_text} ${styles.button_textFacebook}`}>Iniciar con Facebook</span>
					</button>*/}
				</article>
			</section>
		</main>
	)
}
