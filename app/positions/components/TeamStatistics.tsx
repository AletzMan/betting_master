import { Rank } from "@/types/types"

interface PropsTeam {
	team: Rank
	position: number
}

export function TeamStatistics(props: PropsTeam) {
	const { team, position } = props
	const differenceGoals = parseInt(team.standing.for) - parseInt(team.standing.against)
	return (
		<article className="flex flex-row bg-(--surface-d)">
			<div className="grid grid-cols-[repeat(8,2em)] text-center items-center justify-center h-8">
				<span >{team.standing.played}</span>
				<span >{team.standing.won}</span>
				<span >{team.standing.drawn}</span>
				<span >{team.standing.lost}</span>
				<span >{team.standing.for}</span>
				<span >{team.standing.against}</span>
				<span
					className={`text-(--surface-900)
					${differenceGoals < 0 && "text-red-600"}
					${differenceGoals > 0 && "text-green-600"}`}
				>
					{differenceGoals}
				</span>
				<span className="font-bold">{team.standing.points}</span>
			</div>
		</article>
	)
}
