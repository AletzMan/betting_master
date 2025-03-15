import { useDataBets } from "@/hooks/useDataBets"
import { HeaderMatches } from "./HeaderMatches"
import { IBet, IMatch, IMatchDay } from "@/types/types"
import { Dispatch, Fragment, SetStateAction } from "react"

interface Props {
    filterBets: IBet[] | null
    selectRanges: { row: number, column: number } | null
    setSelectRanges: Dispatch<SetStateAction<{ row: number, column: number } | null>>
    matchDayInfo: IMatchDay,
}

export function BettingsTable({ filterBets, selectRanges, setSelectRanges, matchDayInfo }: Props) {

    const HandleSelectRow = (row: number, column: number) => {
        setSelectRanges({ row, column })
    }

    const HandleUnselectRow = () => {
        setSelectRanges(null)
    }


    return (

        <div className="  flex flex-col w-full h-full gap-y-0  bg-(--surface-b)">
            <ul className="sticky top-0 grid grid-cols-[repeat(9,2.5em)] gap-x-1 mr-1 bg-(--surface-d) w-max z-3">
                {matchDayInfo.matches && matchDayInfo.matchesRel?.length > 0 &&
                    matchDayInfo.matchesRel
                        ?.slice()
                        .sort((a, b) => {
                            const dateA = new Date(a.startDate as Date).getTime(); // Obtener milisegundos
                            const dateB = new Date(b.startDate as Date).getTime(); // Obtener milisegundos
                            return dateA - dateB;
                        })
                        .map((match, index) => (
                            <HeaderMatches key={match.awayTeam} match={match} index={index} matchDayInfo={matchDayInfo} />
                        ))}
            </ul>
            <div className="flex flex-col pt-1 pr-1 gap-y-1 ">
                {filterBets && filterBets!.length > 0 &&
                    filterBets.map((bet, indexOne) => (
                        <Fragment key={bet.id}>
                            {bet.paid &&
                                <ul className="grid grid-cols-[repeat(9,2.5em)] gap-x-1 w-full" key={bet.name}>
                                    {bet.predictions?.sort((a, b) => a.matchNumber - b.matchNumber).map((betInfo, index) => (
                                        <li
                                            key={betInfo.id}
                                            className={`relative flex items-center justify-center w-full h-9`}
                                            onClick={() => HandleSelectRow(indexOne, index)}
                                            onMouseLeave={HandleUnselectRow}
                                        >
                                            {(selectRanges?.column === index || selectRanges?.row === indexOne) && <span className="absolute w-[110%] h-[110%] bg-(--row-select-color) "></span>}
                                            <span
                                                className={`flex items-center justify-center w-full h-full rounded-md text-white font-bold  
                                                ${matchDayInfo.results[index] === betInfo.prediction && matchDayInfo.results[index] !== "-" ? "bg-lime-600 inset-shadow-lime-900/90 inset-shadow-sm" : "bg-gray-700 inset-shadow-gray-900/90 inset-shadow-sm"} 
																		 
																		`}
                                            >
                                                {betInfo.prediction}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}