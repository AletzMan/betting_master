/* eslint-disable @next/next/no-img-element */
"use client"
import styles from "./styles.module.scss"
import stylesGeneral from "../profile.module.scss"
import { AdminIcon, ArrowUpIcon, DeleteIcon, EmailIcon, LoadingIcon, NotificationIcon, RefreshIcon, SendIcon } from "@/app/svg"
import { Button } from "@/app/components/Button/Button"
import { MouseEvent, useState } from "react"
import { DeleteUser, GetCurrentMatchDay, GetUsers, UpdateNotificationUser } from "@/app/config/firebase"
import axios from "axios"
import { SendNotifications } from "@/app/services/fetch_utils"
import { IUserSettings } from "@/app/types/types"
import { FormattedDateUpcoming, SmallDateLocal } from "@/app/utils/helpers"
import { enqueueSnackbar } from "notistack"
import { useMatches } from "@/app/hooks/useMatches"
import Details from "@/app/components/Details/Details"


export function AdminNotifications() {
    const [sending, setSending] = useState(false)
    const [usersData, setUsersData] = useState<IUserSettings[]>([])
    const [viewDetails, setViewDetails] = useState<number | null>(null)
    const [day, setDay] = useState(0)

    const HandleSendNotifications = async () => {
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

    const HandleRefreshUsers = async () => {
        const response = await GetUsers()
        setUsersData(response)
        const currentMonth = new Date().getMonth() + 1
        const tournament = currentMonth < 7 ? "0168" : "0159"
        const result = await GetCurrentMatchDay(tournament)
        setDay(result.day)
    }

    const HandleViewDetails = (e: MouseEvent<HTMLButtonElement>, index: number): void => {
        if ((e.target as HTMLElement).tagName === "BUTTON") {
            if (index === viewDetails) {
                setViewDetails(null)
            } else {
                setViewDetails(index)
            }
        }
    }

    const HandleDeleteUser = async (uid: string) => {
        const responseDelete = confirm("Desea eliminar al usuario")
        if (responseDelete) {
            const response = await DeleteUser(uid)
            if (response === "OK") {
                enqueueSnackbar("Usuario eliminado correctamente", { variant: "success" })
                const response = await GetUsers()
                setUsersData(response)
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
    console.log(usersData)

    return (
        <Details name="adminpanel" title="Notificaciones y usuarios" icon={<NotificationIcon className="" />} >
            <div className={styles.options}>
                <header className={styles.header}>
                    <button className={styles.header_button} onClick={HandleRefreshUsers}>
                        <RefreshIcon className={styles.header_icon} />
                    </button>
                </header>
                <div className={styles.users}>
                    {usersData.map((user, index) => (
                        <button className={`${styles.users_user} ${viewDetails === index && styles.users_userActive}`} key={user.uid} onClick={(e) => HandleViewDetails(e, index)}>
                            <div className={styles.users_data} >
                                <img className={styles.users_photo} src={user.photo || ""} alt={`Imagen de perfil de ${user.name}`} />
                                <div className={styles.users_group} >
                                    <span className={styles.users_name}>{user.name}</span>
                                    <span className={styles.users_email}>{user.email}</span>
                                </div>
                                <span className={styles.users_date}>{new Date(user.last_login).toLocaleDateString("es-MX", SmallDateLocal)}</span>
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
                                <button className={styles.users_mail} onClick={() => HandleUpdateNotification(user.uid, user.notifications)}><NotificationIcon className={`${styles.users_iconNoti} ${user.notifications && styles.users_iconNotiActive}`} /></button>
                                <button className={styles.users_mail} > <EmailIcon className={styles.users_iconEmail} /></button>
                                <button className={styles.users_delete} onClick={() => HandleDeleteUser(user.uid)}><DeleteIcon className={styles.users_iconDelete} /></button>
                            </div>
                            {/*<input className={styles.users_checkbox} type="checkbox" defaultChecked={user.notifications} />*/}
                        </button>
                    ))}
                </div>
                <footer className={styles.footer}>
                    {<Button
                        props={{ onClick: HandleSendNotifications, disabled: sending }}
                        text={!sending ? "Enviar notificación" : "Sending..."}
                        icon={sending ? <LoadingIcon className={styles.admin_updateIcon} /> : <SendIcon className={styles.admin_updateIcon} />}
                        type="primary"
                    />}
                </footer>
            </div>
        </Details>
    )
}