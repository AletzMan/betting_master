import { ArrowIcon } from "@/svg"
import styles from "./styles.module.scss"
import { ConvertToPrice } from "@/functions/functions"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useMatches } from "@/hooks/useMatches"
import { useSort } from "@/hooks/useSort"
import { IBetDocument } from "@/types/types"

interface Props {
    hiddenNames: boolean
    setHiddenNames: Dispatch<SetStateAction<boolean>>
    setFilterBets: Dispatch<SetStateAction<IBetDocument[] | null>>
    bets: IBetDocument[] | null
}

export default function HeaderTable({ hiddenNames, setHiddenNames, setFilterBets, bets }: Props) {
    const { matches } = useMatches()
    const { setOrderBets } = useSort(matches.results, bets, setFilterBets)

    const HandleOrder = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        if (value === "name" || value === "des" || value === "asc" || value === "normal" || value === "myBets") {
            setOrderBets(value)
        }
    }

    const HandleSetVisibilityNames = () => {
        setHiddenNames(prev => !prev)
    }


    return (
        <>
            {matches.matches &&
                <div className={`${styles.header} ${hiddenNames && styles.header_hidden}`}>
                    <button className={styles.header_resize} onClick={HandleSetVisibilityNames}>
                        <ArrowIcon className={`${styles.header_resizeArrow} ${hiddenNames && styles.header_resizeArrowHidden}`} />
                    </button>
                    {!hiddenNames && <span className={styles.header_amount}>Monto: {ConvertToPrice((bets?.length || 0) * 13.5)}</span>}
                    {/*matches.matches.length > 0 && <h1 className={styles.header_title}>{matches.tournament}</h1>*/}
                    {matches.matches.length > 0 && <p className={`${styles.header_day} ${hiddenNames && styles.header_dayHidden}`}>{`Jornada ${matches.day}`}</p>}
                    <select className={styles.header_select} onChange={HandleOrder}>
                        <option value="normal">Por participante</option>
                        <option value="myBets">Mis quinielas</option>
                        <option value="name">Por nombre</option>
                        <option value="des">Por aciertos ↓</option>
                        <option value="asc">Por aciertos ↑</option>
                    </select>
                </div>
            }
        </>
    )
}