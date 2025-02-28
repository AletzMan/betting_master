"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tournaments, TournamentsInitYear } from "@/constants/constants"
import { Dropdown } from "primereact/dropdown"

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
		<header className="grid grid-cols-2 gap-2.5 w-full pr-2">
			<Dropdown options={Tournaments} value={selectedTournament} optionLabel="name" onChange={(e) => setSelectedTournament(e.value)} />
			<Dropdown options={Types} value={selectedValue} optionLabel="name" onChange={(e) => setSelectedValue(e.value)} />
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
