/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { UserSession } from "@/types/types"
import { useEffect, useState } from "react"
import { SaveInfouser } from "@/config/firebase"
import { enqueueSnackbar } from "notistack"
import { profileSettingsSchema } from "@/validations/profileSettingsSchema"
import { ZodError, ZodIssue } from "zod"
import { useUser } from "@/config/zustand-store"
import { Button } from "primereact/button"
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch"
import { InputText } from "primereact/inputtext"
import { Avatar } from "primereact/avatar"
import { useSession } from "next-auth/react"
import { Skeleton } from "primereact/skeleton"
import { updateUserByID } from "@/utils/fetchData"
import axios, { AxiosError } from "axios"
import { UserType } from "@/validations/userUpdateSchema"
import { Message } from "primereact/message"



const EmptyUserSettings: UserType = {
    account: "",
    color: "#11cfd9",
    notifications: true,
    bets_won: 0,
    finals_won: 0,
    last_login: new Date(),
    total_bets: 0,
}

const EmptyErrors = {
    account: ""
}

interface IPhoto {
    file: File
    url: string
}


export const SettingsProfile = () => {
    const session = useSession()
    const [userSettings, setUserSettings] = useState<UserType>(EmptyUserSettings)
    const [errors, setErrors] = useState(EmptyErrors)
    const [statusNotifications, setStatusNotifications] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    useEffect(() => {
        if (session.status === "authenticated") {

            const user = session.data?.user as UserSession
            const newDataUser: UserType = {
                account: user.account,
                color: user.color,
                notifications: user.notifications,
                last_login: user.last_login,
                total_bets: user.total_bets,
                bets_won: user.bets_won,
                finals_won: user.finals_won
            }
            setUserSettings(newDataUser)
        }
    }, [session])
    console.log(session)

    const HandleSave = async () => {
        setLoading(true)
        try {
            const response = await axios.patch(`/api/users/${session.data?.user?.id}`, {
                ...userSettings
            })
            if (response) {
                enqueueSnackbar("Perfil actualizado", { variant: "success" })
                setMessage(true)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.status === 422) {
                    const newErrors: ZodIssue[] = error.response?.data.issues
                    newErrors.forEach(issue => {
                        if (issue.path[0] === "account") {
                            setErrors({ account: issue.message })
                        }
                    })
                    enqueueSnackbar("Error al actualizar perfil", { variant: "error" })
                }
            }
        } finally {
            setLoading(false)
        }
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
                    <label className="flex flex-col gap-1 text-[13px] text-(--primary-color)">Nombre</label>
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
                <label className="flex flex-col gap-1 text-[13px] text-(--primary-color)">Email</label>
                {session.status === "authenticated" && <p className="text-(--surface-700)">{session.data?.user?.email}</p>}
                {session.status === "loading" && <Skeleton height="22px" width="12em" />}
            </div>
            <div className="flex flex-col pt-4 pb-7 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-(--primary-color)">Cuenta de depósito</label>
                {session.status === "authenticated" && <InputText invalid={errors.account !== ""} type="number" value={userSettings.account} onChange={HandleChange} placeholder="18 digitos" name="account" />}
                {session.status === "loading" && <Skeleton height="42px" />}
                {errors.account && <p className="text-(--danger-color) text-xs pl-1">{errors.account}</p>}
            </div>
            <div className="flex py-3 border-b-1 border-(--surface-d)">
                <label className="flex flex-col gap-1 text-[13px] text-(--primary-color)">¿Recibir correo cuando haya una quiniela disponible?
                    <InputSwitch checked={userSettings.notifications || false} onChange={HandleStatusNotifications} />
                </label>
            </div>
            <div className="flex justify-end w-full pt-4">
                <Button label="Guardar" icon="pi pi-save" size="small" severity="success" onClick={HandleSave} loadingIcon="pi pi-spin pi-spinner" loading={loading} />
            </div>
            {message && <Message text="Tus cambios se verán reflejados en tu perfil la próxima vez que inicies sesión." severity="success" />}
        </div>
    )
}