import { IBet, IMatchDay } from "@/types/types"
import { Dispatch, SetStateAction } from "react"
import { useWinner } from "@/hooks/useWinner"
import { Avatar } from "primereact/avatar"
import { useSession } from "next-auth/react"
import Image from "next/image"

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
                    className={`relative grid grid-cols-[2em_1fr_2.5em] gap-1 items-center justify-start h-9 px-1 border-gray-700 border-1 rounded-xs overflow-hidden  
												${hiddenNames && (winner?.includes(bet.id) ? "bg-yellow-950 border-yellow-500 " : session.data?.user?.id === bet.uid ? "bg-purple-950 border-purple-500 " : "bg-(--surface-f) border-gray-700 ")}`}

                    onClick={() => HandleSelectRow(index, -1)}
                    onMouseLeave={HandleUnselectRow}
                >
                    {selectRanges?.row === index && <span className="absolute w-[120%] h-[110%] bg-(--row-select-color)"></span>}

                    {/*<Avatar className="border-2 border-(--primary-color)" image={bet.userInfo.image} shape="circle" size="normal" />*/}
                    {<Image className="rounded-md border-2 border-(--primary-color) object-cover max-h-7" blurDataURL="/user-icon.png" src={bet.userInfo.image} width={28} height={28} alt={`Imagen de perfil de ${bet.userInfo.name}`} />}
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