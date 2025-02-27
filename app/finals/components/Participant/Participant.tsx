import { IFinalsParticipants } from "@/types/types"
import styles from "./participant.module.scss"
import Image from "next/image"


interface Props {
    participant: IFinalsParticipants
}


export default function Participant({ participant }: Props) {
    return (
        <div key={participant.id} className={styles.participant}>
            <picture className={styles.participant_picture}>
                <Image className={styles.participant_image} src={participant.user_info?.photo || "/user-icon.png"} width="80" height="80" alt={`Imagen de perfil de ${participant.user_info?.name}`} />
            </picture>
            <span className={styles.participant_name}>{participant.user_info?.name}</span>
        </div>
    )
}