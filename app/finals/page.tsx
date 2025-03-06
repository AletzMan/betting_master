"use client"
import { useEffect, useState } from "react"
import { AddFinalParticipant, GetFinalParticipants, GetFinalistTeams } from "../config/firebase"
import { IFinalsParticipants } from "../types/types"
import QuarterFinals from "./components/Quarterfinals"
import { enqueueSnackbar } from "notistack"
import Participant from "./components/Participant/Participant"
import Finals from "./components/Finals/Finals"
import { Loading } from "../components/Loading/Loading"
import { UsernameColors } from "../constants/constants"
import { useSession } from "next-auth/react"
import { Button } from "primereact/button"
import { Message } from "primereact/message"

export default function Page() {
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [participants, setParticipants] = useState<IFinalsParticipants[]>()
    const [isParticipating, setIsParticipating] = useState(false)
    const [qualifiedTeams, setQualifiedTeams] = useState<string[]>([])


    useEffect(() => {
        GetQualifiedTeams()
        GetParticipants()
    }, [loading, session])

    useEffect(() => {
        if (session.status === "authenticated") {
            if (participants?.some(participant => participant.user_info?.id === session.data.user?.id)) {
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





    async function HandleAddParticipant() {
        if (session && session.data?.user) {
            setLoading(true)
            const newParticipant: IFinalsParticipants = {
                id: session.data?.user.id as string,
                team: "",
                position_team: 0,
                progress_stage: ["quarter"],
                user_info: {
                    email: session.data?.user?.email as string,
                    image: session.data?.user?.image as string,
                    account: "",
                    id: session.data?.user?.id as string,
                    name: session.data?.user?.name as string,
                    color: UsernameColors[participants?.length || 0]
                },
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
    console.log(isParticipating, qualifiedTeams, participants, loadingPage, session)
    return (
        <main className="flex flex-col items-center justify-start my-0 mx-auto h-svh pt-[2.85em] px-2 pb-4 w-[calc(100svw-1em)] max-w-4xl overflow-hidden">

            {!loadingPage && <>
                {isParticipating && qualifiedTeams.length === 8 &&
                    <>
                        {participants && participants?.length <= 8 && participants.some(participant => participant.team === "") ?
                            <>
                                <QuarterFinals qualifiedTeams={qualifiedTeams} />
                                <div className="flex flex-col gap-4 w-full">
                                    <h3 className="text-lime-400 w-full text-center">Participantes</h3>
                                    <div className="grid grid-cols-2 gap-1.5 justify-start items-start w-full ">
                                        {participants?.map(participant => (
                                            <Participant key={participant.id} participant={participant} />
                                        ))}
                                    </div>
                                </div>
                                {participants?.length === 8 && <p className="text-lg text-balance text-center">¡Participantes completos! El sorteo comienza pronto.</p>}
                            </> :
                            <>
                                sdsdsds
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
                                <div className="flex flex-col gap-7 items-center bg-(--surface-c) rounded-md overflow-hidden border-1 border-(--surface-d)  mb-8 pb-6">
                                    <header className="flex flex-row items-center gap-2.5 w-full bg-(--surface-b) px-6 py-3">
                                        <i className="pi pi-users" style={{ fontSize: "1.5em" }} />
                                        <h2>Reglas del Sorteo</h2>
                                    </header>
                                    <article className="flex flex-col gap-y-3  px-4 py-2">
                                        {participants?.length === 8 && <p className="flex flex-row relative items-center gap-3 text-sm">Participación cerrada. Se ha alcanzado el limite de jugadores.</p>}
                                        {participants?.length < 8 && <p className="flex flex-row relative items-center gap-3 text-sm"><span className="flex items-center justify-center absolute -top-0.5 w-6 h-6 font-bold rounded-full border-1 border-gray-600" >1</span><span className="ml-8">Limitado a 8 participantes, una participación por cuenta.</span></p>}
                                        {participants?.length < 8 && <p className="flex flex-row relative items-center gap-3 text-sm"><span className="flex items-center justify-center absolute -top-0.5 w-6 h-6 font-bold rounded-full border-1 border-gray-600">2</span><span className="ml-8">Costo de $50 por participación</span></p>}
                                        {participants?.length < 8 && <p className="flex flex-row relative items-center gap-3 text-sm"><span className="flex items-center justify-center absolute -top-0.5 w-6 h-6 font-bold rounded-full border-1 border-gray-600">3</span><span className="ml-8">El sorteo asignará aleatoriamente un equipo a cada participante.</span></p>}
                                        {participants?.length < 8 && <p className="flex flex-row relative items-center gap-3 text-sm"><span className="flex items-center justify-center absolute -top-0.5 w-6 h-6 font-bold rounded-full border-1 border-gray-600">4</span><span className="ml-8">El ganador será determinado por el equipo que gane el torneo.</span></p>}
                                    </article>

                                </div>}
                            {participants && participants?.length < 8 && <Button onClick={HandleAddParticipant} disabled={loading} label={loading ? "Cargando" : "Quiero participar"} severity="success" size="small" icon="pi pi-sparkles" />}
                        </>
                        : <div className="mt-8">
                            {participants && participants?.length < 8 && <Message className="text-lg" text="¡Tu participación ha sido registrada! El sorteo se llevará a cabo una vez que se completen los 8 participantes." />}
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

