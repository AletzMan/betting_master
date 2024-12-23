"use client"
import Chat from "./components/Chat/Chat"
import styles from "./styles.module.scss"
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
    () => import('./components/UsersConnected'),
    { ssr: false }
)

const SpinWheeltWithNoSSR = dynamic(
    () => import('./components/SpinWheel/SpinWheel'),
    { ssr: false }
)


export default function Page() {

    return (
        <section className={styles.section}>
            <DynamicComponentWithNoSSR />
            <div className={styles.board}>
                <SpinWheeltWithNoSSR />
                <Chat />
            </div>
        </section>
    )
}
