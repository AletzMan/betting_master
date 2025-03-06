/* eslint-disable @next/next/no-img-element */
"use client"
import styles from "./profile.module.scss"
import { DeleteIcon, EmailIcon, NotificationIcon } from "@/svg"
import { MouseEvent, useState } from "react"
import { GetUsers, UpdateNotificationUser } from "@/config/firebase"
import { SendNotifications } from "@/services/fetch_utils"
import { IUser } from "@/types/types"
import { SmallDateLocal } from "@/utils/helpers"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import Image from "next/image"
import { RevalidatePath, deleteUserByID, getAllUsers, getMatchDayInfo } from "@/utils/fetchData"
import { Loading } from "@/components/Loading/Loading"


export function AdminNotifications() {
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(false)
    const [usersData, setUsersData] = useState<IUser[] | null>(null)
    const [viewDetails, setViewDetails] = useState<number | null>(null)
    const [day, setDay] = useState(0)

    const HandleSendNotifications = async () => {
        if (usersData) {
            const usersWithNotification = usersData.filter(users => users.notifications)
            if (usersWithNotification.length > 0) {
                const response = await SendNotifications(usersWithNotification, day.toString())
                if (response) {
                    enqueueSnackbar("Notificación enviada correctamente", { variant: "success" })
                } else {
                    enqueueSnackbar("Error al enviar la notificación, favor de intentarlo mas tarde", { variant: "error" })
                }
            } else {
                enqueueSnackbar("No hay usuario con notificaciones activas", { variant: "error" })
            }
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
        console.log((e.target as HTMLElement).tagName)
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
        const response = await UpdateNotificationUser(uid, !notifications)
        if (response === "OK") {
            enqueueSnackbar("Usuario actualizado correctamente", { variant: "success" })
            const responseUsers = await GetUsers()
            setUsersData(responseUsers)
        }
    }

    return (

        <div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)] ">
            <header className="flex items-center justify-end pb-1">
                <Button onClick={HandleRefreshUsers} icon="pi pi-refresh" severity="secondary" size="small" outlined label="Actualizar" />
            </header>
            {!loading &&
                <div className="flex flex-col gap-1 scrollbar">
                    {usersData && usersData.map((user, index) => (
                        <article className={`${styles.users_user} ${viewDetails === index && styles.users_userActive}`} key={user.id} onClick={(e) => HandleViewDetails(e, index)}>
                            <div className={styles.users_data} >
                                <Image className={styles.users_photo} src={user.image || ""} alt={`Imagen de perfil de ${user.name}`} width={70} height={70} />
                                <div className={styles.users_group} >
                                    <span className={styles.users_name}>{user.name}</span>
                                    <span className={styles.users_email}>{user.email}</span>
                                </div>
                                <span className={styles.users_date}>{new Date(user?.last_login as Date).toLocaleDateString("es-MX", SmallDateLocal)}</span>
                            </div>
                            <div className={styles.users_stats}>
                                <div className={styles.users_bets}>
                                    <span className={styles.users_number}>{user.total_bets}</span>
                                    <span className={styles.users_label}>quinielas</span>
                                </div>
                                <div className={styles.users_bets}>
                                    <span className={styles.users_number}>{user.bets_won}</span>
                                    <span className={styles.users_label}>Ganadoras</span>
                                </div>
                                <div className={styles.users_bets}>
                                    <span className={styles.users_number}>{user.finals_won}</span>
                                    <span className={styles.users_label}>Finales</span>
                                </div>
                            </div>
                            <div className={styles.users_options}>
                                <button className={styles.users_mail} onClick={() => HandleUpdateNotification(user.id, user.notifications || false)}><NotificationIcon className={`${styles.users_iconNoti} ${user.notifications && styles.users_iconNotiActive}`} /></button>
                                <button className={styles.users_mail} > <EmailIcon className={styles.users_iconEmail} /></button>
                                <button className={styles.users_delete} onClick={() => HandleDeleteUser(user.id, user.name)}><DeleteIcon className={styles.users_iconDelete} /></button>
                            </div>
                        </article>
                    ))}
                </div>
            }
            {loading && <Loading height="12em" />}
            <footer className="flex min-h-12 items-center pt-2">
                {usersData && <Button label={!sending ? "Enviar notificación" : "Sending..."} size="small" severity="info" icon={sending ? "pi pi-spin pi-spinner-dotted" : "pi pi-send"} disabled={sending} />}
                {/*<Button
                    props={{ onClick: HandleSendNotifications, disabled: sending }}
                    text={!sending ? "Enviar notificación" : "Sending..."}
                    icon={sending ? <LoadingIcon className={styles.admin_updateIcon} /> : <SendIcon className={styles.admin_updateIcon} />}
                    type="primary"
            />*/}
            </footer>
        </div>
    )
}