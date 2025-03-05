import { IMatch, IMatchDay } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"
import React from "react"

interface PropsHeaderMatches {
	match: IMatch
	matchDayInfo: IMatchDay,
	index: number
}

export function HeaderMatches({ match, index, matchDayInfo }: PropsHeaderMatches) {


	return (
		<>
			{match &&
				<li
					className={`relative flex flex-col items-center justify-center min-w-10 overflow-hidden w-full h-24 rounded-sm
			${(matchDayInfo.results[index] !== "-" && matchDayInfo.results[index] !== "LV") && "bg-(--finished-color)"}  
			${matchDayInfo.results[index] === "LV" && "bg-(--started-color)"}
			${matchDayInfo.results[index] === "-" && "bg-(--pending-color)"}`}
				>
					{React.cloneElement(TeamsLogos.find(team => team.id.toString() === match.homeTeam)?.logo as React.ReactElement, { className: "absolute -top-2 -left-2 w-7 h-7 object-fit" })}
					<span className="text-xs font-bold">{TeamsLogos.find(team => team.id.toString() === match.homeTeam)?.abbName}</span>
					<span className="">vs</span>
					<span className="text-xs font-bold">{TeamsLogos.find(team => team.id.toString() === match.awayTeam)?.abbName}</span>
					{React.cloneElement(TeamsLogos.find(team => team.id.toString() === match.awayTeam)?.logo as React.ReactElement, { className: "absolute -bottom-2 -right-2 w-7 h-7 object-fit" })}
					{(matchDayInfo.results[index] !== "-" && matchDayInfo.results[index] !== "LV") && <i className="pi pi-check-circle absolute top-0.5 right-0.5 text-green-300" style={{ fontSize: "0.9em" }} />}
					{matchDayInfo.results[index] === "LV" &&
						<>
							<i className="pi pi-circle-fill absolute top-[3px] right-[3px] text-red-500" style={{ fontSize: "0.7em" }} />
							<i className="pi pi-circle-fill absolute top-0.5 right-0.5 text-red-500 animate-ping" style={{ fontSize: "0.9em" }} />
						</>
					}
					{matchDayInfo.results[index] === "-" && <i className="pi pi-clock absolute top-0.5 right-0.5 text-yellow-300" style={{ fontSize: "0.9em" }} />}
				</li>
			}
		</>
	)
}
