import { DOMAttributes, ButtonHTMLAttributes, HTMLAttributes } from 'react'
import styles from './button.module.scss'

interface Props {
    props: DOMAttributes<HTMLButtonElement> | ButtonHTMLAttributes<HTMLButtonElement> | HTMLAttributes<HTMLButtonElement>
    icon?: React.ReactNode
    text?: string
    type?: "primary" | "secondary" | "error" | "success"
    disabled?: boolean
    className?: string
}

export function Button({ icon, text, type, props, className, disabled }: Props) {

    return (
        <button
            {...props}
            disabled={disabled}
            className={`${styles.button}   ${type === "secondary" ? styles.button_secondary : ""}  ${type === "error" ? styles.button_error : ""} ${type === "success" ? styles.button_success : ""} ${className}`}
        >
            {icon}
            {text}
        </button>
    )
}