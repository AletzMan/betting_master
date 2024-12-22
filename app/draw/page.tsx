/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react"
import { Button } from "../components/Button/Button"
import { TextField } from "../components/TextFiled/TextFiled"
import { GetDataRealDataTime, GetFinalParticipants, GetFinalistTeams, UpdateFinalParticipants, UpdatedRealDataTime, WriteChatDraw, WriteMustSpin, database } from "../config/firebase"
import { useUser } from "../config/zustand-store"
import { AwaitIcon, CheckIcon, LuckIcon, ResetIcon, SendIcon, TargetIcon } from "../svg"
import styles from "./styles.module.scss"
import firebase from "firebase/compat/app"
import { onChildAdded, onChildChanged, onValue, ref, set } from "firebase/database"
import { Wheel } from 'react-custom-roulette'
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types"
import { ADMIN_ID, TeamsLocalLogos } from "../constants/constants"
import { IFinalsParticipants } from "../types/types"
import { enqueueSnackbar } from "notistack"

interface IMessage {
    uid: string
    message: string
    username: string
}

interface IStatusDraw {
    has_started: boolean
    has_finished: boolean
    must_spin: boolean
    current_participant: string
    current_team: string
    missing_teams: string[]
    missing_participants: string[]
    prizeNumber: number
}

const dataOP: WheelData[] = [
    { option: '0' },
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
    { option: '5' },
    { option: '6' },
    { option: '7' },
]
export default function Page() {
    const { user } = useUser()
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([{ uid: "AGstpoT4F9WHdWIwZjbHP6TRHea2", message: "Hola Majo", username: "Alejandro" }, { uid: "kyFpemF", message: "Hola Ale", username: "Maria Jose" }, { uid: "AGstpoT4F9WHdWIwZjbHP6TRHea2", message: "Oye sabes que ha pasado con el proyecto VPF24156, se va a enviar mañana?", username: "Alejandro" }, { uid: "kyFpemF", message: "Lo estuve revisando con Guy, y llegamos a la conclusion de que se van a tener que cambiar todos los strippers", username: "Maria Jose" }]);
    const refChat = useRef<HTMLDivElement | null>(null)
    const [teams, setTeams] = useState<string[]>(['Cruz Azul', 'Toluca', 'Tigres', 'Pumas', 'Monterrey', 'San Luis', 'América', 'Tijuana'])
    const [data, setData] = useState<WheelData[]>(dataOP)
    const [participants, setParticipants] = useState<IFinalsParticipants[]>([])
    const [participantsOnline, setParticipantsOnline] = useState<{ [key: string]: string }>({})
    const [statusDraw, setStatusDraw] = useState<IStatusDraw>({ has_started: false, has_finished: false, current_participant: "", current_team: "", missing_teams: [], missing_participants: [], prizeNumber: 0, must_spin: false })


    useEffect(() => {
        if (refChat) {
            refChat.current?.scrollTo({ top: refChat.current.scrollHeight + 100 })
        }
    }, [messages])

    useEffect(() => {
        GetInitialInfo()
        /*
            try {
                const messagesRef = ref(database, 'chat')
                let hasLoadedInitialValue = false
                let newMessages: IMessage[] = []
                const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
                    const newMessage: IMessage = snapshot.val()
                    newMessages.push(newMessage) 
                })
                onValue(messagesRef, function (messagesSnapshot) {
                    hasLoadedInitialValue = true;
                    setMessages((prevMessages) => [...prevMessages, ...newMessages]) 
                })
    
                return () => {
                    unsubscribe()
                }
    
            } catch (error) {
                console.log(error)
            }*/
        try {
            const messagesRef = ref(database, 'roulette')
            const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(messagesRef, function (messagesSnapshot) {
                const newsStatusDraw: IStatusDraw = messagesSnapshot.val()
                console.log(newsStatusDraw)
                if (newsStatusDraw.must_spin === true) {
                    setStatusDraw({ ...newsStatusDraw, must_spin: true })
                    PLaySoundSpin()
                } else {
                    setStatusDraw({ ...newsStatusDraw, must_spin: false })

                }
            })

            const messagesRefData = ref(database, 'dataTeams')
            const unsubscribeData = onChildChanged(messagesRefData, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(messagesRefData, function (messagesSnapshot) {
                const newsStatusDraw: WheelData[] = messagesSnapshot.val()
                if (newsStatusDraw) {
                    setData(newsStatusDraw)
                }
            })


            const refParticipants = ref(database, 'participants')
            const unsubscribeparticipants = onChildChanged(refParticipants, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(refParticipants, function (messagesSnapshot) {
                const newsParticipants: IFinalsParticipants[] = messagesSnapshot.val()
                if (newsParticipants) {
                    setParticipants(newsParticipants)
                }
            })
            const refParticipantsOnline = ref(database, 'participants_connected')
            const unsubscribeparticipantsOnline = onChildChanged(refParticipantsOnline, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(refParticipantsOnline, function (messagesSnapshot) {
                const newsParticipants = messagesSnapshot.val()
                if (newsParticipants) {
                    setParticipantsOnline(newsParticipants)
                }
            })
            return () => {
                unsubscribeData()
                unsubscribe()
                unsubscribeparticipants()
                unsubscribeparticipantsOnline()
            }

        } catch (error) {
            console.log(error)
        }


    }, [])

    useEffect(() => {
        const onBlur = (ev: FocusEvent) => {
            StatusUserConnection('OUT')
        }
        window.addEventListener("blur", onBlur)

        const onBeforeUnload = (ev: BeforeUnloadEvent) => {
            StatusUserConnection('OUT')
        }
        window.addEventListener("beforeunload", onBeforeUnload)

        const onLoad = (ev: FocusEvent) => {
            StatusUserConnection('IN')
        }
        window.addEventListener("focus", onLoad)

        StatusUserConnection("IN")

        return () => {
            window.removeEventListener("blur", onBlur)
            window.removeEventListener("beforeunload", onBeforeUnload)
            window.removeEventListener("focus", onLoad)
        }
    }, [])

    const StatusUserConnection = async (status: 'IN' | 'OUT') => {
        //Comentado para pruebas
        const response = await GetDataRealDataTime("participants_connected")
        if (!response) {
            await UpdatedRealDataTime({ [`${user.uid}`]: user.uid }, `participants_connected/`)
        } else if (status === 'IN') {
            const usersConnected: string[] = Object.values(response)
            if (!usersConnected.includes(user.uid)) {
                await UpdatedRealDataTime({ [`${user.uid}`]: user.uid }, `participants_connected/`)
            }
        } else if (status === 'OUT') {
            await UpdatedRealDataTime({ [`${user.uid}`]: null }, `participants_connected/`)
        }
    }

    const GetInitialInfo = async () => {
        if (user.uid === ADMIN_ID) {
            try {
                const updateTeams = await GetTeams()
                const updateParticipatns = await GetParticipants()
                const idParticipants = updateParticipatns.map(participant => participant.user_info.uid)
                const response = await GetDataRealDataTime("has_started")
                const responseRoulette = await GetDataRealDataTime("roulette")
                if (!response) {
                    if (responseRoulette) {
                        await WriteMustSpin({ ...responseRoulette, current_team: "", missing_participants: updateParticipatns.map(participant => participant.user_info.uid), missing_teams: updateTeams.teams, current_participant: idParticipants[0] }, "roulette")
                    }
                    await WriteMustSpin(updateTeams.data, "dataTeams")
                    await WriteMustSpin(true, "has_started")
                }
                if (response && responseRoulette.must_spin) {
                    await WriteMustSpin({ ...responseRoulette, must_spin: false }, "roulette")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    console.log(statusDraw)

    const HandleResetInitialInfo = async () => {
        const updateTeams = await GetTeams()
        const updateParticipatns = await GetParticipants()
        const idParticipants = updateParticipatns.map(participant => participant.user_info.uid)
        const responseRoulette = await GetDataRealDataTime("roulette")
        await WriteMustSpin(false, "has_started")
        await WriteMustSpin(updateTeams.data, "dataTeams")
        await WriteMustSpin({ ...responseRoulette, current_team: "", missing_participants: updateParticipatns.map(participant => participant.user_info.uid), missing_teams: updateTeams.teams, current_participant: idParticipants[0] }, "roulette")
    }


    const GetTeams = async (): Promise<{ teams: string[], data: WheelData[] }> => {
        try {

            const response = { positions: ['Cruz Azul', 'Toluca', 'Tigres', 'Pumas', 'Monterrey', 'San Luis', 'América', 'Tijuana'] }
            const newTeams = response.positions
            const dataTeams: WheelData[] = []
            if (response) {
                newTeams.forEach(team => {
                    dataTeams.push({ option: team })
                })
                setData(dataTeams)
                setTeams(newTeams)
            }
            return { teams: response.positions, data: dataTeams }
        } catch (error) {
            console.error(error)
            return { teams: [], data: [] }
        }
    }

    const GetParticipants = async (): Promise<IFinalsParticipants[]> => {
        const finalParticipants = await GetFinalParticipants()
        //console.log(response)
        const response: IFinalsParticipants[] = finalParticipants
        if (response) {
            await WriteMustSpin(response, "participants")
        }
        return response
    }

    const handleSend = async () => {
        if (user) {
            //await WriteChatDraw(user.uid, user.name, message, "chat")
            const newMessage: IMessage = { uid: user.uid, message, username: user.name }
            setMessages((prevMessages) => [...prevMessages, newMessage])
            setMessage("")
        }
    }

    const HandleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setMessage(value)
    }
    const HandleEnterMessage = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSend()
        }
    }

    const handleSpinClick = async () => {
        try {
            console.log(data)
            if (!statusDraw.must_spin) {
                const newPrizeNumber = Math.floor(Math.random() * data.length);
                console.log(newPrizeNumber)
                await WriteMustSpin(true, "roulette/must_spin")
                await WriteMustSpin(newPrizeNumber, "roulette/prizeNumber")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const PLaySoundSpin = () => {
        const sound = new Audio("https://github.com/AletzMan/ImagesStorage/raw/refs/heads/main/bettinggame/Wheel_Sound_Effect.mp3")
        sound.volume = 0
        setTimeout(() => {
            //sound.play()
        }, 1150)
    }


    const HandleOnStop = async () => {
        let newData = [...data]
        const deleteData = newData.splice(statusDraw.prizeNumber, 1)
        const newTeam = deleteData[0].option
        if (newTeam) {
            const newMissingTeams = statusDraw.missing_teams.filter(team => team !== newTeam)
            if (statusDraw.current_participant === user.uid) {
                const response = await GetDataRealDataTime("roulette")
                if (response) {
                    await WriteMustSpin({ ...response, current_team: newTeam, missing_teams: newMissingTeams }, "roulette")
                    const responseUpdate = await GetDataRealDataTime("roulette")
                    const updateparticipants = [...responseUpdate.missing_participants]
                    updateparticipants.splice(responseUpdate.missing_participants.indexOf(responseUpdate.current_participant), 1)
                    setTimeout(() => {
                        WriteMustSpin({ ...responseUpdate, missing_participants: updateparticipants, current_team: "", current_participant: updateparticipants[0], must_spin: false }, "roulette")
                    }, 5000);
                }

                await WriteMustSpin(newData, "dataTeams")

                /*const response = await UpdateFinalParticipants(user.uid, { team: newTeam, position_team: teams.indexOf(newTeam) + 1, progress_stage: ["quarter"] })
                if (response === "OK")
                    enqueueSnackbar(`A ${user.name} le ha tocado ${newTeam}. ¡Que lleguen a la final!`, { variant: "success", autoHideDuration: 6000 })
                else
                    enqueueSnackbar(`Error al asignar el equipo actualiza la pagina`, { variant: "error" })*/
            }
            //await WriteMustSpin("false", "roulette")
        }
    }


    return (
        <section className={styles.section}>
            <header className={styles.header}>
                {/*<h1 className={styles.section_title}>Sorteo</h1>*/}
                <div className={styles.header_users}>
                    {participants.map(participant => (
                        <picture className={`${styles.header_picture} ${!Object.values(participantsOnline).includes(participant.user_info.uid) ? styles.header_pictureOffline : styles.header_pictureOnline}`}
                            key={participant.id} attr-name={participant.user_info.name.split(" ")[0]}>
                            <img className={styles.header_image} src={participant.user_info.photo} alt={`Foto de perfil de ${participant.user_info.name}`} />
                        </picture>
                    ))

                    }
                </div>
            </header>
            <div className={styles.board}>
                <div className={styles.draw}>
                    <aside className={styles.teams}>
                        {user.uid === ADMIN_ID && <Button className={styles.teams_reset} props={{ onClick: HandleResetInitialInfo }} text="Reset" icon={<ResetIcon className="" />} />}
                        <div className={styles.teams_roulette}>
                            {data && <Wheel
                                mustStartSpinning={statusDraw.must_spin}
                                prizeNumber={statusDraw.prizeNumber}
                                data={data}
                                onStopSpinning={HandleOnStop}
                                outerBorderWidth={1}
                                innerBorderWidth={1}
                                innerRadius={5}
                                radiusLineWidth={1}
                                outerBorderColor="#ffffff"
                                innerBorderColor="#ffffff"
                                backgroundColors={['#1a2133', '#34334e']}
                                fontSize={24}
                                radiusLineColor="#bcbcbc"
                                textColors={['#ffffff']}
                                fontWeight={500} spinDuration={1}
                            />}
                        </div>
                        <section className={styles.participants}>
                            <span className={styles.participants_title}>Es el turno de:</span>
                            <span className={styles.participants_name}>{`${participants.find(participant => participant.user_info.uid === statusDraw.current_participant)?.user_info.name}`}</span>
                            {statusDraw.current_team && <span className={styles.participants_team}>{statusDraw.current_team}</span>}
                        </section>
                    </aside>
                    <footer className={styles.draw_footer}>
                        <Button className={statusDraw.current_participant === user.uid ? styles.draw_button : ""}
                            type={statusDraw.current_participant === user.uid ? "success" : "secondary"}
                            text={statusDraw.current_participant === user.uid ? statusDraw.must_spin ? "¡Suerte!" : "¡Es tu turno!" : statusDraw.missing_participants.includes(user.uid) ? "Esperando tu turno" : "¡Ya participaste!"}
                            props={{ onClick: handleSpinClick, disabled: statusDraw.current_participant !== user.uid || statusDraw.must_spin }}
                            icon={statusDraw.current_participant === user.uid ? statusDraw.must_spin ? <LuckIcon className="" /> : <TargetIcon className="" /> : statusDraw.missing_participants.includes(user.uid) ? <AwaitIcon className="" /> : <CheckIcon className="" />} />
                    </footer>
                </div>
                <div className={`${styles.chat} scrollbar`} ref={refChat}>
                    {messages.map((message, index) => (
                        <div key={index} className={`${styles.user} ${user.uid === message.uid ? styles.user_local : styles.user_away}`}>
                            <div className={styles.user_name}>{user.uid === message.uid ? "" : message.username}</div>
                            <div className={styles.user_message} >{message.message}</div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className={styles.footer}>
                <TextField placeholder="Escribe tu mensaje aquí..." value={message} onChange={HandleChangeMessage} onKeyDown={HandleEnterMessage} />
                <Button text="Enviar" icon={<SendIcon className="" />} props={{ onClick: handleSend, disabled: message === "" }} />
            </footer>
        </section>
    )
}

/*
const finalParticipants: IFinalsParticipants[] = [
    {
        position_team: 0,
        id: '8e4dd36e-3d5a-4c80-b6b6-c43ae01d21c4',
        team: '',
        user_info: {
            uid: '5H6afyOnUEdMSMHxTlgEtPa3aQ32',
            name: 'Juan Carlos Garcia',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJ5bJuxHz9k_csvumubhfznYjju2sMKazcp15LTvikPl1E-=s96-c',
            email: 'jk.g.alonso@gmail.com'
        },
        progress_stage: ['quarter']
    },
    {
        id: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
        team: '',
        position_team: 0,
        progress_stage: ['quarter'],
        user_info: {
            email: 'alejo2986@gmail.com',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJ7E4PzlEjRsIqGpdN71kUe-sG33WN9UXMQ61Wpp0oVP2U=s96-c',
            uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
            name: 'Alejandro Garcia'
        }
    },
    {
        progress_stage: ['quarter'],
        user_info: {
            name: 'Juan Gracia',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocKiJGSq1O0HsHBMfwLFhbu2W2idqJyKS60vyhQj7UdX=s96-c',
            email: 'garcia.8a.juan@gmail.com',
            uid: 'GsWIeSW2XROfr9nn932j94eYxYm2'
        },
        position_team: 0,
        id: '5606c0b1-3a83-4ae5-8bf8-3213bfccc13f',
        team: ''
    },
    {
        position_team: 0,
        user_info: {
            uid: 'MZSyUilYNjdS3BdsAiQHmQ2ug7H3',
            name: 'judith garcia',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJV7zokRNBsZLofjwaVPe9HJrOz487ZQduUXf6n3bO7=s96-c',
            email: 'mariselaga2810@gmail.com'
        },
        progress_stage: ['quarter'],
        id: '51811b62-06fa-4c94-9780-75a951314887',
        team: ''
    },
    {
        id: '7d24d55a-7046-4609-8545-219f5d41b992',
        position_team: 0,
        team: '',
        user_info: {
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocLKuK-DCkm0dzJUnVG92nGVrdqHngpzbJXZVccRxUOa=s96-c',
            name: 'IkerDios1789',
            uid: 'h4rNDlWm2acTOxBsGrLWrV4Ybaw1',
            email: 'ikerdios41@gmail.com'
        },
        progress_stage: ['quarter']
    },
    {
        id: '7d453c94-8048-43d1-8905-fde7ffc3f1b3',
        user_info: {
            uid: 'hj6pQqrcHnUX4pPfDqI0BJsNZZG2',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocLA92MJoEylcI8tY0R26cCh9ok-aZdPN1UOMty4ESIJ=s96-c',
            name: 'Maria del Rosario Alonso Gonzalez',
            email: 'rosario.alonso.glz68@gmail.com'
        },
        team: '',
        progress_stage: ['quarter'],
        position_team: 0
    },
    {
        team: '',
        id: 'a5498790-6939-41cc-b40c-bc65eb210976',
        progress_stage: ['quarter'],
        user_info: {
            uid: 'kkBNmgUa4XgRNfzvNLKMeFTtxH13',
            name: 'Patricia Garcia Alonso',
            email: 'pattogarciaalonso88@gmail.com',
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocJHdeCqmsWqnlERyNQu_m-MLBuqe6FVeLSsJSMM4Efr=s96-c'
        },
        position_team: 0
    },
    {
        user_info: {
            photo:
                'https://lh3.googleusercontent.com/a/ACg8ocKulEAaKcIXyW5CAeLySco3xBveoDj0prmY8LMeQ0IP=s96-c',
            uid: 'srwtNKmV6kZX7RiF9faB1S9Pfe72',
            email: 'juangalvangalvan20@gmail.com',
            name: 'Juan galvan Galvan'
        },
        position_team: 0,
        progress_stage: ['quarter'],
        id: 'fe290685-11db-4034-b831-1bbcfc0424de',
        team: ''
    }
]*/