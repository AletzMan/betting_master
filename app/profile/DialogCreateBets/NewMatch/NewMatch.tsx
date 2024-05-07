import { TeamsNames, TeamsLogos } from "@/app/constants/constants"
import styles from "./newmatch.module.scss"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useNewBet } from "@/app/config/zustand-store"
import { Team, Teams } from "@/app/types/types"
import { ComboBox } from "@/app/components/ComboBox/ComboBox"

interface Props {
	matchNumber: number
	hasError: {
		home: boolean
		away: boolean
		date: boolean
	}
	teams: Team[]
	setTeams: Dispatch<SetStateAction<Team[]>>
	clear: boolean
}

export function NewMatch(props: Props) {
	const { matchNumber, hasError, teams, setTeams, clear } = props
	const { selectedTeams, setSelectedTeams, selectedDates, setSelectedDates } = useNewBet()
	const [homeTeam, setHomeTeam] = useState({ id: "", name: "" })
	const [awayTeam, setAwayTeam] = useState({ id: "", name: "" })

	useEffect(() => {
		setHomeTeam({ id: "", name: "" })
		setAwayTeam({ id: "", name: "" })
	}, [clear])

	useEffect(() => {
		// Llama a la función HandleSelectionTeam para obtener una respuesta
		const response = HandleSelectionTeam("home", homeTeam.id)
		UpdateListTeams(response)
	}, [homeTeam])

	useEffect(() => {
		// Llama a la función HandleSelectionTeam para obtener una respuesta
		const response = HandleSelectionTeam("away", awayTeam.id)
		UpdateListTeams(response)
	}, [awayTeam])

	const UpdateListTeams = (newTeams: Teams[]) => {
		// Actualiza el estado setSelectedTeams con la respuesta
		setSelectedTeams(newTeams)

		// Inicializa arrays vacíos para su uso posterior
		let newArrayTeams: Team[] = []
		let orginalTeams: Team[] = [...TeamsNames]
		let newSetTeams: Team[] = []

		// Recorre la respuesta y filtra los equipos originales en newArrayTeams
		/*for (let index = 0; index < Object.entries(newTeams).length; index++) {
			orginalTeams.forEach((origTeam) => {
				if (origTeam.id === newTeams[index].home.toString() || origTeam.id === newTeams[index].away.toString()) {
					newArrayTeams.push(origTeam)
				}
			})
		}*/

		// Convierte la respuesta en un array de objetos
		const arrayObject = Object.entries(newTeams)

		// Filtra los elementos no NaN del array de objetos
		//const arrayTeamsNotNaN = arrayObject.filter((idEx) => !Number.isNaN(idEx[1].home) || !Number.isNaN(idEx[1].away))

		// Crea un array de IDs a excluir
		/*let idsAExcluir: string[] = []
		for (let index = 0; index < arrayTeamsNotNaN.length; index++) {
			idsAExcluir.push(arrayTeamsNotNaN[index][1].home.toString())
			idsAExcluir.push(arrayTeamsNotNaN[index][1].away.toString())
		}*/

		// Si newArrayTeams contiene elementos, filtra orginalTeams para excluir ciertos IDs
		/*if (newArrayTeams.length > 0) {
			newSetTeams = orginalTeams.filter((team) => !idsAExcluir.includes(team.id))
		} else {
			// Si newArrayTeams está vacío, asigna una copia de TeamsNames a newSetTeams
			newSetTeams = [...TeamsNames]
		}*/
		newSetTeams = [...TeamsNames]

		// Actualiza el estado con el nuevo conjunto de equipos
		setTeams(newSetTeams)
	}
	console.log(selectedTeams)



	const HandleSelectionTeam = (team: string, teamid: string) => {
		console.log(team)
		// Copia del arreglo de selectedTeams
		let newTeams: Teams[] = { ...selectedTeams }
		// Obten una copia del partido actual
		let newMatch = { ...newTeams[matchNumber] }

		// Actualiza el equipo correspondiente (home o away)
		if (team === "home") {
			newMatch.home = parseInt(teamid)
		} else {
			newMatch.away = parseInt(teamid)
		}
		// Actualiza el arreglo de selectedTeams con la nueva información
		newTeams[matchNumber] = newMatch

		console.log(newTeams)
		// Actualiza el estado con el nuevo arreglo
		return newTeams
	}

	const HandleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
		let dates = [...selectedDates]
		let newDate = dates[matchNumber]

		newDate = e.currentTarget.value
		dates[matchNumber] = newDate
		setSelectedDates(dates)
	}

	return (
		<div className={styles.match}>
			<div className={`${styles.match_logo} ${styles.match_logoHome}`}>
				{selectedTeams?.[matchNumber]?.home >= 0 && TeamsLogos[selectedTeams[matchNumber].home].logo}
			</div>
			<div className={`${styles.match_home} ${hasError.home && styles.match_error}`}>
				<ComboBox options={teams} selectOption={homeTeam} setSelectOption={setHomeTeam} plaaceholder="Local" />
			</div>
			<input
				className={`${styles.match_date} ${hasError.date && styles.match_error}`}
				type="datetime-local"
				value={selectedDates[matchNumber]}
				onChange={HandleChangeDate}
			/>
			<div className={`${styles.match_away} ${hasError.away && styles.match_error}`}>
				<ComboBox options={teams} selectOption={awayTeam} setSelectOption={setAwayTeam} plaaceholder="Visita" />
			</div>
			<div className={`${styles.match_logo} ${styles.match_logoAway}`}>
				{selectedTeams?.[matchNumber]?.away >= 0 && TeamsLogos[selectedTeams[matchNumber].away].logo}
			</div>
		</div>
	)
}
