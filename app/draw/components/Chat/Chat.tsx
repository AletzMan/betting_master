"use client"
import { TextField } from "@/app/components/TextFiled/TextFiled"
import styles from "./styles.module.scss"
import { Button } from "@/app/components/Button/Button"
import { ChatIcon, SendIcon } from "@/app/svg"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { WriteChatDraw, database } from "@/app/config/firebase"
import { useConnectedUsers } from "@/app/hooks/useConnectedUsers"
import { useUser } from "@/app/config/zustand-store"
import { IMessage } from "@/app/types/appTypes"
import { onChildAdded, onValue, ref } from "firebase/database"

export default function Chat() {
    const { user } = useUser()
    const refChat = useRef<HTMLDivElement | null>(null)
    const { participants } = useConnectedUsers()
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([]);
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


    const HandleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setMessage(value)
    }
    const HandleEnterMessage = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSend()
        }
    }

    const handleSend = async () => {
        if (user) {
            await WriteChatDraw({ uid: user.uid, username: user.name, message, color: participants.find(participant => participant.user_info.uid === user.uid)?.user_info.color }, "chat")
            setMessage("")
        }
    }



    return (
        <>
            <div className={`${styles.chat} ${viewChat ? styles.chat_active : styles.chat_inactive}`}>
                <div className={`${styles.chat_text} scrollbar`} ref={refChat}>
                    {messages.map((message, index) => (
                        <div key={index} className={`${styles.user} ${user.uid === message.uid ? styles.user_local : styles.user_away}`}>
                            <div className={styles.user_name} style={{ color: message.color }}>{user.uid === message.uid ? "" : message.username}</div>
                            <div className={styles.user_message} >{message.message}</div>
                        </div>
                    ))}
                </div>
                <footer className={styles.footer}>
                    <TextField placeholder="Escribe tu mensaje aquí..." value={message} onChange={HandleChangeMessage} onKeyDown={HandleEnterMessage} />
                    <Button text="Enviar" icon={<SendIcon className="" />} props={{ onClick: handleSend, disabled: message === "" }} />
                </footer>
            </div>
            <button className={`${styles.buttonChat} ${viewChat ? styles.buttonChat_active : styles.buttonChat_inactive}`} onClick={() => setViewChat(prev => !prev)}>
                <ChatIcon className={styles.buttonChat_icon} />
                <span className={`${styles.buttonChat_count}`}>{`!`}</span>
            </button>
        </>
    )
}