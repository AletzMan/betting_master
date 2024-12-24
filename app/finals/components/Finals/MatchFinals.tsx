import { IFinalsParticipants, IStage } from "@/app/types/types"
import styles from "./finals.module.scss"
import Image from "next/image"
import { TeamsLocalLogos } from "@/app/constants/constants"
import { DeadIcon } from "@/app/svg"

interface Props {
    participants: IFinalsParticipants[]
    index: [number, number]
}


export default function MatchFinals({ participants, index }: Props) {

    const teams = [participants[index[0]].progress_stage.length, participants[index[1]].progress_stage.length]
    const won = Math.max(...teams)
    const canAdvance = teams[0] !== teams[1] ? true : false
    console.log(teams)
    console.log(won)
    const indexWon = teams.indexOf(won)

    return (
        <div className={styles.match}>
            <div className={styles.match_team}>
                {TeamsLocalLogos.find(logo => logo.name === participants[index[0]].team)?.logo}
                <span className={styles.teamName}>
                    {TeamsLocalLogos.find(logo => logo.name === participants[index[0]].team)?.name}
                </span>
                {indexWon === 1 && canAdvance &&
                    <div className={styles.loser}>
                        <DeadIcon className={styles.loser_icon} />
                    </div>
                }
            </div>
            <div className={styles.match_player} >
                <picture className={styles.match_playerPicture}>
                    <Image className={styles.match_playerImage} src={participants[index[0]]?.user_info?.photo || "/user-icon.png"} width={25} height={25} alt={`Foto de perfil de ${participants[index[0]]?.user_info?.photo || ""} `} />
                </picture>
                <span className={styles.match_playerName}>{participants[index[0]]?.user_info?.name}</span>
            </div>
            <div className={styles.match_VS}>VS</div>
            <div className={`${styles.match_player} ${styles.match_playerAway}`} >
                <picture className={styles.match_playerPicture}>
                    <Image className={styles.match_playerImage} src={participants[index[1]]?.user_info?.photo || "/user-icon.png"} width={25} height={25} alt={`Foto de perfil de ${participants[index[1]]?.user_info?.photo || ""} `} />
                </picture>
                <span className={styles.match_playerName}>{participants[index[1]]?.user_info?.name}</span>
            </div>
            <div className={`${styles.match_team} ${styles.match_teamAway}`}>
                {TeamsLocalLogos.find(logo => logo.name === participants[index[1]].team)?.logo}
                <span className={styles.match_teamName}>
                    {TeamsLocalLogos.find(logo => logo.name === participants[index[1]].team)?.name}
                </span>
                {indexWon === 0 && canAdvance &&
                    <div className={styles.loser}>
                        <DeadIcon className={styles.loser_icon} />
                    </div>
                }
            </div>
        </div>
    )
}