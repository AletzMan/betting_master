"use client"
import styles from "./stats.module.scss"
import { ITournament, LeagueMX } from "../types/types"
import { TeamStatistics } from "./components/TeamStatistics"
import { TeamDescription } from "./components/TeamDescription"
import { useEffect, useState } from "react"
import { GetStats } from "../services/fetch_utils"
import { Loading } from "../components/Loading/Loading"
import { useOrientation } from "../hooks/useOrientation"
import { Tournaments } from "../constants/constants"
import { Dropdown } from "primereact/dropdown"

export default function PositionsPage() {
	const [leagues, setLeagues] = useState<LeagueMX[]>([])
	const { isLandscape } = useOrientation()
	const [selectedLeague, setSelectLeague] = useState<ITournament>({ id: new Date().getMonth() < 6 ? "0168" : "0159", name: "Liga MX" })
	const [selectedGroup, setSelectedGruop] = useState(0)
	const [numberGroups, setNumberGoups] = useState(0)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		GetStatistics(selectedLeague.id)
		setSelectedGruop(0)
	}, [selectedLeague])

	const GetStatistics = async (tournamentId: string) => {
		const response = await GetStats(tournamentId)
		setLeagues(response)
		setNumberGoups(response.length)
		setLoading(false)
	}

	const HandleSelectGroup = (direction: "+" | "-") => {
		if (direction === "+") {
			setSelectedGruop((prev) => prev + 1)
		} else {
			setSelectedGruop((prev) => prev - 1)
		}
	}



	const handleSelectTournament = (value: ITournament): void => {
		setSelectLeague(value)
	}


	return (
		<>
			<main className="flex items-center justify-center flex-col my-0 mx-auto pt-11 px-1 pb-4 w-full bg-(--surface-a) h-svh max-w-2xl">
				{loading && <Loading height="20em" />}
				{!loading && leagues.length > 0 && (
					<>
						<div className="flex justify-center gap-2 p-2 w-full">
							<Dropdown className="min-w-40 text-xs" options={Tournaments} value={selectedLeague} optionLabel="name" onChange={(e) => handleSelectTournament(e.value)} />
							<div className="flex flex-col justify-center overflow-hidden">
								<div className={styles.description}>
									{TitleClasification.filter(desc => desc.name === selectedLeague.name)[0].clasifications.map((description, index) => (
										<div key={description} className="flex flex-row items-center gap-2 py-1 px-2 rounded-md bg-(--surface-c)">
											<div className={`w-4 h-4 rounded-xs ${index === 0 && "bg-blue-500"} ${index === 1 && "bg-amber-500"} ${index === 2 && "bg-green-500"} ${index === 3 && "bg-cyan-500"}`}></div>
											<span className="text-xs">{description}</span>
										</div>
									))
									}
								</div>
							</div>
						</div>
						<div key={leagues[selectedGroup]?.id} className={`relative grid grid-cols-[12em_1fr]  max-w-svw items-center justify-start w-max my-0 mx-auto  h-[calc(100svh-6em)]  scrollbarXY `}>
							<section className="sticky left-0 flex flex-col items-start gap-1 h-full z-2">
								<div className={`sticky top-0 flex items-center justify-center text-center flex-col w-full max-w-48 py-1.5 px-1 bg-(--surface-d)`}>
									<span className={`flex items-center justify-center w-full h-6 text-sm font-medium text-(--primary-color) text-center rounded-sm `}>Club</span>
								</div>
								{leagues[selectedGroup]?.rank.map((team, index) => (
									<TeamDescription key={team._id} team={team} position={index + 1} selectedLeague={selectedLeague} />
								))}
							</section>
							<section className="relative flex flex-col items-start gap-1 h-full max-w-68">
								<div className="sticky top-0 grid grid-cols-[repeat(8,2em)] place-items-center text-center h-9 bg-(--surface-50) py-1 px-1 ">
									{namesDescription.map((description) => (
										<span className="flex items-center justify-center w-full h-6 text-sm font-medium text-(--primary-color) text-center rounded-sm " key={description.id}>
											{description.name}
										</span>
									))}
								</div>
								{leagues[selectedGroup]?.rank.map((team, index) => (
									<TeamStatistics key={team._id} team={team} position={index + 1} />
								))}
							</section>
						</div>
					</>
				)
				}
			</main >
		</>
	)
}

const namesDescription = [
	{
		id: 0,
		name: "PJ",
	},
	{
		id: 1,
		name: "PG",
	},
	{
		id: 2,
		name: "PE",
	},
	{
		id: 3,
		name: "PP",
	},
	{
		id: 4,
		name: "GF",
	},
	{
		id: 5,
		name: "GC",
	},
	{
		id: 6,
		name: "DIF",
	},
	{
		id: 7,
		name: "PTS",
	},
]


const TitleClasification = [
	{
		name: "Liga MX",
		clasifications: [
			"Serie final",
			"Eliminatorias de la serie final"
		]
	},
	{
		name: "Premier League",
		clasifications: [
			"Fase de grupos de Champions League",
			"Fase de grupos de Europa League"
		]
	},
	{
		name: "La Liga",
		clasifications: [
			"Fase de grupos de Champions League",
			"Fase de grupos de Europa League",
			"Clasificados en Liga Conferencia"
		]
	},
	{
		name: "Bundesliga",
		clasifications: [
			"Fase de grupos de Champions League",
			"Fase de grupos de Europa League",
			"Clasificados en Liga Conferencia"
		]
	},
	{
		name: "Liga Holandesa",
		clasifications: [
			"Fase de grupos de Champions League",
			"Fase de grupos de Europa League",
			"Clasificados en Liga Conferencia"
		]
	},
	{
		name: "Serie A",
		clasifications: [
			"Fase de grupos de Champions League",
			"Fase de grupos de Europa League",
			"Clasificados en Liga Conferencia"
		]
	},
	{
		name: "League 1",
		clasifications: [
			"Fase de grupos de Champions League",
			"Clasificados en Champions League",
			"Fase de grupos de Europa League",
			"Clasificados en Liga Conferencia"
		]
	},
	{
		name: "Champions League",
		clasifications: [
			"Siguiente ronda",
			"Eliminatorias"
		]
	},
]