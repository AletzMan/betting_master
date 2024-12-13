import styles from "./styles.module.scss"
import stylesGeneral from "../profile.module.scss"
import { AdminIcon, ArrowUpIcon } from "@/app/svg"


export function AppConfig() {

    return (
        <details className={stylesGeneral.details} name="adminpanel">

            <summary className={stylesGeneral.details_summary}>
                <div className={stylesGeneral.details_title}>
                    <AdminIcon className={stylesGeneral.details_icon} />
                    Ajustes y Preferencias
                </div>
                <ArrowUpIcon className={stylesGeneral.details_arrow} />
            </summary>
            <div className={styles.options}>
                <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>Paginas visibles</legend>
                    <label className={styles.checkbox_label} >
                        <input className={styles.checkbox} type="checkbox" />
                        Quinielas
                    </label>
                    <label className={styles.checkbox_label} >
                        <input className={styles.checkbox} type="checkbox" />
                        Finales
                    </label>
                    <label className={styles.checkbox_label} >
                        <input className={styles.checkbox} type="checkbox" />
                        Resultados
                    </label>
                    <label className={styles.checkbox_label} >
                        <input className={styles.checkbox} type="checkbox" />
                        Posiciones
                    </label>
                    <label className={styles.checkbox_label} >
                        <input className={styles.checkbox} type="checkbox" />
                        Estadísticas
                    </label>
                </fieldset>
            </div>
        </details>
    )
}