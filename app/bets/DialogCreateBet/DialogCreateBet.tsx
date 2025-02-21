/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, MouseEvent, useState, ChangeEvent, useEffect } from "react"
import styles from "./dialodcreatebet.module.scss"
import { MatchBet } from "./MatchCalendar/MatchBet"
import { useBet, useUser } from "@/app/config/zustand-store"
import { AddBet, GetResultsByDay, auth } from "@/app/config/firebase"
import { CancelLogo, ExitLogo, FinishedIcon, HelpIcon, LoadingIcon, SendIcon, ViewIcon } from "@/app/svg"
import { Loading } from "@/app/components/Loading/Loading"
import { AbbNameMatches } from "@/app/functions/functions"
import { IMatchDay, IPredictions } from "@/app/types/types"
import axios from "axios"
import { enqueueSnackbar, useSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { Button } from "@/app/components/Button/Button"
import { IMyBets } from "../page"
import { TextField } from "@/app/components/TextFiled/TextFiled"

interface DialogProps {
	matches: IMatchDay
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	myBets: IMyBets
}

const EmptyBetPredictions: IPredictions[] = [
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
	{ id: "", prediction: "" },
]

export function DialogCreateBet({ open, setOpen, matches, myBets }: DialogProps) {
	const router = useRouter()
	const { user } = useUser()
	const { bets, setBets, setIsEmpty, error, typeError, setTypeError, setError } = useBet()
	const [name, setName] = useState("")
	const [betSentSuccessfully, setBetSentSuccessfully] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		let newBets: IPredictions[] = []
		for (let index = 0; index < matches.matches.length; index++) {
			newBets.push({ id: crypto.randomUUID(), prediction: "" })
		}
		setBets(newBets)
	}, [])


	const HandleStatusDialog = (status: boolean) => {
		setOpen(status)
		setBets(EmptyBetPredictions)
		setError(false)
		setIsEmpty(false)
		setTypeError("")
		setName("")
	}

	const HandleSendBet = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setLoading(true)
		const results = await GetResultsByDay(matches.day.toString(), new Date().getMonth() < 6 ? "0168" : "0159")
		if (results.isAvailable === false) {
			enqueueSnackbar("Tiempo agotado para enviar", { variant: "error" })
			setOpen(false)
			router.push("/bets")
			router.refresh()
			router.replace("/bets")
			return
		}
		try {


			const response = await axios.get("/api/login")
			if (response.status === 200) {
				const userInfo = response.data.userInfo
				if (bets.some((bet) => bet.prediction === "")) {
					setIsEmpty(true)
					setTypeError("empty")
					setError(true)
					enqueueSnackbar(Object.entries(Errors).find((error) => error[0] === "empty")?.[1], { variant: "error" })
				} else if (name === "") {
					setTypeError("name_empty")
					setError(true)
					enqueueSnackbar(Object.entries(Errors).find((error) => error[0] === "name_empty")?.[1], { variant: "error" })
				} else if (name.length < 5) {
					setTypeError("name_short")
					setError(true)
					enqueueSnackbar(Object.entries(Errors).find((error) => error[0] === "name_short")?.[1], { variant: "error" })
				} else {
					const response = AbbNameMatches(matches)
					const result = await AddBet({ id: crypto.randomUUID(), uid: user.uid, name, bets, day: matches.day.toString(), matches: response, userInfo, seasson: new Date().getMonth() < 6 ? `Clausura ${new Date().getFullYear()}` : `Apertura ${new Date().getFullYear()}`, season: new Date().getMonth() < 6 ? `Clausura ${new Date().getFullYear()}` : `Apertura ${new Date().getFullYear()}`, paid: false, tournament: matches.tournament })
					if (result === "OK") {
						enqueueSnackbar("Quiniela creada correctamente", { variant: "success" })
						setBetSentSuccessfully(true)
						setBets(EmptyBetPredictions)
						setError(false)
						setName("")
						setOpen(false)
					}
				}
			}
		} catch (error) {
			console.error(error)
			await signOut(auth)
			router.push("/auth/login")
			router.refresh()
		}
		setLoading(false)
	}

	const HandleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length < 13) {
			setName(e.currentTarget.value)
		}
		setTypeError("")
		setError(false)
	}

	return (
		<dialog className={styles.dialog} open={open}>
			<main className={styles.dialog_main}>
				<header className={styles.dialog_mainHeader}>
					<div className={styles.help}>
						<button className={styles.help_button}>
							<HelpIcon className={styles.help_icon} />
						</button>
						<div className={styles.help_window}>
							<p className={styles.help_message}>{`En cada partido, selecciona tu predicción haciendo clic en uno de los tres recuadros disponibles:`}</p>
							<p className={styles.help_message}>{`'L' para victoria del equipo local`}</p>
							<p className={styles.help_message}>{`'E' para empate `}</p>
							<p className={styles.help_message}>{`'V' para victoria del equipo visitante.`}</p>
							<p className={styles.help_message}>{`Asegúrate de elegir una opción para todos los partidos antes de guardar tu quiniela.`}</p>
						</div>
					</div>
					{myBets.hasBets && <div className={styles.mybets}>
						<button className={styles.mybets_button}>
							<ViewIcon className={styles.mybets_icon} />
							<span className={styles.mybets_text}>Ver mis quinielas</span>
						</button>
						<div className={`${styles.mybets_container} scrollbar`}>
							<header className={styles.mybets_header}>
								{myBets.bets[0].data.matches.map((match, index) => (
									<div key={match} className={styles.mybets_headerMatch}>
										<p className={styles.mybets_headerText}>{match.split("-")[0]}</p>
										<p className={styles.mybets_headerText}>vs</p>
										<p className={styles.mybets_headerText}>{match.split("-")[1]}</p>
									</div>
								))}
							</header>
							{

								myBets.bets.map(bet => (
									<div key={bet.id} className={styles.mybets_bet}>
										<span className={styles.mybets_title}>{bet.data.name}</span>
										<article>

											<main className={styles.mybets_main}>
												{bet.data.bets.map((result, index) => (
													<div key={index} className={styles.mybets_mainResult} >
														<p className={styles.mybets_mainText}>{result.prediction}</p>
													</div>
												))}
											</main>
										</article>
									</div >
								))
							}

						</div>
					</div>}
					<form className={styles.form}>
						<div className={styles.form_name}>
							<TextField aria-label="Nombre" className={`${typeError === "name_empty" || typeError === "name_short" || typeError === "empty" && styles.form_inputError}`} type="text" value={name} onChange={HandleChangeName} />

						</div>
						<div className={styles.form_buttons}>
							<Button
								props={{ onClick: HandleSendBet }}
								disabled={loading}
								text={loading ? "Enviando..." : "Enviar"}
								icon={loading ? <LoadingIcon className={styles.form_buttonIcon} /> : <SendIcon className={styles.form_buttonIcon} />}
							/>
							<Button
								props={{ onClick: () => HandleStatusDialog(false) }}
								text="Cancelar"
								icon={<CancelLogo className={styles.form_buttonIcon} />}
								type="secondary"
							/>
						</div>
					</form>
				</header>
				{loading && <Loading />}
				{!betSentSuccessfully && !loading &&
					<div className={`${styles.dialog_matches} scrollbar`}>
						<header className={styles.dialog_matchesHeader}>
							<p className={styles.dialog_matchesHeaderTitle}>Local</p>
							<p className={styles.dialog_matchesHeaderTitle}>Empate</p>
							<p className={styles.dialog_matchesHeaderTitle}>Visitante</p>
						</header>
						{bets.length > 0 && matches?.matches?.map((match, index) =>
							<MatchBet key={match.id} matchData={match} numberMatch={index} />
						)}
					</div>
				}
				{betSentSuccessfully && (
					<article className={styles.dialog_successfully}>
						<FinishedIcon className={styles.dialog_successfullyIcon} /> Quiniela enviada correctamente
					</article>
				)}
			</main>
		</dialog>
	)
}

const Errors = {
	empty: "Rellene los campos vacíos",
	name_empty: "Asigne un nombre a su quiniela",
	name_short: "El nombre es corto mínimo 5 caracteres",
}
