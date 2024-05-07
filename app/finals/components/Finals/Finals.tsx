import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import Quarters from "./Quarters"

interface Props {
    participants: IParticipants[]
}

export default function Finals({ participants }: Props) {
    return (
        <Quarters participants={participants} />
    )
}