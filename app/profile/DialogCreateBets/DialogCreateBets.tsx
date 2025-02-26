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
import { Dropdown } from "primereact/dropdown"
import { Nullable } from "primereact/ts-helpers"
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
	const [matchDay, setMatchDay] = useState(0)

	const HandleChangeDay = () => {

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
					<article className="flex flex-col gap-1.5">
						{selectedTeams.map((match, index) => (
							<div key={index} className="flex flex-row gap-3.5">
								<span>{match.homeTeam}</span>
								<span>{match.awayTeam}</span>
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

