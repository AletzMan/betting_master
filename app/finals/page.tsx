"use client"
import { useEffect, useState } from "react"
import { Button } from "../components/Button/Button"
import { AddFinalParticipant, GetFinalParticipants } from "../config/firebase"
import { TeamsLogos } from "../constants/constants"
import { useOrientation } from "../hooks/useOrientation"
import { IFinalsParticipants, IParticipants, IUserInfo } from "../types/types"
import QuarterFinals from "./components/Quarterfinals"
import { SnackbarProvider } from "notistack"
import styles from "./finales.module.scss"
import { useSnackbar } from "notistack"
import axios from "axios"
import { LoadingIcon, LoadingTwoIcon, LuckIcon, SaveIcon } from "../svg"
import Participant from "./components/Participant/Participant"
import Finals from "./components/Finals/Finals"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const { isLandscape } = useOrientation()
    const [loading, setLoading] = useState(false)
    const [participants, setParticipants] = useState<IParticipants[]>()
    const [userLogin, setUserLogin] = useState<IUserInfo>()
    const [isParticipating, setIsParticipating] = useState(false)

    useEffect(() => {
        GetParticipants()
        GetUserLogin()
    }, [loading])

    useEffect(() => {
        if (participants?.some(participant => participant.uid === userLogin?.uid)) {
            setIsParticipating(true)
        }
    }, [userLogin, participants])

    const GetParticipants = async () => {
        const data = await GetFinalParticipants()

        if (data.length > 0) {
            setParticipants(data)
        } else {
            setParticipants([])
        }
    }


    const GetUserLogin = async () => {
        const response = await axios.get("/api/login")
        if (response.status === 200) {
            const userInfo = response.data.userInfo as IUserInfo
            setUserLogin(userInfo)
        }
    }

    async function HandleParticipate() {
        const response = await axios.get("/api/login")
        if (response.status === 200) {
            const userInfo = response.data.userInfo as IUserInfo
            setLoading(true)
            const newParticipant: IFinalsParticipants = {
                id: crypto.randomUUID(),
                uid: userInfo.uid,
                team: "",
                userInfo
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
        <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "center", vertical: "top" }}>
            <main className={`${styles.main} ${isLandscape && styles.main_landscape}`}>
                {isParticipating &&
                    <>
                        {participants && participants?.length < 8 ?
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
                            </> :
                            <>
                                {participants && participants.find(participant => participant.team === "")?.team !== "" ? <Finals participants={participants} /> : <QuarterFinals />}
                            </>


                        }
                    </>
                }
                {!isParticipating ?
                    <>
                        <QuarterFinals />
                        {participants !== undefined && userLogin !== undefined &&
                            <div>
                                <article>
                                    {participants?.length === 8 && <p className={styles.main_message}>Participación cerrada. Se ha alcanzado el limite de jugadores.</p>}
                                    {participants?.length < 8 && <p className={styles.main_message}>Limitado a 8 participantes, una participación por cuenta.</p>}
                                    {participants?.length < 8 && <p className={styles.main_message}>$50 por participación</p>}
                                </article>

                                {participants?.length < 8 && <Button onClick={HandleParticipate} text={loading ? "Cargando" : "Quiero participar"} className={styles.button} icon={loading ? <LoadingTwoIcon className={""} /> : <LuckIcon className="" />} disabled={loading} />}
                            </div>}
                    </>
                    : <div>
                        {participants && participants?.length < 8 && <p className={styles.main_message}>¡Tu participación ha sido registrada! El sorteo se llevará a cabo una vez que se completen los 8 participantes.</p>}
                    </div>}
            </main>
        </SnackbarProvider>
    )
}


/* const data = [
            {
                team: 'Toluca',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocJ7E4PzlEjRsIqGpdN71kUe-sG33WN9UXMQ61Wpp0oVP2U=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Alejandro Garcia'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'Cruz Azul',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocJV7zokRNBsZLofjwaVPe9HJrOz487ZQduUXf6n3bO7=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Judith Garcia'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'Guadalajara',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocLZzEGfe6SOAX62JGMV4TKbreD5d0lkuA6Pidwx7Mt2=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'JK Garcia'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'Pachuca',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocJHdeCqmsWqnlERyNQu_m-MLBuqe6FVeLSsJSMM4Efr=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Paty Garcia'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'Tigres',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocLA92MJoEylcI8tY0R26cCh9ok-aZdPN1UOMty4ESIJ=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Ma del Rosario'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'América',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocKulEAaKcIXyW5CAeLySco3xBveoDj0prmY8LMeQ0IP=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Juan Galvan'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'Pumas',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocInVz5eFzExt4oD9KmQjLH_akceoyNSIPbbbzcnSYsW=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Aide Alonso'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            },
            {
                team: 'Monterrey',
                uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                userInfo: {
                    photo:
                        'https://lh3.googleusercontent.com/a/ACg8ocJHvPhVKJiHO1-lxgi0jGlJnSlIbGY43RpR0EFCIhzI=s96-c',
                    email: 'alejo2986@gmail.com',
                    uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                    name: 'Lola Torres'
                },
                id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
            }
        ]*/