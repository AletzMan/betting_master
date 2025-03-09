"use client"

import { useEffect, useState } from "react"
import { IMatchDay } from "@/types/types"
import { ButtonBet } from "./ButtonBet/ButtonBet"
import { TeamsLogos } from "@/constants/constants"
import { DialogCreatBets } from "./DialogCreateBets/DialogCreateBets"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { RevalidatePath, deleteMatchDay, getMatchDayInfo } from "@/utils/fetchData"
import { ToggleButton } from "primereact/togglebutton"
import { Loading } from "@/components/Loading/Loading"
import axios from "axios"

export function AdminPanel() {
	const [matchDayData, setMatchDayData] = useState<IMatchDay | null>(null)
	const [sending, setSending] = useState(false)
	const [loading, setLoading] = useState(true)
	const [viewCreateBets, setViewCreateBets] = useState(false)


	useEffect(() => {
		GetDay()
	}, [])

	const GetDay = async () => {
		try {
			const matchDayData = await getMatchDayInfo();
			if (matchDayData) {
				setMatchDayData(matchDayData);
			}
		} catch (error) {

		} finally {
			setLoading(false);
		}
	}


	const handleUpdateMatchDay = async () => {
		setSending(true)
		try {
			if (matchDayData) {
				const response = await axios.patch(`/api/matchdays/${matchDayData.id}`, {
					isAvailable: matchDayData.isAvailable,
					isFinishGame: matchDayData.isFinishGame,
					results: matchDayData?.results
				})
				if (response.status === 200) {
					RevalidatePath("matchDays")
					RevalidatePath("macthes")
					RevalidatePath("matchDayInfo")
					enqueueSnackbar("Quiniela actualizada correctamente", { variant: "success" })
					const data: IMatchDay = response.data.data
					setMatchDayData((prev) => ({ ...prev as IMatchDay, results: data.results, isAvailable: data.isAvailable, isFinishGame: data.isFinishGame }));
				}
			}
		} catch (error) {
			enqueueSnackbar("Error al actualizar", { variant: "error" })
			console.error(error)
		} finally {
			setSending(false)
		}

	}

	const handleCreateMatchDay = async () => {
		setViewCreateBets(true)
	}

	const HandleDeleteDayMatch = async () => {
		const deleteDay = confirm("Desea eliminar la jornada actual? \nSe eliminaran los partidos y quinelas creadas")
		if (deleteDay) {
			const response = await deleteMatchDay()
			if (response) {
				enqueueSnackbar("Jornada eliminadoa exitosamente", { variant: "success" })
			} else {
				enqueueSnackbar("No se puede eliminar la joranda actual", { variant: "error" })
			}
		}
	}

	const handleSetResults = (value: string, index: number) => {
		const results = [...matchDayData!.results as string[]]
		results[index] = value;
		setMatchDayData((prev) => ({ ...prev as IMatchDay, results: results }))
	}
	const handleSetStatus = (checked: boolean, type: 'isAvailable' | 'isFinishGame') => {

		setMatchDayData((prev) => ({ ...prev as IMatchDay, [`${type}`]: checked }))
	}

	return (
		<>
			{viewCreateBets && <DialogCreatBets setView={setViewCreateBets} />}
			<div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
				{loading && <Loading height="267px" />}
				{!loading && matchDayData &&
					<div>
						{matchDayData.day &&
							<header className="flex flex-col">
								<div className="flex justify-between items-center">
									<h3 className="text-sky-500">{`Jornada ${matchDayData.day}`}</h3>
									<Button label="Eliminar Jornada" severity="danger" icon="pi pi-trash" size="small" onClick={HandleDeleteDayMatch} />
								</div>
								<Divider type="dashed" />
								<div className="flex flex-row gap-2.5 justify-around ">
									<div className="flex gap-1.5 flex-col items-center">
										<label className="text-sm">¿Jornada Finalizada?</label>
										<ToggleButton className="min-w-15" checked={matchDayData.isFinishGame} onChange={(e) => handleSetStatus(e.target.value, "isFinishGame")} onLabel="Si" offLabel="No" />
									</div>
									<div className="flex gap-1.5 flex-col items-center">
										<label className="text-sm">¿Participación abierta?</label>
										<ToggleButton className="min-w-15" checked={matchDayData.isAvailable} onChange={(e) => handleSetStatus(e.target.value, "isAvailable")} onLabel="Si" offLabel="No" />
									</div>
								</div>
								<Divider type="dashed" />
							</header>
						}
						<article className="grid grid-cols-9 gap-1">
							{matchDayData?.matchesRel.map((match, index) => (
								<div key={match.awayTeam} className="flex flex-col max-w-12">
									<div className="flex flex-col justify-center">
										<span className="text-xs text-center">{TeamsLogos.find(logo => logo.id.toString() === match.homeTeam)?.abbName}</span>
										<span className="text-xs text-center text-amber-300">{"vs"}</span>
										<span className="text-xs text-center">{TeamsLogos.find(logo => logo.id.toString() === match.awayTeam)?.abbName}</span>
									</div>
									{matchDayData.day && (
										<ButtonBet actualPrediction={matchDayData.results[index] as string} onChange={(value) => handleSetResults(value, index)} />
									)}
								</div>
							))}
						</article>

					</div>
				}
				{matchDayData === null && !loading &&
					<div className="flex flex-col items-center gap-6">
						<i className="pi pi-ban text-red-600" style={{ fontSize: "4em" }} />
						<p>No se ha creado la quiniela de la semana</p>
					</div>
				}
				<Divider type="dashed" />
				{<footer className="flex justify-around gap-6">
					{<Button
						label="Crear quiniela"
						icon="pi pi-plus"
						size="small"
						disabled={matchDayData !== null || loading}
						severity="success"
						onClick={handleCreateMatchDay}
						outlined />
					}
					{matchDayData && matchDayData.day !== 0 && matchDayData.day &&
						<Button
							className=" "
							label={!sending ? "Actualizar" : "Enviando..."}
							icon={sending ? "pi pi-spin pi-spinner-dotted" : "pi pi-refresh"}
							disabled={sending || loading}
							size="small"
							severity="success"
							onClick={handleUpdateMatchDay} />}
				</footer>}
			</div>
		</>
	)
}

