
import styles from "./styles.module.scss"
import { HeaderMatches } from "../HeaderMatches/HeaderMatches"
import { IBet, IBetDocument, IMatchDay } from "@/types/types"
import { Dispatch, Fragment, SetStateAction } from "react"
import Image from "next/image"
import { StarIcon, WinnerIcon } from "@/svg"
import { useUser } from "@/config/zustand-store"
import { useWinner } from "@/hooks/useWinner"
import { useDataBets } from "@/hooks/useDataBets"
import { Avatar } from "primereact/avatar"
import { useSession } from "next-auth/react"

interface Props {
    bets: IBet[] | null
    bet: IBet
    index: number
    hiddenNames: boolean
    selectRanges: { row: number, column: number } | null
    setSelectRanges: Dispatch<SetStateAction<{ row: number, column: number } | null>>
    matchDayInfo: IMatchDay
}

export function Participant({ bets, bet, selectRanges, setSelectRanges, hiddenNames, index, matchDayInfo }: Props) {
    const session = useSession()
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
                    className={`grid grid-cols-[2.5em_1fr_2.5em] gap-1.5 items-center justify-start h-9 px-1 rounded-xs bg-(--surface-f) overflow-hidden ${selectRanges?.row === index && styles.participant_select} 
												${session.data?.user?.id === bet.uid && styles.participant_current}`}

                    onClick={() => HandleSelectRow(index, -1)}
                    onMouseLeave={HandleUnselectRow}
                >
                    {<Avatar className="border-1 border-(--primary-color)" image={bet.userInfo.image} shape="circle" size="normal" />}
                    {/*<Image src={bet.userInfo.image} width={20} height={20} alt={`Imagen de perfil de ${bet.userInfo.name}`} />*/}
                    {!hiddenNames && <span className={styles.participant_name}>{bet.name}</span>}
                    <div className="grid grid-cols-[1em_1em] gap-1.5">
                        {session.data?.user?.id === bet.uid && <i className="pi pi-star-fill text-purple-500" />}
                        {winner?.includes(bet.id) && <i className="pi pi-trophy text-yellow-400 col-start-2" />}
                    </div>
                </div>
            }
        </>
    )
}