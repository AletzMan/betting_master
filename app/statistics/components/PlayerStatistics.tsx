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
		<div className="grid grid-cols-[2.5em_10em_8em_3em_3em_2.5em] place-content-start place-items-center py-1  w-[calc(100svw-1em)] border-b-1 border-(--surface-d) text-center">
			<span className={`flex items-center justify-center text-xs text-white text-ellipsis text-wrap overflow-hidden bg-(--cyan-700) w-5 h-5 rounded-full`} >{player[options.rank]}</span>
			<span className={`flex items-center justify-center text-sm`}>{player.knownName}</span>
			<span className={`flex items-center justify-center text-sm`}>{player.teamName}</span>
			<span className={`flex items-center justify-center text-sm`}>{player[options.statistic]}</span>
			<span className={`flex items-center justify-center text-sm`}>
				{options.totals === "passes" ? player[options.totals] - (player[options.statistic] || 0) : player[options.totals]}
			</span>
			<span className={`flex items-center justify-center text-sm text-(--green-300)`}>{player[options.average]}</span>
		</div>
	)
}
