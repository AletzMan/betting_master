/* eslint-disable react-hooks/exhaustive-deps */
import { TeamsNames } from "@/constants/constants"
import { Dispatch, SetStateAction, useState } from "react"
import { useNewBet } from "@/config/zustand-store"
import { IMatch, Team } from "@/types/types"
import { Calendar } from "primereact/calendar"
import { Nullable } from "primereact/ts-helpers"
import { ConfirmDialog } from "primereact/confirmdialog"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"
import { MatchSchema } from "@/validations/matchDaySchema"
import { enqueueSnackbar } from "notistack"
import { ZodError } from "zod"

interface Props {
	viewNewBet: boolean,
	setViewNewBet: Dispatch<SetStateAction<boolean>>
	matchDay: number
}

export function NewMatch({ viewNewBet, setViewNewBet, matchDay }: Props) {
	const [match, setMatch] = useState<IMatch>({ homeTeam: "", awayTeam: "", startDate: null, matchDay })
	const [errors, setErrors] = useState({ homeTeam: false, startDate: false, awayTeam: false })
	const setBettingMatches = useNewBet((state) => state.setBettingMatches);
	const bettingMatches = useNewBet((state) => state.bettingMatches);


	const handleAddMatch = async () => {
		try {
			const validateData = await MatchSchema.parseAsync(match)
			setBettingMatches([...bettingMatches, validateData]);
			setMatch({ ...match, homeTeam: "", awayTeam: "", matchDay: 0, status: "not started" })
			enqueueSnackbar("Partido agregado correctamente", { variant: "info" })
			setViewNewBet(false)
		} catch (error) {
			if (error instanceof ZodError) {
				enqueueSnackbar("Favor de llenar los campos requeridos", { variant: "error" })
				const newErrors = { homeTeam: false, startDate: false, awayTeam: false }
				console.error(error?.issues)
				error?.issues?.map(issue => {
					if (issue.path[0] === "homeTeam" || issue.path[0] === "awayTeam" || issue.path[0] === "startDate")
						newErrors[issue.path[0]] = true
				})
				setErrors({ ...newErrors })
			}
		}
	}
	const handleSetTeam = (value: Team, team: 'homeTeam' | 'awayTeam') => {
		setMatch((prev) => ({
			...prev,
			[`${team}`]: value.id,
		}));
		setErrors((prev) => ({
			...prev,
			[`${team}`]: false,
		}));
	}

	const handleSetDate = (date: Nullable<Date>) => {
		setMatch((prev) => ({
			...prev,
			startDate: date,
		}));
		setErrors((prev) => ({
			...prev,
			startDate: false,
		}));
	}

	return (
		<ConfirmDialog
			visible={viewNewBet}
			onHide={() => setViewNewBet(false)}
			reject={() => setViewNewBet(false)}
			content={({ headerRef, contentRef, footerRef, hide, message }) => (
				<div className="flex flex-col items-center gap-3.5 w-full min-w-2xs p-5 bg-(--surface-a) rounded-b-md">
					<div className="flex flex-col gap-1.5">
						<span className="flex gap-3 items-center text-(--yellow-400) text-center px-4 py-1 rounded-md"><i className="pi pi-file-plus"></i>{`Jornada ${matchDay}`}</span>
					</div>
					<div className="flex flex-col items-center gap-2 w-full" >
						<label className="flex flex-col text-(--surface-400) text-sm w-full">
							Local
							<Dropdown
								invalid={errors.homeTeam}
								value={TeamsNames.find(team => team.id === match.homeTeam)}
								options={TeamsNames}
								placeholder="Equipo Local"
								onChange={(e) => handleSetTeam(e.target.value, 'homeTeam')}
								className="w-full"
								optionLabel="name" />
						</label>
						<label className="flex flex-col w-full text-(--surface-400) text-sm">
							Fecha
							<Calendar invalid={errors.startDate} className="w-full" minDate={new Date()} placeholder="Elige fecha" showTime hourFormat="24" touchUI value={match.startDate} onChange={(e) => handleSetDate(e.value)} />
						</label>
						<label className="flex flex-col text-(--surface-400) text-sm w-full">
							Visitante
							<Dropdown
								invalid={errors.awayTeam}
								value={TeamsNames.find(team => team.id === match.awayTeam)}
								options={TeamsNames}
								placeholder="Equipo Visitante"
								onChange={(e) => handleSetTeam(e.target.value, 'awayTeam')}
								className="w-full"
								optionLabel="name" />
						</label>
					</div>
					<div className="flex flex-row align-items-center justify-between w-full gap-2 mt-4" >
						<Button
							label="Cancel"
							raised
							severity="danger"
							icon="pi pi-times"
							onClick={(event) => {
								hide(event);
								setMatch({ homeTeam: "", awayTeam: "", startDate: null, matchDay: 0, status: "not started" });
								setErrors({ homeTeam: false, startDate: false, awayTeam: false });
							}}
							size="small" className="w-8rem"
						/>
						<Button
							label="Agregar"
							raised
							severity="success"
							icon="pi pi-plus"
							onClick={handleAddMatch}
							size="small" className="w-8rem"
						/>
					</div>
				</div>
			)} />
	)
}
