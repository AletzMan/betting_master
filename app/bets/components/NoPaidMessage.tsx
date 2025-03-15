import { IBet, IMatchDay, UserSession } from "@/types/types"
import { ConvertToPrice } from "@/functions/functions"
import { useEffect, useRef, useState } from "react"
import { useSnackbar } from "notistack"
import { IPreviewDialog } from "./ConfirmedParticipationMessage"
import { RevalidatePath, deleteBetByID } from "@/utils/fetchData"
import { Card } from "primereact/card"
import { Tag } from "primereact/tag"
import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"
import { Divider } from "primereact/divider"
import { Dialog } from "primereact/dialog"
import { TeamsLogosNews } from "@/constants/constants"
import { IMyBets } from "./MainPage"
import { useUpdateBets } from "@/config/zustand-store"

interface Props {
    matchDayInfo: IMatchDay
    myBets: IMyBets
    user: UserSession
}

interface IBets {
    betsPaid: IBet[]
    betsNotPaid: IBet[]
}

export const NoPaidMessage = ({ myBets, user, matchDayInfo }: Props) => {
    const { enqueueSnackbar } = useSnackbar()
    const [bets, setBets] = useState<IBets>({ betsPaid: [], betsNotPaid: [] })
    const [dialog, setDialog] = useState<IPreviewDialog>({ open: false, bets: {} as IBet })
    const opAccountInfo = useRef<OverlayPanel | null>(null);
    const opAccountBets = useRef<OverlayPanel | null>(null);
    const setUpdateBets = useUpdateBets((state) => state.setUpdateBets)

    useEffect(() => {
        const betsPaid = myBets.bets.filter(bet => bet.paid)
        const betsNotPaid = myBets.bets.filter(bet => !bet.paid)
        setBets({ betsPaid, betsNotPaid })
    }, [myBets])


    const handleDeleteBet = async (id: string, name: string) => {
        const deleted = confirm(`¿Estás seguro de eliminar esta quiniela? \n ${name}`)
        if (!deleted) return
        const response = await deleteBetByID(id)
        if (response) {
            setUpdateBets(true)
            enqueueSnackbar("Quiniela eliminida exitosamente", { variant: "success" })
            RevalidatePath("bets")
            setTimeout(() => {
                setUpdateBets(false)
            }, 100);
        }
    }
    console.log(myBets)
    return (
        <Card className="scrollbar" header={
            <div className="py-2 bg-(--surface-b)">
                <h3 className="text-sm font-bold text-center">¡Paga tus quinielas para participar!</h3>
                <h3 className="text-sm font-bold text-center">¡No te quedes fuera!</h3>
            </div>
        }>
            <div className="flex flex-col gap-2">
                <p className="flex justify-between text-sm text-center">Precio por quiniela: <span className="font-extrabold">$15.00</span></p>
                <div className=" border-1 border-(--surface-d) rounded-md bg-(--surface-c) px-2.5 py-1">
                    <p className="text-sm  font-semibold" >Tu tienes <span className="text-lg font-bold text-fuchsia-600">{myBets.bets.length}</span> quiniela(s)</p>
                    <div className="flex flex-col gap-y-1.5 w-full mt-2">
                        {bets.betsPaid.length > 0 &&
                            <div className="flex justify-between">
                                <div className="flex flex-row items-center gap-2.5">
                                    <i className="pi pi-check-circle text-lime-400" />
                                    <span>{bets.betsPaid.length}</span>
                                    <span >Pagadas</span>
                                </div>
                                <span className="text-lime-400">{ConvertToPrice(bets.betsPaid.length * 15)}</span>
                            </div>
                        }
                        {bets.betsNotPaid.length > 0 &&
                            <div className="flex justify-between">
                                <div className="flex flex-row items-center gap-2.5">
                                    <i className="pi pi-info-circle text-orange-400" />
                                    <span>{bets.betsNotPaid.length}</span>
                                    <span>Pendientes</span>
                                </div>
                                <span className="text-orange-400">{ConvertToPrice(bets.betsNotPaid.length * 15)}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col px-2.5 py-2 gap-2 bg-[#fd8c1320] rounded-md border-1 border-[#fd8c1360]">
                    <p className="text-sm font-bold mb-2">Total a pagar: <span className=" text-lg font-bold text-orange-400">{ConvertToPrice(bets.betsNotPaid.filter(betPaid => !betPaid.paid).length * 15)}</span></p>
                    <div className="flex items-start gap-2">
                        <i className="pi pi-clock text-orange-400 mt-1" />
                        <p className="text-sm">Tienes hasta 24 horas del el comienzo del primer partido para pagar</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <i className="pi pi-info-circle text-orange-400  mt-1" />
                        <p className="text-sm">Quiniela no pagada no participa</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <i className="pi pi-credit-card text-orange-400  mt-0.5" />
                        <p className="text-sm">Agrega tu nombre en la referencia</p>
                    </div>
                </div>
                <Button className="max-w-max self-center" severity="info" size="small" icon="pi pi-credit-card" onClick={(e) => opAccountInfo!.current!.toggle(e)} label="Ver datos para deposito" />
                <OverlayPanel ref={opAccountInfo}>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col ">
                            <label className="text-xs text-(--surface-500)">Numero de cuenta</label>
                            <p className="text-sm">158 659 4088</p>
                        </div>
                        <div className="flex flex-col ">
                            <label className="text-xs text-(--surface-500)">Cuenta CLABE</label>
                            <p className="text-sm">012 320 01586594088 0</p>
                        </div>
                        <div className="flex flex-col ">
                            <label className="text-xs text-(--surface-500)">Nombre</label>
                            <p className="text-sm">Alejandro Garcia</p>
                        </div>
                    </div>
                </OverlayPanel>
                <Divider />
                <div className="flex flex-row gap-2 justify-center w-full">
                    <i className="pi pi-user" />
                    <span className="text-sm text-center">{user.name}</span>
                </div>
                <Button className="max-w-max self-center" severity="secondary" size="small" icon="pi pi-eye" onClick={(e) => opAccountBets!.current!.toggle(e)} label="Ver mis quinielas" />
                <OverlayPanel ref={opAccountBets}>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col justify-start items-center gap-y-2 px-1 py-0.5">
                            {myBets.bets.map((bet, index) => (
                                <div key={bet.id} className="grid grid-cols-[10em_3em_3em] gap-2">
                                    <Tag className="w-full" severity="secondary" >{bet.name}</Tag>
                                    <Button className="w-full" onClick={() => setDialog({ open: true, bets: bet })} outlined raised severity="info" iconPos="right" size="small" icon="pi pi-eye" />
                                    <Button className="w-full" onClick={() => handleDeleteBet(bet.id, bet.name)} outlined raised severity="danger" iconPos="right" size="small" icon="pi pi-trash" />
                                </div>
                            ))}
                        </div>
                    </div>
                </OverlayPanel>
                {dialog.open &&
                    <Dialog className="max-w-[calc(100svw-1em)]" visible={dialog.open} onHide={() => setDialog({ open: false, bets: {} as IBet })}>
                        <section className="flex flex-col gap-2.5">
                            <Button className="self-end" icon="pi pi-times" text raised severity="danger" onClick={() => setDialog({ open: false, bets: {} as IBet })} />
                            <Tag>{dialog.bets.name}</Tag>
                            <article>
                                <header className="flex flex-row">
                                    {matchDayInfo.matchesRel.map((match, index) => (
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
            </div>
        </Card>
    )
}

