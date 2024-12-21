/* eslint-disable @next/next/no-img-element */

import styles from "./signin.module.scss"
import { AppLogo, LuckIcon } from "@/app/svg"
import { TeamsSlides } from "../TeamsSlides/TeamsSlides"
import { GetNewsLigaMX } from "@/app/services/fetch_utils"
import Link from "next/link"
import { findFirstMatch } from "@/app/utils/helpers"
import { Teams, TeamsLogos } from "@/app/constants/constants"

export async function SignIn() {
	const news = await GetNewsLigaMX()




	return (
		<article className={`${styles.signIn} `}>
			<AppLogo className={styles.signIn_logo} />
			<h1 className={styles.signIn_title}>{"Bienvenido a Betting Master"}</h1>
			<p className={styles.signIn_paragraph}>¡Apuesta por tus favoritos y disfruta del fútbol!</p>
			<section className={styles.logos}>
				<TeamsSlides />
			</section>
			<h2 className={styles.title}>Noticias</h2>
			<section className={`${styles.news} scrollbar`}>
				{news.length > 0 && news?.map((notice, index) => (
					<Link key={notice.titulo} className={styles.news_notice} href={notice.url}>
						<div className={styles.news_logo}>
							{TeamsLogos.find(team => team.name === findFirstMatch(news[index].titulo, Teams))?.logo || <img src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bettinggame/ligamx.png" alt="logo" width={40} />}
							<span className={styles.news_team}>{TeamsLogos.find(team => team.name === findFirstMatch(news[index].titulo, Teams))?.name}</span>
						</div>
						<h3 className={styles.news_title}>{notice.titulo}</h3>
					</Link>
				))

				}
			</section>
		</article>
	)
}
