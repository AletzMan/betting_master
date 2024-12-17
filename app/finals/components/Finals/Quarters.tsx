import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import stylesGeneral from "../../finales.module.scss"
import MatchFinals from "./MatchFinals"
import { ArrowUpIcon, BracketIcon, ProfileIcon } from "@/app/svg"

interface Props {
    participants: IParticipants[]
}


export default function Quarters({ participants }: Props) {

    return (
        <details className={stylesGeneral.details} name="finals">
            <summary className={stylesGeneral.details_summary}>
                <div className={stylesGeneral.details_title}>
                    <BracketIcon className={stylesGeneral.details_icon} />
                    Cuartos de Final
                </div>
                <ArrowUpIcon className={stylesGeneral.details_arrow} />
            </summary>
            <div className={styles.matches}>
                <MatchFinals participants={participants} index={[0, 7]} />
                <MatchFinals participants={participants} index={[1, 6]} />
                <MatchFinals participants={participants} index={[2, 5]} />
                <MatchFinals participants={participants} index={[3, 4]} />
            </div>
        </details>
    )
}