import { IFinalsParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import stylesGeneral from "../../finales.module.scss"
import MatchFinals from "./MatchFinals"
import { ArrowUpIcon, BracketIcon } from "@/app/svg"

interface Props {
    participants: IFinalsParticipants[]
}


export default function Semis({ participants }: Props) {


    const currentFase = Math.max(...participants.map(part => part.progress_stage.length))
    return (
        <details className={stylesGeneral.details} name="finals" open={currentFase === 2}>
            <summary className={stylesGeneral.details_summary}>
                <div className={stylesGeneral.details_title}>
                    <BracketIcon className={stylesGeneral.details_icon} />
                    Semi Finales
                </div>
                <ArrowUpIcon className={stylesGeneral.details_arrow} />
            </summary>
            <div className={styles.matches}>
                <MatchFinals participants={participants} index={[0, 3]} />
                <MatchFinals participants={participants} index={[1, 2]} />
            </div>
        </details>
    )
}