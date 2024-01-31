"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { ConvertToPrice, InTimeToBet, TimeRemainig } from "../functions/functions"
import styles from "./bets.module.scss"
import { Loading } from "../components/Loading/Loading"
import { DialogCreateBet } from "./DialogCreateBet/DialogCreateBet"
import { NotFoundIcon, StarIcon, WinnerIcon } from "../svg"
import { useUser } from "../config/zustand-store"
import { useMatches } from "../hooks/useMatches"
import { useWinner } from "../hooks/useWinner"
import { useSort } from "../hooks/useSort"
import { HeaderMatches } from "./components/HeaderMatches/HeaderMatches"
import { HeaderPage } from "./components/HeaderPage/HeaderPage"
import { useOrientation } from "../hooks/useOrientation"
import { IBetDocument } from "../types/types"
import { GetBetsByDay } from "../config/firebase"
import { ComboBox } from "../components/ComboBox/ComboBox"
import Image from "next/image"
import { SnackbarProvider } from "notistack"

const Orders = [
	{ id: "name", name: "Por nombre" },
	{ id: "des", name: "Por aciertos ↓" },
	{ id: "asc", name: "Por aciertos ↑" },
]

interface IMyBets {
	bets: IBetDocument[]
	hasBets: boolean
	isNotBetsPaid: boolean
}

const EmptyMyBets: IMyBets = {
	bets: [],
	hasBets: false,
	isNotBetsPaid: true
}

export default function BetsPage() {
	const { loading, matches, isInTime } = useMatches()
	const [bets, setBets] = useState<IBetDocument[]>([])
	const { winner } = useWinner(bets, matches.results)
	const { orderBets, setOrderBets } = useSort(matches.results, bets, setBets)
	const { user } = useUser()
	const { isLandscape } = useOrientation()
	const [selectRanges, setSelectRanges] = useState<{ row: number; column: number } | null>(null)
	const [openDialog, setOpenDialog] = useState(false)
	const [myBets, setMyBets] = useState<IMyBets>(EmptyMyBets)



	useEffect(() => {
		if (!openDialog) {
			GetBets()
		}
	}, [matches, openDialog])

	const GetBets = async () => {
		if (matches.day) {
			const documents = await GetBetsByDay(matches.day.toString())
			const newMybets = documents.filter((bet) => bet.uid === user.uid)
			const newIsBetsPaid = documents.some((bet) => bet.uid === user.uid && !bet.paid)
			const newHasBets = documents.some((bet) => bet.uid === user.uid)
			setMyBets({ bets: newMybets, hasBets: newHasBets, isNotBetsPaid: newIsBetsPaid })

			setBets(documents)
		}
	}

	const HandleSelectRow = (row: number, column: number) => {
		setSelectRanges({ row, column })
	}

	const HandleUnselectRow = () => {
		setSelectRanges(null)
	}


	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }}>
			<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
				{openDialog && <DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matches} />}
				{matches?.results?.length > 0 && <HeaderPage isInTime={matches?.isAvailable} setOpenDialog={setOpenDialog} timeFirstMatch={isInTime.time} />}
				{loading && <Loading />}
				{myBets?.isNotBetsPaid && myBets.hasBets && bets.length > 0 &&
					<>
						<section className={styles.betsTable_empty}>
							<h3 className={styles.betsTable_emptyTitle}>¡Paga tus quinielas para participar!</h3>
							<h3 className={styles.betsTable_emptyTitle}>¡No te quedes fuera!</h3>
							<p className={styles.betsTable_emptyText}>Deposita $12.00 por cada quiniela</p>
							<p className={styles.betsTable_emptyText}>Tu tienes {myBets.bets.length} quiniela(s)</p>
							<p className={styles.betsTable_emptyText}>Total a pagar: <span className={styles.betsTable_emptyPrice}>{ConvertToPrice(myBets.bets.length * 12)}</span></p>
							<p className={styles.betsTable_emptyTextLight}>Tienes hasta el cominezo del primer partido para pagar</p>
							<p className={styles.betsTable_emptyTextLight}>Quiniela no pagada no participa</p>
							<div className={styles.betsTable_emptyData}>
								<h4 className={styles.betsTable_emptyDataTitle}>Datos para deposito</h4>
								<div className={styles.betsTable_emptyDataAccount}>
									<label className={styles.betsTable_emptyLabel}>Numero de cuenta</label>
									<p className={styles.betsTable_emptyText}>158 659 4088</p>
								</div>
								<div className={styles.betsTable_emptyDataAccount}>
									<label className={styles.betsTable_emptyLabel}>Cuenta CLABE</label>
									<p className={styles.betsTable_emptyText}>012 320 01586594088 0</p>
								</div>
								<div className={styles.betsTable_emptyDataAccount}>
									<label className={styles.betsTable_emptyLabel}>Nombre</label>
									<p className={styles.betsTable_emptyText}>Alejandro Garcia</p>
								</div>
							</div>
							<p className={styles.betsTable_emptyTextAccount}>Agrega tu nombre en la referencia</p>
							<p className={styles.betsTable_emptyText}>{user.name}</p>
						</section>
					</>
				}
				{!myBets.hasBets && bets.length > 0 &&
					<section className={styles.betsTable_empty}>
						<h2 className={styles.betsTable_emptyBets}>¡Esperamos tu quiniela!</h2>
						<p className={styles.betsTable_emptyText}>¡No te quedes fuera!</p>
					</section>
				}
				{myBets.hasBets && bets.length === 0 && !myBets?.isNotBetsPaid && !isInTime.time.includes("-") &&
					<section className={styles.betsTable_empty}>
						<h2 className={styles.betsTable_emptyBets}>¡Ya estas participando!</h2>
						<p className={styles.betsTable_emptyTextName}>{user.name}</p>
						<p className={styles.betsTable_emptyText}>Las quinielas estaran visibles hasta el comienzo del primer partido</p>
						<p className={styles.betsTable_emptyText}>Tu tienes <span className={styles.betsTable_emptyTextInfoTwo}>{myBets.bets.length}</span> quiniela(s)</p>
						<p className={styles.betsTable_emptyText}>¡Suerte!</p>
						<p className={styles.betsTable_emptyTextInfoTwo}>Monto acumulado: {ConvertToPrice(bets.length * 10.5)}</p>
						<p className={styles.betsTable_emptyTextAccount}>Ingresa a tu Perfil y agrega tu cuenta de deposito para recibir tu pago en caso de ganar</p>
						<p className={styles.betsTable_emptyTextAccount}>Tambien puedes ver tus quinielas en tu perfil</p>
					</section>
				}
				{!loading && !myBets?.isNotBetsPaid && myBets.hasBets && bets.length > 0 && (
					<>
						{matches?.results?.length > 0 && <>
							<section className={`${styles.main_table} scrollbar`}>
								<div className={styles.namesTable}>
									<div className={styles.namesTable_header}>
										<span className={styles.namesTable_headerAmount}>Gana: {ConvertToPrice(bets.length * 10.5)}</span>
										{matches.matches.length > 0 && <h1 className={styles.namesTable_headerTitle}>{matches.tournament}</h1>}
										{matches.matches.length > 0 && <p className={styles.namesTable_headerDay}>{`Jornada ${matches.day}`}</p>}
										<div className={styles.namesTable_headerSelect}>
											<ComboBox options={Orders} selectOption={orderBets} setSelectOption={setOrderBets} />
										</div>
									</div>
									{bets?.map((bet, index) => (
										<>
											{bet.paid && <div
												className={`${styles.namesTable_name} ${selectRanges?.row === index && styles.namesTable_nameSelect} 
											${user.uid === bet.uid && styles.namesTable_nameCurrent}`}
												key={bet.id}
												onClick={() => HandleSelectRow(index, -1)}
												onMouseLeave={HandleUnselectRow}
											>
												<picture className={styles.namesTable_photo}>
													<Image className={styles.namesTable_photoImage} src={bet.userInfo?.photo || "/user-icon.png"} width={22} height={22} alt={`Foto de perfil de ${bet.userInfo?.name}`} />
												</picture>
												{bet.name}
												<div className={styles.namesTable_hits}>
													{user.uid === bet.uid && <StarIcon className={styles.namesTable_hitsIcon} />}
													{winner?.includes(bet.id) && <WinnerIcon className={styles.namesTable_winIcon} />}
												</div>
											</div>}
										</>
									))}
								</div>
								<div className={styles.betsTable}>
									<ul className={styles.matches}>
										{matches.matches.length > 0 && matches.matches?.map((match, index) => <HeaderMatches key={match.id} match={match} index={index} />)}
									</ul>
									<div className={styles.betsTable_container}>
										{bets !== undefined &&
											bets?.map((bet, indexOne) => (
												<>
													{bet.paid &&
														<ul className={styles.betsTable_bets} key={bet.id}>
															{bet?.bets?.map((betInfo, index) => (
																<li
																	key={`${bets[index]?.id}${indexOne}${index}`}
																	className={`${styles.betsTable_betsBet} ${selectRanges?.column === index && styles.betsTable_betsBetSelectColumn} 
													${selectRanges?.row === indexOne && styles.betsTable_betsBetSelectRow}`}
																	onClick={() => HandleSelectRow(indexOne, index)}
																	onMouseLeave={HandleUnselectRow}
																>
																	<span
																		className={`${matches.results[index] === betInfo && styles.betsTable_betsBetWin} 
														${matches.results[index] === betInfo && matches.matches[index].status === "En juego" && styles.betsTable_betsBetPreWin}
														`}
																	>
																		{betInfo}
																	</span>
																</li>
															))}
														</ul>
													}
												</>
											))
										}
									</div>
								</div>
							</section>
						</>
						}
					</>
				)}
				{matches?.results?.length === 0 && <div className={styles.betsTable_empty}>No se ha creado la quiniela de la semana <NotFoundIcon className={styles.betsTable_emptyIcon} /></div>}
				{!loading && bets?.length === 0 && <div className={styles.betsTable_empty}>
					<h3 className={styles.betsTable_emptyTitle}>¡Esperamos tu quiniela!</h3>
					<p className={styles.betsTable_emptyText}>¡No te quedes fuera!</p>
				</div>}
			</main>
		</SnackbarProvider>
	)
}
