"use client"
import { ChangeEvent, useEffect, useState } from "react"
import styles from "../../statistics.module.scss"
import { useRouter, useSearchParams } from "next/navigation"
import { ComboBox } from "@/app/components/ComboBox/ComboBox"
import { Tournaments, TournamentsInitYear } from "@/app/constants/constants"

export function ComboStatistics() {
	const params = useSearchParams()
	const [selectedValue, setSelectedValue] = useState(Types.filter((type) => type.id === (params.get("type") as string))[0])
	const [selectedTournament, setSelectedTournament] = useState(Tournaments.filter((tour) => tour.id === (params.get("tournament") as string))[0])
	const router = useRouter()

	useEffect(() => {
		router.push(`/statistics?tournament=${selectedTournament.id}&type=${selectedValue.id}`)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTournament, selectedValue])

	const SelectTournament = new Date().getMonth() < 6 ? Tournaments : TournamentsInitYear

	return (
		<header className={styles.header}>
			<ComboBox options={Tournaments} selectOption={selectedTournament} setSelectOption={setSelectedTournament} />
			<ComboBox options={Types} selectOption={selectedValue} setSelectOption={setSelectedValue} />
		</header>
	)
}
const Types = [
	{
		id: "goals",
		name: "Goleadores",
	},
	{
		id: "cards",
		name: "Tarjetas",
	},
	{
		id: "assists",
		name: "Asistencias",
	},
	{
		id: "passes",
		name: "Pases",
	},
	{
		id: "saves",
		name: "Paradas",
	},
]
