"use client"
import { useRouter } from "next/navigation"
import { Loading } from "../components/Loading/Loading"
import { GetCurrentDays } from "../functions/functions"
import { GetResults } from "../services/fetch_utils"
import { NotFoundIcon, RefreshIcon } from "../svg"
import { Results } from "../types/ResultsTypes"
import { MatchDay } from "../types/types"
import { Match } from "./components/Match/Match"
import styles from "./results.module.scss"
import { useEffect, useState } from "react"
import { useOrientation } from "../hooks/useOrientation"

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }

export default function ResultsPage() {
	const { isLandscape } = useOrientation()
	const [currentDay, setCurrentDay] = useState<MatchDay>()
	const [results, setResults] = useState<Results[]>()
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(true)

	const GetMatchesbyDay = async (date: string) => {
		setLoading(true)
		const response = await GetResults(date)
		if (response.length > 0) {
			setResults(
				response.sort(function (a, b) {
					if (a.score.period.name > b.score.period.name) {
						return 1
					}
					if (a.score.period.name < b.score.period.name) {
						return -1
					}
					return 0
				})
			)
		} else {
			setResults([])
		}
		setLoading(false)
	}

	useEffect(() => {
		if (update) {
			const formatDate = new Date().toLocaleString("es-MX", options).split("/")
			const CURRENT_DAY = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
			if (currentDay && currentDay?.dateFullShort !== undefined) {
				GetMatchesbyDay(currentDay.dateFullShort)
			} else {
				GetMatchesbyDay(CURRENT_DAY)
			}
			setUpdate(false)
		}
	}, [currentDay, update])

	const HandleSelectDate = (date: MatchDay) => {
		setCurrentDay(date)
		setUpdate(true)
	}

	const HandleRefresh = () => {
		setUpdate(true)
	}

	return (
		<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
			<section className={styles.section}>
				<header className={styles.header}>
					<div className={styles.header_days}>
						{GetCurrentDays(currentDay?.currentDate || new Date()).map((day, index) => (
							<button key={day.id} className={`${styles.header_day}`} onClick={() => HandleSelectDate(day)}>
								<span className={styles.header_dayText}>{day.day.short}</span>
								<span className={`${styles.header_dayNumber} ${index === 2 && styles.header_dayNumberCurrent}`}>{day.date}</span>
								{index === 2 && <span className={styles.header_dayFull}>{day.month}</span>}
							</button>
						))}
					</div>
				</header>
				<article className={styles.matches}>
					{loading && <Loading />}
					{!loading && results && results?.length > 0 && (
						<>
							<button className={styles.matches_refresh} onClick={HandleRefresh}>
								<RefreshIcon className={styles.matches_refreshIcon} />
							</button>
							<h2 className={styles.section_title}>{results[0]?.tournament.alternateNames.esES}</h2>
							{results.map((event) => (
								<Match key={event.id} eventData={event} />
							))}
						</>
					)}
					{!loading && results?.length === 0 && (
						<div className={styles.notfound}>
							<NotFoundIcon className={styles.notfound_icon} />
							<p className={styles.notfound_text}>No hay partidos</p>
						</div>
					)}
				</article>
			</section>
		</main>
	)
}
