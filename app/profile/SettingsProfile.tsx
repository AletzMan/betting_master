/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { UserSession } from "@/app/types/types"
import { useEffect, useState } from "react"
import { GetInfoUser, SaveInfouser } from "@/app/config/firebase"
import { enqueueSnackbar } from "notistack"
import { profileSettingsSchema } from "@/app/validations/profileSettingsSchema"
import { ZodError } from "zod"
import { useUser } from "@/app/config/zustand-store"
import { Button } from "primereact/button"
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch"
import { InputText } from "primereact/inputtext"
import { Avatar } from "primereact/avatar"
import { useSession } from "next-auth/react"
import { Skeleton } from "primereact/skeleton"



const EmptyUserSettings: UserSession = {
    id: "",
    uid: "",
    account: "",
    name: "",
    email: "",
    image: "",
    color: "#11cfd9",
    notifications: true,
    bets_won: 0,
    finals_won: 0,
    last_login: new Date(),
    total_bets: 0,
    emailVerified: null,
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
    const session = useSession()
    const [userSettings, setUserSettings] = useState<UserSession>(EmptyUserSettings)
    const [errors, setErrors] = useState(EmptyErrors)
    const [statusNotifications, setStatusNotifications] = useState(false)

    console.log(userSettings)

    useEffect(() => {
        if (session.status === "authenticated")
            setUserSettings(session.data?.user as UserSession)
        //GetUserSettings()
    }, [session])

    const GetUserSettings = async () => {
        const response = await GetInfoUser(user.uid)
        const newUserSettings = { ...response, uid: user.uid, name: user.name, email: user.email, photo: user.photo }
        setUserSettings(newUserSettings)
        setStatusNotifications(newUserSettings.notifications)
        localStorage.setItem("bettingNotifications", `${newUserSettings.notifications}`)
    }

    const HandleSave = async () => {
        try {
            if (userSettings.account) {
                if (userSettings?.account?.length >= 0) {
                    await profileSettingsSchema.parseAsync(userSettings)
                    const response = await SaveInfouser(user.uid, userSettings)
                    if (response === "OK") {
                        enqueueSnackbar("Perfil actualizado", { variant: "success" })
                    }
                } else {
                    enqueueSnackbar("Perfil actualizado", { variant: "success" })
                }
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
                    <label className="flex flex-col gap-1 text-[13px] text-(--surface-400)">Nombre</label>
                    {session.status === "authenticated" && <p className="">{session.data?.user?.name}</p>}
                    {session.status === "loading" && <Skeleton height="24px" />}
                </div>
                <div className="flex flex-col items-center min-w-38 ga">
                    {session.status === "authenticated" && <Avatar image={session.data?.user?.image || "/user-icon.png"} className="border-2 border-(--primary-color)" size="large" shape="square" />}
                    {session.status === "loading" && <Skeleton height="48px" width="48px" />}
                    <Button link label="Cambiar foto" icon="pi pi-pen-to-square" onClick={() => window.open('https://myaccount.google.com/personal-info?gar=WzJd&hl=es&utm_source=OGB&utm_medium=act', '_blank')} ></Button>
                </div>
            </div>
            <div className="flex flex-col pt-4 pb-7 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-(--surface-400)">Email</label>
                {session.status === "authenticated" && <p className="">{session.data?.user?.email}</p>}
                {session.status === "loading" && <Skeleton height="22px" width="12em" />}
            </div>
            <div className="flex flex-col pt-4 pb-7 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-(--surface-400)">Cuenta de depósito</label>
                {session.status === "authenticated" && <InputText value={(session.data?.user as UserSession).account} onChange={HandleChange} placeholder="18 digitos" name="account" />}
                {session.status === "loading" && <Skeleton height="42px" />}
                {errors.account && <p className="">{errors.account}</p>}
            </div>
            <div className="flex py-3 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-(--surface-400)">¿Recibir correo cuando haya una quiniela disponible?
                    <InputSwitch checked={statusNotifications} onChange={HandleStatusNotifications} />
                </label>
            </div>
            <div className="flex justify-end w-full pt-4">
                <Button label="Guardar" icon="pi pi-save" size="small" severity="success" onClick={HandleSave} />
            </div>
        </div>
    )
}