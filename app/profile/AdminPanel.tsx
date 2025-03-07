"use client"

import { useEffect, useState } from "react"
import { IMatchDay } from "@/types/types"
import { ButtonBet } from "./ButtonBet/ButtonBet"
import { TeamsLogos } from "@/constants/constants"
import { DialogCreatBets } from "./DialogCreateBets/DialogCreateBets"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { IMatchDayData, RevalidatePath, getMatchDayData } from "@/utils/fetchData"
import { ToggleButton } from "primereact/togglebutton"
import { Loading } from "@/components/Loading/Loading"
import axios from "axios"

export function AdminPanel() {
	const [matchDayData, setMatchDayData] = useState<IMatchDayData>({ matchDay: {} as IMatchDay, matches: [] })
	const [sending, setSending] = useState(false)
	const [loading, setLoading] = useState(true)
	const [viewCreateBets, setViewCreateBets] = useState(false)


	useEffect(() => {
		GetDay()
	}, [])

	const GetDay = async () => {
		try {
			const matchDayData = await getMatchDayData();
			if (matchDayData) {
				setMatchDayData(matchDayData);
			}
		} catch (error) {

		} finally {
			setLoading(false);
		}
	}


	const HandleUpdate = async () => {
		setSending(true)
		try {
			const response = await axios.patch(`/api/matchdays/${matchDayData.matchDay.id}`, {
				isAvailable: matchDayData.matchDay.isAvailable,
				isFinishGame: matchDayData.matchDay.isFinishGame,
				results: matchDayData.matchDay.results
			})
			if (response.status === 200) {
				RevalidatePath("matchDays")
				RevalidatePath("macthes")
				enqueueSnackbar("Quiniela actualizada correctamente", { variant: "success" })
				const data: IMatchDay = response.data.data
				setMatchDayData((prev) => ({ ...prev, matchDay: { ...prev.matchDay, results: data.results, isAvailable: data.isAvailable, isFinishGame: data.isFinishGame } }));
			}
		} catch (error) {
			enqueueSnackbar("Error al actualizar", { variant: "error" })
			console.error(error)
		} finally {
			setSending(false)
		}

	}

	const HandleCreate = async () => {
		setViewCreateBets(true)
	}

	const HandleDeleteDayMatch = async () => {

	}

	const handleSetResults = (value: string, index: number) => {
		const results = [...matchDayData.matchDay.results as string[]]
		results[index] = value;
		setMatchDayData((prev) => ({ ...prev, matchDay: { ...prev.matchDay, results: results } }))
	}
	const handleSetStatus = (checked: boolean, type: 'isAvailable' | 'isFinishGame') => {
		const matchDayStatus = { ...matchDayData.matchDay }
		matchDayStatus[type] = checked
		setMatchDayData((prev) => ({ ...prev, matchDay: { ...matchDayStatus } }))
	}
	console.log(matchDayData)
	return (
		<>
			{viewCreateBets && <DialogCreatBets setView={setViewCreateBets} />}
			<div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
				{loading && <Loading height="267px" />}
				{!loading &&
					<div>
						{matchDayData.matchDay.day &&
							<header className="flex flex-col">
								<div className="flex justify-between items-center">
									<h3 className="text-sky-500">{`Jornada ${matchDayData.matchDay.day}`}</h3>
									<Button label="Eliminar Jornada" severity="danger" icon="pi pi-trash" size="small" onClick={HandleDeleteDayMatch} />
								</div>
								<Divider type="dashed" />
								<div className="flex flex-row gap-2.5 justify-around ">
									<div className="flex gap-1.5 flex-col items-center">
										<label className="text-sm">¿Jornada Finalizada?</label>
										<ToggleButton className="min-w-15" checked={matchDayData.matchDay.isFinishGame} onChange={(e) => handleSetStatus(e.target.value, "isFinishGame")} onLabel="Si" offLabel="No" />
									</div>
									<div className="flex gap-1.5 flex-col items-center">
										<label className="text-sm">¿Participación abierta?</label>
										<ToggleButton className="min-w-15" checked={matchDayData.matchDay.isAvailable} onChange={(e) => handleSetStatus(e.target.value, "isAvailable")} onLabel="Si" offLabel="No" />
									</div>
								</div>
								<Divider type="dashed" />
							</header>
						}
						<article className="grid grid-cols-9 gap-1">
							{matchDayData?.matches.map((match, index) => (
								<div key={match.awayTeam} className="flex flex-col max-w-12">
									<div className="flex flex-col justify-center">
										<span className="text-xs text-center">{TeamsLogos.find(logo => logo.id.toString() === match.homeTeam)?.abbName}</span>
										<span className="text-xs text-center text-amber-300">{"vs"}</span>
										<span className="text-xs text-center">{TeamsLogos.find(logo => logo.id.toString() === match.awayTeam)?.abbName}</span>
									</div>
									{matchDayData.matchDay && (
										<ButtonBet actualPrediction={matchDayData.matchDay?.results[index] as string} onChange={(value) => handleSetResults(value, index)} />
									)}
								</div>
							))}
						</article>
						{!matchDayData.matchDay.day &&
							<div className="flex flex-col items-center gap-6">
								<i className="pi pi-ban text-red-600" style={{ fontSize: "4em" }} />
								<p>No se ha creado la quiniela de la semana</p>
							</div>
						}
					</div>
				}
				<Divider type="dashed" />
				<footer className="flex justify-around gap-6">
					{<Button
						label="Crear quiniela"
						icon="pi pi-plus"
						size="small"
						disabled={matchDayData!.matchDay!.results?.length > 0 || loading}
						severity="success"
						onClick={HandleCreate}
						outlined />
					}
					{matchDayData.matchDay.day !== 0 && matchDayData.matchDay.day &&
						<Button
							className=" "
							label={!sending ? "Actualizar" : "Enviando..."}
							icon={sending ? "pi pi-spin pi-spinner-dotted" : "pi pi-refresh"}
							disabled={sending || loading}
							size="small"
							severity="success"
							onClick={HandleUpdate} />}
				</footer>
			</div>
		</>
	)
}

