import { ArrowUpIcon } from "@/svg"
import styles from "./styles.module.scss"

interface Props {
    children: React.ReactNode
    icon?: React.ReactNode
    title: string
    name: string
    open?: boolean
}

export default function Details({ children, icon, title, name, open }: Props) {

    return (
        <details className={styles.details} name={name} open={open}>
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