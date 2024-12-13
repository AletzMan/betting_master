/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IUserInfo, IUserSettings } from "@/app/types/types"
import styles from "./settings.module.scss"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GetInfoUser, SaveInfouser } from "@/app/config/firebase"
import { useSnackbar } from "notistack"
import { profileSettingsSchema } from "@/app/validations/profileSettingsSchema"
import { ZodError } from "zod"
import { Button } from "@/app/components/Button/Button"
import { SaveIcon } from "@/app/svg"

interface ISettingsProfileProps {
    user: IUserInfo
}

const EmptyUserSettings: IUserSettings = {
    uid: "",
    account: "",
    name: "",
    email: "",
    photo: ""
}

const EmptyErrors = {
    account: ""
}


export const SettingsProfile = ({ user }: ISettingsProfileProps) => {
    const { enqueueSnackbar } = useSnackbar()
    const [userSettings, setUserSettings] = useState<IUserSettings>(EmptyUserSettings)
    const [errors, setErrors] = useState(EmptyErrors)

    useEffect(() => {
        if (user.uid)
            GetUserSettings()
    }, [])

    const GetUserSettings = async () => {
        const response = await GetInfoUser(user.uid)
        const newUserSettings = { ...response, uid: user.uid, name: user.name, email: user.email, photo: user.photo }
        setUserSettings(newUserSettings)
    }

    const HandleSave = async () => {
        try {
            if (userSettings?.account?.length > 0) {
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
    }

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserSettings({ ...userSettings, account: e.target.value })
        setErrors({ ...errors, account: "" })
    }


    return (
        <div className={styles.settingsProfile}>
            <h1 className={styles.settingsProfile_title}>Perfil</h1>
            <div className={styles.settingsProfile_info}>
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
                    <input
                        type="number"
                        name="account"
                        className={`${styles.settingsProfile_input} ${errors.account && styles.settingsProfile_inputError}`}
                        placeholder="18 digitos" value={userSettings?.account}
                        onChange={HandleChange}
                    />
                    {errors.account && <p className={styles.settingsProfile_error}>{errors.account}</p>}
                </div>
                <Button
                    props={{ onClick: HandleSave }}
                    text="Guardar"
                    icon={<SaveIcon />}
                    type="primary"
                />
                <picture className={styles.settingsProfile_picture}>
                    <Image className={styles.settingsProfile_image} src={userSettings.photo || "/user-icon.png"} alt={userSettings.name || ""} width={100} height={100} />
                </picture>
            </div>

        </div>
    )
}