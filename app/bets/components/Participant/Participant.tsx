import { useMatches } from "@/app/hooks/useMatches"
import styles from "./styles.module.scss"
import { HeaderMatches } from "../HeaderMatches/HeaderMatches"
import { IBetDocument } from "@/app/types/types"
import { Dispatch, Fragment, SetStateAction } from "react"
import Image from "next/image"
import { StarIcon, WinnerIcon } from "@/app/svg"
import { useUser } from "@/app/config/zustand-store"
import { useWinner } from "@/app/hooks/useWinner"

interface Props {
    bets: IBetDocument[]
    bet: IBetDocument
    index: number
    hiddenNames: boolean
    selectRanges: { row: number, column: number } | null
    setSelectRanges: Dispatch<SetStateAction<{ row: number, column: number } | null>>
}

export function Participant({ bets, bet, selectRanges, setSelectRanges, hiddenNames, index }: Props) {
    const { user } = useUser()
    const { matches } = useMatches()
    const { winner } = useWinner(bets, matches.results)

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
                    className={`${styles.participant} ${selectRanges?.row === index && styles.participant_select} 
												${user.uid === bet.uid && styles.participant_current}`}
                    key={bet.id}
                    onClick={() => HandleSelectRow(index, -1)}
                    onMouseLeave={HandleUnselectRow}
                >
                    <picture className={styles.participant_photo}>
                        <Image className={styles.participant_photoImage} src={bet.userInfo?.photo || "/user-icon.png"} width={22} height={22} alt={`Foto de perfil de ${bet.userInfo?.name}`} />
                    </picture>
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