import { ITopic, IUser } from "@/types/types";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ZodIssue } from "zod";
import { IOpenDialog } from "./AdminNotifications";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { getAllTopics } from "@/utils/fetchData";
import { Dropdown } from "primereact/dropdown";
import { useSelecterUser } from "@/config/zustand-store";

interface ITopicError {
    name: { isError: boolean, error: string }
    title: { isError: boolean, error: string }
    message: { isError: boolean, error: string }
    link: { isError: boolean, error: string }
}

interface Props {
    setOpenDialog: Dispatch<SetStateAction<IOpenDialog>>
}


export function SendNotificationForm({ setOpenDialog }: Props) {
    const [topic, setTopic] = useState<ITopic>({ name: "", title: "", message: "", link: "/logo.png" })
    const [topics, setTopics] = useState<ITopic[]>([])
    const [sending, setSending] = useState(false)
    const [errorsTopic, setErrorsTopic] = useState<ITopicError>({ name: { error: "", isError: false }, title: { error: "", isError: false }, message: { error: "", isError: false }, link: { error: "", isError: false } })
    const selectedUser = useSelecterUser((state) => state.selectedUser)


    const handleSendNotification = async () => {
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

    const handleChangeTopicName = (value: ITopic) => {
        setErrorsTopic((prev => ({ ...prev, name: { error: "", isError: false } })))
        setTopic((prev => ({ ...prev, name: value.name })))
    }

    const handleChangeTopicData = (value: string, type: 'name' | 'title' | 'message' | 'link') => {
        setErrorsTopic((prev => ({ ...prev, [type]: { error: "", isError: false } })))
        setTopic((prev => ({ ...prev, [type]: value })))
    }

    const handleResetAndClose = () => {
        setErrorsTopic({ name: { error: "", isError: false }, title: { error: "", isError: false }, message: { error: "", isError: false }, link: { error: "", isError: false } })
        setOpenDialog((prev) => ({ ...prev, isOpen: false }))
    }
    console.log(selectedUser)
    return (
        <div className="flex flex-col w-full gap-2 min-w-78">
            <h1 className="flex flex-row gap-2.5 items-center px-3 mb-5 w-full bg-(--surface-c) py-2"><i className="pi pi-send" />{`Enviar notificación a ${selectedUser?.name}`}</h1>
            <div className="flex flex-col w-full gap-6.5  p-2.5 ">
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <label htmlFor="topic">Nombre del tema</label>
                        {/*<InputText className="w-full" id="topic" invalid={errorsTopic?.name.isError} value={topic.name} onChange={(e) => handleChangeTopicData(e.currentTarget.value, 'name')} disabled={sending} />*/}
                        <Dropdown className="w-full" disabled={sending} invalid={errorsTopic?.name.isError} options={topics} id="users" optionLabel="name" value={topics.find(top => top.name === topic.name)} onChange={(e) => handleChangeTopicName(e.target.value)} />

                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.name.error}</label>
                </div>
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <InputText className="w-full" id="title" invalid={errorsTopic?.title.isError} value={topic.title} onChange={(e) => handleChangeTopicData(e.currentTarget.value, 'title')} disabled={sending} />
                        <label htmlFor="title">Titulo</label>
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.title.error}</label>
                </div>
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <InputTextarea id="description" invalid={errorsTopic?.message.isError} value={topic.message} onChange={(e) => handleChangeTopicData(e.currentTarget.value, 'message')} rows={5} cols={50} disabled={sending} />
                        <label htmlFor="description">Description</label>
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.message.error}</label>
                </div>
                <div className="flex flex-row justify-around gap-3 mt-3">
                    <Button className="self-end min-w-24" icon="pi pi-send" severity="secondary" label="Enviar" size="small" loading={sending} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleSendNotification} />
                    <Button className="self-end min-w-24" icon="pi pi-times" severity="danger" label="Cancelar" size="small" disabled={sending} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleResetAndClose} />
                </div>
            </div>
        </div>
    )
}