import styles from "./lives.module.scss"

export default function LivesPage() {
	return (
		<main className={styles.main}>
			<h2 className={styles.main_title}>LIVES</h2>
			<section>
				<iframe
					width="1077"
					height="606"
					src="https://futbollibre.futbol/tv9/agenda/"
					title="Deep Music for Work — Boost Your Work Flow"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen={true}
				></iframe><a target="_parent"></a>
			</section>
		</main>
	)
}
