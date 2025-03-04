
import styles from "./styles.module.scss"
import { HeaderMatches } from "../HeaderMatches/HeaderMatches"
import { IBet, IBetDocument } from "@/types/types"
import { Dispatch, Fragment, SetStateAction } from "react"
import Image from "next/image"
import { StarIcon, WinnerIcon } from "@/svg"
import { useUser } from "@/config/zustand-store"
import { useWinner } from "@/hooks/useWinner"
import { useDataBets } from "@/hooks/useDataBets"
import { Avatar } from "primereact/avatar"

interface Props {
    bets: IBet[] | null
    bet: IBet
    index: number
    hiddenNames: boolean
    selectRanges: { row: number, column: number } | null
    setSelectRanges: Dispatch<SetStateAction<{ row: number, column: number } | null>>
}

export function Participant({ bets, bet, selectRanges, setSelectRanges, hiddenNames, index }: Props) {
    const { user } = useUser()
    const { matches, matchDayInfo } = useDataBets()
    const { winner } = useWinner(bets, matchDayInfo.results)

    const HandleSelectRow = (row: number, column: number) => {
        setSelectRanges({ row, column })
    }

    const HandleUnselectRow = () => {
        setSelectRanges(null)
    }
    return (
        <>
            {bet.paid &&
                <div
                    className={`grid grid-cols-[2em_1fr_3em] items-center justify-start h-8 px-1 rounded-xs bg-(--surface-e) overflow-hidden ${selectRanges?.row === index && styles.participant_select} 
												${user.uid === bet.uid && styles.participant_current}`}

                    onClick={() => HandleSelectRow(index, -1)}
                    onMouseLeave={HandleUnselectRow}
                >

                    <Avatar className={styles.participant_photoImage} image={bet.userInfo?.image} shape="circle" size="large" />

                    {!hiddenNames && <span className={styles.participant_name}>{bet.name}</span>}
                    <div className={styles.participant_hits}>
                        {user.uid === bet.uid && <StarIcon className={styles.participant_hitsIcon} />}
                        {winner?.includes(bet.id) && <WinnerIcon className={styles.participant_winIcon} />}
                    </div>
                </div>
            }
        </>
    )
}