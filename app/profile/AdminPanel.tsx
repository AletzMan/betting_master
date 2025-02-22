"use client"

import { useEffect, useState } from "react"
import { AddResults, DeleteMatchDay, GetCurrentMatchDay, GetResultsByDay, UpdateResultsMatchDay } from "@/app/config/firebase"
import { ICurrentMatch, IResultsMatches } from "@/app/types/types"
import { ButtonBet } from "./ButtonBet/ButtonBet"
import { TeamsLogos } from "@/app/constants/constants"
import { DialogCreatBets } from "./DialogCreateBets/DialogCreateBets"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputSwitch } from "primereact/inputswitch"

export function AdminPanel() {
	const [matchDay, setMatchDay] = useState<number | undefined>(0)
	const [matches, setMatches] = useState<ICurrentMatch[]>([])
	const [resultsByMatch, setResultByMatch] = useState<string[]>(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
	const [statusGame, setStatusGame] = useState(false)
	const [sending, setSending] = useState(false)
	const [viewCreateBets, setViewCreateBets] = useState(false)
	const [isAvailable, setIsAvailable] = useState(true)


	useEffect(() => {
		GetDay()
	}, [])

	const GetDay = async () => {
		const response = await GetCurrentMatchDay(new Date().getMonth() < 6 ? "0168" : "0159")
		const result = await GetResultsByDay(response.day.toString(), new Date().getMonth() < 6 ? "0168" : "0159")
		setMatches(response.matches)
		setMatchDay(response.day)
		if (result) {
			setResultByMatch(result.results)
			setStatusGame(result.status === "finished")
			setIsAvailable(result.isAvailable)
		}
	}


	const HandleUpdate = async () => {
		if (matchDay) {
			setSending(true)
			const newResults: IResultsMatches = {
				day: matchDay.toString(),
				results: resultsByMatch,
				status: statusGame ? "finished" : "in game",
				winner_correct_pick: 0,
				isAvailable
			}
			const result = await AddResults(newResults, new Date().getMonth() < 6 ? "0168" : "0159")
			const update = UpdateStatusMatches(matches, resultsByMatch)
			await UpdateResultsMatchDay(resultsByMatch, update, new Date().getMonth() < 6 ? "0168" : "0159", isAvailable, statusGame)
			if (result === "OK") {
				setSending(false)
				enqueueSnackbar("Quiniela actualizada correctamente", { variant: "success" })

			}
		}
	}

	const HandleCreate = async () => {
		setViewCreateBets(true)
	}
	const HandleDeleteDayMatch = async () => {
		const deleteResponse = confirm(`Desea eliminar todas las quinielas de la jornada ${matchDay}`)
		if (deleteResponse) {
			const response = await DeleteMatchDay(new Date().getMonth() < 6 ? "0168" : "0159")
			if (response === "OK") {
				enqueueSnackbar("Quinielas eliminadas", { variant: "success" })
				await GetDay()
			} else {
				enqueueSnackbar("No se eliminaron las quinielas", { variant: "error" })
			}
		}
	}


	return (
		<>
			{viewCreateBets && <DialogCreatBets setView={setViewCreateBets} />}
			<div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
				{matchDay !== 0 &&
					<header className="flex flex-col">
						<div className="flex justify-between items-center">
							<h3 className="text-sky-500">{`Jornada ${matchDay}`}</h3>
							<Button label="Eliminar Jornada" severity="danger" icon="pi pi-trash" size="small" onClick={HandleDeleteDayMatch} />
						</div>
						<Divider type="dashed" />
						<div className="flex flex-row gap-2.5 justify-around ">
							<div className="flex gap-1.5 flex-col items-center">
								<label className="text-sm">¿Jornada en Juego?</label>
								<InputSwitch checked={!statusGame} onChange={() => setStatusGame((prev) => !prev)} />
							</div>
							<div className="flex gap-1.5 flex-col items-center">
								<label className="text-sm">¿Participación abierta?</label>
								<InputSwitch checked={isAvailable} onChange={() => setIsAvailable((prev) => !prev)} />
							</div>
						</div>
						<Divider type="dashed" />
					</header>}
				<article className="grid grid-cols-9 gap-1">
					{matches.map((match, index) => (
						<div key={match.teams.away} className="flex flex-col max-w-12">
							<div className="flex flex-col justify-center">
								<span className="text-xs text-center">{TeamsLogos[match.teams.home]?.abbName}</span>
								<span className="text-xs text-center text-amber-300">{"vs"}</span>
								<span className="text-xs text-center">{TeamsLogos[match.teams.away]?.abbName}</span>
							</div>
							{resultsByMatch && (
								<ButtonBet index={index} setResultMatch={setResultByMatch} resultMatches={resultsByMatch} actualPrediction={resultsByMatch[index]} />
							)}
						</div>
					))}
				</article>
				<Divider type="dashed" />
				<footer className="flex justify-around">
					<Button
						label="Crear quiniela"
						icon="pi pi-plus"
						size="small"
						disabled={false}
						severity="success"
						onClick={HandleCreate}
						outlined />
					{matchDay !== 0 &&
						<Button
							label={!sending ? "Actualizar" : "Enviando..."}
							icon={sending ? "pi pi-spin pi-spinner-dotted" : "pi pi-refresh"}
							disabled={sending}
							size="small"
							severity="success"
							onClick={HandleUpdate} />}
				</footer>
			</div>
		</>
	)
}

const GetFinishAndLiveMatches = (results: string[]): number[][] => {
	let arrayIndex: number[][] = [[], []]
	for (let index = 0; index < results.length; index++) {
		if (results[index] !== "-" && results[index] !== "LV") {
			arrayIndex[0].push(index)
		} else if (results[index] === "LV") {
			arrayIndex[1].push(index)
		}
	}
	return arrayIndex
}

const UpdateStatusMatches = (matches: ICurrentMatch[], results: string[]) => {
	const ArrayIndexModified = GetFinishAndLiveMatches(results)
	let newMatches = [...matches]
	matches.forEach((match, index) => {
		if (ArrayIndexModified[0].includes(index)) {
			newMatches[index].status = "Finalizado"
		} else if (ArrayIndexModified[1].includes(index)) {
			newMatches[index].status = "En juego"
		} else {
			newMatches[index].status = "Sin comenzar"
		}
	})
	return newMatches
}
