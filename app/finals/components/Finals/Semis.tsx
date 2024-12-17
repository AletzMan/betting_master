import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import stylesGeneral from "../../finales.module.scss"
import MatchFinals from "./MatchFinals"
import { ArrowUpIcon, BracketIcon, ProfileIcon } from "@/app/svg"

interface Props {
    participants: IParticipants[]
}


export default function Semis({ participants }: Props) {

    return (
        <details className={stylesGeneral.details} name="finals" >
            <summary className={stylesGeneral.details_summary}>
                <div className={stylesGeneral.details_title}>
                    <BracketIcon className={stylesGeneral.details_icon} />
                    Semi Finales
                </div>
                <ArrowUpIcon className={stylesGeneral.details_arrow} />
            </summary>
            <div className={styles.matches}>
                <MatchFinals participants={participants} index={[0, 6]} />
                <MatchFinals participants={participants} index={[4, 5]} />
            </div>
        </details>
    )
}