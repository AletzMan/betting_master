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
import { NotFoundIcon } from "@/svg"


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
    const { matchDayInfo, matches, isInTime, bets, myBets, loading } = useDataBets()
    const [openDialog, setOpenDialog] = useState(false)
    const [sending, setSending] = useState(false)
    const [viewCreateBets, setViewCreateBets] = useState(false)
    const { orderBets } = useSort(bets, matchDayInfo.results);

    return (
        <main className='flex flex-col items-center pt-[42.39px] h-svh bg-(--surface-c)'>
            {!loading && session.status === "authenticated" && <>
                {openDialog && matches &&
                    <DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matches} myBets={myBets} />
                }
                {matchDayInfo?.results?.length > 0 && !matchDayInfo.isFinishGame &&
                    <HeaderPage isAvailable={matchDayInfo.isAvailable} setOpenDialog={setOpenDialog} timeFirstMatch={isInTime.time} />
                }
                {matchDayInfo.isFinishGame &&
                    <div className="px-2">
                        <Button onClick={() => setViewBets(prev => !prev)} severity='info' icon="pi pi-eye" size='small' label={viewBets ? 'Ver ganadores' : 'Ver quinielas'} />
                    </div>
                }
                {(!matchDayInfo.isFinishGame || viewBets) && <>
                    {myBets?.isNotBetsPaid && myBets.hasBets && bets && bets?.length > 0 &&
                        <NoPaidMessage myBets={myBets} user={session.data?.user as UserSession} matchDayData={{ matchDay: matchDayInfo, matches: matches }} />
                    }
                    {!myBets?.hasBets && !loading && matches.length > 0 && bets &&
                        <Card className='max-w-3xs w-full' >
                            <h2 className="text-center">¡Esperamos tu quiniela!</h2>
                            <p className="text-center">¡No te quedes fuera!</p>
                        </Card>
                    }
                    {myBets.hasBets && bets && bets.length > 0 && !myBets?.isNotBetsPaid && matches[0].status === "not started" &&
                        <ConfirmedParticipationMessage user={session.data?.user as UserSession} bets={bets} myBets={myBets} matchDayData={{ matchDay: matchDayInfo, matches: matches }} />
                    }
                    {!loading && !myBets?.isNotBetsPaid && myBets.hasBets && bets && bets.length > 0 && matches[0]?.status !== "not started" && (
                        <>
                            {matchDayInfo && matchDayInfo!.results?.length > 0 &&
                                <>
                                    <section className={`relative grid w-full gap-1 pr-1 max-w-max border-1 border-transparent scrollbarXY  bg-(--surface-b) rounded-md transition-all ease-in-out delay-150 ${hiddenNames ? "grid-cols-[2.5em_1fr]" : "grid-cols-[13em_1fr]"}  `}>
                                        <div className="sticky left-0 gap-y-1 flex flex-col bg-(--surface-b) pr-[1px] z-4 border-r-1 border-r-(--surface-d) h-full">
                                            <HeaderTable hiddenNames={hiddenNames} setHiddenNames={setHiddenNames} matchDayData={{ matchDay: matchDayInfo, matches: matches }} totalBets={bets?.length || 0} />
                                            {orderBets?.map((bet, index) => (
                                                <Participant key={bet.id} bets={bets} bet={bet} index={index} hiddenNames={hiddenNames} selectRanges={selectRanges} setSelectRanges={setSelectRanges} matchDayInfo={matchDayInfo} />
                                            ))}
                                        </div>
                                        {<BettingsTable filterBets={orderBets} selectRanges={selectRanges} setSelectRanges={setSelectRanges} matches={matches} matchDayInfo={matchDayInfo} />}
                                    </section>
                                </>
                            }
                        </>
                    )}
                    {matches?.length === 0 && <div className="">No se ha creado la quiniela de la semana <NotFoundIcon className="" /></div>}
                </>}
                {matchDayInfo.isFinishGame && !viewBets &&
                    <WinningBets bets={bets} matches={matchDayInfo} />
                }

            </>}
            {
                loading && <Loading height='20em' />
            }
        </main>
    )
}