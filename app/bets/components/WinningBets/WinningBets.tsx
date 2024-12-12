
import ConfettiExplosion from "react-confetti-explosion"
import styles from "./styles.module.scss"
import { WinnerIcon } from "@/app/svg"
import { IBetDocument } from "@/app/types/types"
import Image from "next/image"

interface Props {
    winners: IBetDocument[] | undefined
}

export function WinningBets({ winners }: Props) {

    return (
        <div className={styles.container}>
            <ConfettiExplosion duration={3500} />
            <h3 className={styles.winners_title}>GANADORES</h3>
            <section className={styles.winners}>
                {
                    winners?.map(win => (
                        <div className={styles.winner} key={win.id} >
                            <picture className={styles.winner_picture}>
                                <Image className={styles.winner_image} src={win.userInfo?.photo || "/user-icon.png"} alt="Winner" width={100} height={100} />
                            </picture>
                            <span className={styles.winner_name}>{win.userInfo?.name}</span>
                            <span className={styles.winner_bet}>{win.name}</span>
                            <WinnerIcon className={styles.winner_icon} />
                        </div>
                    ))
                }
            </section>
        </div>
    )
}