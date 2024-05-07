import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { NewMatch } from "./NewMatch/NewMatch"
import styles from "./dialogcreatebets.module.scss"
import { useNewBet } from "@/app/config/zustand-store"
import { AddMatchDay } from "@/app/config/firebase"
import { ICurrentMatch, IMatchDay, IErrorMatches, Team, Teams } from "@/app/types/types"
import { useOrientation } from "@/app/hooks/useOrientation"
import { ValidateNewBet } from "@/app/functions/functions"
import { TeamsNames } from "@/app/constants/constants"
import { useSnackbar } from "notistack"
interface Props {
	setView: Dispatch<SetStateAction<boolean>>
	numberMatches: number
}

interface IErrorEmpty {
	errorMatches: IErrorMatches
	errorDates: boolean[]
	errorMatchDay: boolean
	hasError: boolean
}

const initError: IErrorEmpty = {
	errorMatches: {
		home: [false, false, false, false, false, false, false, false, false],
		away: [false, false, false, false, false, false, false, false, false],
	},
	errorDates: [false, false, false, false, false, false, false, false, false],
	errorMatchDay: false,
	hasError: false
}

export function DialogCreatBets({ numberMatches, setView }: Props) {
	const { enqueueSnackbar } = useSnackbar()
	const { selectedTeams, selectedDates, clearTeams, clearDates, setSelectedTeams } = useNewBet()
	const [matchDay, setMatchDay] = useState(0)
	const { isLandscape } = useOrientation()
	const [error, setError] = useState<IErrorEmpty>(initError)
	const [teams, setTeams] = useState<Team[]>(TeamsNames)
	const [clear, setClear] = useState<boolean>(false)
	const [matches, setMatches] = useState<ICurrentMatches[]>([])


	useEffect(() => {
		const newMatches = Matches.filter((match, index) => index < numberMatches)
		setMatches(newMatches)
		let newMatchesTeams: Teams[] = []
		for (let index = 0; index < numberMatches; index++) {
			newMatchesTeams.push({ home: NaN, away: NaN })
		}
		setSelectedTeams(newMatchesTeams)
	}, [])

	const HandleChangeDay = (e: ChangeEvent<HTMLInputElement>) => {
		setMatchDay(parseInt(e.currentTarget.value))
	}

	const HandleCreateMatchDay = async () => {
		const respErrors = ValidateNewBet(selectedTeams, selectedDates, matchDay, numberMatches * 2)
		setError({
			errorMatches: respErrors.errorMatches,
			errorDates: respErrors.errorDates,
			hasError: respErrors.hasErrors,
			errorMatchDay: respErrors.errorMatchDay,
		})

		if (!respErrors.hasErrors) {
			const newMatches: ICurrentMatch[] = []
			for (let index = 0; index < 8; index++) {
				newMatches.push({
					id: crypto.randomUUID(),
					status: "Sin comenzar",
					startDate: selectedDates[index],
					teams: {
						home: selectedTeams[index].home,
						away: selectedTeams[index].away,
					},
				})
			}
			const newArrayResults: string[] = []
			for (let index = 0; index < numberMatches; index++) {
				newArrayResults.push("-")
			}
			const newMatchDay: IMatchDay = {
				day: matchDay,
				tournament: "Liga BBVA Bancomer MX",
				matches: newMatches,
				results: newArrayResults,
				isAvailable: false,
				isFinishGame: false
			}
			const response = await AddMatchDay(newMatchDay, new Date().getMonth() < 8 ? "0168" : "0159", matchDay)
			if (response === "OK") {
				enqueueSnackbar("Quiniela creada correctamente", { variant: "success" })
				setView(false)
			} else {
				enqueueSnackbar("Ocurrió un error al crear la quiniela", { variant: "error" })
			}
		} else {
			enqueueSnackbar(error.errorMatchDay ? "Elija un número de jornada" : "Existen campos vacíos", { variant: "error" })
		}

	}

	const HandleCrearTeams = () => {
		clearTeams()
		clearDates()
		setClear(true)
		setMatchDay(0)
		setError(initError)
		setTimeout(() => {
			setClear(false)
		}, 500)
	}

	return (
		<dialog className={`${styles.dialog} ${isLandscape && styles.dialog_landscape}`} open>
			<section className={`${styles.dialog_section} scrollbar`}>
				<header className={styles.dialog_header}>
					<button className={styles.dialog_headerButton} onClick={HandleCreateMatchDay}>
						Crear Quiniela
					</button>
					<button className={styles.dialog_headerButton} onClick={HandleCrearTeams}>
						Limpiar
					</button>
					<button className={styles.dialog_headerButton} onClick={() => setView(false)}>
						Cerrar
					</button>
				</header>
				<article className={styles.dialog_matches}>
					{error.hasError && (
						<span className={styles.dialog_errorText}>{error.errorMatchDay ? "Elija un número de jornada" : "Existen campos vacíos"}</span>
					)}
					<div className={styles.dialog_matchesDay}>
						<span className={styles.dialog_matchesDayText}>Jornada: </span>
						<input
							className={`${styles.dialog_matchesDayNumber} ${error.errorMatchDay && styles.dialog_matchesDayNumberError}`}
							type="number"
							value={matchDay}
							onChange={HandleChangeDay}
						/>
					</div>
					{matches?.map((match, index) => (
						<section key={match.id}>
							{<NewMatch
								key={match.id}
								matchNumber={index}
								hasError={{ home: error.errorMatches?.home[index], away: error.errorMatches?.away[index], date: error?.errorDates[index] }}
								teams={teams}
								setTeams={setTeams}
								clear={clear}
							/>}
						</section>
					))}
				</article>
			</section>
		</dialog>
	)
}

interface ICurrentMatches {
	id: string
}

const Matches: ICurrentMatches[] = [
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
	{
		id: crypto.randomUUID(),
	},
]
