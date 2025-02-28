import styles from "./statistics.module.scss"
import { ComboStatistics } from "./components/ComboStatistics"
import { STATISTICS_OPTIONS } from "../constants/constants"
import { Suspense } from "react"
import { StatisticsTable } from "./components/StatisticsTable"
import { Loading } from "../components/Loading/Loading"
import { SearchParams } from "../types/appTypes"
import { Badge } from "primereact/badge"



export default async function StatisticsPage(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams
	const type = searchParams.type
	const tournament = searchParams.tournament

	const option = STATISTICS_OPTIONS.filter((option) => option?.type === type)[0]

	return (
		<main className="flex items-center justify-start flex-col my-0 mx-auto pt-12 pl-2 pb-2 w-full  max-w-120 min-h-svh">
			<Suspense fallback={<Loading height="15em" />}>
				<ComboStatistics />
			</Suspense>
			<div className="grid grid-cols-1 place-content-end w-full p-1 text-sm max-w-120">
				<div className={styles.group}>
					<span >{`${option?.headers[0]}:  `}</span>
					<span>{option?.nameHeaders[0]}</span>
				</div>
				<div className={styles.group}>
					<span>{`${option?.headers[1]}:  `}</span>
					<span>{option?.nameHeaders[1]}</span>
				</div>
				<div className={styles.group}>
					<span>{`${option?.headers[2]}:  `}</span>
					<span>{option?.nameHeaders[2]}</span>
				</div>
			</div>
			<section className={`flex flex-col items-start w-full max-w-[30em] h-[calc(100svh-8em)] scrollbarXY`}>
				<header className="sticky top-0 left-0 grid grid-cols-[2.5em_10em_8em_3em_3em_2.5em] place-content-start place-items-center py-1 w-max text-center bg-(--surface-d) rounded-t-sm border-b-1 border-">
					<span className="text-(--pink-500)">POS</span>
					<span className="text-(--pink-500)">Jugador</span>
					<span className="text-(--pink-500)">Equipo</span>
					<span className="text-(--pink-500)">{option?.headers[0]}</span>
					<span className="text-(--pink-500)">{option?.headers[1]}</span>
					<span className="text-(--pink-500)">{option?.headers[2]}</span>
				</header>
				<Suspense fallback={<Loading height="15em" />}>
					<StatisticsTable tournament={tournament} type={type} />
				</Suspense>
			</section>
		</main>
	)
}
