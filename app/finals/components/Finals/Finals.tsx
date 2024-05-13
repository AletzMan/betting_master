import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import Quarters from "./Quarters"
import Semis from "./Semis"

interface Props {
    participants: IParticipants[]
}

export default function Finals({ participants }: Props) {
    return (
        <div className={`${styles.finals} scrollbar`}>
            <Semis participants={participants} />
            <Quarters participants={participants} />
        </div>
    )
}