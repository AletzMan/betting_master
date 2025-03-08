import { Rank } from "@/types/StatisticsTypes"
import styles from "./playerstatistics.module.scss"
import { IOptions } from "@/types/types"
import { Badge } from "primereact/badge"

interface Props {
	player: Rank
	options: IOptions
}

export function PlayerStatistics(props: Props) {
	const { player, options } = props

	return (
		<div className="grid grid-cols-[2.5em_10em_8em_3em_3em_2.5em] place-content-start place-items-center py-1  border-b-1 border-dashed border-(--surface-d) text-center bg-[linear-gradient(-40deg,var(--surface-c),var(--surface-b))]">
			<span className={`flex items-center justify-center text-sm text-cyan-100 text-ellipsis text-wrap overflow-hidden bg-(--surface-c) w-7 h-7 rounded-sm border-1 border-(--surface-d)`} >{player[options.rank]}</span>
			<span className={`flex items-center justify-center text-sm`}>{player.knownName}</span>
			<span className={`flex items-center justify-center text-sm`}>{player.teamName}</span>
			<span className={`flex items-center justify-center text-sm`}>{player[options.statistic]}</span>
			<span className={`flex items-center justify-center text-sm`}>
				{options.totals === "passes" ? player[options.totals] - (player[options.statistic] || 0) : player[options.totals]}
			</span>
			<span className={`flex items-center justify-center text-sm text-lime-500`}>{player[options.average]}</span>
		</div>
	)
}
