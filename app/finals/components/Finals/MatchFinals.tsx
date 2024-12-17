import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import { QualifiedTeams } from "../Quarterfinals"
import Image from "next/image"

interface Props {
    participants: IParticipants[]
    index: [number, number]
}


export default function MatchFinals({ participants, index }: Props) {
    return (
        <div className={styles.quarters_match}>
            <div className={styles.quarters_team}>
                {QualifiedTeams[index[0]].logo}
                <span className={styles.quarters_teamName}>
                    {QualifiedTeams[index[0]].name}
                </span>
            </div>
            <div className={styles.quarters_player} >
                <picture className={styles.quarters_playerPicture}>
                    <Image className={styles.quarters_playerImage} src={participants.find(participant => participant.team === QualifiedTeams[index[0]].name)?.userInfo?.photo || "/user-icon.png"} width={25} height={25} alt={`Foto de perfil de ${participants.find(participant => participant.team === QualifiedTeams[0].name)?.userInfo?.photo || ""} `} />
                </picture>
                <span className={styles.quarters_playerName}>{participants.find(participant => participant.team === QualifiedTeams[index[0]].name)?.userInfo?.name}</span>
            </div>
            <div className={styles.quarters_matchVS}>VS</div>
            <div className={`${styles.quarters_player} ${styles.quarters_playerAway}`} >
                <picture className={styles.quarters_playerPicture}>
                    <Image className={styles.quarters_playerImage} src={participants.find(participant => participant.team === QualifiedTeams[index[1]].name)?.userInfo?.photo || "/user-icon.png"} width={25} height={25} alt={`Foto de perfil de ${participants.find(participant => participant.team === QualifiedTeams[0].name)?.userInfo?.photo || ""} `} />
                </picture>
                <span className={styles.quarters_playerName}>{participants.find(participant => participant.team === QualifiedTeams[index[1]].name)?.userInfo?.name}</span>
            </div>
            <div className={`${styles.quarters_team} ${styles.quarters_teamAway}`}>
                {QualifiedTeams[index[1]].logo}
                <span className={styles.quarters_teamName}>
                    {QualifiedTeams[index[1]].name}
                </span>
            </div>
        </div>
    )
}