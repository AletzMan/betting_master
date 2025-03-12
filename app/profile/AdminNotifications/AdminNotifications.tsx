/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { IUser } from "@/types/types"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import { getAllUsers, getMatchDayInfo } from "@/utils/fetchData"
import { Loading } from "@/components/Loading/Loading"
import axios from "axios"
import { Dialog } from "primereact/dialog"
import { CreateTopicForm } from "./CreateTopicForm"
import { CardUser } from "./CardUser"

export interface IOpenDialog {
    type: 'createTopic' | 'sendTopic'
    isOpen: boolean
}


export function AdminNotifications() {
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState<IOpenDialog>({ type: 'createTopic', isOpen: false })
    const [usersData, setUsersData] = useState<IUser[] | null>(null)
    const [userTokens, setUserTokens] = useState<IUser[] | null>(null)
    const [day, setDay] = useState(0)

    const handleSendNotification = async (user: string, token: string) => {
        setSending(true)
        try {
            const response = await axios.post("/api/notifications/push", {
                token: "dklKeKyshXxAoVYfsJljFt:APA91bEeMYHNX1SpK4npwhT2FpN_4kNAN__C9svSvPw7J76DC7sxixuw0QoXbCh1d2iYbq9OD82h-a2TCNRhMKzp-EWYXJgBRya7m-a3gevtm5YH8lBkfH0",
                title: "¡Nueva Quiniela Disponible!",
                message: "La quiniela de esta semana ya está disponible. ¡Entra y haz tus predicciones!",
                link: "/logo.png",
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 201) {
                enqueueSnackbar("Notificación enviada correctamente", { variant: "success" })
            }
        } catch (error) {
            enqueueSnackbar("Error al enviar la notificación, favor de intentarlo mas tarde", { variant: "error" })
        } finally {
            setSending(false)
        }
    }


    const handleSendTopic = async () => {
        setSending(true)
        try {
            const response = await axios.post("/api/notifications/topic/send", {
                topic: "",
                title: "¡Nueva Quiniela Disponible!",
                message: "La quiniela de esta semana ya está disponible. ¡Entra y haz tus predicciones!",
                link: "/logo.png",
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 201) {
                enqueueSnackbar("Notificación enviada correctamente", { variant: "success" })
            }
        } catch (error) {
            enqueueSnackbar("Error al enviar la notificación, favor de intentarlo mas tarde", { variant: "error" })
        } finally {
            setSending(false)
        }
    }

    const HandleRefreshUsers = async () => {
        setLoading(true)
        const response = await getAllUsers()
        if (response) {
            const usersWithNotifications = response?.filter(user => user.notifications)
            setUserTokens(usersWithNotifications)
            if (usersWithNotifications) {
                setUsersData(response)

                const result = await getMatchDayInfo()
                if (result)
                    setDay(result?.day)
            }
            setLoading(false)
        }
    }


    return (

        <div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)] ">
            <header className="flex items-start justify-between pb-1 px-2">
                <Button onClick={HandleRefreshUsers} icon="pi pi-refresh" severity="secondary" size="small" outlined label="Actualizar" />
                <div className="flex flex-col gap-1.5">
                    {usersData && <Button onClick={() => setOpenDialog({ type: 'createTopic', isOpen: true })} icon="pi pi-pen-to-square" severity="success" size="small" outlined label="Crear notificación" />}
                    {usersData && <Button label={!sending ? "Enviar notificación" : "Sending..."} size="small" severity="info" icon="pi pi-send" loading={sending} loadingIcon="pi pi-spin pi-spinner-dotted" disabled={sending} onClick={handleSendTopic} />}
                </div>
            </header>
            {!loading &&
                <div className="flex flex-col gap-3 scrollbar pt-5 px-2">
                    {usersData && usersData.map((user, index) => (
                        <CardUser key={user.id} user={user} index={index} setUsersData={setUsersData} />
                    ))}
                </div>
            }
            <Dialog visible={openDialog.isOpen} onHide={() => setOpenDialog((prev) => ({ ...prev, isOpen: false }))} >
                {openDialog.type === 'createTopic' && (
                    <CreateTopicForm setOpenDialog={setOpenDialog} userTokens={userTokens} />
                )}
            </Dialog>
            {loading && <Loading height="12em" />}
        </div>
    )
}
