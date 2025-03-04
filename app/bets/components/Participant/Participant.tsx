
import styles from "./styles.module.scss"
import { IBet, IMatchDay } from "@/types/types"
import { Dispatch, SetStateAction } from "react"
import { useWinner } from "@/hooks/useWinner"
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
                    className={`relative grid grid-cols-[2.5em_1fr_2.5em] gap-1.5 items-center justify-start h-9 px-1 rounded-xs bg-(--surface-f) overflow-hidden ${selectRanges?.row === index && styles.participant_select} 
												${session.data?.user?.id === bet.uid && styles.participant_current}`}

                    onClick={() => HandleSelectRow(index, -1)}
                    onMouseLeave={HandleUnselectRow}
                >
                    {selectRanges?.row === index && <span className="absolute w-[120%] h-[110%] bg-[#ff00b320] "></span>}

                    {<Avatar className="border-2 border-(--primary-color)" image={bet.userInfo.image} shape="circle" size="normal" />}
                    {/*<Image src={bet.userInfo.image} width={20} height={20} alt={`Imagen de perfil de ${bet.userInfo.name}`} />*/}
                    {!hiddenNames && <span className="overflow-hidden whitespace-nowrap text-ellipsis h-6">{bet.name}</span>}
                    <div className="grid grid-cols-[1em_1em] gap-1.5">
                        {session.data?.user?.id === bet.uid && <i className="pi pi-star-fill text-purple-500" />}
                        {winner?.includes(bet.id) && <i className="pi pi-trophy text-yellow-400 col-start-2" />}
                    </div>
                </div>
            }
        </>
    )
}