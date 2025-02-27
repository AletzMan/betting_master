import { Dispatch, ReactSVGElement, SetStateAction, useEffect, useRef, useState } from "react"
import { NewMatch } from "./NewMatch"
import { useNewBet } from "@/config/zustand-store"
import { TeamsLogosNews, TeamsNames } from "@/constants/constants"
import { enqueueSnackbar } from "notistack"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputNumber } from "primereact/inputnumber"
import { Divider } from "primereact/divider"
import { ConfirmDialog } from "primereact/confirmdialog"
import React from "react"
import { SmallDateLocalAndTime } from "@/utils/helpers"
import axios, { AxiosError } from "axios"
import { ZodIssue } from "zod"
import { Message } from "primereact/message"
interface Props {
	setView: Dispatch<SetStateAction<boolean>>
}

interface IError {
	matches: { isError: boolean, message: string }
	day: { isError: boolean, message: string }
	season: { isError: boolean, message: string }
}

const initError: IError = {
	matches: { isError: false, message: "" },
	day: { isError: false, message: "" },
	season: { isError: false, message: "" },
}

export function DialogCreatBets({ setView }: Props) {
	const [errors, setErrors] = useState<IError>(initError);
	const [viewNewBet, setViewNewBet] = useState(false);
	const [resetView, setResetView] = useState(false);
	const bettingMatches = useNewBet((state) => state.bettingMatches);
	const setBettingMatches = useNewBet((state) => state.setBettingMatches);
	const clearBettingMatches = useNewBet((state) => state.clearBettingMatches);
	const [matchDay, setMatchDay] = useState(1);
	const [loading, setLoading] = useState(false);
	const refMatches = useRef<HTMLElement | null>(null);


	useEffect(() => {
		if (refMatches.current) {
			refMatches.current.scrollTo({
				top: refMatches.current.scrollHeight,
				behavior: "smooth",
			});
			setErrors((prev) => {
				const newErros = { ...prev, matches: { isError: false, message: "" } }
				return newErros
			})
		}
	}, [bettingMatches])


	const handleDeleteMatch = (index: number) => {
		const element = document.querySelectorAll(`.matchOfDay`)[index];
		if (element) {
			element.classList.add("delete-exit", "delete-exit-active");
			setTimeout(() => {
				// 2. Actualizar el estado después de la animación
				element.classList.remove("delete-exit", "delete-exit-active");
				const prevMatches = [...bettingMatches]
				prevMatches.splice(index, 1);
				setBettingMatches(prevMatches);
			}, 300); // Esperar a que termine la animación
		}

	}

	const HandleCreateMatchDay = async () => {
		setLoading(true);
		try {
			const response = await axios.post(`/api/matchdays`,
				{
					day: matchDay,
					season: getCurrentSeason(),
					matches: bettingMatches
				})
			if (response.status === 201) {
				enqueueSnackbar("Quiniela creada con exito", { variant: "success" });
				setView(false);
				clearBettingMatches();
				setMatchDay(1);
			}
		} catch (error) {
			console.log(error)
			if (error instanceof AxiosError) {
				const newErrors = { ...errors }
				if (error.response?.status === 422) {
					const errorArray: ZodIssue[] = error?.response?.data.issues
					errorArray.map(issue => {
						if (issue.path[0] === "matches" || issue.path[0] === "day" || issue.path[0] === "season") {
							newErrors[issue.path[0]].isError = true
							newErrors[issue.path[0]].message = issue.message
						}
					})
					setErrors(newErrors);
					enqueueSnackbar("Existen campos vacíos o incompletos", { variant: "error" });
				}
			}
		} finally {
			setLoading(false);
		}
	}

	const handleClearMatches = () => {
		clearBettingMatches();
		setResetView(false);
	}
	return (
		<Dialog style={{ width: '95svw', maxWidth: '550px', height: '95svh' }} header="Crear Quiniela" visible onHide={() => setView(false)}>
			<section className=" flex flex-col  scrollbar">
				<header className="flex gap-2.5 justify-between">
					<Button onClick={HandleCreateMatchDay} label="Guardar" severity="success" loading={loading} loadingIcon="pi pi-spin pi-spinner-dotted" icon="pi pi-save" size="small" disabled={bettingMatches.length === 0} />
					<Button onClick={() => setResetView(true)} label="Reiniciar" severity="secondary" icon="pi pi-replay" size="small" disabled={bettingMatches.length === 0} />
				</header>
				<Divider type="dashed" />
				<article className="flex flex-col">
					<div className="flex flex-col">
						<span className="text-center bg-(--surface-e) rounded-sm">{getCurrentSeason()}</span>
						<div className="flex w-full justify-between items-end">
							<label className="flex flex-col gap-1 text-sm text-(--surface-500) ">
								Jornada
								<InputNumber
									invalid={errors.day.isError}
									size={2} value={matchDay}
									onChange={(e) => {
										setMatchDay(e.value ?? 0)
										setErrors((prev) => {
											const newErros = { ...prev, day: { isError: false, message: "" } }
											return newErros
										})
									}}
									showButtons min={1} max={25}
									className="mr-2 max-h-10.5"
									buttonLayout="horizontal"
									disabled={bettingMatches.length > 0}
									decrementButtonClassName="p-button-primary"
									incrementButtonClassName="p-button-primary"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus" />
							</label>
							<Button label="Agregar partido" size="small" outlined raised severity="success" disabled={matchDay === 0} icon="pi pi-plus" onClick={() => setViewNewBet(true)} />
						</div>
					</div>
					<Divider type="dashed" />
					<article className="flex flex-col justify-items-start gap-5 scrollbar h-[calc(100svh-24.5em)] pt-4" ref={refMatches}>
						{errors.matches.isError && <Message text={errors.matches.message} severity="error" />}
						{bettingMatches.map((match, index) => (
							<div key={index} className="relative grid grid-cols-[2em_2em_repeat(2,1fr)_2em_3em] w-full bg-(--surface-0) border-1 border-(--surface-d) place-content-center place-items-center py-1 rounded-md transition-all duration-250 matchOfDay">
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
			<NewMatch viewNewBet={viewNewBet} setViewNewBet={setViewNewBet} matchDay={matchDay} />
			<ConfirmDialog
				visible={resetView}
				accept={handleClearMatches}
				reject={() => setResetView(false)}
				icon="pi pi-trash"
				acceptLabel="Si"
				header={
					<div className="flex flex-row items-center gap-2.5 text-red-600">
						<span className="text-sm">Eliminar</span>
					</div>}
				message={
					<div className="flex flex-col gap-2.5 items-center">
						<p>Confirmar eliminación de partidos.</p>
					</div>
				} />
		</Dialog>
	)
}

const getCurrentSeason = () => {
	const date = new Date();
	let season = date.getMonth() >= 0 && date.getMonth() <= 6 ? "Clausura" : "Apertura"
	return `${season} ${date.getFullYear()}`
}