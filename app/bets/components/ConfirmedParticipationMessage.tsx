import { IBet, IMatchDay, UserSession } from "@/types/types"
import { useState } from "react"
import { TeamsLogosNews } from "@/constants/constants"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Divider } from "primereact/divider"
import { Message } from "primereact/message"
import { IMyBets } from "./MainPage"

interface props {
    matchDayInfo: IMatchDay | null
    user: UserSession
    bets: IBet[] | null
    myBets: IMyBets
}

export interface IPreviewDialog {
    open: boolean
    bets: IBet
}

export function ConfirmedParticipationMessage({ user, bets, myBets, matchDayInfo }: props) {
    const [dialog, setDialog] = useState<IPreviewDialog>({ open: false, bets: {} as IBet })

    return (
        <Card className="scrollbar" header={
            <div className="py-2 bg-(--surface-b) text-(--success-color)">
                <p className="flex flex-row gap-2.5 w-full justify-center items-center text-lg font-bold text-center"><i className="pi pi-check-circle" />¡Ya estas participando!</p>
                <h3 className="text-sm font-bold text-center">{user?.name}</h3>
            </div>
        }>
            <div className="flex flex-col gap-3">
                <p className="text-md font-bold text-center mb-0">Tu tienes <span className="">{myBets.bets.length}</span> quiniela(s)</p>
                <div className="flex flex-col gap-2 border-1 border-(--surface-d) bg-(--surface-c) rounded-md px-2 py-2">
                    <div className="flex items-start gap-2">
                        <i className="pi pi-clock text-(--warning-color) mt-[2px]" />
                        <p className="text-sm">Las quinielas estaran visibles hasta el comienzo del primer partido</p>
                    </div>
                    <Divider />
                    <div className="flex flex-col justify-start gap-y-2 px-1 py-0.5">
                        {myBets.bets.map((bet, index) => (
                            <div key={bet.id} className="grid grid-cols-[1fr_4em] gap-2">
                                <span className="flex items-center px-2 w-full bg-(--surface-c) rounded-sm">{bet.name}</span>
                                <Button className="w-full" onClick={() => setDialog({ open: true, bets: bet })} outlined raised severity="secondary" iconPos="right" size="small" icon="pi pi-eye" />
                            </div>
                        ))}
                    </div>
                    <p className="text-lg font-bold text-center text-(--success-color)">¡Suerte!</p >
                </div>
                <Message severity="info" text="Ingresa a tu Perfil y agrega tu cuenta de deposito para recibir tu pago en caso de ganar" />
                <a className="flex flex-row gap-2.5 items-center max-w-max self-center" href="/profile" target="_parent" rel="noopener noreferrer" >
                    <i className="pi pi-user" />
                    Ir a mi perfil
                </a>
            </div>
            {dialog.open &&
                <Dialog className="max-w-[calc(100svw-1em)]" visible={dialog.open} onHide={() => setDialog({ open: false, bets: {} as IBet })}>
                    <section className="flex flex-col gap-2.5">
                        <Button className="self-end" icon="pi pi-times" size="small" severity="danger" onClick={() => setDialog({ open: false, bets: {} as IBet })} />
                        <span className="bg-(--surface-c) rounded-sm px-2 py-1 text-center text-(--primary-color)">{dialog.bets.name}</span>
                        <article>
                            <header className="flex flex-row">
                                {matchDayInfo!.matchesRel.map((match, index) => (
                                    <div key={match.awayTeam} className="flex flex-col justify-center items-center text-sm font-semibold w-12 text-white border-t-1 border-t-(--surface-d)  border-l-1 border-l-(--surface-d)">
                                        <p className="font-semibold">{TeamsLogosNews.find(team => team.id.toString() === match.homeTeam)?.abbName}</p>
                                        <p className="font-semibold">vs</p>
                                        <p className="font-semibold">{TeamsLogosNews.find(team => team.id.toString() === match.awayTeam)?.abbName}</p>
                                    </div>
                                ))}
                            </header>
                            <main className="flex flex-row">
                                {dialog.bets.predictions.sort((a, b) => a.matchNumber - b.matchNumber).map((result, index) => (
                                    <div key={index} className="flex flex-col justify-center px-0.5 items-center text-sm font-semibold w-12 text-white border-t-1 border-t-(--surface-d)  border-l-1 border-l-(--surface-d)  border-b-1 border-b-(--surface-d)" >
                                        <p className="bg-lime-600 w-full text-center rounded-xs">{result.prediction}</p>
                                    </div>
                                ))}
                            </main>
                        </article>
                    </section>
                </Dialog>}
        </Card>
    )
}
