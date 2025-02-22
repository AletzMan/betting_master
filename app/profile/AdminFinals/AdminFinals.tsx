/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react"
import { IFinalsParticipants, IFinalsTeams, IStage } from "@/app/types/types"
import { ViewIcon } from "@/app/svg"
import { AddMatchFinals, GetFinalParticipants, GetFinalistTeams, UpdateFinalParticipants, WriteMustSpin } from "@/app/config/firebase"
import styles from "../profile.module.scss"
import { TeamsLocalNames } from "@/app/constants/constants"
import { uniqueStringSchema } from "@/app/validations/uniqueStringSchema"
import { ZodError } from "zod"
import { enqueueSnackbar } from "notistack"
import { getDuplicateFlags } from "@/app/utils/helpers"
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
            const response = await UpdateFinalParticipants(data.partcipants[index].user_info.uid, { team: "", progress_stage: ['quarter'], position_team: 0 })
            if (response === "FAIL") {
                enqueueSnackbar("No se pudo restablecer los datos, intente mas tarde", { variant: "error" })
                break
            }
        }
    }


    const GetFinalTable = async () => {
        //const dataTeams = await GetFinalistTeams()
        const dataTeams: IFinalsTeams = {
            positions: ["Guadalajara", "Cruz Azul", "team3", "team4", "team5", "team6", "team7", "team8"]
        }
        //const dataParticiapants = await GetFinalParticipants()
        const dataParticiapants: IFinalsParticipants[] = [
            {
                id: "1",
                position_team: 1,
                progress_stage: ['quarter'],
                team: "team1",
                user_info: {
                    name: "user1",
                    photo: "https://dokkan.wiki/assets/global/en/character/thumb/card_1010070_thumb.png",
                    uid: "uid1",
                    email: "email1"
                }
            },
            {
                id: "2",
                position_team: 2,
                progress_stage: ['quarter'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid2",
                    email: "email2"
                }
            },
            {
                id: "3",
                position_team: 2,
                progress_stage: ['quarter'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid3",
                    email: "email2"
                }
            },
            {
                id: "4",
                position_team: 2,
                progress_stage: ['quarter'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid4",
                    email: "email2"
                }
            },
            {
                id: "5",
                position_team: 2,
                progress_stage: ['quarter'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid5",
                    email: "email2"
                }
            },
            {
                id: "6",
                position_team: 2,
                progress_stage: ['quarter'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid6",
                    email: "email2"
                }
            },
            {
                id: "7",
                position_team: 2,
                progress_stage: ['quarter'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid7",
                    email: "email2"
                }
            },
            {
                id: "8",
                position_team: 2,
                progress_stage: ['quarter', 'half'],
                team: "team2",
                user_info: {
                    name: "user2",
                    photo: "photo2",
                    uid: "uid8",
                    email: "email2"
                }
            },
        ]
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
        //setSelectedStage(newValue)

    }

    const HandleSaveStage = async () => {
        for (let index = 0; index < data.position_stages.length; index++) {
            const response = await UpdateFinalParticipants(data.partcipants[index].user_info.uid, { progress_stage: data.position_stages[index] })
            if (response === "OK") {
                enqueueSnackbar("Equipos finalistas guardados", { variant: "success" })
            } else {
                enqueueSnackbar("Error al atualizar", { variant: "error" })
            }
        }
    }

    return (
        <div className="flex flex-col gap-2 relative h-[calc(100svh-8rem)]">
            <header className="flex items-center justify-between bg-(--surface-c) px-2 py-1">
                <h2 className="text-center pl-4  text-sm text-amber-500">Equipos finalistas</h2>
                <Button icon="pi pi-refresh" size="small" outlined label="Actualizar" severity="secondary" raised onClick={GetFinalTable} />
            </header>
            <div className="flex gap-1.5 justify-between">
                <div className="flex flex-col gap-1.5 w-full max-w-42">
                    {
                        TeamsLocalNames.map((team, index) => index < 8 && (
                            <div key={team} className="flex items-center gap-1 w-full ">
                                <span className="flex items-center justify-center bg-(--surface-d) h-7 w-7 rounded-sm" >{index + 1}</span>
                                <Dropdown className="w-full" placeholder="Seleccione" value={data.finalTeams[index]} options={TeamsLocalNames} onChange={(e) => HandleOnChangeTeam(e, index)} />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-1.5">
                    {data.partcipants.map((participant, index) => (
                        <Dropdown key={participant.id} value={data.position_stages[index][data.position_stages[index].length - 1]} options={['quarter', 'half', 'final', 'winner']} onChange={(e) => HandleOnChangeStage(e, participant.position_team)} />
                    ))
                    }
                </div>
                <div className="flex flex-col gap-1.5 h-full">
                    {data.partcipants.map(participant => (
                        <div key={participant.user_info.uid} className="h-10.5 flex items-center justify-center relative" >
                            <button className={styles.participants_button}>
                                <ViewIcon className={styles.participants_icon} />
                            </button>
                            <div className={styles.participants_user} >
                                <span className={styles.participants_name}>{participant.user_info.name?.split(" ")[0]}</span>
                                <img className={styles.participants_photo} src={participant.user_info.photo || "/user_photo.png"} alt={`Foto de perfil de ${participant.user_info.name}`} />
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
