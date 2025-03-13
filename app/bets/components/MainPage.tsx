"use client"
import { IBet, UserSession } from "@/types/types"
import { useState } from "react"
import HeaderTable from "./HeaderTable"
import { DialogCreateBet } from "./DialogCreateBet"
import { HeaderPage } from "./HeaderPage"
import { Loading } from "@/components/Loading/Loading"
import { useDataBets } from "@/hooks/useDataBets"
import { useSort } from "@/hooks/useSort"
import { Participant } from "./Participant"
import { BettingsTable } from "./BettingsTable"
import { WinningBets } from "./WinningBets"
import { Button } from "primereact/button"
import { NoPaidMessage } from "./NoPaidMessage"
import { useSession } from "next-auth/react"
import { ConfirmedParticipationMessage } from "./ConfirmedParticipationMessage"
import { Card } from "primereact/card"
import { SadIcon } from "@/svg"
import { useCountdownTimer } from "@/hooks/useCountdownTimer"



export interface IMyBets {
    bets: IBet[]
    hasBets: boolean
    isNotBetsPaid: boolean
}

export default function MainPage() {
    const session = useSession()
    const [selectRanges, setSelectRanges] = useState<{ row: number; column: number } | null>(null)
    const [hiddenNames, setHiddenNames] = useState(false)
    const [viewBets, setViewBets] = useState(false)
    const { matchDayInfo, myBets, loading } = useDataBets()
    const { available, time } = useCountdownTimer(/*matchDayInfo?.matchesRel[0].startDate*/new Date("2025-03-10T01:00:00Z"));
    const [openDialog, setOpenDialog] = useState(false)
    const { orderBets } = useSort(matchDayInfo ? matchDayInfo.bets : null, matchDayInfo?.results);

    return (
        <main className='flex flex-col items-center pt-[42.39px] h-svh '>
            {!loading && session.status === "authenticated" && matchDayInfo && <>
                {openDialog && matchDayInfo?.matchesRel &&
                    <DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matchDayInfo.matchesRel} myBets={myBets} />
                }
                {matchDayInfo?.results?.length > 0 && !matchDayInfo.isFinishGame && matchDayInfo.matches?.length > 0 &&
                    <HeaderPage isAvailable={matchDayInfo.isAvailable} setOpenDialog={setOpenDialog} startGames={!matchDayInfo.isAvailable} />
                }
                {matchDayInfo.isAvailable && !matchDayInfo.isFinishGame &&
                    <div className="bg-(--surface-c) px-6 py-2 rounded-sm mb-1 min-w-3xs">
                        {!available && (
                            <p className="flex items-center justify-center col-span-2 col-start-1 w-max text-sm py-2 px-2 rounded-sm border-1 border-red-600 bg-red-950" style={{ fontFamily: "var(--font-handjet)" }}>
                                Tiempo agotado para enviar
                            </p>
                        )}

                        {available && (
                            <p className="col-span-1 col-start-2 flex flex-col text-center justify-center text-sm">
                                <span style={{ fontFamily: "var(--font-handjet)" }}>{time.includes("-") ? "Esta por comenzar" : "Se cierra en"}</span>
                                <span
                                    className="text-lime-500 text-2xl font-normal"
                                    style={{ fontFamily: "var(--font-handjet)" }}
                                >
                                    {time}
                                </span>
                            </p>
                        )}
                    </div>
                }
                {matchDayInfo.isFinishGame &&
                    <div className="px-2 mt-2 mb-0.5">
                        <Button onClick={() => setViewBets(prev => !prev)} severity='info' icon="pi pi-eye" size='small' label={viewBets ? 'Ver ganadores' : 'Ver quinielas'} />
                    </div>
                }
                {(!matchDayInfo.isFinishGame || viewBets) &&
                    <>
                        {myBets?.isNotBetsPaid && myBets.hasBets &&
                            <NoPaidMessage myBets={myBets} user={session.data?.user as UserSession} matchDayInfo={matchDayInfo} />
                        }
                        {!myBets?.hasBets && !matchDayInfo.isAvailable &&
                            <Card className='max-w-3xs w-full' >
                                <div className="flex flex-col items-center gap-2.5">
                                    <SadIcon className="text-cyan-600 w-16 h-16" />
                                    <h2 className="text-center">¡Ups! Parece que llegaste tarde</h2>
                                    <p className="text-center">La jornada ya está en curso y las quinielas se han cerrado.</p>
                                    <p className="text-center text-lime-400">¡No te pierdas la próxima oportunidad!</p>
                                </div>
                            </Card>
                        }
                        {myBets.hasBets && myBets.bets.length > 0 && !myBets?.isNotBetsPaid && matchDayInfo.isAvailable &&
                            <ConfirmedParticipationMessage user={session.data?.user as UserSession} bets={matchDayInfo.bets} myBets={myBets} matchDayInfo={matchDayInfo} />

                        }
                        {myBets.bets.length === 0 && matchDayInfo.isAvailable &&
                            <Card>
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <i className="pi pi-trophy text-cyan-600" style={{ fontSize: "3em" }} />
                                    <h2 className="text-2xl font-extrabold">¡Únete a la Quiniela!</h2>
                                    <p>Llena tu quiniela y participa</p>
                                </div>
                            </Card>

                        }
                        {!loading && !myBets?.isNotBetsPaid && myBets.hasBets && !matchDayInfo.isAvailable && (
                            <>
                                {matchDayInfo && matchDayInfo!.results?.length > 0 &&
                                    <div className="w-full  pl-1">
                                        <section className={`relative grid  pb-1 w-full gap-1 max-w-max scrollbarXY  bg-(--surface-b)  pl-1 border-1 border-(--surface-d)  rounded-md transition-all ease-in-out delay-150 ${hiddenNames ? "grid-cols-[41px_1fr]" : "grid-cols-[13em_1fr]"}  `}>
                                            <div className="sticky left-0 gap-y-1 flex flex-col bg-(--surface-b) pr-[4px] z-4 border-r-1 border-r-(--surface-d) h-full">
                                                <HeaderTable hiddenNames={hiddenNames} setHiddenNames={setHiddenNames} matchDayInfo={matchDayInfo} totalBets={matchDayInfo.bets.filter(bet => bet.paid).length} />
                                                {orderBets?.map((bet, index) => (
                                                    <Participant key={bet.id} bets={matchDayInfo.bets} bet={bet} index={index} hiddenNames={hiddenNames} selectRanges={selectRanges} setSelectRanges={setSelectRanges} matchDayInfo={matchDayInfo} />
                                                ))}
                                            </div>
                                            {<BettingsTable filterBets={orderBets} selectRanges={selectRanges} setSelectRanges={setSelectRanges} matchDayInfo={matchDayInfo} />}
                                        </section>
                                    </div>
                                }
                            </>
                        )}
                        {matchDayInfo.matches?.length === 0 &&
                            <div className="flex items-center justify-center flex-col gap-4 px-2 py-4 max-w-80 rounded-md mt-5 bg-(--background-info-color) border-1 border-(--info-color)">
                                <i className="pi pi-info-circle text-(--info-color)" style={{ fontSize: "3em" }} />
                                <div>
                                    <p className="text-balance text-center text-white">¡La quiniela de la semana aún no ha sido creada!</p>
                                    <p className="text-center text-white">  Mantente atento, pronto podrás participar</p>
                                </div>
                            </div>
                        }
                    </>}
                {!matchDayInfo.isFinishGame && orderBets?.length === 0 && matchDayInfo.matches?.length > 0 && !available &&
                    <div className="flex flex-col items-center justify-center px-4 py-2 gap-4 max-w-64 bg-(--background-warning-color) rounded-md border-1 border-(--warning-color) mt-3.5">
                        <i className="pi pi-exclamation-circle text-(--warning-color)" style={{ fontSize: "3em" }} />
                        <p className="text-center">¡Ups! Parece que los partidos ya empezaron y nadie ha creado una quiniela.</p>
                    </div>

                }
                {matchDayInfo.isFinishGame && !viewBets &&
                    <WinningBets bets={matchDayInfo.bets} matches={matchDayInfo} />
                }

            </>}
            {!loading && matchDayInfo === null &&
                <div className="flex items-center justify-center flex-col gap-4 px-2 py-4 max-w-80 rounded-md mt-5 bg-(--background-info-color) border-1 border-(--info-color)">
                    <i className="pi pi-info-circle text-(--info-color)" style={{ fontSize: "3em" }} />
                    <div>
                        <p className="text-balance text-center text-white">¡La quiniela de la semana aún no ha sido creada!</p>
                        <p className="text-center text-white">  Mantente atento, pronto podrás participar</p>
                    </div>
                </div>

            }
            {
                loading && <Loading height='20em' />
            }
        </main>
    )
}