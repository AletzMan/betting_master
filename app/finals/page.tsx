"use client"
import { useEffect, useState } from "react"
import { Button } from "../components/Button/Button"
import { AddFinalParticipant, GetFinalParticipants, GetFinalistTeams } from "../config/firebase"
import { useOrientation } from "../hooks/useOrientation"
import { IFinalsParticipants, IUserInfo } from "../types/types"
import QuarterFinals from "./components/Quarterfinals"
import { enqueueSnackbar } from "notistack"
import styles from "./finales.module.scss"
import axios from "axios"
import { LoadingTwoIcon, LuckIcon } from "../svg"
import Participant from "./components/Participant/Participant"
import Finals from "./components/Finals/Finals"
import { Loading } from "../components/Loading/Loading"
import { UsernameColors } from "../constants/constants"
import { useSession } from "next-auth/react"

export default function Page() {
    const session = useSession()
    const { isLandscape } = useOrientation()
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [participants, setParticipants] = useState<IFinalsParticipants[]>()
    //const [userLogin, setUserLogin] = useState<IUserInfo>()
    const [isParticipating, setIsParticipating] = useState(false)
    const [qualifiedTeams, setQualifiedTeams] = useState<string[]>([])


    useEffect(() => {
        GetQualifiedTeams()
        GetParticipants()
        //GetUserLogin()
    }, [loading])

    useEffect(() => {
        if (session.status === "authenticated") {
            if (participants?.some(participant => participant.user_info?.uid === session.data.user?.id)) {
                setIsParticipating(true)
            }
        }
    }, [session, participants])

    const GetQualifiedTeams = async () => {
        const teams = await GetFinalistTeams()
        if (teams.positions.length > 0) {
            setQualifiedTeams(teams.positions)
        }
    }


    const GetParticipants = async () => {
        setLoadingPage(true)
        const data = await GetFinalParticipants()
        if (data.length > 0) {
            setParticipants(data)
            setLoadingPage(false)
        } else {
            setParticipants([])
            setLoadingPage(false)
        }
    }



    const GetUserLogin = async (): Promise<IUserInfo | null> => {
        const response = await axios.get("/api/login")
        if (response.status === 200) {
            const userInfo = response.data.userInfo as IUserInfo
            //setUserLogin(userInfo)
            return userInfo
        }
        return null
    }


    async function HandleAddParticipant() {
        const userInfo = await GetUserLogin()
        if (userInfo) {
            setLoading(true)
            const newParticipant: IFinalsParticipants = {
                id: userInfo.uid,
                team: "",
                position_team: 0,
                progress_stage: ["quarter"],
                user_info: { ...userInfo, color: UsernameColors[participants?.length || 0] },
            }
            const result = await AddFinalParticipant(newParticipant)
            if (result === "OK") {
                enqueueSnackbar("Participación añadida exitosamente.", { variant: "success" })
                setLoading(false)
            } else {
                setLoading(false)
            }
        }
    }

    return (
        <main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
            {!loadingPage && <>
                {isParticipating && qualifiedTeams.length === 8 &&
                    <>
                        {participants && participants?.length <= 8 && participants.some(participant => participant.team === "") ?
                            <>
                                <QuarterFinals qualifiedTeams={qualifiedTeams} />
                                <div className={styles.participants}>
                                    <h3 className={styles.participants_title}>Participantes</h3>
                                    <div className={styles.participants_container}>
                                        {participants?.map(participant => (
                                            <Participant key={participant.id} participant={participant} />
                                        ))}
                                    </div>
                                </div>
                                <p className={styles.main_message}>¡Participantes completos! El sorteo comienza pronto.</p>
                            </> :
                            <>
                                {participants && <Finals participants={participants} />}
                            </>


                        }
                    </>
                }
                {qualifiedTeams.length === 8 && <>

                    {!isParticipating ?
                        <>
                            <QuarterFinals qualifiedTeams={qualifiedTeams} />
                            {participants !== undefined && session.status === "authenticated" &&
                                <div className={styles.finals}>
                                    <article>
                                        {participants?.length === 8 && <p className={styles.main_message}>Participación cerrada. Se ha alcanzado el limite de jugadores.</p>}
                                        {participants?.length < 8 && <p className={styles.main_message}>Limitado a 8 participantes, una participación por cuenta.</p>}
                                        {participants?.length < 8 && <p className={styles.main_message}>$50 por participación</p>}
                                    </article>

                                    {participants?.length < 8 && <Button props={{ onClick: HandleAddParticipant, disabled: loading }} text={loading ? "Cargando" : "Quiero participar"} icon={loading ? <LoadingTwoIcon className={""} /> : <LuckIcon className="" />} />}
                                </div>}
                        </>
                        : <div>
                            {participants && participants?.length < 8 && <p className={styles.main_message}>¡Tu participación ha sido registrada! El sorteo se llevará a cabo una vez que se completen los 8 participantes.</p>}
                        </div>
                    }
                </>
                }
                {qualifiedTeams.length < 8 &&
                    <div>Partidos no disponibles</div>
                }
            </>
            }
            {loadingPage && <Loading height="12em" />}
        </main>
    )
}

