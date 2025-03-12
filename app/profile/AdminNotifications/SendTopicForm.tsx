import { IUser } from "@/types/types";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Dispatch, SetStateAction, useState } from "react";
import { ZodIssue } from "zod";
import { IOpenDialog } from "./AdminNotifications";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";

interface ITopicError {
    tokens: { isError: boolean, error: string }
    topic: { isError: boolean, error: string }
}

interface Props {
    setOpenDialog: Dispatch<SetStateAction<IOpenDialog>>
    userTokens: IUser[] | null
}


export function SendTopicForm({ setOpenDialog, userTokens }: Props) {
    const [create, setCreate] = useState(false)
    const [sending, setSending] = useState(false)
    const [topicName, setTopicName] = useState("")
    const [errorsTopic, setErrorsTopic] = useState<ITopicError | null>(null)
    const [selectedUsers, setSelectedUsers] = useState<IUser[] | null>(null)

    const handleSendTopic = async () => {
        setSending(true)
        try {
            const response = await axios.post("/api/notifications/topic/send", {
                topic: "",
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




    const handleResetAndClose = () => {
        setErrorsTopic({ tokens: { error: "", isError: false }, topic: { error: "", isError: false } })
        setOpenDialog((prev) => ({ ...prev, isOpen: false }))
    }

    return (
        <div className="flex flex-col w-full gap-2 min-w-78">
            <h1 className="flex flex-row gap-2.5 items-center px-3 mb-5 w-full bg-(--surface-c) py-2"><i className="pi pi-send" />Enviar notificación</h1>
            <div className="flex flex-col w-full gap-5  p-2.5 ">
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <InputText className="w-full" id="topic" invalid={errorsTopic?.topic.isError} value={topicName} onChange={(e) => setTopicName(e.currentTarget.value)} disabled={create} />
                        <label htmlFor="topic">Nombre del tema</label>
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.topic.error}</label>
                </div>
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <InputText className="w-full" id="title" invalid={errorsTopic?.topic.isError} value={topicName} onChange={(e) => setTopicName(e.currentTarget.value)} disabled={create} />
                        <label htmlFor="title">Titulo</label>
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.tokens.error}</label>
                </div>
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <InputTextarea id="description" value={topicName} onChange={(e) => setTopicName(e.currentTarget.value)} rows={5} cols={50} disabled={create} />
                        <label htmlFor="description">Description</label>
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.tokens.error}</label>
                </div>
                <div className="relative flex flex-col gap-0 mb-3">
                    <FloatLabel className="text-sm">
                        <InputText className="w-full" id="url" invalid={errorsTopic?.topic.isError} value={topicName} disabled={create} onChange={(e) => setTopicName(e.currentTarget.value)} />
                        <label htmlFor="url">URL imagen</label>
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.tokens.error}</label>
                </div>
                <div className="flex flex-row justify-around gap-3 mt-3">
                    <Button className="self-end min-w-24" icon="pi pi-send" severity="secondary" label="Enviar" size="small" loading={create} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleSendTopic} />
                    <Button className="self-end min-w-24" icon="pi pi-times" severity="danger" label="Cancelar" size="small" disabled={create} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleResetAndClose} />
                </div>
            </div>
        </div>
    )
}