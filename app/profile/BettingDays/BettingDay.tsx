import { ArrowIcon } from "@/app/svg"
import styles from "./bettingday.module.scss"
import { BetPrediction } from "../BetPrediction/BetPrediction"
import { IBetsByDay } from "@/app/types/types"
import { Dispatch, SetStateAction, useState } from "react"

interface Props {
	bet: [string, IBetsByDay]
	open: boolean[]
	setOpen: Dispatch<SetStateAction<boolean[]>>
	index: number
	numberDays: number
}

export function BettingDay(props: Props) {
	const { bet, open, setOpen, numberDays, index } = props

	const HandleOpen = () => {
		let newOpen: boolean[] = new Array(numberDays)
		newOpen.splice(index, 1, !open[index])
		setOpen(newOpen)
	}

	return (
		<div key={bet[0]} className={styles.bets}>
			<header key={bet[0]} className={styles.betsHeader}>
				<span className={styles.betsHeaderDay}>{`Jornada ${bet[0]} ${bet[1].bets[0].seasson || bet[1].bets[0].season}`}</span>
				<button className={styles.betsHeaderButton} onClick={HandleOpen}>
					<ArrowIcon key={bet[0]} className={`${styles.betsHeaderIcon} ${open[index] && styles.betsHeaderIconOpen}`} />
				</button>
			</header>
			<div className={`${styles.betsContainer} ${open[index] && styles.betsContainerOpen}`}>
				{bet[1].bets.map((bet) => (
					<BetPrediction myBet={bet} key={bet.id} />
				))}
			</div>
		</div>
	)
}
