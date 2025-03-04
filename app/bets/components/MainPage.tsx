"use client"
import { IBet, IBetDocument } from "@/types/types"
import { useState } from "react"
import HeaderTable from "./HeaderTable"
import { DialogCreateBet } from "./DialogCreateBet"
import { HeaderPage } from "./HeaderPage"
import { Loading } from "@/components/Loading/Loading"
import { useDataBets } from "@/hooks/useDataBets"

const Orders = [
    { id: "name", name: "Por nombre" },
    { id: "des", name: "Por aciertos ↓" },
    { id: "asc", name: "Por aciertos ↑" },
]

export interface IMyBets {
    bets: IBet[]
    hasBets: boolean
    isNotBetsPaid: boolean
}

const EmptyMyBets: IMyBets = {
    bets: [],
    hasBets: false,
    isNotBetsPaid: true
}

export default function MainPage() {
    /*
    const { winner } = useWinner(bets, matches.results)
    const { setOrderBets, setUser } = useSort(matches.results, bets, setFilterBets)
    const { user } = useUser()
    const { isLandscape } = useOrientation()
    const [winners, setWinners] = useState<IBetDocument[] | undefined>(undefined)
    */
    const [selectRanges, setSelectRanges] = useState<{ row: number; column: number } | null>(null)
    const [filterBets, setFilterBets] = useState<IBet[] | null>(null)
    const [hiddenNames, setHiddenNames] = useState(false)
    const [viewBets, setViewBets] = useState(false)
    const { matchDayInfo, matches, isInTime, bets, myBets, loading } = useDataBets()
    const [openDialog, setOpenDialog] = useState(false)
    const [sending, setSending] = useState(false)
    const [viewCreateBets, setViewCreateBets] = useState(false)

    return (
        <main className='flex flex-col items-center gap-1 pt-10 h-svh bg-(--surface-c)'>
            {!loading && <>
                {openDialog && matches &&
                    <DialogCreateBet open={openDialog} setOpen={setOpenDialog} matches={matches} myBets={myBets} />
                }
                <HeaderPage isInTime={matchDayInfo.isAvailable} setOpenDialog={setOpenDialog} timeFirstMatch={isInTime.time} />

                {matchDayInfo && matchDayInfo!.results?.length > 0 &&
                    <>
                        <section className={`relative grid w-full pr-1 max-w-max border-1 border-transparent rounded-md transition-all ease-in-out delay-150 ${hiddenNames ? "grid-cols-[2em_1fr]" : "grid-cols-[13em_1fr]"} scrollbar`}>
                            <div className="">
                                <HeaderTable hiddenNames={hiddenNames} setFilterBets={setFilterBets} setHiddenNames={setHiddenNames} matchDayData={{ matchDay: matchDayInfo, matches: matches }} totalBets={bets?.length || 0} />
                                {/*filterBets?.map((bet, index) => (
								<Participant key={bet.id} bets={bets} bet={bet} index={index} hiddenNames={hiddenNames} selectRanges={selectRanges} setSelectRanges={setSelectRanges} />
							))*/}
                            </div>
                            {/*<BettingsTable bets={bets} filterBets={filterBets} selectRanges={selectRanges} setSelectRanges={setSelectRanges} />*/}
                        </section>
                    </>
                }

            </>}
            {
                loading && <Loading height='20em' />
            }
        </main>
        /*<main className={`${styles.main} ${isLandscape && styles.main_landscape}`}> 
            {matches?.results?.length > 0 && !isLandscape && !matches.isFinishGame &&
                <HeaderPage isInTime={matches?.isAvailable} setOpenDialog={setOpenDialog} timeFirstMatch={isInTime.time} />
            }
            {loading && <Loading />}
            {matches.isFinishGame &&
                <div className="px-2">
                    <Button onClick={() => setViewBets(prev => !prev)} severity='info' icon="pi pi-eye" size='small' label={viewBets ? 'Ver ganadores' : 'Ver quinielas'} />
                </div>
            }
            {(!matches.isFinishGame || viewBets) && <>
                {myBets?.isNotBetsPaid && myBets.hasBets && bets && bets?.length > 0 &&
                    {matchDayData && <NoPaidMessage myBets={myBets} user={session.data?.user as UserSession} matchDayData={matchDayData} />}
                }
                {!myBets?.hasBets && !loading && matches.matches.length > 0 && bets &&
                    <Card className='max-w-3xs w-full' >
                        <h2 className="text-center">¡Esperamos tu quiniela!</h2>
                        <p className="text-center">¡No te quedes fuera!</p>
                    </Card>
                }
                {myBets.hasBets && bets && bets.length > 0 && !myBets?.isNotBetsPaid && matches.=== "Sin comenzar" &&
                    <ConfirmedParticipationMessage user={session.data?.user as UserSession} bets={bets} myBets={myBets} matchDayData={matchDayData} />
                }
                {!loading && !myBets?.isNotBetsPaid && myBets.hasBets && bets && bets.length > 0 && matches?.matches[0]?.status !== "Sin comenzar" && (
                    <>
                        {matches?.results?.length > 0 &&
                            <>
                                <section className={`${styles.main_table} ${hiddenNames && styles.main_tableHidden} scrollbar`}>
                                    <div className={styles.headerTable}>
                                        <HeaderTable bets={bets} hiddenNames={hiddenNames} setFilterBets={setFilterBets} setHiddenNames={setHiddenNames} />
                                        {filterBets?.map((bet, index) => (
                                            <Participant key={bet.id} bets={bets} bet={bet} index={index} hiddenNames={hiddenNames} selectRanges={selectRanges} setSelectRanges={setSelectRanges} />
                                        ))}
                                    </div>
                                    <BettingsTable bets={bets} filterBets={filterBets} selectRanges={selectRanges} setSelectRanges={setSelectRanges} />
                                </section>
                            </>
                        }
                    </>
                )}
                {matches?.results?.length === 0 && <div className={styles.nomatches}>No se ha creado la quiniela de la semana <NotFoundIcon className={styles.nomatches_icon} /></div>}
            </>}
            {matches.isFinishGame && !viewBets &&
                <WinningBets winners={winners} />
            }
        </main>*/
    )
}