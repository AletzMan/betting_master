import { IBetDataDocument, IBetDocument, IUserInfo } from "@/app/types/types"
import styles from "./nopaidmessage.module.scss"
import { IMyBets } from "../../page"
import { ConvertToPrice } from "@/app/functions/functions"
import { use, useEffect, useState } from "react"
import { DeleteIcon } from "@/app/svg"
import { DeleteBet } from "@/app/config/firebase"
import { useSnackbar } from "notistack"
import { useRouter } from "next/navigation"

interface Props {
    myBets: IMyBets
    user: IUserInfo
}

interface IBets {
    betsPaid: IBetDataDocument[]
    betsNotPaid: IBetDataDocument[]
}

export const NoPaidMessage = ({ myBets, user }: Props) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [bets, setBets] = useState<IBets>({ betsPaid: [], betsNotPaid: [] })

    useEffect(() => {
        const betsPaid = myBets.bets.filter(bet => bet.data.paid)
        const betsNotPaid = myBets.bets.filter(bet => !bet.data.paid)
        setBets({ betsPaid, betsNotPaid })
    }, [myBets])

    const HandleDeleteBet = async (id: string, name: string) => {
        const responseDeleted = confirm(`¿Estas seguro de eliminar la quiniela? \n ${name}`)
        if (responseDeleted) {
            const response = await DeleteBet(id)
            if (response === "OK") {
                enqueueSnackbar("Quiniela eliminada", { variant: "success" })
                location.reload()
            }
        }
    }

    return (
        <section className={`${styles.section} scrollbar`}>
            <h3 className={styles.section_title}>¡Paga tus quinielas para participar!</h3>
            <h3 className={styles.section_title}>¡No te quedes fuera!</h3>
            <p className={styles.section_text}>Deposita $12.00 por cada quiniela</p>
            <p className={styles.section_text}>Tu tienes <span className={styles.section_price}>{myBets.bets.length}</span> quiniela(s)</p>
            <div className={styles.section_container}>
                {bets.betsPaid.length > 0 &&
                    <div className={styles.section_bets}>
                        {<p className={styles.section_betsTitle}>{`${bets.betsPaid.length} Pagadas`}</p>}
                        {bets.betsPaid.map((bet, index) => (
                            <p key={bet.id} className={styles.section_textPaid}>{`${bet.data.name}`}</p>
                        ))}
                    </div>}
                {bets.betsNotPaid.length > 0 && <div className={styles.section_bets}>
                    {<p className={styles.section_betsTitle}>{`${bets.betsNotPaid.length} Pendientes`}</p>}
                    {bets.betsNotPaid.map((bet, index) => (
                        <div key={bet.id} className={styles.section_betsBet}>
                            <p className={styles.section_textNotPaid}>{`${bet.data.name}`}</p>
                            <button className={styles.section_betsButton} onClick={() => HandleDeleteBet(bet.id, bet.data.name)}>
                                <DeleteIcon className={styles.section_betsButtonIcon} />
                            </button>
                        </div>
                    ))}
                </div>}
            </div>
            <p className={styles.section_text}>Total a pagar: <span className={styles.section_price}>{ConvertToPrice(bets.betsNotPaid.filter(betPaid => !betPaid.data.paid).length * 12)}</span></p>
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