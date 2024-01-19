import { Dispatch, SetStateAction, MouseEvent, useState, ChangeEvent } from "react"
import styles from "./dialodcreatebet.module.scss"
import { MatchBet } from "./MatchCalendar/MatchBet"
import { useBet, useUser } from "@/app/config/zustand-store"
import { AddBet } from "@/app/config/firebase"
import { FinishedIcon } from "@/app/svg"
import { Loading } from "@/app/components/Loading/Loading"
import { AbbNameMatches } from "@/app/functions/functions"
import { IMatchDay } from "@/app/types/types"

interface DialogProps {
	matches: IMatchDay
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}
export function DialogCreateBet(props: DialogProps) {
	const { open, setOpen, matches } = props
	const { user } = useUser()
	const { bets, setBets, setIsEmpty, error, typeError, setTypeError, setError } = useBet()
	const [name, setName] = useState("")
	const [betSentSuccessfully, setBetSentSuccessfully] = useState(false)
	const [loading, setLoading] = useState(false)

	const HandleStatusDialog = (status: boolean) => {
		setOpen(status)
	}

	const HandleSendBet = async (e: MouseEvent<HTMLButtonElement>) => {
		setLoading(true)
		e.preventDefault()
		if (bets.includes("")) {
			setIsEmpty(true)
			setTypeError("empty")
			setError(true)
		} else if (name === "") {
			setTypeError("name_empty")
			setError(true)
		} else if (name.length < 5) {
			setTypeError("name_short")
			setError(true)
		} else {
			const response = AbbNameMatches(matches)
			const result = await AddBet({ id: crypto.randomUUID(), uid: user.uid, name, bets, day: matches.day.toString(), tournamen: matches.tournament, matches: response })
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
		setLoading(false)
	}

	const HandleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length < 11) {
			setName(e.currentTarget.value)
		}
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
								Nombre{error && <span className={styles.form_labelError}>{Object.entries(Errors).find((error) => error[0] === typeError)?.[1]}</span>}
							</label>
							<input className={styles.form_input} type="text" value={name} onChange={HandleChangeName} />
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
				{!betSentSuccessfully && !loading && matches.matches.map((match, index) => <MatchBet key={match.id} matchData={match} numberMatch={index} />)}
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
