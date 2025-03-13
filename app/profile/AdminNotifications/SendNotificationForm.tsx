import { ITopic } from "@/types/types";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction, useState } from "react";
import { IOpenDialog } from "./AdminNotifications";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { useSelecterUser } from "@/config/zustand-store";
import { RadioButton } from "primereact/radiobutton";
import { Divider } from "primereact/divider";

interface ITopicError {
    title: { isError: boolean, error: string }
    message: { isError: boolean, error: string }
    link: { isError: boolean, error: string }
}

interface Props {
    setOpenDialog: Dispatch<SetStateAction<IOpenDialog>>
}


export function SendNotificationForm({ setOpenDialog }: Props) {
    const [sending, setSending] = useState(false)
    const [typeNotification, setTypeNotification] = useState("newBet")
    const [notification, setNotification] = useState<ITopic>({ name: "", title: "¡Nueva Quiniela Disponible!", message: "La quiniela de esta semana ya está disponible. ¡Entra y haz tus predicciones!", link: "/logo.png" })
    const [errorsTopic, setErrorsTopic] = useState<ITopicError>({ title: { error: "", isError: false }, message: { error: "", isError: false }, link: { error: "", isError: false } })
    const selectedUser = useSelecterUser((state) => state.selectedUser)


    const handleSendNotification = async () => {
        setSending(true)
        try {
            const response = await axios.post("/api/notifications/push", {
                token: selectedUser?.tokenNotifications,
                title: notification.title,
                message: notification.message,
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

    const handleChangeTypeNotification = (type: string) => {
        setTypeNotification(type)
        if (type === "newBet") {
            setNotification({ name: "", title: "¡Nueva Quiniela Disponible!", message: "La quiniela de esta semana ya está disponible. ¡Entra y haz tus predicciones!", link: "/logo.png" })
        } else if (type === "pay") {
            setNotification({ name: "", title: "Pago Pendiente", message: "Tu pago de quiniela sigue pendiente. ¡No te preocupes, tu participación está garantizada!", link: "/logo.png" })
        }
    }

    const handleChangeTopicData = (value: string, type: 'title' | 'message' | 'link') => {
        setErrorsTopic((prev => ({ ...prev, [type]: { error: "", isError: false } })))
        setNotification((prev => ({ ...prev, [type]: value })))
    }

    const handleResetAndClose = () => {
        setErrorsTopic({ title: { error: "", isError: false }, message: { error: "", isError: false }, link: { error: "", isError: false } })
        setOpenDialog((prev) => ({ ...prev, isOpen: false }))
    }

    return (
        <div className="flex flex-col w-full gap-2 min-w-78">
            <h1 className="flex flex-row gap-2.5 items-center px-3 mb-2 w-full bg-(--surface-c) py-2"><i className="pi pi-send" />{`Enviar notificación a ${selectedUser?.name}`}</h1>
            {selectedUser?.notifications &&
                <>
                    <header className="flex flex-row gap-3.5 items-center p-1.5  rounded-sm">
                        <label className="flex flex-row gap-1.5 items-center px-2.5">
                            <RadioButton name="notification" value="newBet" onChange={(e) => handleChangeTypeNotification(e.value)} checked={typeNotification === "newBet"} />
                            Nueva quiniela
                        </label>
                        <label className="flex flex-row gap-1.5 items-center px-2.5">
                            <RadioButton name="notification" value="pay" onChange={(e) => handleChangeTypeNotification(e.value)} checked={typeNotification === "pay"} />
                            Pago
                        </label>
                    </header>
                    <Divider type="dashed" />
                    <div className="flex flex-col w-full gap-6.5  p-2.5 ">
                        <div className="relative flex flex-col gap-0 mb-3">
                            <FloatLabel className="text-sm">
                                <InputText className="w-full" id="title" invalid={errorsTopic?.title.isError} value={notification.title} onChange={(e) => handleChangeTopicData(e.currentTarget.value, 'title')} disabled={sending} />
                                <label htmlFor="title">Titulo</label>
                            </FloatLabel>
                            <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.title.error}</label>
                        </div>
                        <div className="relative flex flex-col gap-0 mb-3">
                            <FloatLabel className="text-sm">
                                <InputTextarea id="description" invalid={errorsTopic?.message.isError} value={notification.message} onChange={(e) => handleChangeTopicData(e.currentTarget.value, 'message')} rows={5} cols={50} disabled={sending} />
                                <label htmlFor="description">Description</label>
                            </FloatLabel>
                            <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.message.error}</label>
                        </div>
                        <div className="flex flex-row justify-around gap-3 mt-3">
                            <Button className="self-end min-w-24" icon="pi pi-send" severity="secondary" label="Enviar" size="small" loading={sending} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleSendNotification} />
                            <Button className="self-end min-w-24" icon="pi pi-times" severity="danger" label="Cancelar" size="small" disabled={sending} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleResetAndClose} />
                        </div>
                    </div>
                </>}
            {!selectedUser?.notifications &&
                <div className=" px-4 flex flex-col items-center justify-center max-w-90 py-5 gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <i className="pi pi-bell-slash text-4xl text-gray-500 mb-2"></i>
                        <p className="text-center text-balance text-lg font-semibold">
                            {`${selectedUser?.name}`}
                        </p>
                        <p className="text-center text-balance text-lg font-semibold">
                            {`No tiene las notificaciones activadas`}
                        </p>
                        <p className="text-center text-balance text-md mt-1 text-gray-600">
                            Para recibir notificaciones, debe activar los permisos en la configuración de su navegador/dispositivo.
                        </p>
                    </div>
                    <Button className="min-w-24" icon="pi pi-check-circle" severity="secondary" label="Aceptar" size="small" onClick={handleResetAndClose} />
                </div>
            }
        </div>
    )
}