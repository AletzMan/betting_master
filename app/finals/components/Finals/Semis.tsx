import { IFinalsParticipants } from "@/types/types"
import styles from "./finals.module.scss"
import stylesGeneral from "../../finales.module.scss"
import MatchFinals from "./MatchFinals"
import { ArrowUpIcon, BracketIcon } from "@/svg"

interface Props {
    participants: IFinalsParticipants[]
}


export default function Semis({ participants }: Props) {


    const currentFase = Math.max(...participants.map(part => part.progress_stage.length))
    return (

        <div className={styles.matches}>
            <MatchFinals participants={participants} index={[0, 3]} />
            <MatchFinals participants={participants} index={[1, 2]} />
        </div>
    )
}