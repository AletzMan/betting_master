import { ITournamentPosition, Rank } from "@/types/types"
import Image from "next/image"

interface PropsTeam {
	team: Rank
	position: number
	selectedLeague: ITournamentPosition
}

const ClassifiedPositions = {
	"Liga MX": [6, 10],
	"Champions League": [8, 24],
	"Premier League": [4, 5],
	"La Liga": [4, 5],
	"Bundesliga": [4, 5],
	"Liga Holandesa": [2, 3],
	"Serie A": [4, 5],
	"League 1": [3, 4]
}

export function TeamDescription(props: PropsTeam) {
	const { team, position, selectedLeague } = props
	const isConference = selectedLeague.name !== "Liga MX" && selectedLeague.name !== "Premier League" && selectedLeague.name !== "Champions League"
	return (
		<article className="flex -flex-rpw bg-(--surface-b)">
			<div
				className={`grid grid-cols-[1em_2em_1fr] items-center gap-x-2 min-w-48 h-8 px-0.5 pr-2 pl-0.5 border-l-3
				${position <= ClassifiedPositions[selectedLeague.name][0] ? "border-l-blue-500" :
						position > ClassifiedPositions[selectedLeague.name][0] && position <= ClassifiedPositions[selectedLeague.name][1] ? "border-l-amber-500" :
							isConference && (position === ClassifiedPositions[selectedLeague.name][1] + 1) ? "border-l-green-500" :
								(selectedLeague.name === "League 1" && position === 6) ? "border-l-cyan-500" : "border-l-transparent"}
				`}
			>
				<p className="text-right text-sm text-(--surface-800)">{position}</p>
				<Image
					className="w-6 h-6"
					src={team.images.urlLogo[0]}
					alt={`Imagen del logo del equipo ${team.fullName}`}
					width={50}
					height={50}
					loading="lazy"
				/>
				<p className="text-sm text-ellipsis text-wrap overflow-hidden">{team.name}</p>
			</div>
		</article>
	)
}
