import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import MatchFinals from "./MatchFinals"

interface Props {
    participants: IParticipants[]
}


export default function Quarters({ participants }: Props) {

    return (
        <section className={`${styles.quarters} `}>
            <h2 className={styles.quarters_title}>Cuartos de Final</h2>
            <MatchFinals participants={participants} index={[0, 7]} />
            <MatchFinals participants={participants} index={[1, 6]} />
            <MatchFinals participants={participants} index={[2, 5]} />
            <MatchFinals participants={participants} index={[3, 4]} />
        </section>
    )
}