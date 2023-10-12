"use client"
import { GoogleLogo } from "@/app/svg"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { auth, provider } from "@/app/config/firebase"
import styles from "./signin.module.scss"

export function SignIn() {
	const HandleSignInWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider)
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential?.accessToken
			//User info
			const user = result.user
		} catch (error) {
			if (error as FirebaseError) {
				const credential = GoogleAuthProvider.credentialFromError(error as FirebaseError)
			} else {
				console.log(error)
			}
		}
	}
	return (
		<div className={styles.signIn}>
			<button className={styles.signIn__google} onClick={HandleSignInWithGoogle}>
				<GoogleLogo className={styles.signIn__googleIcon} />
				Iniciar Sesión con Google
			</button>
		</div>
	)
}
