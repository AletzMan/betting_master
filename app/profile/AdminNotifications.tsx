/* eslint-disable @next/next/no-img-element */
"use client"
import styles from "./profile.module.scss"
import { DeleteIcon, EmailIcon, NotificationIcon } from "@/svg"
import { MouseEvent, useState } from "react"
import { SendNotifications } from "@/services/fetch_utils"
import { IUser } from "@/types/types"
import { SmallDateLocal } from "@/utils/helpers"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import Image from "next/image"
import { RevalidatePath, deleteUserByID, getAllUsers, getMatchDayInfo, updateUserByID } from "@/utils/fetchData"
import { Loading } from "@/components/Loading/Loading"
import axios from "axios"


export function AdminNotifications() {
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [usersData, setUsersData] = useState<IUser[] | null>(null)
    const [viewDetails, setViewDetails] = useState<number | null>(null)
    const [day, setDay] = useState(0)

    const HandleSendNotifications = async () => {
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

    const HandleRefreshUsers = async () => {
        setLoading(true)
        const response = await getAllUsers()
        if (response) {
            setUsersData(response)
            const result = await getMatchDayInfo()
            if (result)
                setDay(result?.day)
        }
        setLoading(false)
    }

    const HandleViewDetails = (e: MouseEvent<HTMLElement>, index: number): void => {
        if ((e.target as HTMLElement).tagName === "ARTICLE") {
            if (index === viewDetails) {
                setViewDetails(null)
            } else {
                setViewDetails(index)
            }
        }
    }

    const HandleDeleteUser = async (uid: string, name: string) => {
        const responseDelete = confirm(`Desea eliminar al usuario: \n${name}`)
        if (responseDelete) {
            const response = await deleteUserByID(uid)
            if (response) {
                enqueueSnackbar("Usuario eliminado correctamente", { variant: "success" })
                RevalidatePath("users")
                setUsersData((prevData) =>
                    prevData!.filter(user =>
                        user.id !== uid
                    )
                )
            } else {
                enqueueSnackbar("Error al eliminar el usuario", { variant: "error" })
            }
        }
    }

    const HandleUpdateNotification = async (uid: string, notifications: boolean) => {
        const response = await updateUserByID(uid, { notifications: notifications })
        if (response) {
            enqueueSnackbar("Usuario actualizado correctamente", { variant: "success" })
            RevalidatePath("users")
            setUsersData((prevData) =>
                prevData!.map(user =>
                    user.id === uid ? response : user
                )
            )
        } else {
            enqueueSnackbar("No se pudo actualizar el usuario. Por favor, inténtalo de nuevo más tarde.", { variant: "error" })
        }
    }

    return (

        <div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)] ">
            <header className="flex items-center justify-between pb-1 px-2">
                <Button onClick={HandleRefreshUsers} icon="pi pi-refresh" severity="secondary" size="small" outlined label="Actualizar" />
                {usersData && <Button label={!sending ? "Enviar notificación" : "Sending..."} size="small" severity="info" icon={sending ? "pi pi-spin pi-spinner-dotted" : "pi pi-send"} disabled={sending} onClick={HandleSendNotifications} />}
            </header>
            {!loading &&
                <div className="flex flex-col gap-3 scrollbar pt-5 px-2">
                    {usersData && usersData.map((user, index) => (
                        <article className={`${styles.users_user} ${viewDetails === index && styles.users_userActive}`} key={user.id} onClick={(e) => HandleViewDetails(e, index)}>
                            <div className={styles.users_data} >
                                <Image className={styles.users_photo} src={user.image || ""} alt={`Imagen de perfil de ${user.name}`} width={70} height={70} />
                                <div className={styles.users_group} >
                                    <span className={`${styles.users_name} text-cyan-400`}>{user.name}</span>
                                    <span className={`${styles.users_email} text-gray-400`}>{user.email}</span>
                                </div>
                                <span className={`${styles.users_date} text-orange-400`}>{new Date(user?.last_login as Date).toLocaleDateString("es-MX", SmallDateLocal)}</span>
                            </div>
                            <div className={styles.users_stats}>
                                <div className={styles.users_bets}>
                                    <i className="pi pi-pen-to-square" />
                                    <span className={styles.users_label}>Quinielas</span>
                                    <span className={`${styles.users_number} text-lime-400 font-semibold`}>{user.total_bets}</span>
                                </div>
                                <div className={styles.users_bets}>
                                    <i className="pi pi-check-circle" />
                                    <span className={styles.users_label}>Ganadoras</span>
                                    <span className={`${styles.users_number} text-lime-400 font-semibold`}>{user.bets_won}</span>
                                </div>
                                <div className={styles.users_bets}>
                                    <i className="pi pi-trophy" />
                                    <span className={styles.users_label}>Finales</span>
                                    <span className={`${styles.users_number} text-lime-400 font-semibold`}>{user.finals_won}</span>
                                </div>
                            </div>
                            <div className={styles.users_options}>
                                <button className={styles.users_mail} onClick={() => HandleUpdateNotification(user.id, !user.notifications || false)}><NotificationIcon className={`${styles.users_iconNoti} ${user.notifications && styles.users_iconNotiActive}`} /></button>
                                <button className={styles.users_mail} > <EmailIcon className={styles.users_iconEmail} /></button>
                                <button className={styles.users_delete} onClick={() => HandleDeleteUser(user.id, user.name)}><DeleteIcon className={styles.users_iconDelete} /></button>
                            </div>
                        </article>
                    ))}
                </div>
            }
            {loading && <Loading height="12em" />}
        </div>
    )
}