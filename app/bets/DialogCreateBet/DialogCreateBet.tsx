import { Dispatch, SetStateAction, MouseEvent, useState, ChangeEvent } from "react"
import styles from "./dialodcreatebet.module.scss"
import { MatchBet } from "./MatchCalendar/MatchBet"
import { useBet, useUser } from "@/app/config/zustand-store"
import { AddBet, GetResultsByDay, auth } from "@/app/config/firebase"
import { FinishedIcon } from "@/app/svg"
import { Loading } from "@/app/components/Loading/Loading"
import { AbbNameMatches } from "@/app/functions/functions"
import { IMatchDay } from "@/app/types/types"
import axios from "axios"
import { useSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

interface DialogProps {
	matches: IMatchDay
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
export function DialogCreateBet(props: DialogProps) {
	const router = useRouter()
	const { enqueueSnackbar } = useSnackbar()
	const { open, setOpen, matches } = props
	const { user } = useUser()
	const { bets, setBets, setIsEmpty, error, typeError, setTypeError, setError } = useBet()
	const [name, setName] = useState("")
	const [betSentSuccessfully, setBetSentSuccessfully] = useState(false)
	const [loading, setLoading] = useState(false)


	const HandleStatusDialog = (status: boolean) => {
		setOpen(status)
		setBets(["", "", "", "", "", "", "", "", ""])
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
				if (bets.includes("")) {
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
						setBets(["", "", "", "", "", "", "", "", ""])
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

	return (
		<dialog className={styles.dialog} open={open}>
			<main className={styles.dialog_main}>
				<header className={styles.dialog_mainHeader}>
					<h2 className={styles.dialog_mainHeaderTitle}>CREAR QUINIELA</h2>
					<form className={styles.form}>
						<div className={styles.form_name}>
							<label className={styles.form_label}>
								Nombre de la quiniela
							</label>
							<input className={`${styles.form_input} ${typeError === "name_empty" || typeError === "name_short" || typeError === "empty" && styles.form_inputError}`} type="text" value={name} onChange={HandleChangeName} />
						</div>
						<div className={styles.form_buttons}>
							<button className={`${styles.form_button} ${styles.form_buttonSend}`} type="submit" onClick={HandleSendBet}>
								Enviar
							</button>
							<button className={`${styles.form_button} ${styles.form_buttonCancel}`} type="button" onClick={() => HandleStatusDialog(false)}>
								Cancelar
							</button>
						</div>
					</form>
				</header>
				{loading && <Loading />}
				{!betSentSuccessfully && !loading &&
					<div className={`${styles.dialog_matches} scrollbar`}>
						{matches.matches.map((match, index) =>
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
