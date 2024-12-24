/* eslint-disable @next/next/no-img-element */
"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { IFinalsParticipants } from "@/app/types/types"
import { Button } from "@/app/components/Button/Button"
import { ArrowUpIcon, LotteryIcon, LuckIcon, ResetIcon, SaveIcon, StartedIcon, WinnerIcon } from "@/app/svg"
import { AddMatchFinals, GetFinalParticipants, GetFinalistTeams, UpdateFinalParticipants } from "@/app/config/firebase"
import styles from "./adminfinals.module.scss"
import { TeamsLocalNames } from "@/app/constants/constants"
import SelectFiled from "@/app/components/SelectFiled/SelectFiled"
import { uniqueStringSchema } from "@/app/validations/uniqueStringSchema"
import { ZodError } from "zod"
import { enqueueSnackbar } from "notistack"
import { getDuplicateFlags } from "@/app/utils/helpers"
import { ButtonRefresh } from "@/app/components/ButtonRefresh/ButtonRefresh"
import Details from "@/app/components/Details/Details"

interface IDataDraw {
    finalTeams: string[]
    partcipants: IFinalsParticipants[]
}

export default function AdminFinals() {
    const [data, setData] = useState<IDataDraw>({ finalTeams: [], partcipants: [] })
    const [errorTeams, setErrorTeams] = useState<boolean[]>([false, false, false, false, false, false, false, false])



    const HandleResetAssignedTeams = async () => {
        for (let index = 0; index < data.partcipants.length; index++) {
            const response = await UpdateFinalParticipants(data.partcipants[index].user_info.uid, { team: "", progress_stage: ['quarter'] })
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
        setData({ finalTeams: dataTeams.positions, partcipants: orderParticipants })
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


    const HandleOnChangeTeam = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
        const value = event.currentTarget.value
        const newTeams = [...data.finalTeams]
        newTeams[index] = value
        setData({ ...data, finalTeams: newTeams })
        const newErrors = [...errorTeams]
        newErrors[index] = false
        setErrorTeams(newErrors)
    }

    return (
        <Details name="adminpanel" title="Administración de Sorteo" icon={<LuckIcon className="" />} >
            <article className={styles.details}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Equipos finalistas</h2>
                    <ButtonRefresh className={styles.refresh} onClick={GetFinalTable} />
                </header>
                <div className={styles.table}>
                    <div className={styles.teams}>
                        {
                            TeamsLocalNames.map((team, index) => index < 8 && (
                                <div key={team} className={styles.teams_team}>
                                    <span className={styles.teams_position}>{index + 1}</span>
                                    <SelectFiled items={TeamsLocalNames} props={{ value: data.finalTeams[index], onChange: (e) => HandleOnChangeTeam(e, index), "aria-errormessage": errorTeams[index] ? "error" : "" }} />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.participants}>
                        {data.partcipants.map(participant => (
                            <div className={styles.participants_user} key={participant.id}>
                                <img className={styles.participants_photo} src={participant.user_info.photo || "/user_photo.png"} alt={`Foto de perfil de ${participant.user_info.name}`} />
                                <span className={styles.participants_name}>{participant.user_info.name?.split(" ")[0]}</span>
                            </div>
                        ))

                        }
                    </div>
                </div>
                <footer className={styles.footer}>
                    <Button props={{ onClick: HandleStart }} text="Guardar equipos" icon={<SaveIcon className={""} />} />
                    <Button props={{ onClick: HandleResetAssignedTeams, disabled: data.partcipants && data.partcipants!.length < 8 }} text="Restablecer" icon={<ResetIcon className={""} />} />
                </footer>
            </article>
        </Details>
    )
}
