import styles from './button.module.scss'

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    className?: string
    disabled?: boolean
    icon?: React.ReactNode
    text?: string
    type?: "primary" | "secondary"
}

export function Button({ onClick, className, disabled, icon, text, type }: Props) {
    return (
        <button
            className={`${styles.button} ${type === "secondary" && styles.button_secondary} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
            {text}
        </button>
    )
}