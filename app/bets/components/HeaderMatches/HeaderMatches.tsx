import { IMatch } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"
import React from "react"

interface PropsHeaderMatches {
	match: IMatch
	index: number
}

export function HeaderMatches(props: PropsHeaderMatches) {
	const { match, index } = props

	return (
		<>
			{match &&
				<li
					className={`relative flex flex-col items-center justify-center min-w-10 overflow-hidden w-full h-24 rounded-sm
			${match.status === "finished" && "bg-(--finished-color)"}  
			${match.status === "in progress" && "bg-(--started-color)"}
			${match.status === "not started" && "bg-(--pending-color)"}`}
				>
					{React.cloneElement(TeamsLogos.find(team => team.id.toString() === match.homeTeam)?.logo as React.ReactElement, { className: "absolute -top-2 -left-2 w-7 h-7 object-fit" })}
					<span className="text-xs font-bold">{TeamsLogos.find(team => team.id.toString() === match.homeTeam)?.abbName}</span>
					<span className="">vs</span>
					<span className="text-xs font-bold">{TeamsLogos.find(team => team.id.toString() === match.awayTeam)?.abbName}</span>
					{React.cloneElement(TeamsLogos.find(team => team.id.toString() === match.awayTeam)?.logo as React.ReactElement, { className: "absolute -bottom-2 -right-2 w-7 h-7 object-fit" })}
					{match.status === "finished" && <i className="pi pi-check-circle absolute top-0.5 right-0.5 text-green-300" style={{ fontSize: "0.9em" }} />}
					{match.status === "in progress" && <i className="pi pi-circle-fill absolute top-0.5 right-0.5 text-red-500 animate-ping" style={{ fontSize: "0.9em" }} />}
					{match.status === "not started" && <i className="pi pi-clock absolute top-0.5 right-0.5 text-yellow-300" style={{ fontSize: "0.9em" }} />}
				</li>
			}
		</>
	)
}
