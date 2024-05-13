import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import MatchFinals from "./MatchFinals"

interface Props {
    participants: IParticipants[]
}


export default function Semis({ participants }: Props) {

    return (
        <section className={`${styles.quarters} `}>
            <h2 className={styles.quarters_title}>Semi - Finales</h2>
            <MatchFinals participants={participants} index={[0, 5]} />
            <MatchFinals participants={participants} index={[1, 3]} />
        </section>
    )
}