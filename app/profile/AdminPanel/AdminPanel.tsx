"use client"

import styles from "./adminpanel.module.scss"
import { ChangeEvent, useEffect, useState } from "react"
import { AddResults, GetCurrentMatchDay, GetResultsByDay, UpdateResultsMatchDay } from "@/app/config/firebase"
import { ICurrentMatch, IResultsMatches } from "@/app/types/types"
import { ButtonBet } from "../ButtonBet/ButtonBet"
import { LoadingIcon } from "@/app/svg"
import { TeamsLogos } from "@/app/constants/constants"
import { DialogCreatBets } from "../DialogCreateBets/DialogCreateBets"

export function AdminPanel() {
	const [matchDay, setMatchDay] = useState<number | undefined>(undefined)
	const [results, setResults] = useState<IResultsMatches>({} as IResultsMatches)
	const [matches, setMatches] = useState<ICurrentMatch[]>([])
	const [resultsByMatch, setResultByMatch] = useState<string[]>(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
	const [statusGame, setStatusGame] = useState(false)
	const [sending, setSending] = useState(false)
	const [viewCreateBets, setViewCreateBets] = useState(false)
	const [numberCorrectPicks, setNumberCorrectPicks] = useState(results.winner_correct_pick | 0)

	const GetDay = async () => {
		const response = await GetCurrentMatchDay("0159")
		const result = await GetResultsByDay(response.day.toString())
		setMatches(response.matches)
		setMatchDay(response.day)
		if (result) {
			setResults(result)
			setResultByMatch(result.results)
			setStatusGame(result.status === "finished")
			setNumberCorrectPicks(result.winner_correct_pick)
		}
	}

	const HandleUpdate = async () => {
		if (matchDay) {
			setSending(true)
			const newResults: IResultsMatches = {
				day: matchDay.toString(),
				results: resultsByMatch,
				status: statusGame ? "finished" : "in game",
				winner_correct_pick: numberCorrectPicks,
			}
			const result = await AddResults(newResults)
			const update = UpdateStatusMatches(matches, resultsByMatch)
			await UpdateResultsMatchDay(resultsByMatch, update, "0159")
			if (result === "OK") {
				setSending(false)
			}
		}
	}

	const HandleCreate = async () => {
		setViewCreateBets(true)
	}

	const HandleSetCorrects = (e: ChangeEvent<HTMLInputElement>) => {
		const correctsPicks = parseInt(e.currentTarget.value)
		setNumberCorrectPicks(correctsPicks)
	}

	useEffect(() => {
		GetDay()
	}, [])

	return (
		<>
			{viewCreateBets && <DialogCreatBets setView={setViewCreateBets} />}
			<div className={styles.admin}>
				<h2 className={styles.admin_title}>Panel de administrador</h2>
				<section className={styles.admin_section}>
					<h3 className={styles.admin_sectionTitle}>{`Jornada ${matchDay}`}</h3>
					<div className={`${styles.admin_status} ${statusGame && styles.admin_statusActive}`}>
						<input className={styles.admin_statusInput} type="checkbox" checked={statusGame} onChange={() => setStatusGame((prev) => !prev)} />
						<div className={`${styles.admin_statusButton} ${statusGame && styles.admin_statusButtonActive}`}></div>
						<span className={styles.admin_statusText}>{statusGame ? "Finalizada" : "En juego"}</span>
					</div>
					<div className={`${styles.admin_corrects}`}>
						<input className={styles.admin_correctsInput} type="number" value={numberCorrectPicks} onChange={HandleSetCorrects} />
						<span className={styles.admin_correctsText}>{"Aciertos"}</span>
					</div>
					<article className={styles.admin_results}>
						{matches.map((match, index) => (
							<div key={match.teams.away} className={styles.admin_resultsMatch}>
								<div className={styles.admin_resultsMatchNames}>
									<span className={styles.admin_resultsMatchNamesHome}>{TeamsLogos[match.teams.home]?.abbName}</span>
									<span className={styles.admin_resultsMatchNamesVS}>{"vs"}</span>
									<span className={styles.admin_resultsMatchNamesAway}>{TeamsLogos[match.teams.away]?.abbName}</span>
								</div>
								{resultsByMatch && (
									<ButtonBet index={index} setResultMatch={setResultByMatch} resultMatches={resultsByMatch} actualPrediction={resultsByMatch[index]} />
								)}
							</div>
						))}
					</article>
					<footer className={styles.admin_footer}>
						<button className={styles.admin_create} onClick={HandleCreate}>
							Crear nueva quiniela
						</button>
						<button className={styles.admin_update} onClick={HandleUpdate}>
							{!sending && "Actualizar"}
							{sending && <LoadingIcon className={styles.admin_updateIcon} />}
						</button>
					</footer>
				</section>
			</div>
		</>
	)
}

const GetFinishAndLiveMatches = (results: string[]): number[][] => {
	let arrayIndex: number[][] = [[], []]
	for (let index = 0; index < results.length; index++) {
		if (results[index] !== "-" && results[index] !== "L") {
			arrayIndex[0].push(index)
		} else if (results[index] === "L") {
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
