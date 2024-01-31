import { IBetDocument, IUserInfo } from "@/app/types/types"
import styles from "../NoPaidMessage/nopaidmessage.module.scss"
import { ConvertToPrice } from "@/app/functions/functions"
import { IMyBets } from "../../page"

interface props {
    user: IUserInfo
    bets: IBetDocument[]
    myBets: IMyBets
}

export function ConfirmedParticipationMessage({ user, bets, myBets }: props) {
    return (
        <section className={styles.section}>
            <h2 className={styles.section_bets}>¡Ya estas participando!</h2>
            <p className={styles.section_textName}>{user.name}</p>
            <p className={styles.section_text}>Las quinielas estaran visibles hasta el comienzo del primer partido</p>
            <p className={styles.section_text}>Tu tienes <span className={styles.section_textInfoTwo}>{myBets.bets.length}</span> quiniela(s)</p>
            <p className={styles.section_text}>¡Suerte!</p>
            <p className={styles.section_textInfoTwo}>Monto acumulado: {ConvertToPrice(bets.length * 10.5)}</p>
            <p className={styles.section_textAccount}>Ingresa a tu Perfil y agrega tu cuenta de deposito para recibir tu pago en caso de ganar</p>
            <p className={styles.section_textAccount}>Tambien puedes ver tus quinielas en tu perfil</p>
        </section>
    )
}