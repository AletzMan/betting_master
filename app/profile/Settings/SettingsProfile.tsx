/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IUserInfo, IUserSettings } from "@/app/types/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GetInfoUser, SaveInfouser } from "@/app/config/firebase"
import { enqueueSnackbar } from "notistack"
import { profileSettingsSchema } from "@/app/validations/profileSettingsSchema"
import { ZodError } from "zod"
import { ArrowUpIcon, EditIcon, ProfileIcon, SaveIcon } from "@/app/svg"
import { TextField } from "@/app/components/TextFiled/TextFiled"
import { useUser } from "@/app/config/zustand-store"
import Link from "next/link"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch"
import { ColorPicker, ColorPickerChangeEvent } from "primereact/colorpicker"
import { InputText } from "primereact/inputtext"
import { Avatar } from "primereact/avatar"



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



    useEffect(() => {
        if (user.uid)
            GetUserSettings()
    }, [])

    const GetUserSettings = async () => {
        const response = await GetInfoUser(user.uid)
        const newUserSettings = { ...response, uid: user.uid, name: user.name, email: user.email, photo: user.photo }
        setUserSettings(newUserSettings)
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

    const HandleStatusNotifications = (e: InputSwitchChangeEvent) => {
        const checked = e.value
        setUserSettings({ ...userSettings, notifications: checked })
        setStatusNotifications(checked)
        setErrors({ ...errors, account: "" })
    }


    return (
        <div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
            <div className="flex flex-row w-full justify-between  py-2 border-b-1 border-(--surface-d)">
                <div className="flex flex-col">
                    <label className="flex flex-col gap-1 text-[13px] text-gray-300">Nombre</label>
                    <p className="">{userSettings.name}</p>
                </div>
                <div className="flex flex-col items-center min-w-38">
                    <Avatar image={userSettings.photo || "/user-icon.png"} className="border-2 border-(--primary-color)" size="large" shape="square" />
                    <Button link label="Cambiar foto" icon="pi pi-pen-to-square" onClick={() => window.open('https://myaccount.google.com/personal-info?gar=WzJd&hl=es&utm_source=OGB&utm_medium=act', '_blank')} ></Button>
                </div>
            </div>
            <div className="flex flex-col pt-4 pb-7 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-gray-300">Email</label>
                <p className="">{userSettings.email}A</p>
            </div>
            <div className="flex flex-col pt-4 pb-7 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-gray-300">Cuenta de depósito</label>
                <InputText value={userSettings.account} onChange={HandleChange} placeholder="18 digitos" name="account" />
                {errors.account && <p className="">{errors.account}</p>}
            </div>
            <div className="flex py-3 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-gray-300">¿Recibir correo cuando haya una quiniela disponible?
                    <InputSwitch checked={statusNotifications} onChange={HandleStatusNotifications} />
                </label>
            </div>
            <div className="flex justify-end w-full pt-4">
                <Button label="Guardar" icon="pi pi-save" size="small" severity="success" onClick={HandleSave} />
            </div>
        </div>
    )
}