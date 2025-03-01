/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, MouseEvent, useState, ChangeEvent, useEffect, useRef } from "react"
import styles from "./dialodcreatebet.module.scss"
import { MatchBet } from "./MatchCalendar/MatchBet"
import { useBet, useUser } from "@/config/zustand-store"
import { AddBet, GetResultsByDay, auth } from "@/config/firebase"
import { CancelLogo, ExitLogo, FinishedIcon, HelpIcon, LoadingIcon, SendIcon, ViewIcon } from "@/svg"
import { Loading } from "@/components/Loading/Loading"
import { AbbNameMatches } from "@/functions/functions"
import { IMatch, IMatchDay, IPredictions } from "@/types/types"
import axios from "axios"
import { enqueueSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { IMyBets } from "../page"
import { TextField } from "@/components/TextFiled/TextFiled"
import { Dialog } from "primereact/dialog"
import { OverlayPanel } from "primereact/overlaypanel"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { TeamsLogosNews } from "@/constants/constants"

interface DialogProps {
	matches: IMatch[]
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
	const infoRef = useRef<OverlayPanel | null>(null);
	const myBetsRef = useRef<OverlayPanel | null>(null);

	useEffect(() => {
		let newBets: IPredictions[] = []
		for (let index = 0; index < matches.length; index++) {
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
		const results = await GetResultsByDay(matches[0]!.matchDay!.toString(), new Date().getMonth() < 6 ? "0168" : "0159")
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
					/*const response = AbbNameMatches(matches)
					const result = await AddBet({ id: crypto.randomUUID(), uid: user.uid, name, bets, day: matches.day.toString(), matches: response, userInfo, seasson: new Date().getMonth() < 6 ? `Clausura ${new Date().getFullYear()}` : `Apertura ${new Date().getFullYear()}`, season: new Date().getMonth() < 6 ? `Clausura ${new Date().getFullYear()}` : `Apertura ${new Date().getFullYear()}`, paid: false, tournament: matches.season })
					if (result === "OK") {
						enqueueSnackbar("Quiniela creada correctamente", { variant: "success" })
						setBetSentSuccessfully(true)
						setBets(EmptyBetPredictions)
						setError(false)
						setName("")
						setOpen(false)
					}*/
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
		<Dialog className="w-[calc(100svw-1em)] max-w-150" onHide={() => setOpen(false)} visible={open}>
			<div className="flex justify-between w-full py-1.5 z-10">
				{!myBets.hasBets &&
					<>
						<Button label="Ver mis quinielas" icon="pi pi-eye" size="small" outlined raised severity="secondary" onClick={(e) => myBetsRef.current?.toggle(e)} />
						<OverlayPanel ref={myBetsRef}   >
							<header className="flex flex-row gap-3">
								{matches.map((match, index) => (
									<div key={match.awayTeam} className="flex flex-col items-center">
										<p className="text-xs">{TeamsLogosNews.find(team => team.id.toString() === match.homeTeam)?.abbName}</p>
										<p className="text-xs">vs</p>
										<p className="text-xs">{TeamsLogosNews.find(team => team.id.toString() === match.awayTeam)?.abbName}</p>
									</div>
								))}
							</header>
							{

								myBets.bets.map(bet => (
									<div key={bet.id} className={styles.mybets_bet}>
										<span className={styles.mybets_title}>{bet.name}</span>
										<article>

											<main className={styles.mybets_main}>
												{bets.map((result, index) => (
													<div key={index} className={styles.mybets_mainResult} >
														<p className={styles.mybets_mainText}>{result.prediction}</p>
													</div>
												))}
											</main>
										</article>
									</div >
								))
							}

						</OverlayPanel>
					</>}
				<Button className="" icon="pi pi-question-circle" size="small" severity="info" onClick={(e) => infoRef.current?.toggle(e)} />
				<OverlayPanel ref={infoRef}>
					<p className={styles.help_message}>{`En cada partido, selecciona tu predicción haciendo clic en uno de los tres recuadros disponibles:`}</p>
					<p className={styles.help_message}>{`'L' para victoria del equipo local`}</p>
					<p className={styles.help_message}>{`'E' para empate `}</p>
					<p className={styles.help_message}>{`'V' para victoria del equipo visitante.`}</p>
					<p className={styles.help_message}>{`Asegúrate de elegir una opción para todos los partidos antes de guardar tu quiniela.`}</p>
				</OverlayPanel>
			</div>
			<main className="flex flex-col">
				<Divider />
				<header className="flex flex-col">
					<form className="flex flex-col gap-2.5">
						<div className="flex flex-col">
							<label className="text-cyan-600 pl-1" htmlFor="username">Nombre</label>
							<InputText id="username" className="p-inputtext-sm" type="text" value={name} onChange={HandleChangeName} placeholder="" aria-describedby="username-help" />
							<small className="text-gray-500 pl-1" id="username-help">
								Nombre de 4 a 8 caracteres
							</small>
						</div>
						<div className="flex justify-between">
							<Button
								className="min-w-32"
								onClick={HandleSendBet}
								disabled={loading}
								severity="success"
								size="small"
								label={loading ? "Enviando..." : "Enviar"}
								icon={loading ? "pi pi-spin pi-spinner-dotted" : "pi pi-send"}
							/>
							<Button
								className="min-w-32"
								onClick={() => HandleStatusDialog(false)}
								disabled={loading}
								label="Cancelar"
								severity="danger"
								size="small"
								icon="pi pi-times-circle" />
						</div>
					</form>
				</header>
				{loading && <Loading height="10em" />}
				{!betSentSuccessfully && !loading &&
					<div className={`h-[calc(100svh-18em)] scrollbar pt-2`}>
						<header className="sticky top-0 flex flex-row justify-around w-full py-2 bg-(--surface-b) rounded-b-sm z-2">
							<p className={styles.dialog_matchesHeaderTitle}>Local</p>
							<p className={styles.dialog_matchesHeaderTitle}>Empate</p>
							<p className={styles.dialog_matchesHeaderTitle}>Visitante</p>
						</header>
						{/*bets.length > 0 && matches.map((match, index) =>
							 <MatchBet key={match.homeTeam} matchData={match} numberMatch={index} />
						)*/}
					</div>
				}
				{betSentSuccessfully && (
					<article className="flex flex-col items-center justify-center gap-y-4 text-center py-12 text-lg text-green-500">
						<i className="pi pi-check-circle" style={{ fontSize: "3.5em" }} /> Quiniela enviada correctamente
					</article>
				)}
			</main>
		</Dialog>
	)
}

const Errors = {
	empty: "Rellene los campos vacíos",
	name_empty: "Asigne un nombre a su quiniela",
	name_short: "El nombre es corto mínimo 5 caracteres",
}
