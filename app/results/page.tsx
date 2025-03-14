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
		setTournament(tournament)
		setUpdate(true)
	}

	const HandleRefresh = () => {
		setUpdate(true)
	}


	return (
		<main className="flex flex-col items-center justify-start mx-auto pt-[42.39px] pb-4 w-full max-w-4xl h-[calc(100svh)]">
			<section className="relative flex flex-col items-center  justify-center  w-full">
				<header className=" w-full bg-(--surface-b) z-10 p-1  border-b-1 border-b-(--surface-d)">
					<div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-start   justify-center gap-x-1 w-full">
						{GetCurrentDays(currentDay?.currentDate || new Date()).map((day, index) => (
							<button key={day.id} className={`flex flex-col items-center h-full justify-start gap-y-1.5  text-(--surface-500) cursor-pointer transition-all border-1 border-(--surface-d) rounded-xs ease-in-out delay-100 ${index === 2 ? "bg-[linear-gradient(-40deg,var(--accent-color),var(--surface-b))]" : "bg-[linear-gradient(-40deg,var(--surface-d),var(--surface-a))] hover:bg-[linear-gradient(-40deg,var(--surface-d),var(--surface-a))]  "}`} onClick={() => HandleSelectDate(day)}>
								<span className={`text-center py-0.5 font-medium   text-(--surface-b) w-full ${index === 2 ? "bg-[linear-gradient(-40deg,var(--surface-500),var(--surface-900))]" : "bg-[linear-gradient(-40deg,var(--surface-300),var(--surface-600))]"}`}>{day.day.short}</span>
								<span className={`flex text-center  text-lg font-semibold ${index === 2 && "flex items-center justify-center text-(--surface-0) bg-[linear-gradient(-40deg,var(--surface-300),var(--surface-900))] w-8 h-8 rounded-full"}`}>{day.date}</span>
								{index === 2 && <span className="text-(--surface-600)">{day.month}</span>}
							</button>
						))}
					</div>
				</header>
				<article className={`${styles.matches} scrollbar h-[calc(100svh-9.4em)]`}>
					<Dropdown options={Tournaments} optionLabel="name" value={tournament} onChange={(e) => HandleSelectTournament(e.target.value)} />
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
						<div className="flex flex-col items-center justify-center p-10 rounded-xl bg-(--surface-e) border-1 border-(--surface-c) text-center">
							<i className="pi pi-ban text-(--danger-color) mb-5" style={{ fontSize: "4em" }} />
							<p className="text-xl font-semibold text-white mb-2 text-balance">
								No hay partidos programados para este día.
							</p>
							<p className="text-gray-400">
								Intenta seleccionar otra fecha o liga.
							</p>
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
