"use client"
import styles from "./stats.module.scss"
import { ITournament, LeagueMX } from "../types/types"
import { TeamStatistics } from "./components/TeamStatistics/TeamStatistics"
import { TeamDescription } from "./components/TeamsDescription/TeamDescription"
import { ChangeEvent, useEffect, useState } from "react"
import { GetStats } from "../services/fetch_utils"
import { ArrowIcon } from "../svg"
import { Loading } from "../components/Loading/Loading"
import { useOrientation } from "../hooks/useOrientation"
import { Tournaments } from "../constants/constants"

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



	const HandleSelectTournament = (event: ChangeEvent<HTMLSelectElement>): void => {
		const id = event.target.value
		const name = event.target.options[event.target.selectedIndex].text
		if (name === "Liga MX" || name === "Liga MX" || name === "Champions League" || name === "Premier League" || name === "La Liga" || name === "Bundesliga" || name === "Liga Holandesa" || name === "Serie A" || name === "League 1") {
			const newValue: ITournament = { id, name }
			setSelectLeague(newValue)
		}
	}

	return (
		<>
			<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
				{loading && <Loading />}
				{!loading && leagues.length > 0 && (
					<>
						<div className={styles.main_combobox}>
							<select className={styles.main_select} value={selectedLeague.id} onChange={HandleSelectTournament}>
								{Tournaments.map((tournament) => (
									<option key={tournament.id} value={tournament.id}>
										{tournament.name}
									</option>
								))}
							</select>
							<div className={styles.description}>
								<div className={styles.description_container}>
									{TitleClasification.filter(desc => desc.name === selectedLeague.name)[0].clasifications.map((description, index) => (
										<div key={description} className={styles.description_group}>
											<div className={`${styles.description_quad}  `}></div>
											<span className={styles.description_text}>{description}</span>
										</div>
									))
									}
								</div>
							</div>
						</div>
						{numberGroups > 1 && (
							<div className={styles.group}>
								<button
									className={`${styles.group_button} ${styles.group_buttonPrev} ${selectedGroup < 1 && styles.group_buttonDisabled}`}
									disabled={selectedGroup < 1}
									onClick={() => HandleSelectGroup("-")}
								>
									<ArrowIcon className={styles.group_icon} />
								</button>
								<span className={styles.group_text}>{`Grupo ${selectedGroup + 1}`}</span>
								<button
									className={`${styles.group_button} ${styles.group_buttonNext}  ${selectedGroup > numberGroups - 2 && styles.group_buttonDisabled}`}
									disabled={selectedGroup > numberGroups - 2}
									onClick={() => HandleSelectGroup("+")}
								>
									<ArrowIcon className={styles.group_icon} />
								</button>
							</div>
						)}
						<div key={leagues[selectedGroup]?.id} className={`${styles.table} scrollbar`}>
							<section className={styles.table_description}>
								<div className={` ${styles.table_titlesClub}`}>
									<span className={`${styles.table_titlesText} ${styles.table_titlesTextClub}`}>Club</span>
								</div>
								{leagues[selectedGroup]?.rank.map((team, index) => (
									<TeamDescription key={team._id} team={team} position={index + 1} selectedLeague={selectedLeague} />
								))}
							</section>
							<section className={styles.table_statistics}>
								<div className={styles.table_titles}>
									{namesDescription.map((description) => (
										<span className={styles.table_titlesText} key={description.id}>
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
				)}
			</main>
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