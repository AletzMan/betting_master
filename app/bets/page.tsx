/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import ConfettiExplosion from 'react-confetti-explosion';
import { ChangeEvent, useEffect, useState } from "react"
import { ConvertToPrice } from "../functions/functions"
import styles from "./bets.module.scss"
import { Loading } from "../components/Loading/Loading"
import { DialogCreateBet } from "./DialogCreateBet/DialogCreateBet"
import { ArrowIcon, NotFoundIcon, StarIcon, ViewIcon, WinnerIcon } from "../svg"
import { useUser } from "../config/zustand-store"
import { useMatches } from "../hooks/useMatches"
import { useWinner } from "../hooks/useWinner"
import { useSort } from "../hooks/useSort"
import { HeaderMatches } from "./components/HeaderMatches/HeaderMatches"
import { HeaderPage } from "./components/HeaderPage/HeaderPage"
import { useOrientation } from "../hooks/useOrientation"
import { IBetDataDocument, IBetDocument, IPredictions } from "../types/types"
import { GetBetsByIDGroup } from "../config/firebase"
import Image from "next/image"
import { SnackbarProvider } from "notistack"
import { NoPaidMessage } from "./components/NoPaidMessage/NoPaidMessage"
import { ConfirmedParticipationMessage } from "./components/ConfirmedParticipationMessage/ConfirmedParticipationMessage"
import { Button } from '../components/Button/Button';
import { WinningBets } from './components/WinningBets/WinningBets';
import { BettingsTable } from './components/BettingsTable/BettingsTable';
import { Participant } from './components/Participant/Participant';
import HeaderTable from './components/Headertable/HeaderTable';

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



	return (
		<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
			{openDialog && matches &&
				<DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matches} myBets={myBets} />
			}
			{matches?.results?.length > 0 && !isLandscape && !matches.isFinishGame &&
				<HeaderPage isInTime={matches?.isAvailable} setOpenDialog={setOpenDialog} timeFirstMatch={isInTime.time} />
			}
			{loading && <Loading />}
			{matches.isFinishGame &&
				<div className={styles.buttonView}>
					<Button props={{ onClick: () => setViewBets(prev => !prev) }} icon={<ViewIcon className='' />} text={viewBets ? 'Ver ganadores' : 'Ver quinielas'} />
				</div>
			}
			{(!matches.isFinishGame || viewBets) && <>
				{myBets?.isNotBetsPaid && myBets.hasBets && bets && bets?.length > 0 &&
					<NoPaidMessage myBets={myBets} user={user} />
				}
				{!myBets?.hasBets && !loading && matches.matches.length > 0 && bets &&
					<section className={styles.empty}>
						<h2 className={styles.empty_bets}>¡Esperamos tu quiniela!</h2>
						<p className={styles.empty_text}>¡No te quedes fuera!</p>
					</section>
				}
				{myBets.hasBets && bets && bets.length > 0 && !myBets?.isNotBetsPaid && matches?.matches[0]?.status === "Sin comenzar" &&
					<ConfirmedParticipationMessage user={user} bets={bets} myBets={myBets} />
				}
				{!loading && !myBets?.isNotBetsPaid && myBets.hasBets && bets && bets.length > 0 && matches?.matches[0]?.status !== "Sin comenzar" && (
					<>
						{matches?.results?.length > 0 &&
							<>
								<section className={`${styles.main_table} ${hiddenNames && styles.main_tableHidden} scrollbar`}>
									<div className={styles.headerTable}>
										<HeaderTable bets={bets} hiddenNames={hiddenNames} setFilterBets={setFilterBets} setHiddenNames={setHiddenNames} />
										{filterBets?.map((bet, index) => (
											<Participant key={bet.id} bets={bets} bet={bet} index={index} hiddenNames={hiddenNames} selectRanges={selectRanges} setSelectRanges={setSelectRanges} />
										))}
									</div>
									<BettingsTable bets={bets} filterBets={filterBets} selectRanges={selectRanges} setSelectRanges={setSelectRanges} />
								</section>
							</>
						}
					</>
				)}
				{matches?.results?.length === 0 && <div className={styles.nomatches}>No se ha creado la quiniela de la semana <NotFoundIcon className={styles.nomatches_icon} /></div>}
			</>}
			{matches.isFinishGame && !viewBets &&
				<WinningBets winners={winners} />
			}
		</main>
	)
}
