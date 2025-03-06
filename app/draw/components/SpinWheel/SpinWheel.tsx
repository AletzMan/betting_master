/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Button } from "@/components/Button/Button"
import styles from "./styles.module.scss"
import { ADMIN_ID } from "@/constants/constants"
import { AwaitIcon, CheckIcon, LuckIcon, ResetIcon, TargetIcon } from "@/svg"
import { useConnectedUsers } from "@/hooks/useConnectedUsers"
import { GetDataRealDataTime, GetFinalParticipants, GetFinalistTeams, UpdateFinalParticipants, UpdatedRealDataTime, WriteMustSpin, database } from "@/config/firebase"
import { Wheel } from "react-custom-roulette"
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types"
import { onChildAdded, onChildChanged, onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useUser } from "@/config/zustand-store"
import { IFinalsParticipants } from "@/types/types"
import PixelArt from "../PixelArt/PixelArt"
import { CountdownCircleTimer, OnComplete } from "react-countdown-circle-timer"
import { ShuffleArray } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

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
    { option: '0', image: { uri: "" } },
    { option: '1' },
    { option: '2' },
    { option: '3' },
    { option: '4' },
    { option: '5' },
    { option: '6' },
    { option: '7' },
]


export default function SpinWheel() {
    const router = useRouter()
    const session = useSession()
    const { participants } = useConnectedUsers()
    const [data, setData] = useState<WheelData[]>(dataOP)
    const [statusDraw, setStatusDraw] = useState<IStatusDraw>({ has_started: false, has_finished: false, current_participant: "", current_team: "", missing_teams: [], missing_participants: [], prizeNumber: 0, must_spin: false })
    const [teams, setTeams] = useState<string[]>([])
    const [countDown, setCountdown] = useState(false)
    const [started, setStarted] = useState(false)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        GetInitialInfo()


        try {
            const messagesRef = ref(database, 'roulette')
            const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(messagesRef, function (messagesSnapshot) {
                const newsStatusDraw: IStatusDraw = messagesSnapshot.val()
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

            const messagesRefStart = ref(database, 'has_started')
            const unsubscribeStart = onChildChanged(messagesRefStart, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(messagesRefStart, function (messagesSnapshot) {
                const newsStart: boolean = messagesSnapshot.val()
                setStarted(newsStart)
            })

            const messagesRefEnd = ref(database, 'has_finished')
            const unsubscribeEnd = onChildChanged(messagesRefEnd, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(messagesRefEnd, function (messagesSnapshot) {
                const newsStart: boolean = messagesSnapshot.val()
                setFinished(newsStart)
                if (newsStart) {
                    router.push("/finals")
                }
            })

            const messagesRefCountdown = ref(database, 'countdown')
            const unsubscribeCountdown = onChildChanged(messagesRefCountdown, (snapshot) => {
                const newMessage = snapshot.val()
            })
            onValue(messagesRefCountdown, function (messagesSnapshot) {
                const newsStart: boolean = messagesSnapshot.val()
                setCountdown(newsStart)
            })


            return () => {
                unsubscribeData()
                unsubscribe()
                unsubscribeStart()
                unsubscribeCountdown()
                unsubscribeEnd()
            }

        } catch (error) {
            debugger
            console.error(error)
        }


    }, [])

    const GetInitialInfo = async () => {
        const updateTeams = await GetTeams()
        setTeams(updateTeams.teams)
        const updateParticipatns = await GetParticipants()
        if (session!.data!.user!.id === ADMIN_ID) {
            try {
                const uidParticipants = updateParticipatns.map(participant => participant.user_info.uid)
                const newOrder = ShuffleArray(uidParticipants)
                const response = await GetDataRealDataTime("has_started")
                const responseRoulette = await GetDataRealDataTime("roulette")
                if (!response) {
                    if (responseRoulette) {
                        await UpdatedRealDataTime({ current_team: "", missing_participants: newOrder, missing_teams: updateTeams.teams, current_participant: newOrder[0] }, "roulette")
                    }
                    await WriteMustSpin(updateTeams.data, "dataTeams")
                }
                if (response && responseRoulette.must_spin) {
                    await UpdatedRealDataTime({ must_spin: false }, "roulette")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    const HandleResetInitialInfo = async () => {
        const updateTeams = await GetTeams()
        const updateParticipatns = await GetParticipants()
        await WriteMustSpin(updateTeams.data, "dataTeams")
        await WriteMustSpin(false, "countdown")
        await WriteMustSpin(false, "has_started")
        await WriteMustSpin(false, "has_finished")
        const uidParticipants = updateParticipatns.map(participant => participant.user_info.uid)
        const newOrder = ShuffleArray(uidParticipants)
        await UpdatedRealDataTime({ current_team: "", missing_participants: newOrder, missing_teams: updateTeams.teams, current_participant: newOrder[0], must_spin: false, prizeNumber: 0 }, "roulette")
    }

    const GetTeams = async (): Promise<{ teams: string[], data: WheelData[] }> => {
        try {
            const response = await GetFinalistTeams()
            const newTeams = response.positions
            const dataTeams: WheelData[] = []
            if (response) {
                newTeams.forEach(team => {
                    dataTeams.push({ option: team })
                })
                setData(dataTeams)
            }
            return { teams: response.positions, data: dataTeams }
        } catch (error) {
            console.error(error)
            return { teams: [], data: [] }
        }
    }

    const GetParticipants = async (): Promise<IFinalsParticipants[]> => {
        const finalParticipants = await GetFinalParticipants()
        const response: IFinalsParticipants[] = finalParticipants
        if (response) {
            await WriteMustSpin(response, "participants")
        }
        return response
    }


    const handleSpinClick = async () => {
        try {
            if (!statusDraw.must_spin && statusDraw.current_participant === session!.data!.user!.id) {
                const newPrizeNumber = Math.floor(Math.random() * data.length)
                if (newPrizeNumber >= 0) {
                    await UpdatedRealDataTime({ must_spin: true, prizeNumber: newPrizeNumber }, "roulette")
                }
            }
        } catch (error) {
            debugger
            console.error(error)
        }
    }

    const HandleOnStop = async () => {
        try {

            if (statusDraw.current_participant === session!.data!.user!.id) {
                let newData = [...data]
                const deleteData = newData.splice(statusDraw.prizeNumber, 1)
                const newTeam = deleteData[0].option
                if (newTeam) {
                    const newMissingTeams = statusDraw.missing_teams.filter(team => team !== newTeam)
                    const response = await GetDataRealDataTime("roulette")
                    if (response) {
                        if (response.missing_participants.length > 1) {
                            await UpdatedRealDataTime({ current_team: newTeam, missing_teams: newMissingTeams }, "roulette")
                            const responseUpdate = await GetDataRealDataTime("roulette")
                            const updateparticipants = [...responseUpdate.missing_participants]
                            updateparticipants.splice(responseUpdate.missing_participants.indexOf(responseUpdate.current_participant), 1)
                            setTimeout(() => {
                                UpdatedRealDataTime({ missing_participants: updateparticipants, current_team: "", current_participant: updateparticipants[0], must_spin: false }, "roulette")
                            }, 7000)
                        } else {
                            await UpdatedRealDataTime({ current_team: newTeam }, "roulette")
                            setTimeout(() => {
                                WriteMustSpin(true, "has_finished")
                            }, 7000)
                        }
                    }
                    await WriteMustSpin(newData, "dataTeams")
                    const responseUpdate = await UpdateFinalParticipants(session!.data!.user!.id, { team: newTeam, position_team: teams.indexOf(newTeam) + 1, progress_stage: ["quarter"] })
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const PLaySoundSpin = () => {
        const sound = new Audio("https://github.com/AletzMan/ImagesStorage/raw/refs/heads/main/bettinggame/Wheel_Sound_Effect.mp3")
        sound.volume = 0
        setTimeout(() => {
            //sound.play()
        }, 1150)
    }


    function HandleStarted(totalElapsedTime: number): void | OnComplete {
        WriteMustSpin(true, "has_started")
    }

    return (
        <div className={styles.draw}>
            {started && !finished && <>
                <aside className={styles.teams}>
                    {session!.data!.user!.id === ADMIN_ID && <Button className={styles.teams_reset} props={{ onClick: HandleResetInitialInfo }} text="" icon={<ResetIcon className="" />} />}
                    <div className={styles.teams_roulette}>
                        {data && <Wheel
                            mustStartSpinning={statusDraw?.must_spin}
                            prizeNumber={statusDraw?.prizeNumber}
                            data={data}
                            onStopSpinning={HandleOnStop}
                            outerBorderWidth={3}
                            innerBorderWidth={1}
                            innerRadius={5}
                            radiusLineWidth={2}
                            outerBorderColor="#ffffff"
                            innerBorderColor="#ffffff"
                            backgroundColors={['#000000', '#dddddd', '#000000', '#dddddd', '#000000', '#dddddd', '#000000', '#dddddd']}
                            textColors={['#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000', '#ffffff', '#000000']}
                            fontSize={25}
                            radiusLineColor="#ffffff"
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
                    <Button className={statusDraw.current_participant === session!.data!.user!.id ? styles.draw_button : ""}
                        type={statusDraw.current_participant === session!.data!.user!.id ? "success" : "secondary"}
                        text={statusDraw.current_participant === session!.data!.user!.id ? statusDraw.must_spin ? "¡Suerte!" : "¡Es tu turno!" : statusDraw.missing_participants?.includes(session!.data!.user!.id as string) ? "Esperando tu turno" : "¡Ya participaste!"}
                        props={{ onClick: handleSpinClick, disabled: statusDraw.current_participant !== session!.data!.user!.id || statusDraw.must_spin }}
                        icon={statusDraw.current_participant === session!.data!.user!.id ? statusDraw.must_spin ? <LuckIcon className="" /> : <TargetIcon className="" /> : statusDraw.missing_participants?.includes(session!.data!.user!.id as string) ? <AwaitIcon className="" /> : <CheckIcon className="" />} />
                </footer>
            </>}
            {!started && !finished &&
                <>
                    <PixelArt />
                    {countDown &&
                        <div className={styles.countdown}>
                            <CountdownCircleTimer
                                isPlaying
                                duration={10} strokeWidth={3}
                                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                colorsTime={[7, 5, 2, 0]} initialRemainingTime={10} size={90} isSmoothColorTransition onComplete={HandleStarted}
                            >
                                {({ remainingTime }) => <span className={styles.countdown_number}>{remainingTime}</span>}
                            </CountdownCircleTimer>
                        </div>
                    }
                </>
            }
            {finished && started &&
                <>
                    <span className={styles.messagefinal}>Felicidades!</span>
                </>
            }
        </div>
    )
}