/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, MouseEvent, useState, ChangeEvent, useEffect, useRef } from "react"
import { MatchBet } from "./MatchBet"
import { useBet, useUpdateBets, useUser } from "@/config/zustand-store"
import { GetResultsByDay, auth } from "@/config/firebase"
import { Loading } from "@/components/Loading/Loading"
import { IMatch, IPredictions } from "@/types/types"
import axios, { AxiosError } from "axios"
import { enqueueSnackbar } from "notistack"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { Dialog } from "primereact/dialog"
import { OverlayPanel } from "primereact/overlaypanel"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { TeamsLogosNews } from "@/constants/constants"
import { useSession } from "next-auth/react"
import { ZodError, ZodIssue } from "zod"
import { IMyBets } from "./MainPage"
import { RevalidatePath } from "@/utils/fetchData"

interface DialogProps {
	matches: IMatch[]
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	myBets: IMyBets
}

interface IBetErrors {
	name: {
		isError: boolean,
		message: string
	},
	predictions: {
		isError: boolean,
		message: string,
		index: number[]
	},
}

const EmptyBetErrors: IBetErrors = { name: { isError: false, message: "" }, predictions: { isError: false, message: "", index: [] } }

const EmptyBetPredictions = ["", "", "", "", "", "", "", "", ""
]

export function DialogCreateBet({ open, setOpen, matches, myBets }: DialogProps) {
	const session = useSession();
	const { bets, setBets } = useBet();
	const [errors, setErrors] = useState<IBetErrors>(EmptyBetErrors);
	const [name, setName] = useState("");
	const [betSentSuccessfully, setBetSentSuccessfully] = useState(false);
	const [loading, setLoading] = useState(false);
	const infoRef = useRef<OverlayPanel | null>(null);
	const myBetsRef = useRef<OverlayPanel | null>(null);
	const setUpdateBets = useUpdateBets((state) => state.setUpdateBets)

	useEffect(() => {
		let newBets: string[] = []
		for (let index = 0; index < matches.length; index++) {
			newBets.push("");
		}
		setBets(newBets);
	}, [])


	const handleStatusDialog = (status: boolean) => {
		setOpen(status);
		setBets(EmptyBetPredictions);
		setName("");
		setErrors({ name: { isError: false, message: "" }, predictions: { isError: false, message: "", index: [] } });
	}

	const handleSendBet = async (e: MouseEvent<HTMLButtonElement>) => {
		setLoading(true);
		e.preventDefault();
		try {
			const response = await axios.post('/api/bets', {
				uid: session.data?.user?.id,
				day: matches[0].matchDay?.toString(),
				name: name,
				predictions: bets,
				season: "Clausura 2025",
				tournament: "Liga MX"
			});
			if (response.status === 201) {
				enqueueSnackbar("Quiniela creada correctamente", { variant: "success" });
				handleStatusDialog(false)
				setUpdateBets(true)
				RevalidatePath("bets")
				setTimeout(() => {
					setUpdateBets(false)
				}, 100);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const newErrors: IBetErrors = { name: { isError: false, message: "" }, predictions: { isError: false, message: "", index: [] } }
				if (error.response?.status === 422) {
					const issues: ZodIssue[] = error?.response?.data.issues;
					issues.forEach(issue => {
						if (issue.path[0] === "name" || issue.path[0] === "predictions") {
							newErrors[issue.path[0]].isError = true;
							newErrors[issue.path[0]].message = issue.message;
							if (issue.path[0] === "predictions") {
								newErrors.predictions.index.push(issue.path[1] as number);
							}
						}
					})
					if (newErrors.name.isError) {
						enqueueSnackbar("Hay errores. Revise los campos marcados.", { variant: "error" });
					} else {
						enqueueSnackbar(`Debes completar ${newErrors.predictions.index.length} partidos más.`, { variant: "error" });
					}
				}
				setErrors(newErrors);
			}
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const newName = e.currentTarget.value;

		setName(newName)
		setErrors((prev) => {
			const newErros = { ...prev, name: { isError: false, message: "" } }
			return newErros
		})
	}

	return (
		<Dialog className="w-[calc(100svw-1em)] max-w-150" onHide={() => setOpen(false)} visible={open}>
			<div className="flex justify-between w-full py-1.5 z-10">
				{myBets.hasBets &&
					<>
						<Button label="Ver mis quinielas" icon="pi pi-eye" size="small" outlined raised severity="secondary" onClick={(e) => myBetsRef.current?.toggle(e)} />
						<OverlayPanel ref={myBetsRef} >
							<div>
								<header className="flex flex-row gap-1.5">
									{matches.map((match, index) => (
										<div key={match.awayTeam} className="flex flex-col items-center bg-(--surface-d) px-0.5">
											<p className="text-xs">{TeamsLogosNews.find(team => team.id.toString() === match.homeTeam)?.abbName}</p>
											<p className="text-xs">vs</p>
											<p className="text-xs">{TeamsLogosNews.find(team => team.id.toString() === match.awayTeam)?.abbName}</p>
										</div>
									))}
								</header>
								{
									myBets.bets.map(bet => (
										<div key={bet.id} className="flex flex-col gap-1.5 pt-1.5 border-t-1 border-t-(--surface-d) mt-1.5 ">
											<span className="text-xs px-1.5 font-normal text-(--cyan-400) py-0.5 bg-(--surface-c) max-w-30">{bet.name}</span>
											<article className="w-full">
												<main className="flex flex-row gap-1.5 w-full">
													{bet.predictions.map((prediction, index) => (
														<div key={prediction.id} className="w-full">
															<p className="text-white text-center bg-lime-700 rounded-sm">{prediction.prediction}</p>
														</div>
													))}
												</main>
											</article>
										</div >
									))
								}
							</div>
						</OverlayPanel>
					</>}
				<Button className="" icon="pi pi-question-circle" size="small" severity="info" onClick={(e) => infoRef.current?.toggle(e)} />
				<OverlayPanel ref={infoRef}>
					<div className="flex flex-col gap-2">
						<p className="text-sm">{`Para cada partido, elige tu pronóstico haciendo clic en una de las tres opciones:`}</p>
						<ul className="flex flex-col gap-1">
							<li className="flex flex-row gap-1.5 text-sm font-light list-disc ml-6"><span className="text-center rounded-sm w-5 h-5 bg-(--surface-d)">L</span><span>{`Para victoria del equipo local`}</span></li>
							<li className="flex flex-row gap-1.5 text-sm font-light list-disc ml-6"><span className="text-center rounded-sm w-5 h-5 bg-(--surface-d)">E</span><span>{`Para empate `}</span></li>
							<li className="flex flex-row gap-1.5 text-sm font-light list-disc ml-6"><span className="text-center rounded-sm w-5 h-5 bg-(--surface-d)">V</span><span>{`Para victoria del equipo visitante.`}</span></li>
						</ul>
						<p className="text-sm">{`Asegúrate de elegir una opción para todos los partidos antes de guardar tu quiniela.`}</p>
					</div>
				</OverlayPanel>
			</div>
			<main className="flex flex-col">
				<Divider />
				<header className="flex flex-col">
					<form className="flex flex-col gap-2.5">
						<div className="flex flex-col">
							<label className="text-cyan-600 pl-1" htmlFor="username">Nombre</label>
							<InputText invalid={errors.name.isError} id="username" className="p-inputtext-sm" type="text" value={name} maxLength={13} onChange={handleChangeName} placeholder="" aria-describedby="username-help" />
							<small className={`pl-1 ${errors.name.isError ? "text-(--danger-color)" : "text-gray-500 "}`} id="username-help">
								{errors.name.isError ? errors.name.message : "Nombre de 4 a 8 caracteres"}
							</small>
						</div>
						<div className="flex justify-between">
							<Button
								className="min-w-32"
								onClick={handleSendBet}
								disabled={loading}
								severity="success"
								size="small"
								label={loading ? "Enviando..." : "Enviar"}
								icon={loading ? "pi pi-spin pi-spinner-dotted" : "pi pi-send"}
							/>
							<Button
								className="min-w-32"
								onClick={() => handleStatusDialog(false)}
								disabled={loading}
								type="button"
								label="Cancelar"
								severity="danger"
								size="small"
								icon="pi pi-times-circle" />
						</div>
					</form>
				</header>
				{loading && <Loading height="10em" />}
				{!betSentSuccessfully && !loading &&
					<div className={`h-[calc(100svh-21em)] scrollbar mt-2 pr-1.5`}>
						<header className="sticky top-0 grid grid-cols-3 place-items-center w-full py-2 bg-(--surface-b) rounded-b-sm z-2">
							<p className="uppercase font-bold text-sm">Local</p>
							<p className="uppercase font-bold text-sm">Empate</p>
							<p className="uppercase font-bold text-sm">Visitante</p>
						</header>
						<div className="flex flex-col gap-1 mt-1">
							{bets.length > 0 && matches.map((match, index) =>
								<MatchBet key={match.homeTeam} matchData={match} numberMatch={index} invalid={errors.predictions.index.includes(index)} />
							)}
						</div>
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
