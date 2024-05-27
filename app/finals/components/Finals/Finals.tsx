import { IParticipants } from "@/app/types/types"
import styles from "./finals.module.scss"
import Quarters from "./Quarters"
import Semis from "./Semis"
import { Final } from "./Final"
import ConfettiExplosion from "react-confetti-explosion"
import Image from "next/image"
import { WinnerIcon } from "@/app/svg"
import { TeamsLogos } from "@/app/constants/constants"

interface Props {
    participants: IParticipants[]
}

export default function Finals({ participants }: Props) {
    return (
        <div className={`${styles.finals} scrollbar`}>
            <>
                <h3 className={styles.winners_title}>GANADOR</h3>
                <section className={styles.winners}>
                    <ConfettiExplosion />
                    <div className={styles.winner}   >
                        <picture className={styles.winner_picture}>
                            <Image className={styles.winner_image} src={participants[1].userInfo?.photo || "/user-icon.png"} alt="Winner" width={100} height={100} />
                        </picture>
                        <span className={styles.winner_name}>{participants[1].userInfo?.name}</span>
                        <div className={styles.winner_logo}>
                            {TeamsLogos.find(team => team.name === participants[1].team)?.logo || "/user-icon.png"}
                        </div>
                        <span className={styles.winner_bet}>{participants[1].team}</span>
                        <WinnerIcon className={styles.winner_icon} />
                    </div>

                </section>
            </>
            <Final participants={participants} />
            <Semis participants={participants} />
            <Quarters participants={participants} />
        </div>
    )
}