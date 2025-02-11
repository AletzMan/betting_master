/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IUserInfo, IUserSettings } from "@/app/types/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GetInfoUser, SaveInfouser } from "@/app/config/firebase"
import { enqueueSnackbar } from "notistack"
import { profileSettingsSchema } from "@/app/validations/profileSettingsSchema"
import { ZodError } from "zod"
import { Button } from "@/app/components/Button/Button"
import { ArrowUpIcon, EditIcon, ProfileIcon, SaveIcon } from "@/app/svg"
import styles from "./settings.module.scss"
import stylesGeneral from "../profile.module.scss"
import { TextField } from "@/app/components/TextFiled/TextFiled"
import { useUser } from "@/app/config/zustand-store"
import Details from "@/app/components/Details/Details"
import Link from "next/link"



const EmptyUserSettings: IUserSettings = {
    uid: "",
    account: "",
    name: "",
    email: "",
    photo: "",
    color: "#11cfd9",
    notifications: true,
    bets_won: 0,
    finals_won: 0,
    last_login: "",
    total_bets: 0
}

const EmptyErrors = {
    account: ""
}

interface IPhoto {
    file: File
    url: string
}


export const SettingsProfile = () => {
    const { user } = useUser()
    const [userSettings, setUserSettings] = useState<IUserSettings>(EmptyUserSettings)
    const [errors, setErrors] = useState(EmptyErrors)
    const [statusNotifications, setStatusNotifications] = useState(false)
    const [accentColor, setAccentColor] = useState("#11cfd9")



    useEffect(() => {
        if (user.uid)
            GetUserSettings()
    }, [])

    const GetUserSettings = async () => {
        const response = await GetInfoUser(user.uid)
        const newUserSettings = { ...response, uid: user.uid, name: user.name, email: user.email, photo: user.photo }
        setUserSettings(newUserSettings)
        setAccentColor(newUserSettings.color)
        setStatusNotifications(newUserSettings.notifications)
        localStorage.setItem("bettingNotifications", `${newUserSettings.notifications}`)
    }

    const HandleSave = async () => {
        try {
            if (userSettings?.account?.length >= 0) {
                await profileSettingsSchema.parseAsync(userSettings)
                const response = await SaveInfouser(user.uid, userSettings)
                if (response === "OK") {
                    enqueueSnackbar("Perfil actualizado", { variant: "success" })
                }
            } else {
                enqueueSnackbar("Perfil actualizado", { variant: "success" })
            }
        } catch (error) {
            if (error instanceof ZodError) {
                enqueueSnackbar("Error al actualizar perfil", { variant: "error" })
                setErrors({ ...errors, [error.issues[0].path[0]]: error.issues[0].message })
            }
        }
        localStorage.setItem("bettingNotifications", `${statusNotifications}`)
    }

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserSettings({ ...userSettings, account: e.target.value })
        setErrors({ ...errors, account: "" })
    }

    const HandleStatusNotifications = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        setUserSettings({ ...userSettings, notifications: checked })
        setStatusNotifications(checked)
        setErrors({ ...errors, account: "" })
    }

    const HandleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        document.documentElement.style.setProperty("--primaryColor", value)
        document.documentElement.style.setProperty("--primaryOpacityColor", `${value}55`)
        localStorage.setItem("colorBettingGame", value)
        setUserSettings({ ...userSettings, color: value })
        setAccentColor(value)
        setErrors({ ...errors, account: "" })
    }


    return (
        <Details name="adminpanel" title="Perfil" icon={<ProfileIcon className="" />} open>
            <div className={styles.settingsProfile_info}>
                <div className={styles.settingsProfile_container}>
                    <picture className={styles.settingsProfile_picture}>
                        <Image className={styles.settingsProfile_image} src={userSettings.photo || "/user-icon.png"} alt={userSettings.name || ""} width={100} height={100} />
                    </picture>
                    <Link className={styles.settingsProfile_change} href={"https://myaccount.google.com/personal-info?gar=WzJd&hl=es&utm_source=OGB&utm_medium=act"} target="_blank">
                        <EditIcon className={styles.settingsProfile_icon} />
                        <span className={styles.settingsProfile_name} >Cambiar foto</span>
                    </Link>
                </div>
                <div className={styles.settingsProfile_info__item}>
                    <label className={styles.settingsProfile_label}>Nombre</label>
                    <p className={styles.settingsProfile_text}>{userSettings.name}</p>
                </div>
                <div className={styles.settingsProfile_info__item}>
                    <label className={styles.settingsProfile_label}>Email</label>
                    <p className={styles.settingsProfile_text}>{userSettings.email}</p>
                </div>
                <div className={styles.settingsProfile_info__item}>
                    <label className={styles.settingsProfile_label}>Cuenta de depósito</label>
                    <TextField type="number"
                        name="account"
                        className={` ${errors.account && styles.settingsProfile_inputError}`}
                        placeholder="18 digitos" value={userSettings?.account}
                        onChange={HandleChange} />
                    {errors.account && <p className={styles.settingsProfile_error}>{errors.account}</p>}
                </div>
                <div className={styles.settingsProfile_info__item}>
                    <label className={styles.settingsProfile_label}>Color de énfasis
                        <input className={styles.color} type="color" onChange={HandleChangeColor} value={accentColor} />
                    </label>
                </div>
                <div className={styles.settingsProfile_info__item}>
                    <label className={styles.settingsProfile_label}>¿Recibir correo cuando haya una quiniela disponible?
                    </label>
                    <div className={`${styles.status} ${statusNotifications && styles.status_active}`}>
                        <input className={styles.status_input} type="checkbox" defaultChecked={statusNotifications} onChange={HandleStatusNotifications} />
                        <div className={`${styles.status_button} ${statusNotifications && styles.status_buttonActive}`}></div>
                        <span className={styles.status_text}>{statusNotifications ? "SI" : "NO"}</span>
                    </div>
                </div>
                <div className={styles.settingsProfile_button}>
                    <Button

                        props={{ onClick: HandleSave }}
                        text="Guardar"
                        icon={<SaveIcon />}
                        type="primary"
                    />
                </div>
            </div>
        </Details>
    )
}