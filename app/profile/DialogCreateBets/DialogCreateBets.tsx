import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { NewMatch } from "./NewMatch/NewMatch"
import styles from "./dialogcreatebets.module.scss"
import { useNewBet } from "@/config/zustand-store"
import { AddMatchDay } from "@/config/firebase"
import { ICurrentMatch, IMatchDay, IErrorMatches, Team, Teams, IMatch } from "@/types/types"
import { ValidateNewBet } from "@/functions/functions"
import { TeamsLocalNames, TeamsNames } from "@/constants/constants"
import { useSnackbar } from "notistack"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber"
import { Divider } from "primereact/divider"
import { Message } from "primereact/message"
import { AutoComplete } from "primereact/autocomplete"
import { ConfirmDialog } from "primereact/confirmdialog"
import { Calendar } from "primereact/calendar"
interface Props {
	setView: Dispatch<SetStateAction<boolean>>
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

export function DialogCreatBets({ setView }: Props) {
	const { enqueueSnackbar } = useSnackbar()
	const [error, setError] = useState<IErrorEmpty>(initError)
	const [viewNewBet, setViewNewBet] = useState(false);
	const [matches, setMatches] = useState<IMatch[]>([])
	const [currentMatches, setCurrentMatches] = useState(0)
	const [matchDay, setMatchDay] = useState(0)

	const HandleChangeDay = () => {

	}

	const HandleCreateMatchDay = async () => {

	}

	const HandleCrearTeams = () => {
	}

	const handleAddMatch = (matches: number) => {
		setCurrentMatches(matches)
		const newMatch: IMatch = {
			awayTeam: "Guadalajara",
			homeTeam: "Cruz Azul",
			matchDay: 1
		}
		setMatches(prev => [...prev, newMatch])
	}

	return (
		<Dialog style={{ width: '95svw', maxWidth: '550px', height: '90svh' }} header="Crear Quiniela" visible onHide={() => setView(false)}>
			<section className=" flex flex-col  scrollbar">
				<header className="flex gap-2.5 justify-between">
					<Button onClick={HandleCreateMatchDay} label="Crear Quiniela" severity="success" icon="pi pi-plus" size="small" />
					<Button onClick={HandleCrearTeams} label="Reiniciar" severity="secondary" icon="pi pi-replay" size="small" />
				</header>
				<Divider type="dashed" />
				<article className="flex flex-col">
					{error.hasError && (
						<span className={styles.dialog_errorText}>{error.errorMatchDay ? "Elija un número de jornada" : "Existen campos vacíos"}</span>
					)}
					<div className="flex w-full justify-between items-end">
						<label className="flex flex-col gap-1 text-sm text-(--surface-500) ">
							Jornada
							<InputNumber invalid={error.errorMatchDay} size={2} value={matchDay} onChange={(e) => setMatchDay(e.value ?? 0)} showButtons min={0} max={25} className="mr-2 max-h-9" buttonLayout="horizontal" decrementButtonClassName="p-button-warning" incrementButtonClassName="p-button-warning" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
						</label>
						<Button label="Agregar partido" size="small" className="max-h-10" icon="pi pi-plus" onClick={() => setViewNewBet(true)} />
						{/*<label className="flex flex-col gap-1 text-sm text-(--surface-500)">
							Numero de partidos
							<InputNumber size={2} value={currentMatches} onChange={(e) => handleAddMatch(Number(e.value))} showButtons min={0} max={15} buttonLayout="horizontal" decrementButtonClassName="p-button-warning" incrementButtonClassName="p-button-warning" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
				</label>*/}
					</div>
					<Divider type="dashed" />
					<article className="flex flex-col gap-1.5">
						{matches.map((match, index) => (
							<div key={index} className="flex flex-row gap-3.5">
								<AutoComplete value={match.homeTeam} dropdown />
								<AutoComplete value={match.awayTeam} dropdown />
							</div>
						))

						}
					</article>
					{/*matches?.map((match, index) => (
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
					))*/}
				</article>
			</section>
			<ConfirmDialog
				visible={viewNewBet}
				onHide={() => setViewNewBet(false)}
				reject={() => setViewNewBet(false)}
				content={({ headerRef, contentRef, footerRef, hide, message }) => (
					<div className="flex flex-col items-center gap-3.5 w-full p-5 bg-(--surface-a) rounded-b-md">
						<span className="text-(--green-400) bg-[#07a52115] px-4 py-1 rounded-md">Nuevo partido</span>
						<div className="flex flex-col items-center gap-2" >
							<label className="flex flex-col text-(--surface-400) text-sm">
								Local
								<AutoComplete dropdown placeholder="Elige equipo" suggestions={TeamsLocalNames} />
							</label>
							<label className="flex flex-col w-full text-(--surface-400) text-sm">
								Fecha
								<Calendar className="w-full" placeholder="Elige fecha" />
							</label>
							<label className="flex flex-col text-(--surface-400) text-sm">
								Visitante
								<AutoComplete dropdown placeholder="Elige equipo" suggestions={TeamsLocalNames} />
							</label>
						</div>
						<div className="flex flex-row align-items-center gap-2 mt-4" >
							<Button
								label="Cancel"
								raised outlined
								severity="danger"
								icon="pi pi-plus-circle"
								onClick={(event) => {
									hide(event);
								}}
								className="w-8rem" size="small"
							/>
							<Button
								label="Agregar"
								raised outlined
								severity="success"
								icon="pi pi-plus-circle"
								onClick={(event) => {
									hide(event);
								}}
								className="w-8rem" size="small"
							/>
						</div>
					</div>
				)} />
		</Dialog>
	)
}

