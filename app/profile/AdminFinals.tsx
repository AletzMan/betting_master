/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { IFinalsParticipants, IFinalsTeams, IStage } from "@/types/types"
import { ViewIcon } from "@/svg"
import { AddMatchFinals, GetFinalParticipants, GetFinalistTeams, UpdateFinalParticipants, WriteMustSpin } from "@/config/firebase"
import styles from "./profile.module.scss"
import { TeamsLocalNames } from "@/constants/constants"
import { uniqueStringSchema } from "@/validations/uniqueStringSchema"
import { ZodError } from "zod"
import { enqueueSnackbar } from "notistack"
import { getDuplicateFlags } from "@/utils/helpers"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

const PositionStage: IPositionStage = {
    quarter: ['quarter'],
    half: ['quarter', 'half'],
    final: ['quarter', 'half', 'final'],
    winner: ['quarter', 'half', 'final', 'winner']
}

interface IPositionStage {
    quarter: IStage[],
    half: IStage[],
    final: IStage[],
    winner: IStage[]
}

interface IDataDraw {
    finalTeams: string[]
    partcipants: IFinalsParticipants[]
    position_stages: IStage[][]
}

export default function AdminFinals() {
    const [data, setData] = useState<IDataDraw>({ finalTeams: [], partcipants: [], position_stages: [] })
    const [errorTeams, setErrorTeams] = useState<boolean[]>([false, false, false, false, false, false, false, false])


    const HandleResetAssignedTeams = async () => {
        for (let index = 0; index < data.partcipants.length; index++) {
            await WriteMustSpin(false, "has_finished")
            await WriteMustSpin(false, "has_started")
            await WriteMustSpin(false, "countdown")
            const response = await UpdateFinalParticipants(data.partcipants[index].user_info.id, { team: "", progress_stage: ['quarter'], position_team: 0 })
            if (response === "FAIL") {
                enqueueSnackbar("No se pudo restablecer los datos, intente mas tarde", { variant: "error" })
                break
            }
        }
    }


    const GetFinalTable = async () => {
        const dataTeams = await GetFinalistTeams()
        const dataParticiapants = await GetFinalParticipants()

        const orderParticipants = dataParticiapants.sort((a, b) => a.position_team - b.position_team)
        const positionStage = dataParticiapants.map(part => part.progress_stage)
        setData({ finalTeams: dataTeams.positions, partcipants: orderParticipants, position_stages: positionStage })
    }

    const HandleStart = async () => {
        try {
            await uniqueStringSchema.parseAsync(data.finalTeams)
            setErrorTeams([false, false, false, false, false, false, false, false])
            const responseDB = await AddMatchFinals(data.finalTeams)
            if (responseDB === "OK") {
                enqueueSnackbar("Equipos finalistas guardados", { variant: "success" })
            } else {
                enqueueSnackbar("Error al crear la ronda", { variant: "error" })
            }
        } catch (error) {
            if (error instanceof ZodError) {
                let newErrors = [false, false, false, false, false, false, false, false]
                if (error.issues.filter(issue => issue.code === "custom").length > 0) {
                    newErrors = getDuplicateFlags(data.finalTeams)
                    enqueueSnackbar("No se permiten elementos duplicados", { variant: "error" })
                } else {
                    newErrors = [false, false, false, false, false, false, false, false]
                    error.issues.forEach(issue => {
                        newErrors[Number(issue.path)] = true
                    })
                    enqueueSnackbar(error.issues[0].message, { variant: "error" })
                }
                setErrorTeams(newErrors)
            }
        }
    }


    const HandleOnChangeTeam = (event: DropdownChangeEvent, index: number) => {
        const value = event.value
        const newTeams = [...data.finalTeams]
        newTeams[index] = value
        setData({ ...data, finalTeams: newTeams })
        const newErrors = [...errorTeams]
        newErrors[index] = false
        setErrorTeams(newErrors)
    }

    const HandleOnChangeStage = (event: DropdownChangeEvent, position_team: number) => {
        const stage = event.value as IStage
        const newValue = [...data.position_stages]
        newValue[position_team - 1] = PositionStage[stage]
        setData({ ...data, position_stages: newValue })
    }

    const HandleSaveStage = async () => {
        let status = false
        for (let index = 0; index < data.position_stages.length; index++) {
            const response = await UpdateFinalParticipants(data.partcipants[index].user_info.id, { progress_stage: data.position_stages[index] })
            status = response === "OK"
        }
        if (status) {
            enqueueSnackbar("Equipos finalistas guardados", { variant: "success" })
        } else {
            enqueueSnackbar("Error al atualizar", { variant: "error" })
        }
    }

    return (
        <div className="flex flex-col gap-2 relative h-[calc(100svh-8rem)]">
            <header className="flex items-center justify-between bg-(--surface-c) px-2 py-1">
                <h2 className="text-center pl-4  text-sm text-amber-500">Equipos finalistas</h2>
                <Button icon="pi pi-refresh" size="small" outlined label="Actualizar" severity="secondary" raised onClick={GetFinalTable} />
            </header>
            <div className="flex gap-1 w-full">
                <div className="flex flex-col gap-1.5 w-full max-w-46">
                    {
                        TeamsLocalNames.map((team, index) => index < 8 && (
                            <div key={team} className="grid grid-cols-[1.5em_1fr]   place-items-center  gap-1 w-full ">
                                <span className="flex justify-center bg-(--surface-d) h-6 w-6 rounded-sm" >{index + 1}</span>
                                <Dropdown className="w-full max-w-37" placeholder="Seleccione" value={data.finalTeams[index]} options={TeamsLocalNames} onChange={(e) => HandleOnChangeTeam(e, index)} />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-1.5">
                    {data.partcipants.map((participant, index) => (
                        <Dropdown className="max-w-32" key={participant.id} value={data.position_stages[index][data.position_stages[index].length - 1]} options={['quarter', 'half', 'final', 'winner']} onChange={(e) => HandleOnChangeStage(e, participant.position_team)} />
                    ))
                    }
                </div>
                <div className="flex flex-col justify-around gap-1.5 h-full">
                    {data.partcipants.map(participant => (
                        <div key={participant.user_info?.id} className="h-10.5 flex items-center justify-center relative" >
                            <button className={styles.participants_button}>
                                <ViewIcon className={styles.participants_icon} />
                            </button>
                            <div className={styles.participants_user} >
                                <span className="text-white shadow-2xl shadow-amber-500">{participant.user_info.name?.split(" ")[0]}</span>
                                <img className={styles.participants_photo} src={participant.user_info.image || "/user_photo.png"} alt={`Foto de perfil de ${participant.user_info.name}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Divider />
            <footer className="flex items-center justify-between">
                <Button onClick={HandleStart} label="Equipos" icon="pi pi-play" size="small" severity="success" outlined raised />
                <Button onClick={HandleSaveStage} label="Fase" icon="pi pi-save" size="small" severity="success" raised />
                <Button onClick={HandleResetAssignedTeams} label="Asignados" disabled={data.partcipants && data.partcipants!.length < 8} icon="pi pi-replay" size="small" severity="danger" />
            </footer>
        </div>
    )
}
