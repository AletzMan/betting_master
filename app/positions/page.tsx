"use client"
import styles from "./stats.module.scss"
import { LeagueMX } from "../types/types"
import { TeamStatistics } from "./components/TeamStatistics/TeamStatistics"
import { TeamDescription } from "./components/TeamsDescription/TeamDescription"
import { ChangeEvent, useEffect, useState } from "react"
import { GetStats } from "../services/fetch_utils"
import { ArrowIcon } from "../svg"
import { Loading } from "../components/Loading/Loading"
import { useOrientation } from "../hooks/useOrientation"
import { ComboBox } from "../components/ComboBox/ComboBox"
import { Tournaments } from "../constants/constants"

export default function PositionsPage() {
	const [leagues, setLeagues] = useState<LeagueMX[]>([])
	const { isLandscape } = useOrientation()
	const [selectedLeague, setSelectLeague] = useState({ id: "0159", name: "Liga MX" })
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

	console.log(selectedGroup)
	return (
		<>
			<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
				{loading && <Loading />}
				{!loading && leagues.length > 0 && (
					<>
						<div className={styles.main_combobox}>
							<ComboBox options={Tournaments} selectOption={selectedLeague} setSelectOption={setSelectLeague} />
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
								<div className={styles.table_titles}>
									<span className={`${styles.table_titlesText} ${styles.table_titlesClub}`}>Club</span>
								</div>
								{leagues[selectedGroup]?.rank.map((team, index) => (
									<TeamDescription key={team._id} team={team} position={index + 1} />
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
