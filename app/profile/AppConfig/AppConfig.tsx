import styles from "./styles.module.scss"
import stylesGeneral from "../profile.module.scss"
import { AdminIcon, ArrowUpIcon } from "@/app/svg"
import Details from "@/app/components/Details/Details"


export function AppConfig() {

    return (
        <Details name="adminpanel" title="Ajustes y Preferencias" icon={<AdminIcon className="" />} >
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
        </Details>
    )
}