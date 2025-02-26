import { Dispatch, ReactSVGElement, SetStateAction, useEffect, useRef, useState } from "react"
import { NewMatch } from "./NewMatch/NewMatch"
import styles from "./dialogcreatebets.module.scss"
import { useNewBet } from "@/config/zustand-store"
import { AddMatchDay } from "@/config/firebase"
import { ICurrentMatch, IMatchDay, IErrorMatches, Team, Teams, IMatch } from "@/types/types"
import { ValidateNewBet } from "@/functions/functions"
import { TeamsLocalNames, TeamsLogosNews, TeamsNames } from "@/constants/constants"
import { useSnackbar } from "notistack"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber"
import { Divider } from "primereact/divider"
import { Message } from "primereact/message"
import { AutoComplete } from "primereact/autocomplete"
import { ConfirmDialog } from "primereact/confirmdialog"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { Nullable } from "primereact/ts-helpers"
import React from "react"
import { classNames } from "primereact/utils"
import { SmallDateLocal, SmallDateLocalAndTime } from "@/utils/helpers"
import { Ripple } from "primereact/ripple"
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
	const selectedTeams = useNewBet((state) => state.selectedTeams);
	const setSelectedTeams = useNewBet((state) => state.setSelectedTeams);
	const [matchDay, setMatchDay] = useState(0)
	const refMatches = useRef<HTMLElement | null>(null)


	useEffect(() => {
		if (refMatches.current) {
			refMatches.current.scrollTo({
				top: refMatches.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [selectedTeams])


	const handleDeleteMatch = (index: number) => {
		const prevMatches = [...selectedTeams]
		prevMatches.splice(index, 1);
		setSelectedTeams(prevMatches);
	}

	const HandleCreateMatchDay = async () => {

	}

	const HandleCrearTeams = () => {
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
					</div>
					<Divider type="dashed" />
					<article className="flex flex-col justify-items-start gap-5 scrollbar h-[calc(100svh-22.5em)] pt-4" ref={refMatches}>
						{selectedTeams.map((match, index) => (
							<div key={index} className="relative grid grid-cols-[2em_2em_repeat(2,1fr)_2em_3em] w-full bg-(--surface-0) border-1 border-(--surface-d) place-content-center place-items-center py-1 rounded-md">
								<span className="absolute text-xs -top-3.5 bg-(--pink-900) border-1 border-(--surface-d) rounded-sm px-1 py-0.5">{match.startDate?.toLocaleDateString("es-MX", SmallDateLocalAndTime)}</span>
								<span className="flex items-center justify-center text-sm bg-(--cyan-900) rounded-xl w-5 h-5">{index + 1}</span>
								{React.isValidElement(TeamsLogosNews.find(team => team.id.toString() === match.homeTeam)?.logo) &&
									React.cloneElement(TeamsLogosNews.find(team => team.id.toString() === match.homeTeam)?.logo as ReactSVGElement, { className: "w-6 h-6" })}
								<span className={`text-sm text-(--surface-500) text-center`}>{TeamsNames.find(team => team.id === match.homeTeam)?.name}</span>
								<span className={`text-sm text-(--surface-500) text-center`}>{TeamsNames.find(team => team.id === match.awayTeam)?.name}</span>
								{React.isValidElement(TeamsLogosNews.find(team => team.id.toString() === match.awayTeam)?.logo) &&
									React.cloneElement(TeamsLogosNews.find(team => team.id.toString() === match.awayTeam)?.logo as ReactSVGElement, { className: "w-6 h-6" })}
								<Button icon="pi pi-trash" severity="danger" raised text size="small" onClick={() => handleDeleteMatch(index)} />
							</div>
						))

						}
					</article>
				</article>
			</section>
			<NewMatch viewNewBet={viewNewBet} setViewNewBet={setViewNewBet} />
		</Dialog>
	)
}

