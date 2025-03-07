/* eslint-disable react-hooks/exhaustive-deps */
import { ConvertToPrice } from "@/functions/functions"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IMatchDay } from "@/types/types"

interface Props {
    hiddenNames: boolean
    setHiddenNames: Dispatch<SetStateAction<boolean>>
    matchDayInfo: IMatchDay | null
    totalBets: number
}

export default function HeaderTable({ hiddenNames, setHiddenNames, matchDayInfo, totalBets }: Props) {
    const route = useRouter()
    const searchParams = useSearchParams()
    const [orderAsc, setOrderAsc] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (params.has("sortBy")) {

            route.push(`/bets?${params.toString()}`)
        } else {
            params.set("sortBy", "normal")
            route.push(`/bets?${params.toString()}`)
        }
    }, [])

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams.toString())
        params.set("sortBy", value)
        route.push(`/bets?${params.toString()}`)
    }
    const handleOrder = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (params.has("order")) {
            params.set("order", params.get("order") === "asc" ? "desc" : "asc")
            route.push(`/bets?${params.toString()}`)
            setOrderAsc(params.get("order") === "asc");
        } else {
            params.set("order", "desc")
            route.push(`/bets?${params.toString()}`)
            setOrderAsc(false);
        }
    }

    const HandleSetVisibilityNames = () => {
        setHiddenNames(prev => !prev)
    }

    return (
        <>
            {matchDayInfo &&
                <div className="sticky top-0 flex flex-col h-24 w-full bg-(--surface-d) z-5 overflow-hidden">
                    <div className="flex flex-col items-center justify-between w-full">
                        {!hiddenNames && <span className="text-amber-400">Monto: {(ConvertToPrice(totalBets * 13.5))}</span>}
                        {matchDayInfo.matches.length > 0 && <p className={`font-semibold ${hiddenNames ? "text-transparent" : "text-white"}`}>{`Jornada ${matchDayInfo.day}`}</p>}
                        <div className="flex flex-row gap-0.5">
                            <select className="border-2 border-(--surface-d) max-h-11 rounded-md px-2 py-2 bg-(--surface-b)" value={new URLSearchParams(searchParams.toString()).get("sortBy") || "normal"} onChange={handleSort}>
                                <option value="normal">Por participante</option>
                                <option value="myBets">Mis quinielas</option>
                                <option value="name">Por nombre</option>
                                <option value="hits">Por aciertos</option>
                            </select>
                            <button className="flex items-center justify-center w-11 h-11 bg-(--surface-b) rounded-md border-2 border-(--surface-d)" onClick={handleOrder}>
                                {!orderAsc ? <i className="pi pi-sort-amount-down"></i> : <i className="pi pi-sort-amount-up"></i>}
                            </button>
                        </div>
                    </div>
                    <button className="absolute right-0 top-[5px] flex items-center justify-center h-10 w-6 rounded-l-xl  bg-[#19eded70]" onClick={HandleSetVisibilityNames}>
                        <i className={` ${hiddenNames ? "pi pi-angle-right" : "pi pi-angle-left"} `} />
                    </button>
                </div>
            }
        </>
    )
}