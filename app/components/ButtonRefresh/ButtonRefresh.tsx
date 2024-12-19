import { DOMAttributes, ButtonHTMLAttributes, HTMLAttributes } from 'react'
import styles from './styles.module.scss'
import { RefreshIcon } from '@/app/svg'



export function ButtonRefresh(props: DOMAttributes<HTMLButtonElement> | ButtonHTMLAttributes<HTMLButtonElement> | HTMLAttributes<HTMLButtonElement>) {

    return (
        <button
            {...props}
            className={`${styles.button}  `}
        >
            <RefreshIcon className={`${styles.button_refresh} `} />
        </button>
    )
}