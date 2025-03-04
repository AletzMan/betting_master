import { useDataBets } from "@/hooks/useDataBets"
import styles from "./styles.module.scss"
import { HeaderMatches } from "../HeaderMatches/HeaderMatches"
import { IBet, IBetDocument } from "@/types/types"
import { Dispatch, SetStateAction } from "react"

interface Props {
    bets: IBetDocument[]
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

                <div className={styles.betsTable}>
                    <ul className={styles.matches}>
                        {matchDayInfo?.matches && matchDayInfo?.matches?.length > 0 && matchDayInfo.matches?.map((match, index) => <HeaderMatches key={match} match={match} index={index} />)}
                    </ul>
                    <div className={styles.betsTable_container}>
                        {bets !== undefined &&
                            filterBets?.map((bet, indexOne) => (
                                <>
                                    {bet.paid &&
                                        <ul className={styles.betsTable_bets} key={bet.name}>
                                            {bet?.bets?.map((betInfo, index) => (
                                                <li
                                                    key={betInfo.id}
                                                    className={`${styles.betsTable_betsBet} ${selectRanges?.column === index && styles.betsTable_betsBetSelectColumn} 
                                            ${selectRanges?.row === indexOne && styles.betsTable_betsBetSelectRow}`}
                                                    onClick={() => HandleSelectRow(indexOne, index)}
                                                    onMouseLeave={HandleUnselectRow}
                                                >
                                                    <span
                                                        className={` ${matches.results[index] === betInfo.prediction ? styles.betsTable_betsBetWin : styles.betsTable_betsBetNoWin} 
																		${matches.results[index] === betInfo.prediction && matches.matches[index].status === "En juego" && styles.betsTable_betsBetPreWin}
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