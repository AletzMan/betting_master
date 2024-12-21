"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { IFinalsParticipants } from "@/app/types/types"
import { Button } from "@/app/components/Button/Button"
import { ArrowUpIcon, LotteryIcon, LuckIcon, StartedIcon, WinnerIcon } from "@/app/svg"
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

export default function AdminFinals() {
    const [participants, setParticipants] = useState<IFinalsParticipants[]>([])
    const [finalistTeams, setFinalistTeams] = useState<string[]>(["", "", "", "", "", "", "", ""])
    const [errorTeams, setErrorTeams] = useState<boolean[]>([false, false, false, false, false, false, false, false])

    useEffect(() => {
        //GetParticipants()
        //const finalist = QualifiedTeams.flatMap(team => team.name)
        //setFinalistTeams(finalist)

    }, [])

    const HandleDrawTeams = async () => {
        let randomNumbers: number[] = []
        // Llenar el arreglo con los números del 1 al 8
        for (let i = 1; i <= 8; i++) {
            randomNumbers.push(i);
        }

        let numerosAleatorios = [];
        // Muestreo aleatorio sin reemplazo
        for (let index = 0; index < 8; index++) {

            while (randomNumbers.length > 0) {
                const indice = Math.floor(Math.random() * randomNumbers.length)
                numerosAleatorios.push(randomNumbers[indice])
                randomNumbers.splice(indice, 1)
            }
        }


        if (participants) {
            const newParticipants = [...participants]
            for (let index = 0; index < 8; index++) {
                newParticipants[index].team = finalistTeams[numerosAleatorios[index] - 1]
            }
            setParticipants(newParticipants)

            newParticipants.forEach(participant => {
                const reponse = UpdateFinalParticipants(participant.user_info.uid, participant.team)
            })

        }
    }


    const GetFinalTable = async () => {
        const data = await GetFinalistTeams()
        setFinalistTeams(data.positions)
    }

    const HandleStart = async () => {
        try {
            await uniqueStringSchema.parseAsync(finalistTeams)
            setErrorTeams([false, false, false, false, false, false, false, false])
            const responseDB = await AddMatchFinals(finalistTeams)
            if (responseDB === "OK") {
                enqueueSnackbar("Equipos finalistas guardados", { variant: "success" })
            } else {
                enqueueSnackbar("Error al crear la ronda", { variant: "error" })
            }
        } catch (error) {
            if (error instanceof ZodError) {
                let newErrors = [false, false, false, false, false, false, false, false]
                if (error.issues.filter(issue => issue.code === "custom").length > 0) {
                    newErrors = getDuplicateFlags(finalistTeams)
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
        const newTeams = [...finalistTeams]
        newTeams[index] = value
        setFinalistTeams(newTeams)
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
                <div className={styles.teams}>
                    {
                        TeamsLocalNames.map((team, index) => index < 8 && (
                            <div key={team} className={styles.teams_team}>
                                <span className={styles.teams_position}>{index + 1}</span>
                                <SelectFiled items={TeamsLocalNames} props={{ value: finalistTeams[index], onChange: (e) => HandleOnChangeTeam(e, index), "aria-errormessage": errorTeams[index] ? "error" : "" }} />
                            </div>
                        ))
                    }
                </div>
                <footer className={styles.footer}>
                    <Button props={{ onClick: HandleStart }} text="Iniciar ronda" icon={<StartedIcon className={""} />} />
                    <Button props={{ onClick: HandleDrawTeams, disabled: participants && participants!.length < 8 }} text="Sortear" icon={<LuckIcon className={""} />} />
                </footer>
            </article>
        </Details>
    )
}
