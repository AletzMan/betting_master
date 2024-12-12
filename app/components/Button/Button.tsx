import { DOMAttributes, HTMLAttributes } from 'react'
import styles from './button.module.scss'

interface Props {
    props: DOMAttributes<HTMLButtonElement>
    icon?: React.ReactNode
    text?: string
    type?: "primary" | "secondary"
}

export function Button({ icon, text, type, props }: Props) {
    return (
        <button
            {...props}
            className={`${styles.button} ${type === "secondary" && styles.button_secondary}  `}

        >
            {props.children}
            {icon}
            {text}
        </button>
    )
}