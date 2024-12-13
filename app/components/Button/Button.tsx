import { DOMAttributes, ButtonHTMLAttributes } from 'react'
import styles from './button.module.scss'

interface Props {
    props: DOMAttributes<HTMLButtonElement> | ButtonHTMLAttributes<HTMLButtonElement>
    icon?: React.ReactNode
    text?: string
    type?: "primary" | "secondary" | "error" | "success"
}

export function Button({ icon, text, type, props }: Props) {

    return (
        <button
            {...props}
            className={`${styles.button} ${type === "secondary" && styles.button_secondary}  ${type === "error" && styles.button_error} ${type === "success" && styles.button_success} `}
        >
            {icon}
            {text}
        </button>
    )
}