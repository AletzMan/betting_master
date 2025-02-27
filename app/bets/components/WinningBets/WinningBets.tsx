
import ConfettiExplosion from "react-confetti-explosion"
import styles from "./styles.module.scss"
import { WinnerIcon } from "@/svg"
import { IBetDocument, IUserInfo } from "@/types/types"
import Image from "next/image"
import WinnerCard from "../WinnerCard/WinnerCard"

interface Props {
    winners: IBetDocument[] | undefined
}

export function WinningBets({ winners }: Props) {

    return (
        <div className={styles.container}>
            <ConfettiExplosion duration={3000} force={0.6} particleCount={150} width={1000} />
            <h3 className={styles.winners_title}>GANADORES</h3>
            <section className={styles.winners}>
                {
                    winners?.map(win => (
                        <WinnerCard key={win.id} participant={win?.userInfo || {} as IUserInfo} name_bet={win.name} />
                    ))
                }
            </section>
        </div>
    )
}