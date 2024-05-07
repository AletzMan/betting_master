"use client"
import ConfettiExplosion from 'react-confetti-explosion';
import { ChangeEvent, useEffect, useState } from "react"
import { ConvertToPrice } from "../functions/functions"
import styles from "./bets.module.scss"
import { Loading } from "../components/Loading/Loading"
import { DialogCreateBet } from "./DialogCreateBet/DialogCreateBet"
import { ArrowIcon, NotFoundIcon, StarIcon, WinnerIcon } from "../svg"
import { useUser } from "../config/zustand-store"
import { useMatches } from "../hooks/useMatches"
import { useWinner } from "../hooks/useWinner"
import { useSort } from "../hooks/useSort"
import { HeaderMatches } from "./components/HeaderMatches/HeaderMatches"
import { HeaderPage } from "./components/HeaderPage/HeaderPage"
import { useOrientation } from "../hooks/useOrientation"
import { IBetDataDocument, IBetDocument } from "../types/types"
import { GetBetsByIDGroup } from "../config/firebase"
import Image from "next/image"
import { SnackbarProvider } from "notistack"
import { NoPaidMessage } from "./components/NoPaidMessage/NoPaidMessage"
import { ConfirmedParticipationMessage } from "./components/ConfirmedParticipationMessage/ConfirmedParticipationMessage"
import { Button } from '../components/Button/Button';

const Orders = [
	{ id: "name", name: "Por nombre" },
	{ id: "des", name: "Por aciertos ↓" },
	{ id: "asc", name: "Por aciertos ↑" },
]

export interface IMyBets {
	bets: IBetDataDocument[]
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
	const [bets, setBets] = useState<IBetDocument[] | null>(null)
	const [filterBets, setFilterBets] = useState<IBetDocument[] | null>(null)
	const { winner } = useWinner(bets, matches.results)
	const { setOrderBets, setUser } = useSort(matches.results, bets, setFilterBets)
	const { user } = useUser()
	const { isLandscape } = useOrientation()
	const [selectRanges, setSelectRanges] = useState<{ row: number; column: number } | null>(null)
	const [openDialog, setOpenDialog] = useState(false)
	const [myBets, setMyBets] = useState<IMyBets>(EmptyMyBets)
	const [hiddenNames, setHiddenNames] = useState(false)
	const [winners, setWinners] = useState<IBetDocument[] | undefined>(undefined)
	const [viewBets, setViewBets] = useState(false)

	useEffect(() => {
		if (user) {
			const newWinners = bets?.filter(bet => { return winner.includes(bet.id) })
			setWinners(newWinners)
			setUser(user.uid)
		}
	}, [user, bets, matches, winner])

	useEffect(() => {
		if (!openDialog) {
			GetBets()
		}
	}, [matches, openDialog])


	const GetBets = async () => {
		if (matches.day) {
			const documents = await GetBetsByIDGroup(matches.day.toString())
			const newBets: IBetDocument[] = []
			documents.forEach((bet) => {
				newBets.push(bet.data)
			})
			const newMybets = documents.filter((bet) => bet.data.uid === user.uid)
			const newIsBetsPaid = newBets.some((bet) => bet.uid === user.uid && !bet.paid)
			const newHasBets = newBets.some((bet) => bet.uid === user.uid)
			setMyBets({ bets: newMybets, hasBets: newHasBets, isNotBetsPaid: newIsBetsPaid })
			setBets(newBets)
			setFilterBets(newBets)
			setOrderBets("normal")
		}
	}


	const HandleSelectRow = (row: number, column: number) => {
		setSelectRanges({ row, column })
	}

	const HandleUnselectRow = () => {
		setSelectRanges(null)
	}

	const HandleOrder = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		if (value === "name" || value === "des" || value === "asc" || value === "normal" || value === "myBets") {
			setOrderBets(value)
		}
	}


	const HandleSetVisibilityNames = () => {
		setHiddenNames(prev => !prev)
	}

	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }}>
			<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
				{openDialog && <DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matches} myBets={myBets} />}
				{matches?.results?.length > 0 && !isLandscape && !matches.isFinishGame && <HeaderPage isInTime={matches?.isAvailable} setOpenDialog={setOpenDialog} timeFirstMatch={isInTime.time} />}
				{loading && <Loading />}
				{matches.isFinishGame && <Button className={styles.buttonViewWinners} onClick={() => setViewBets(prev => !prev)} text={viewBets ? 'Ver ganadores' : 'Ver quinielas'} />}
				{(!matches.isFinishGame || viewBets) && <>
					{myBets?.isNotBetsPaid && myBets.hasBets && bets && bets?.length > 0 &&
						<NoPaidMessage myBets={myBets} user={user} />
					}
					{!myBets?.hasBets && !loading && matches.matches.length > 0 && bets &&
						<section className={styles.betsTable_empty}>
							<h2 className={styles.betsTable_emptyBets}>¡Esperamos tu quiniela!</h2>
							<p className={styles.betsTable_emptyText}>¡No te quedes fuera!</p>
						</section>
					}
					{myBets.hasBets && bets && bets.length > 0 && !myBets?.isNotBetsPaid && matches?.matches[0]?.status === "Sin comenzar" &&
						<ConfirmedParticipationMessage user={user} bets={bets} myBets={myBets} />
					}
					{!loading && !myBets?.isNotBetsPaid && myBets.hasBets && bets && bets.length > 0 && matches?.matches[0]?.status !== "Sin comenzar" && (
						<>
							{matches?.results?.length > 0 && <>
								<section className={`${styles.main_table} ${hiddenNames && styles.main_tableHidden} scrollbar`}>

									<div className={styles.namesTable}>
										<div className={`${styles.namesTable_header} ${hiddenNames && styles.namesTable_headerHidden}`}>
											<button className={styles.namesTable_headerResize} onClick={HandleSetVisibilityNames}>
												<ArrowIcon className={`${styles.namesTable_headerResizeArrow} ${hiddenNames && styles.namesTable_headerResizeArrowHidden}`} />
											</button>
											{!hiddenNames && <span className={styles.namesTable_headerAmount}>Monto: {ConvertToPrice((bets?.length || 0) * 13.5)}</span>}
											{/*matches.matches.length > 0 && <h1 className={styles.namesTable_headerTitle}>{matches.tournament}</h1>*/}
											{matches.matches.length > 0 && <p className={`${styles.namesTable_headerDay} ${hiddenNames && styles.namesTable_headerDayHidden}`}>{`Jornada ${matches.day}`}</p>}
											<select className={styles.namesTable_headerSelect} onChange={HandleOrder}>
												<option value="normal">Por participante</option>
												<option value="myBets">Mis quinielas</option>
												<option value="name">Por nombre</option>
												<option value="des">Por aciertos ↓</option>
												<option value="asc">Por aciertos ↑</option>
											</select>
										</div>
										{filterBets?.map((bet, index) => (
											<>
												{bet.paid &&
													<div
														className={`${styles.namesTable_name} ${selectRanges?.row === index && styles.namesTable_nameSelect} 
												${user.uid === bet.uid && styles.namesTable_nameCurrent}`}
														key={bet.id}
														onClick={() => HandleSelectRow(index, -1)}
														onMouseLeave={HandleUnselectRow}
													>
														<picture className={styles.namesTable_photo}>
															<Image className={styles.namesTable_photoImage} src={bet.userInfo?.photo || "/user-icon.png"} width={22} height={22} alt={`Foto de perfil de ${bet.userInfo?.name}`} />
														</picture>
														{!hiddenNames && bet.name}
														<div className={styles.namesTable_hits}>
															{user.uid === bet.uid && <StarIcon className={styles.namesTable_hitsIcon} />}
															{winner?.includes(bet.id) && <WinnerIcon className={styles.namesTable_winIcon} />}
														</div>
													</div>
												}
											</>
										))}
									</div>
									<div className={styles.betsTable}>
										<ul className={styles.matches}>
											{matches.matches.length > 0 && matches.matches?.map((match, index) => <HeaderMatches key={match.id} match={match} index={index} />)}
										</ul>
										<div className={styles.betsTable_container}>
											{bets !== undefined &&
												filterBets?.map((bet, indexOne) => (
													<>
														{bet.paid &&
															<ul className={styles.betsTable_bets} key={bet.name}>
																{bet?.bets?.map((betInfo, index) => (
																	<li
																		key={betInfo.id}
																		className={`${styles.betsTable_betsBet} ${selectRanges?.column === index && styles.betsTable_betsBetSelectColumn} 
																${selectRanges?.row === indexOne && styles.betsTable_betsBetSelectRow}`}
																		onClick={() => HandleSelectRow(indexOne, index)}
																		onMouseLeave={HandleUnselectRow}
																	>
																		<span
																			className={` ${matches.results[index] === betInfo.prediction ? styles.betsTable_betsBetWin : styles.betsTable_betsBetNoWin} 
																		${matches.results[index] === betInfo.prediction && matches.matches[index].status === "En juego" && styles.betsTable_betsBetPreWin}
																		`}
																		>
																			{betInfo.prediction}
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

				</>}
				{matches.isFinishGame && !viewBets &&
					<>
						<ConfettiExplosion />
						<h3 className={styles.winners_title}>GANADORES</h3>
						<section className={styles.winners}>
							{
								winners?.map(win => (
									<div className={styles.winner} key={win.id} >
										<picture className={styles.winner_picture}>
											<Image className={styles.winner_image} src={win.userInfo?.photo || "/user-icon.png"} alt="Winner" width={100} height={100} />
										</picture>
										<span className={styles.winner_name}>{win.userInfo?.name}</span>
										<span className={styles.winner_bet}>{win.name}</span>
										<WinnerIcon className={styles.winner_icon} />
									</div>
								))
							}
						</section>
					</>
				}
			</main>
		</SnackbarProvider>
	)
}
