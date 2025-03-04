import { ConvertToPrice } from "@/functions/functions"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { IBet, IBetDocument } from "@/types/types"
import { IMatchDayData } from "@/utils/fetchData"

interface Props {
    hiddenNames: boolean
    setHiddenNames: Dispatch<SetStateAction<boolean>>
    setFilterBets: Dispatch<SetStateAction<IBet[] | null>>
    matchDayData: IMatchDayData | null
    totalBets: number
}

export default function HeaderTable({ hiddenNames, setHiddenNames, setFilterBets, matchDayData, totalBets }: Props) {

    const HandleOrder = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
    }

    const HandleSetVisibilityNames = () => {
        setHiddenNames(prev => !prev)
    }


    return (
        <>
            {matchDayData?.matches &&
                <div className="sticky top-0 grid grid-cols-[1fr_1em] h-24 w-full bg-(--surface-c) z-3">
                    <div className="flex flex-col items-center justify-between w-full">
                        {!hiddenNames && <span className="text-amber-400">Monto: {(ConvertToPrice(totalBets * 13.5))}</span>}
                        {/*matches.matches.length > 0 && <h1 className={styles.header_title}>{matches.tournament}</h1>*/}
                        {matchDayData.matches.length > 0 && <p className={`font-semibold ${hiddenNames ? "text-transparent" : "text-white"}`}>{`Jornada ${matchDayData.matchDay.day}`}</p>}
                        <select className="border-2 border-(--surface-d) rounded-md px-4 py-2 bg-(--surface-b)" onChange={HandleOrder}>
                            <option value="normal">Por participante</option>
                            <option value="myBets">Mis quinielas</option>
                            <option value="name">Por nombre</option>
                            <option value="des">Por aciertos ↓</option>
                            <option value="asc">Por aciertos ↑</option>
                        </select>
                    </div>
                    <button className="flex items-center justify-center h-full w-4 rounded-l-md  bg-(--primary-color)" onClick={HandleSetVisibilityNames}>
                        <i className={` ${hiddenNames ? "pi pi-angle-right" : "pi pi-angle-left"} `} />
                    </button>
                </div>
            }
        </>
    )
}