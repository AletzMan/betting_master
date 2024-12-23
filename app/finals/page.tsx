"use client"
import { useEffect, useState } from "react"
import { Button } from "../components/Button/Button"
import { AddFinalParticipant, GetFinalParticipants } from "../config/firebase"
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

export default function Page() {
    const { isLandscape } = useOrientation()
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [participants, setParticipants] = useState<IFinalsParticipants[]>()
    const [userLogin, setUserLogin] = useState<IUserInfo>()
    const [isParticipating, setIsParticipating] = useState(false)

    useEffect(() => {
        GetParticipants()
        GetUserLogin()
    }, [loading])

    useEffect(() => {
        if (userLogin) {
            if (participants?.some(participant => participant.user_info?.uid === userLogin?.uid)) {
                setIsParticipating(true)
            }
        }
    }, [userLogin, participants])

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
            setUserLogin(userInfo)
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
                {isParticipating &&
                    <>
                        {participants && participants?.length <= 8 && participants.some(participant => participant.team === "") ?
                            <>
                                <QuarterFinals />
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
                {!isParticipating ?
                    <>
                        <QuarterFinals />
                        {participants !== undefined && userLogin !== undefined &&
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
                    </div>}
            </>
            }
            {loadingPage && <Loading />}
        </main>
    )
}

