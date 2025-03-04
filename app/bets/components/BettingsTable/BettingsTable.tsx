import { useDataBets } from "@/hooks/useDataBets"
import { HeaderMatches } from "../HeaderMatches/HeaderMatches"
import { IBet } from "@/types/types"
import { Dispatch, SetStateAction } from "react"

interface Props {
    bets: IBet[] | null
    filterBets: IBet[] | null
    selectRanges: { row: number, column: number } | null
    setSelectRanges: Dispatch<SetStateAction<{ row: number, column: number } | null>>
}

export function BettingsTable({ bets, filterBets, selectRanges, setSelectRanges }: Props) {
    const { matches, matchDayInfo } = useDataBets()

    const HandleSelectRow = (row: number, column: number) => {
        setSelectRanges({ row, column })
    }

    const HandleUnselectRow = () => {
        setSelectRanges(null)
    }

    return (
        <>
            {matchDayInfo.results &&
                <div className="  flex flex-col w-full h-full gap-y-0  bg-(--surface-b)">
                    <ul className="sticky top-0 grid grid-cols-[repeat(9,2.5em)] gap-x-1 mr-1 bg-(--surface-d) w-max z-3">
                        {matches && matches?.length > 0 && matches?.map((match, index) => <HeaderMatches key={match.awayTeam} match={match} index={index} />)}
                    </ul>
                    <div className="flex flex-col pt-1 pr-1 gap-y-1 ">
                        {bets !== undefined &&
                            filterBets?.map((bet, indexOne) => (
                                <>
                                    {bet.paid &&
                                        <ul className="grid grid-cols-[repeat(9,2.5em)] gap-x-1 w-full" key={bet.name}>
                                            {bet.predictions?.map((betInfo, index) => (
                                                <li
                                                    key={betInfo.id}
                                                    className={`relative flex items-center justify-center w-full h-9`}
                                                    onClick={() => HandleSelectRow(indexOne, index)}
                                                    onMouseLeave={HandleUnselectRow}
                                                >
                                                    {(selectRanges?.column === index || selectRanges?.row === indexOne) && <span className="absolute w-[110%] h-[110%] bg-[#ff00b320] "></span>}
                                                    <span
                                                        className={`flex items-center justify-center w-full h-full rounded-md text-white font-bold  ${matchDayInfo.results[index] === betInfo.prediction && matches[index].status === "finished" ? "bg-lime-600" : "bg-gray-700"} 
																		 
																		`}
                                                    >
                                                        {betInfo.prediction}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}