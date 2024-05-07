import { IParticipants } from "@/app/types/types"
import styles from "./participant.module.scss"
import Image from "next/image"


interface Props {
    participant: IParticipants
}

export default function Participant({ participant }: Props) {
    return (
        <div key={participant.id} className={styles.participant}>
            <picture className={styles.participant_picture}>
                <Image className={styles.participant_image} src={participant.userInfo?.photo || "/user-icon.png"} width="80" height="80" alt={`Imagen de perfil de ${participant.userInfo?.name}`} />
            </picture>
            <span className={styles.participant_name}>{participant.userInfo?.name}</span>
        </div>
    )
}