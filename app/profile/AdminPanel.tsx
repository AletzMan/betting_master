"use client"

import { useEffect, useState } from "react"
import { DeleteMatchDay } from "@/config/firebase"
import { ICurrentMatch, IMatch, IMatchDay, IMatchesResponse } from "@/types/types"
import { ButtonBet } from "./ButtonBet/ButtonBet"
import { TeamsLogos } from "@/constants/constants"
import { DialogCreatBets } from "./DialogCreateBets/DialogCreateBets"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputSwitch } from "primereact/inputswitch"
import axios from "axios"
import { getMatchDayData } from "@/utils/fetchData"
import { ToggleButton } from "primereact/togglebutton"

export function AdminPanel() {
	const [matchDay, setMatchDay] = useState<IMatchDay | null>(null)
	const [matches, setMatches] = useState<IMatch[]>([])
	const [resultsByMatch, setResultByMatch] = useState<string[]>(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
	const [statusGame, setStatusGame] = useState(false)
	const [sending, setSending] = useState(false)
	const [loading, setLoading] = useState(false)
	const [viewCreateBets, setViewCreateBets] = useState(false)
	const [isAvailable, setIsAvailable] = useState(true)


	useEffect(() => {
		GetDay()
	}, [])

	const GetDay = async () => {
		setLoading(true);
		try {
			const matchDayData = await getMatchDayData();
			if (matchDayData) {
				setMatchDay(matchDayData.matchDay)
				setMatches(matchDayData.matches)
				setResultByMatch(matchDayData.matchDay?.results as string[])
			}
		} catch (error) {

		} finally {
			setLoading(false);
		}
	}


	const HandleUpdate = async () => {
		setSending(true)
		setSending(false)
		enqueueSnackbar("Quiniela actualizada correctamente", { variant: "success" })

	}

	const HandleCreate = async () => {
		setViewCreateBets(true)
	}
	const HandleDeleteDayMatch = async () => {


	}


	return (
		<>
			{viewCreateBets && <DialogCreatBets setView={setViewCreateBets} />}
			<div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
				{
					<header className="flex flex-col">
						<div className="flex justify-between items-center">
							<h3 className="text-sky-500">{`Jornada ${matchDay?.day}`}</h3>
							<Button label="Eliminar Jornada" severity="danger" icon="pi pi-trash" size="small" onClick={HandleDeleteDayMatch} />
						</div>
						<Divider type="dashed" />
						<div className="flex flex-row gap-2.5 justify-around ">
							<div className="flex gap-1.5 flex-col items-center">
								<label className="text-sm">¿Jornada en Juego?</label>
								<ToggleButton className="min-w-15" checked={statusGame} onChange={() => setStatusGame((prev) => !prev)} onLabel="Si" offLabel="No" />
							</div>
							<div className="flex gap-1.5 flex-col items-center">
								<label className="text-sm">¿Participación abierta?</label>
								<ToggleButton className="min-w-15" checked={isAvailable} onChange={() => setIsAvailable((prev) => !prev)} onLabel="Si" offLabel="No" />
							</div>
						</div>
						<Divider type="dashed" />
					</header>}
				<article className="grid grid-cols-9 gap-1">
					{matches.map((match, index) => (
						<div key={match.awayTeam} className="flex flex-col max-w-12">
							<div className="flex flex-col justify-center">
								<span className="text-xs text-center">{TeamsLogos.find(logo => logo.id.toString() === match.homeTeam)?.abbName}</span>
								<span className="text-xs text-center text-amber-300">{"vs"}</span>
								<span className="text-xs text-center">{TeamsLogos.find(logo => logo.id.toString() === match.awayTeam)?.abbName}</span>
							</div>
							{resultsByMatch && (
								<ButtonBet index={index} setResultMatch={setResultByMatch} resultMatches={resultsByMatch} actualPrediction={matchDay?.results[index] as string} />
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
					{matchDay?.day !== 0 &&
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
