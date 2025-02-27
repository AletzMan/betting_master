import { ViewIcon } from "@/svg"
import styles from "./betprediction.module.scss"
import { IBet } from "@/types/types"
import { ViewBets } from "../ViewBets/ViewBets"
import { useState } from "react"

interface PropsBet {
	myBet: IBet
}

export function BetPrediction(props: PropsBet) {
	const { myBet } = props
	const [viewDetails, setViewDetails] = useState(false)

	const HandleSelectBet = () => {
		setViewDetails(true)
	}
	return (
		<>
			{viewDetails && <ViewBets bet={myBet} setClose={setViewDetails} />}
			<article className={styles.bets}>
				<span className={styles.bets_name}>{myBet.name}</span>
				<button className={styles.bets_button} onClick={HandleSelectBet} title="Ver detalles de quiniela">
					<ViewIcon className={styles.bets_view} />
				</button>
			</article>
		</>
	)
}
