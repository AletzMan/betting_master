import { Dispatch, SetStateAction, MouseEvent, useState, ChangeEvent, useEffect } from "react"
import styles from "./dialodcreatebet.module.scss"
import { MatchBet } from "./MatchCalendar/MatchBet"
import { useBet, useUser } from "@/app/config/zustand-store"
import { AddBet, GetResultsByDay, auth } from "@/app/config/firebase"
import { CancelLogo, ExitLogo, FinishedIcon, SendIcon } from "@/app/svg"
import { Loading } from "@/app/components/Loading/Loading"
import { AbbNameMatches } from "@/app/functions/functions"
import { IMatchDay, IPredictions } from "@/app/types/types"
import axios from "axios"
import { useSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { Button } from "@/app/components/Button/Button"
import { IMyBets } from "../page"

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
	const { enqueueSnackbar } = useSnackbar()
	const { user } = useUser()
	const { bets, setBets, setIsEmpty, error, typeError, setTypeError, setError } = useBet()
	const [name, setName] = useState("")
	const [betSentSuccessfully, setBetSentSuccessfully] = useState(false)
	const [loading, setLoading] = useState(false)

	console.log(matches)

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
		const results = await GetResultsByDay(matches.day.toString(), new Date().getMonth() < 8 ? "0168" : "0159")
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
				setLoading(true)
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
					const result = await AddBet({ id: crypto.randomUUID(), uid: user.uid, name, bets, day: matches.day.toString(), matches: response, userInfo, seasson: new Date().getMonth() < 8 ? `Clausura ${new Date().getFullYear()}` : `Apertura ${new Date().getFullYear()}`, season: new Date().getMonth() < 8 ? `Clausura ${new Date().getFullYear()}` : `Apertura ${new Date().getFullYear()}`, paid: false, tournament: matches.tournament })
					if (result === "OK") {
						setBetSentSuccessfully(true)
						setBets(EmptyBetPredictions)
						setError(false)
						setName("")
						setTimeout(() => {
							setOpen(false)
						}, 2000)
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
		if (e.currentTarget.value.length < 11) {
			setName(e.currentTarget.value)
		}
		setTypeError("")
		setError(false)
	}
	console.log(matches)
	console.log(bets)
	return (
		<dialog className={styles.dialog} open={open}>
			<main className={styles.dialog_main}>
				<header className={styles.dialog_mainHeader}>
					{/*<Button
						onClick={() => { }}
						text="Ver mis quinielas"
	/>*/}
					<h2 className={styles.dialog_mainHeaderTitle}>CREAR QUINIELA</h2>
					<form className={styles.form}>
						<div className={styles.form_name}>
							<label className={styles.form_label}>
								Nombre
							</label>
							<input className={`${styles.form_input} ${typeError === "name_empty" || typeError === "name_short" || typeError === "empty" && styles.form_inputError}`} type="text" value={name} onChange={HandleChangeName} />
						</div>
						<div className={styles.form_buttons}>
							<Button
								text="Enviar"
								onClick={HandleSendBet}
								icon={<SendIcon className={styles.form_buttonIcon} />}
							/>
							<Button
								text="Cancelar"
								onClick={() => HandleStatusDialog(false)}
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
