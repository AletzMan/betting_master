import { IUserInfo } from "@/app/types/types"
import styles from "./nopaidmessage.module.scss"
import { IMyBets } from "../../page"
import { ConvertToPrice } from "@/app/functions/functions"

interface Props {
    myBets: IMyBets
    user: IUserInfo
}


export const NoPaidMessage = ({ myBets, user }: Props) => {
    return (
        <section className={styles.section}>
            <h3 className={styles.section_title}>¡Paga tus quinielas para participar!</h3>
            <h3 className={styles.section_title}>¡No te quedes fuera!</h3>
            <p className={styles.section_text}>Deposita $12.00 por cada quiniela</p>
            <p className={styles.section_text}>Tu tienes {myBets.bets.length} quiniela(s)</p>
            <p className={styles.section_text}>Total a pagar: <span className={styles.section_price}>{ConvertToPrice(myBets.bets.length * 12)}</span></p>
            <p className={styles.section_textLight}>Tienes hasta el cominezo del primer partido para pagar</p>
            <p className={styles.section_textLight}>Quiniela no pagada no participa</p>
            <div className={styles.section_data}>
                <h4 className={styles.section_dataTitle}>Datos para deposito</h4>
                <div className={styles.section_dataAccount}>
                    <label className={styles.section_label}>Numero de cuenta</label>
                    <p className={styles.betsTable_emptyText}>158 659 4088</p>
                </div>
                <div className={styles.bsection_dataAccount}>
                    <label className={styles.section_label}>Cuenta CLABE</label>
                    <p className={styles.section_text}>012 320 01586594088 0</p>
                </div>
                <div className={styles.section_dataAccount}>
                    <label className={styles.section_label}>Nombre</label>
                    <p className={styles.section_text}>Alejandro Garcia</p>
                </div>
            </div>
            <p className={styles.section_textAccount}>Agrega tu nombre en la referencia</p>
            <p className={styles.section_text}>{user.name}</p>
        </section>
    )
}