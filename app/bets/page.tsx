"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { InTimeToBet, TimeRemainig } from "../functions/functions"
import styles from "./bets.module.scss"
import { Loading } from "../components/Loading/Loading"
import { DialogCreateBet } from "./DialogCreateBet/DialogCreateBet"
import { StarIcon, WinnerIcon } from "../svg"
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

const Orders = [
	{ id: "name", name: "Por nombre" },
	{ id: "des", name: "Por aciertos ↓" },
	{ id: "asc", name: "Por aciertos ↑" },
]

export default function BetsPage() {
	const { loading, matches, isInTime } = useMatches()
	const [bets, setBets] = useState<IBetDocument[]>([])
	const { winner } = useWinner(bets, matches.results)
	const { orderBets, setOrderBets } = useSort(matches.results, bets, setBets)
	const { user } = useUser()
	const { isLandscape } = useOrientation()
	const [selectRanges, setSelectRanges] = useState<{ row: number; column: number } | null>(null)
	const [openDialog, setOpenDialog] = useState(false)

	useEffect(() => {
		if (!openDialog) {
			GetBets()
		}
	}, [matches, openDialog])

	const GetBets = async () => {
		if (matches.day) {
			const documents = await GetBetsByDay(matches.day.toString())
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
		<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
			{openDialog && <DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matches} />}
			<HeaderPage isInTime={isInTime} setOpenDialog={setOpenDialog} />
			{loading && <Loading />}
			{!loading && (
				<>
					<section className={`${styles.main_table} scrollbar`}>
						<div className={styles.namesTable}>
							<div className={styles.namesTable_header}>
								{matches.matches.length > 0 && <h1 className={styles.namesTable_headerTitle}>{matches.tournament}</h1>}
								{matches.matches.length > 0 && <p className={styles.namesTable_headerDay}>{`Jornada ${matches.day}`}</p>}
								<div className={styles.namesTable_headerSelect}>
									<ComboBox options={Orders} selectOption={orderBets} setSelectOption={setOrderBets} />
								</div>
							</div>
							{bets?.map((bet, index) => (
								<div
									className={`${styles.namesTable_name} ${selectRanges?.row === index && styles.namesTable_nameSelect} 
									${user.uid === bet.uid && styles.namesTable_nameCurrent}`}
									key={bet.id}
									onClick={() => HandleSelectRow(index, -1)}
									onMouseLeave={HandleUnselectRow}
								>
									{bet.name}
									<div className={styles.namesTable_hits}>
										{user.uid === bet.uid && <StarIcon className={styles.namesTable_hitsIcon} />}
										{winner?.includes(bet.id) && <WinnerIcon className={styles.namesTable_winIcon} />}
									</div>
								</div>
							))}
						</div>
						<div className={styles.betsTable}>
							<ul className={styles.matches}>
								{matches.matches.length > 0 && matches.matches?.map((match, index) => <HeaderMatches key={match.id} match={match} index={index} />)}
							</ul>
							<div className={styles.betsTable_container}>
								{bets !== undefined &&
									bets?.map((bet, indexOne) => (
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
									))}
							</div>
						</div>
					</section>
				</>
			)}
		</main>
	)
}
