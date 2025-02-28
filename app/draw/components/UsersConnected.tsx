"use client"
import { useConnectedUsers } from "@/hooks/useConnectedUsers"
import styles from "./styles.module.scss"



export default function UsersConnected() {
    const { participants, participantsOnline } = useConnectedUsers()
    return (
        <header className={styles.header}>
            <div className={styles.header_users}>
                {participants.length > 0 && participants?.map(participant => (
                    <picture className={`${styles.header_picture} ${participantsOnline && !Object.values(participantsOnline).includes(participant.user_info.uid) ? styles.header_pictureOffline : styles.header_pictureOnline}`}
                        key={participant.id} attr-name={participant?.user_info?.name?.split(" ")[0]}>
                        <img className={styles.header_image} src={participant?.user_info?.photo || "/user_icon.png"} alt={`Foto de perfil de ${participant?.user_info?.name}`} />
                    </picture>
                ))

                }
            </div>
        </header>
    )
}