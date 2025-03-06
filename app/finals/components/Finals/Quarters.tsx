import { IFinalsParticipants } from "@/types/types"
import styles from "./finals.module.scss"
import MatchFinals from "./MatchFinals"

interface Props {
    participants: IFinalsParticipants[]
}


export default function Quarters({ participants }: Props) {


    const currentFase = Math.max(...participants.map(part => part.progress_stage.length))

    return (
        <div className="flex flex-col gap-2 mb-2">
            <MatchFinals participants={participants} index={[0, 7]} />
            <MatchFinals participants={participants} index={[1, 6]} />
            <MatchFinals participants={participants} index={[2, 5]} />
            <MatchFinals participants={participants} index={[3, 4]} />
        </div>
    )
}