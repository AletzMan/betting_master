/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { GetDataRealDataTime, UpdatedRealDataTime, database } from "../config/firebase"
import { useUser } from "../config/zustand-store"
import { IFinalsParticipants } from "../types/types"
import { onChildChanged, onValue, ref } from "firebase/database"
import { useSession } from "next-auth/react"

export function useConnectedUsers() {
    const session = useSession()
    const [participants, setParticipants] = useState<IFinalsParticipants[]>([])
    const [participantsOnline, setParticipantsOnline] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const onBlur = (ev: FocusEvent) => {
            StatusUserConnection('OUT')
        }
        window?.addEventListener("blur", onBlur)

        const onBeforeUnload = (ev: BeforeUnloadEvent) => {
            StatusUserConnection('OUT')
        }
        window?.addEventListener("beforeunload", onBeforeUnload)

        const onLoad = (ev: FocusEvent) => {
            StatusUserConnection('IN')
        }
        window?.addEventListener("focus", onLoad)

        StatusUserConnection("IN")



        const refParticipants = ref(database, 'participants')
        const unsubscribeparticipants = onChildChanged(refParticipants, (snapshot) => {
            const newMessage = snapshot.val()
        })
        onValue(refParticipants, function (messagesSnapshot) {
            const newsParticipants: IFinalsParticipants[] = messagesSnapshot.val()
            if (newsParticipants) {
                setParticipants(newsParticipants)
            }
        })
        const refParticipantsOnline = ref(database, 'participants_connected')
        const unsubscribeparticipantsOnline = onChildChanged(refParticipantsOnline, (snapshot) => {
            const newMessage = snapshot.val()
        })
        onValue(refParticipantsOnline, function (messagesSnapshot) {
            const newsParticipants = messagesSnapshot.val()
            if (newsParticipants) {
                setParticipantsOnline(newsParticipants)
            }
        })

        return () => {
            window?.removeEventListener("blur", onBlur)
            window?.removeEventListener("beforeunload", onBeforeUnload)
            window?.removeEventListener("focus", onLoad)
            unsubscribeparticipants()
            unsubscribeparticipantsOnline()
        }
    }, [session])

    const StatusUserConnection = async (status: 'IN' | 'OUT') => {
        if (session.status === "authenticated") {

            const response = await GetDataRealDataTime("participants_connected")
            if (!response) {
                await UpdatedRealDataTime({ [`${session.data?.user?.id}`]: session.data?.user?.id }, `participants_connected/`)
            } else if (status === 'IN') {
                const usersConnected: string[] = Object.values(response)
                if (!usersConnected.includes(session.data?.user?.id as string) && session.status === "authenticated") {
                    await UpdatedRealDataTime({ [`${session.data?.user?.id}`]: session.data?.user?.id }, `participants_connected/`)
                }
            } else if (status === 'OUT') {
                await UpdatedRealDataTime({ [`${session.data?.user?.id}`]: null }, `participants_connected/`)
            }
        }
    }


    return {
        participants,
        participantsOnline
    }

}