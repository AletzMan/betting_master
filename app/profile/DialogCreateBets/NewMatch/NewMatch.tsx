/* eslint-disable react-hooks/exhaustive-deps */
import { TeamsNames, TeamsLogos } from "@/constants/constants"
import styles from "./newmatch.module.scss"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useEffect, useState } from "react"
import { useNewBet } from "@/config/zustand-store"
import { IMatch, Team, Teams } from "@/types/types"
import { ComboBox } from "@/components/ComboBox/ComboBox"
import { Calendar } from "primereact/calendar"
import { Nullable } from "primereact/ts-helpers"
import { ConfirmDialog } from "primereact/confirmdialog"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"
import { MatchSchema } from "@/validations/matchDaySchema"
import { enqueueSnackbar } from "notistack"
import axios from "axios"
import { ZodError } from "zod"

interface Props {
	viewNewBet: boolean,
	setViewNewBet: Dispatch<SetStateAction<boolean>>
}

export function NewMatch({ viewNewBet, setViewNewBet }: Props) {
	const [match, setMatch] = useState<IMatch>({ homeTeam: "", awayTeam: "", startDate: null })
	const [errors, setErrors] = useState({ homeTeam: false, startDate: false, awayTeam: false })
	const setSelectedTeams = useNewBet((state) => state.setSelectedTeams);
	const selectedTeams = useNewBet((state) => state.selectedTeams);

	const handleAddMatch = async () => {
		try {
			const validateData = await MatchSchema.parseAsync(match)
			setSelectedTeams([...selectedTeams, validateData]);
			setViewNewBet(false)
			setMatch({ homeTeam: "", awayTeam: "", startDate: null })
			enqueueSnackbar("Partido agregado correctamente", { variant: "success" })
		} catch (error) {
			if (error instanceof ZodError) {
				enqueueSnackbar("Favor de llenar los campos requeridos", { variant: "error" })
				const newErrors = { homeTeam: false, startDate: false, awayTeam: false }
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
				<div className="flex flex-col items-center gap-3.5 w-full p-5 bg-(--surface-a) rounded-b-md">
					<span className="text-(--green-400) bg-[#07a52115] px-4 py-1 rounded-md">Nuevo partido</span>
					<div className="flex flex-col items-center gap-2" >
						<label className="flex flex-col text-(--surface-400) text-sm w-full">
							Local
							<Dropdown invalid={errors.homeTeam} value={TeamsNames.find(team => team.id === match.homeTeam)} options={TeamsNames} placeholder="Elige equipo" onChange={(e) => handleSetTeam(e.target.value, 'homeTeam')} className="w-full" optionLabel="name" />
						</label>
						<label className="flex flex-col w-full text-(--surface-400) text-sm">
							Fecha
							<Calendar invalid={errors.startDate} className="w-full" placeholder="Elige fecha" showTime hourFormat="24" touchUI value={match.startDate} onChange={(e) => handleSetDate(e.value)} />
						</label>
						<label className="flex flex-col text-(--surface-400) text-sm w-full">
							Visitante
							<Dropdown invalid={errors.awayTeam} value={TeamsNames.find(team => team.id === match.awayTeam)} options={TeamsNames} placeholder="Elige equipo" onChange={(e) => handleSetTeam(e.target.value, 'awayTeam')} className="w-full" optionLabel="name" />
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
							onClick={handleAddMatch}
							className="w-8rem" size="small"
						/>
					</div>
				</div>
			)} />
	)
}
