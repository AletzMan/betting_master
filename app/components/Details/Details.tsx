import { ArrowUpIcon } from "@/app/svg"
import styles from "./styles.module.scss"

interface Props {
    children: React.ReactNode
    icon?: React.ReactNode
    title: string
    name: string
}

export default function Details({ children, icon, title, name }: Props) {

    return (
        <details className={styles.details} name={name}>
            <summary className={styles.details_summary}>
                <div className={styles.details_title}>
                    {icon}
                    {title}
                </div>
                <ArrowUpIcon className={styles.details_arrow} />
            </summary>
            {children}
        </details>
    )
}