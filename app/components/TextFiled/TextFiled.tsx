import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from "react"
import styles from "./styles.module.scss"



export function TextField(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className={styles.label}>
            {props["aria-label"]}
            <input {...props} className={styles.input} />
        </label>
    )
}