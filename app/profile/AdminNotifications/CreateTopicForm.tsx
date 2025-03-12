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

interface ITopicError {
    tokens: { isError: boolean, error: string }
    topic: { isError: boolean, error: string }
}

interface Props {
    setOpenDialog: Dispatch<SetStateAction<IOpenDialog>>
    userTokens: IUser[] | null
}


export function CreateTopicForm({ setOpenDialog, userTokens }: Props) {
    const [create, setCreate] = useState(false)
    const [topicName, setTopicName] = useState("")
    const [errorsTopic, setErrorsTopic] = useState<ITopicError | null>(null)
    const [selectedUsers, setSelectedUsers] = useState<IUser[] | null>(null)

    const handleCreateTopic = async () => {
        setCreate(true)
        const tokens = selectedUsers?.map(user => user.tokenNotifications)
        try {
            const response = await axios.post("/api/notifications/topic", {
                topic: topicName,
                tokens
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 201) {
                enqueueSnackbar("Notificación creada correctamente", { variant: "success" })
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    console.log(error.response)
                    const issues: ZodIssue[] = error.response.data.issues
                    const newErrors: ITopicError = { tokens: { error: "", isError: false }, topic: { error: "", isError: false } }
                    issues.forEach(issue => {
                        if (issue.path[0] === "tokens" || issue.path[0] === "topic") {
                            newErrors[issue.path[0]].isError = true
                            newErrors[issue.path[0]].error = issue.message
                        }
                    })
                    setErrorsTopic(newErrors);
                    enqueueSnackbar("Error al crear la notificación, favor de intentarlo mas tarde", { variant: "error" })
                }
            }
        } finally {
            setCreate(false)
        }

        setCreate(false)
    }

    const handleResetAndClose = () => {
        setErrorsTopic({ tokens: { error: "", isError: false }, topic: { error: "", isError: false } })
        setOpenDialog((prev) => ({ ...prev, isOpen: false }))
    }

    return (
        <div className="flex flex-col w-full gap-2.5 min-w-78">
            <h1 className="flex flex-row gap-2.5 items-center px-3 mb-5 w-full bg-(--surface-c) py-2"><i className="pi pi-pen-to-square" />Crear nuevo tema</h1>
            <div className="flex flex-col w-full gap-2.5  p-2.5 ">
                <div className="relative flex flex-col gap-0 mb-7">
                    <FloatLabel className="text-sm">
                        <label htmlFor="topic">Nombre del tema</label>
                        <InputText className="w-full" id="topic" disabled={create} invalid={errorsTopic?.topic.isError} value={topicName} onChange={(e) => setTopicName(e.currentTarget.value)} />
                    </FloatLabel>
                    <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.topic.error}</label>
                </div>
                {userTokens &&
                    <div className="relative flex flex-col gap-0 mb-3">
                        <FloatLabel className="text-sm">
                            <label htmlFor="users">Usuarios</label>
                            <MultiSelect className="w-full" disabled={create} invalid={errorsTopic?.tokens.isError} options={userTokens} id="users" optionLabel="name" value={selectedUsers} maxSelectedLabels={1} onChange={(e) => setSelectedUsers(e.value)} />
                        </FloatLabel>
                        <label className="absolute -bottom-4 pl-1 text-(--danger-color) text-xs">{errorsTopic?.tokens.error}</label>
                    </div>
                }
                <div className="flex flex-row justify-around gap-3 mt-3">
                    <Button className="self-end min-w-28" icon="pi pi-save" severity="success" label="Guardar" size="small" loading={create} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleCreateTopic} />
                    <Button className="self-end min-w-28" icon="pi pi-times" severity="danger" label="Cancelar" size="small" disabled={create} loadingIcon="pi pi-spin pi-spinner-dotted" onClick={handleResetAndClose} />
                </div>
            </div>
        </div>
    )
}