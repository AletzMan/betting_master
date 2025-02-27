import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./viewbets.module.scss"
import { IBet, IResultsMatches } from "@/types/types"
import { GetResultsByDay } from "@/config/firebase"
import { FinishedIcon, LiveIcon, LoseIcon, WinnerIcon } from "@/svg"
import { Loading } from "@/components/Loading/Loading"

interface PropsViewBets {
	bet: IBet
	setClose: Dispatch<SetStateAction<boolean>>
}

export function ViewBets(props: PropsViewBets) {
	const { bet, setClose } = props
	const [results, setResults] = useState<IResultsMatches | undefined>(undefined)
	const [isWinner, setIsWinner] = useState({ isWinner: false, corrects: 0 })
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		GetResults()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const GetResults = async () => {
		const result = await GetResultsByDay(bet.day, new Date().getMonth() < 6 ? "0168" : "0159")
		if (result) {
			ValidateWinner(result)
			setResults(result)
		}
		setLoading(false)
	}

	const ValidateWinner = (result: IResultsMatches) => {
		let correctPicks = 0
		result.results.forEach((pick, index) => {
			if (pick === bet.bets[index].prediction) {
				correctPicks++
			}
		})
		if (correctPicks === result?.winner_correct_pick) {
			setIsWinner({ isWinner: true, corrects: correctPicks })
		} else {
			setIsWinner({ isWinner: false, corrects: correctPicks })
		}
	}

	const HandleCloseView = () => {
		setClose(false)
	}

	return (
		<dialog className={styles.predictions} open={true}>
			<section className={styles.predictions_section}>
				<h3 className={styles.predictions_name}>{bet.name}</h3>
				<button className={styles.predictions_button} onClick={HandleCloseView}>
					Cerrar
				</button>
				{loading && <Loading />}
				{!loading && (
					<>
						<div className={styles.predictions_tags}>
							<span className={`${styles.predictions_status} ${results?.status !== "finished" && styles.predictions_statusLive}`}>
								{results?.status === "finished" ? (
									<FinishedIcon className={styles.predictions_winnerIcon} />
								) : (
									<LiveIcon className={styles.predictions_winnerIcon} />
								)}
								{results?.status === "finished" ? "Finalizada" : "En juego"}
							</span>
							{results?.status === "finished" && (
								<span className={`${styles.predictions_winner} ${isWinner.isWinner && styles.predictions_winnerOK}`}>
									{isWinner.isWinner ? (
										<WinnerIcon className={styles.predictions_winnerIcon} />
									) : (
										<LoseIcon className={styles.predictions_winnerIcon} />
									)}
									{isWinner.isWinner ? "Ganadora" : "No ganadora"}
								</span>
							)}
							<div className={`${styles.predictions_corrects} `}>
								<div className={`${styles.predictions_correctsNumber} `}>{isWinner.corrects}</div>
								<span className={`${styles.predictions_correctsText} `}>{"Aciertos"}</span>
							</div>
						</div>
						<h2 className={styles.predictions_title}>{`Jornada ${bet.day}`}</h2>
						<div className={styles.predictions_matches}>
							{bet.matches.map((match) => (
								<div key={match} className={styles.predictions_matchesMatch}>
									<span className={styles.predictions_matchesMatchHome}>{match.split("-")[0]}</span>
									<span className={styles.predictions_matchesMatchHome}>{"vs"}</span>
									<span className={styles.predictions_matchesMatchHome}>{match.split("-")[1]}</span>
								</div>
							))}
							{bet.bets.map((bet, index) => (
								<span className={`${styles.predictions_matchesBet} `} key={bet.id}>
									<span className={`${styles.predictions_matchesBetLetter} ${results?.results[index] === bet.prediction && styles.predictions_matchesBetWin}`}>
										{bet.prediction}
									</span>
								</span>
							))}
						</div>
					</>
				)}
			</section>
		</dialog>
	)
}
