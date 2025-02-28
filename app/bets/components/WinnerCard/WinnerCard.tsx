import { WinnerIcon } from "@/svg"
import styles from "./styles.module.scss"
import Image from "next/image"
import { IUserInfo } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"

interface Props {
    participant: IUserInfo
    name_bet?: string
    name_team?: string
}

export default function WinnerCard({ participant, name_bet, name_team }: Props) {
    return (
        <div className={styles.winner}   >
            <picture className={styles.winner_picture}>
                <Image className={styles.winner_image} src={participant?.photo || "/user-icon.png"} alt="Winner" width={100} height={100} />
            </picture>
            <span className={styles.winner_name}>{participant?.name}</span>
            {name_team &&
                <div className={styles.winner_logo}>
                    {TeamsLogos.find(team => team.name === name_team)?.logo || "/user-icon.png"}
                </div>}
            <span className={styles.winner_bet}>{name_bet || name_team}</span>
            <WinnerIcon className={styles.winner_icon} />
        </div>
    )
}