"use client"
import styles from "./signin.module.scss"
import { AppLogo, LuckIcon } from "@/app/svg"
import { TeamsSlides } from "../TeamsSlides/TeamsSlides"
import { Button } from "../Button/Button"

export function SignIn() {


	return (
		<article className={styles.signIn}>
			<AppLogo className={styles.signIn_logo} />
			<h3 className={styles.signIn_title}>{"Bienvenido a Betting Master"}</h3>
			<p className={styles.signIn_paragraph}>Donde las quinielas de fútbol se vuelven más emocionantes.</p>
			<p className={styles.signIn_paragraph}>¡Llena tus quinielas y vive la emoción del fútbol!</p>
			<section className={styles.signIn_section}>
			</section>
			<section className={styles.logos}>
				<TeamsSlides />
			</section>
		</article>
	)
}
