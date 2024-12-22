/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react"
import { Button } from "../components/Button/Button"
import { TextField } from "../components/TextFiled/TextFiled"
import { useUser } from "../config/zustand-store"
import { ChatIcon, SendIcon } from "../svg"
import styles from "./styles.module.scss"
import { enqueueSnackbar } from "notistack"
import dynamic from 'next/dynamic'
import { onChildAdded, onValue, ref } from "firebase/database"
import { WriteChatDraw, database } from "../config/firebase"

interface IMessage {
    uid: string
    message: string
    username: string | null
}


const DynamicComponentWithNoSSR = dynamic(
    () => import('./components/UsersConnected'),
    { ssr: false }
)

const SpinWheeltWithNoSSR = dynamic(
    () => import('./components/SpinWheel/SpinWheel'),
    { ssr: false }
)


export default function Page() {
    const { user } = useUser()
    const [message, setMessage] = useState<string>("")
    //const [messages, setMessages] = useState<IMessage[]>([{ uid: "AGstpoT4F9WHdWIwZjbHP6TRHea2", message: "Hola Majo", username: "Alejandro" }, { uid: "kyFpemF", message: "Hola Ale", username: "Maria Jose" }, { uid: "AGstpoT4F9WHdWIwZjbHP6TRHea2", message: "Oye sabes que ha pasado con el proyecto VPF24156, se va a enviar mañana?", username: "Alejandro" }, { uid: "kyFpemF", message: "Lo estuve revisando con Guy, y llegamos a la conclusion de que se van a tener que cambiar todos los strippers", username: "Maria Jose" }]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const refChat = useRef<HTMLDivElement | null>(null)
    const [viewChat, setViewChat] = useState(false)

    useEffect(() => {
        try {
            const messagesRef = ref(database, 'chat')
            const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
                const newMessage: IMessage = snapshot.val()
            })
            onValue(messagesRef, function (messagesSnapshot) {
                const newsMessages: IMessage[] = Object.values(messagesSnapshot.val())
                setMessages(newsMessages)
            })

            return () => {
                unsubscribe()
            }

        } catch (error) {
            console.log(error)
        }
    }, [])


    useEffect(() => {
        if (refChat) {
            refChat.current?.scrollTo({ top: refChat.current.scrollHeight + 100 })
        }
    }, [messages])

    const handleSend = async () => {
        if (user) {
            await WriteChatDraw({ uid: user.uid, username: user.name, message }, "chat")
            //const newMessage: IMessage = { uid: user.uid, message, username: user.name }
            //setMessages((prevMessages) => [...prevMessages, newMessage])
            setMessage("")
        }
    }

    const HandleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setMessage(value)
    }
    const HandleEnterMessage = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSend()
        }
    }


    return (
        <section className={styles.section}>
            <DynamicComponentWithNoSSR />
            <div className={styles.board}>
                <SpinWheeltWithNoSSR />
                <div className={`${styles.chat} ${viewChat ? styles.chat_active : styles.chat_inactive}`}>
                    <div className={`${styles.chat_text} scrollbar`} ref={refChat}>
                        {messages.map((message, index) => (
                            <div key={index} className={`${styles.user} ${user.uid === message.uid ? styles.user_local : styles.user_away}`}>
                                <div className={styles.user_name}>{user.uid === message.uid ? "" : message.username}</div>
                                <div className={styles.user_message} >{message.message}</div>
                            </div>
                        ))}
                    </div>
                    <footer className={styles.footer}>
                        <TextField placeholder="Escribe tu mensaje aquí..." value={message} onChange={HandleChangeMessage} onKeyDown={HandleEnterMessage} />
                        <Button text="Enviar" icon={<SendIcon className="" />} props={{ onClick: handleSend, disabled: message === "" }} />
                    </footer>
                </div>
            </div>
            <button className={`${styles.buttonChat} ${viewChat ? styles.buttonChat_active : styles.buttonChat_inactive}`} onClick={() => setViewChat(prev => !prev)}>
                <ChatIcon className={styles.buttonChat_icon} />
            </button>

        </section>
    )
}

/*
const finalParticipants: IFinalsParticipants[] = [
    {
        position_team: 0,
        id: '8e4dd36e-3d5a-4c80-b6b6-c43ae01d21c4',
        team: '',
        user_info: {
            uid: '5H6afyOnUEdMSMHxTlgEtPa3aQ32',
            name: 'Juan Carlos Garcia',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJ5bJuxHz9k_csvumubhfznYjju2sMKazcp15LTvikPl1E-=s96-c',
            email: 'jk.g.alonso@gmail.com'
        },
        progress_stage: ['quarter']
    },
    {
        id: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
        team: '',
        position_team: 0,
        progress_stage: ['quarter'],
        user_info: {
            email: 'alejo2986@gmail.com',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJ7E4PzlEjRsIqGpdN71kUe-sG33WN9UXMQ61Wpp0oVP2U=s96-c',
            uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
            name: 'Alejandro Garcia'
        }
    },
    {
        progress_stage: ['quarter'],
        user_info: {
            name: 'Juan Gracia',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocKiJGSq1O0HsHBMfwLFhbu2W2idqJyKS60vyhQj7UdX=s96-c',
            email: 'garcia.8a.juan@gmail.com',
            uid: 'GsWIeSW2XROfr9nn932j94eYxYm2'
        },
        position_team: 0,
        id: '5606c0b1-3a83-4ae5-8bf8-3213bfccc13f',
        team: ''
    },
    {
        position_team: 0,
        user_info: {
            uid: 'MZSyUilYNjdS3BdsAiQHmQ2ug7H3',
            name: 'judith garcia',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJV7zokRNBsZLofjwaVPe9HJrOz487ZQduUXf6n3bO7=s96-c',
            email: 'mariselaga2810@gmail.com'
        },
        progress_stage: ['quarter'],
        id: '51811b62-06fa-4c94-9780-75a951314887',
        team: ''
    },
    {
        id: '7d24d55a-7046-4609-8545-219f5d41b992',
        position_team: 0,
        team: '',
        user_info: {
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocLKuK-DCkm0dzJUnVG92nGVrdqHngpzbJXZVccRxUOa=s96-c',
            name: 'IkerDios1789',
            uid: 'h4rNDlWm2acTOxBsGrLWrV4Ybaw1',
            email: 'ikerdios41@gmail.com'
        },
        progress_stage: ['quarter']
    },
    {
        id: '7d453c94-8048-43d1-8905-fde7ffc3f1b3',
        user_info: {
            uid: 'hj6pQqrcHnUX4pPfDqI0BJsNZZG2',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocLA92MJoEylcI8tY0R26cCh9ok-aZdPN1UOMty4ESIJ=s96-c',
            name: 'Maria del Rosario Alonso Gonzalez',
            email: 'rosario.alonso.glz68@gmail.com'
        },
        team: '',
        progress_stage: ['quarter'],
        position_team: 0
    },
    {
        team: '',
        id: 'a5498790-6939-41cc-b40c-bc65eb210976',
        progress_stage: ['quarter'],
        user_info: {
            uid: 'kkBNmgUa4XgRNfzvNLKMeFTtxH13',
            name: 'Patricia Garcia Alonso',
            email: 'pattogarciaalonso88@gmail.com',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJHdeCqmsWqnlERyNQu_m-MLBuqe6FVeLSsJSMM4Efr=s96-c'
        },
        position_team: 0
    },
    {
        user_info: {
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocKulEAaKcIXyW5CAeLySco3xBveoDj0prmY8LMeQ0IP=s96-c',
            uid: 'srwtNKmV6kZX7RiF9faB1S9Pfe72',
            email: 'juangalvangalvan20@gmail.com',
            name: 'Juan galvan Galvan'
        },
        position_team: 0,
        progress_stage: ['quarter'],
        id: 'fe290685-11db-4034-b831-1bbcfc0424de',
        team: ''
    }
]*/