import { IBetData, IBetDataDocument, IBetDocument, IUserInfo } from "@/types/types"
import styles from "../NoPaidMessage/nopaidmessage.module.scss"
import { ConvertToPrice } from "@/functions/functions"
import { IMyBets } from "../../page"
import { ViewIcon } from "@/svg"
import { useState } from "react"
import { TeamsLogos } from "@/constants/constants"

interface props {
    user: IUserInfo
    bets: IBetDocument[]
    myBets: IMyBets
}

export interface IPreviewDialog {
    open: boolean
    bets: IBetData
}

export function ConfirmedParticipationMessage({ user, bets, myBets }: props) {
    const [dialog, setDialog] = useState<IPreviewDialog>({ open: false, bets: {} as IBetData })

    return (
        <section className={styles.section}>
            <h2 className={styles.section_bets}>¡Ya estas participando!</h2>
            <p className={styles.section_textName}>{user.name}</p>
            <p className={styles.section_text}>Las quinielas estaran visibles hasta el comienzo del primer partido</p>
            <p className={styles.section_text}>Tu tienes <span className={styles.section_textInfoTwo}>{myBets.bets.length}</span> quiniela(s)</p>
            {
                <div className={styles.section_bets}>
                    {myBets.bets.map((bet, index) => (
                        <div className={styles.section_container} key={bet.id}>
                            <p key={bet.id} className={styles.section_textPaid}>{`${bet.data.name}`}</p>
                            <button className={styles.section_betsButton} onClick={() => setDialog({ open: true, bets: bet.data })}>
                                <ViewIcon className={styles.section_betsButtonView} />
                            </button>
                        </div>
                    ))}
                </div>}
            <p className={styles.section_text}>¡Suerte!</p>
            {/*<p className={styles.section_textInfoTwo}>Monto acumulado: {ConvertToPrice(bets.length * 10.5)}</p>*/}
            <p className={styles.section_textAccount}>Ingresa a tu Perfil y agrega tu cuenta de deposito para recibir tu pago en caso de ganar</p>
            {/*<p className={styles.section_textAccount}>Tambien puedes ver tus quinielas en tu perfil</p>*/}
            {dialog.open &&
                <dialog className={styles.section_dialog} open onClick={() => setDialog({ open: false, bets: {} as IBetData })}>
                    <section className={styles.section_dialogContainer}>
                        <p className={styles.section_dialogTitle}>{dialog.bets.name}</p>
                        <article>
                            <header className={styles.section_dialogHeader}>
                                {dialog.bets.matches.map((match, index) => (
                                    <div key={match} className={styles.section_dialogMatch}>
                                        <p className={styles.section_dialogText}>{match.split("-")[0]}</p>
                                        <p className={styles.section_dialogText}>vs</p>
                                        <p className={styles.section_dialogText}>{match.split("-")[1]}</p>
                                    </div>
                                ))}
                            </header>
                            <main className={styles.section_dialogMain}>
                                {dialog.bets.bets.map((result, index) => (
                                    <div key={index} className={styles.section_dialogResult} >
                                        <p className={styles.section_dialogText}>{result.prediction}</p>
                                    </div>
                                ))}
                            </main>
                        </article>
                    </section>
                </dialog>}
        </section>
    )
}
