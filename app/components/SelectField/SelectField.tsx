import { SelectHTMLAttributes } from "react"
import styles from "./styles.module.scss"
import { ArrowUpIcon, CheckIcon, CloseIcon, SuccessIcon } from "@/app/svg"

interface Props {
    items: string[]
    props?: SelectHTMLAttributes<HTMLSelectElement>
}

export default function SelectField({ items, props }: Props) {

    return (
        <div className={styles.container}>
            <select {...props} className={styles.select}>
                {items?.map(item => (
                    <option key={item} value={item} className={styles.select_option}>{item}</option>
                ))
                }
            </select>
            {props?.["aria-errormessage"] && <CloseIcon className={styles.container_icon} />}
            <ArrowUpIcon className={styles.select_arrow} />
        </div>
    )
}