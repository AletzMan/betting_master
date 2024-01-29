import Image from "next/image"
import styles from "./maintenance.module.scss"

export default async function MaintenancePage() {

    return (
        <section className={styles.section}>
            <h1 className={styles.section_title}>Mantenimiento</h1>
            <Image className={styles.section_image} src={"/maintenance.png"} alt="Mantenimiento" width={300} height={300} />
            <p className={styles.section_paragraph}>Lo sentimos, estamos fuera de servicio por mantenimiento. </p>
            <p className={styles.section_paragraph}>Regresaremos pronto.</p>
        </section>
    )
}

