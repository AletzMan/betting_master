/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Loading } from "../components/Loading/Loading"
import { GetCurrentDays } from "../functions/functions"
import { GetResultsByTournament } from "../services/fetch_utils"
import { NotFoundIcon, RefreshIcon } from "../svg"
import { Results } from "../types/ResultsTypes"
import { ITournament, MatchDay } from "../types/types"
import { Match } from "./components/Match/Match"
import styles from "./results.module.scss"
import { useEffect, useState } from "react"
import { useOrientation } from "../hooks/useOrientation"
import { Dropdown } from "primereact/dropdown"

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }

export default function ResultsPage() {
	const { isLandscape } = useOrientation()
	const [currentDay, setCurrentDay] = useState<MatchDay>()
	const [results, setResults] = useState<Results[]>()
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(true)
	const [tournament, setTournament] = useState<ITournament>({ id: "74_183a06e3", name: "Liga MX" })

	const GetMatchesbyDay = async (date: string) => {
		setLoading(true)
		const response = await GetResultsByTournament(date, tournament.id)
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

	const HandleSelectTournament = (tournament: ITournament) => {
		console.log(tournament)
		setTournament(tournament)
		setUpdate(true)
	}

	const HandleRefresh = () => {
		setUpdate(true)
	}


	return (
		<main className="flex flex-col items-center justify-start mx-auto pt-[2.75em] pb-4 w-full max-w-4xl  scrollbar h-[calc(100svh-1em)]">
			<section className="relative flex flex-col items-center gap-2 justify-center py-1 w-full">
				<header className="sticky top-1 w-full bg-(--surface-b) z-10">
					<div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-start   justify-center gap-x-1 w-full pb-2 border-b-1 border-b-(--surface-d)">
						{GetCurrentDays(currentDay?.currentDate || new Date()).map((day, index) => (
							<button key={day.id} className={`flex flex-col items-center h-full justify-start gap-y-1.5  text-(--surface-500) cursor-pointer transition-all border-1 border-(--surface-d) rounded-xs ease-in-out delay-100 ${index === 2 ? "bg-[linear-gradient(-40deg,var(--pink-800),var(--surface-b))]" : "bg-[linear-gradient(-40deg,var(--surface-d),var(--surface-a))] hover:bg-[linear-gradient(-40deg,var(--surface-d),var(--surface-a))]  "}`} onClick={() => HandleSelectDate(day)}>
								<span className={`text-center py-0.5 font-medium   text-(--surface-b) w-full ${index === 2 ? "bg-[linear-gradient(-40deg,var(--surface-500),var(--surface-900))]" : "bg-[linear-gradient(-40deg,var(--surface-300),var(--surface-600))]"}`}>{day.day.short}</span>
								<span className={`flex text-center  text-lg font-semibold ${index === 2 && "flex items-center justify-center text-(--surface-0) bg-[linear-gradient(-40deg,var(--surface-300),var(--surface-900))] w-8 h-8 rounded-full"}`}>{day.date}</span>
								{index === 2 && <span className="text-(--surface-600)">{day.month}</span>}
							</button>
						))}
					</div>
				</header>
				<Dropdown options={Tournaments} optionLabel="name" value={tournament} onChange={(e) => HandleSelectTournament(e.target.value)} />
				<article className={styles.matches}>
					{loading && <Loading height="10em" />}
					{!loading && results && results?.length > 0 && (
						<>
							<button className={styles.matches_refresh} onClick={HandleRefresh}>
								<RefreshIcon className={styles.matches_refreshIcon} />
							</button>
							{results.length > 0 && results.map((event) => (
								<Match key={event.id} props={{ eventData: event, isAllMatches: tournament.id === "34_45d657ef" }} />
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
		</main >
	)
}

const Tournaments: ITournament[] = [
	{
		id: "74_183a06e3",
		name: "Liga MX",
	},
	{
		id: "34_45d657ef",
		name: "Todos los torneos",
	},
	{
		id: "182_835e556b",
		name: "La Liga",
	},
	{
		id: "183_4ff455f5",
		name: "Premier League",
	},
	{
		id: "185_899b5c72",
		name: "Champions League",
	},
	{
		id: "1184_45315cec",
		name: "League 1",
	}
]
