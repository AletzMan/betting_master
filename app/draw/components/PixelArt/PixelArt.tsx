import { useUser } from "@/config/zustand-store"
import styles from "./styles.module.scss"
import { ADMIN_ID } from "@/constants/constants"
import { Button } from "@/components/Button/Button"
import { StartedIcon } from "@/svg"
import { WriteMustSpin } from "@/config/firebase"

export default function PixelArt() {
    const { user } = useUser()

    async function HandleStart() {
        await WriteMustSpin(true, "countdown")
    }

    return (
        <section className={styles.waiting}>
            <div className={styles.waiting_container}>
                <p className={styles.waiting_message}>¡El sorteo está por comenzar!</p>
                <p className={styles.waiting_message}>Por favor, espera unos momentos.</p>
            </div>
            {user.uid === ADMIN_ID &&
                <Button props={{ onClick: HandleStart }} text="Comenzar" icon={<StartedIcon className="" />} />
            }
        </section>
    )
}