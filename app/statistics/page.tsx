import styles from "./statistics.module.scss"
import { ComboStatistics } from "./components/ComboStatistics/ComboStatistics"
import { STATISTICS_OPTIONS } from "../constants/constants"
import { Suspense } from "react"
import { StatisticsTable } from "./components/StatisticsTable/StatisticsTable"
import { Loading } from "../components/Loading/Loading"
import { SearchParams } from "../types/appTypes"



export default async function StatisticsPage(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams
	const type = searchParams.type
	const tournament = searchParams.tournament

	const option = STATISTICS_OPTIONS.filter((option) => option?.type === type)[0]

	return (
		<main className={styles.main}>
			<Suspense fallback={<Loading />}>
				<ComboStatistics />
			</Suspense>
			<div className={styles.main_definitions}>
				<div className={styles.main_definitionsGroup}>
					<span className={styles.main_definitionsAbb}>{`${option?.headers[0]}:  `}</span>
					<span className={styles.main_definitionsDes}>{option?.nameHeaders[0]}</span>
				</div>
				<div className={styles.main_definitionsGroup}>
					<span className={styles.main_definitionsAbb}>{`${option?.headers[1]}:  `}</span>
					<span className={styles.main_definitionsDes}>{option?.nameHeaders[1]}</span>
				</div>
				<div className={styles.main_definitionsGroup}>
					<span className={styles.main_definitionsAbb}>{`${option?.headers[2]}:  `}</span>
					<span className={styles.main_definitionsDes}>{option?.nameHeaders[2]}</span>
				</div>
			</div>
			<section className={`${styles.main_table} scrollbar`}>
				<header className={styles.main_header}>
					<span></span>
					<span>Jugador</span>
					<span>Equipo</span>
					<span>{option?.headers[0]}</span>
					<span>{option?.headers[1]}</span>
					<span>{option?.headers[2]}</span>
				</header>
				<Suspense fallback={<Loading />}>
					<StatisticsTable tournament={tournament} type={type} />
				</Suspense>
			</section>
		</main>
	)
}
