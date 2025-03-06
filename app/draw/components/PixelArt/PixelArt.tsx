
import styles from "./styles.module.scss"
import { ADMIN_ID } from "@/constants/constants"
import { StartedIcon } from "@/svg"
import { WriteMustSpin } from "@/config/firebase"
import { useSession } from "next-auth/react"
import { Button } from "primereact/button"

export default function PixelArt() {
    const session = useSession()
    async function HandleStart() {
        await WriteMustSpin(true, "countdown")
    }

    return (
        <section className={styles.waiting}>
            <div className={styles.waiting_container}>
                <p className={styles.waiting_message}>¡El sorteo está por comenzar!</p>
                <p className={styles.waiting_message}>Por favor, espera unos momentos.</p>
            </div>
            {session.data?.user?.id === ADMIN_ID &&
                <Button onClick={HandleStart} size="small" severity="success" label="Comenzar" icon="pi pi-play-circle" />
            }
        </section>
    )
}