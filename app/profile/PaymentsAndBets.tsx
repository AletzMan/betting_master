/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, MouseEvent } from "react"
import { DeleteBet, GetBetsByIDGroup, UpdateBetByUser } from "@/config/firebase"
import { IBet, IBetDataDocument } from "@/types/types"
import { enqueueSnackbar } from "notistack"
import { Button } from "primereact/button"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { Divider } from "primereact/divider"
import { Accordion, AccordionTab } from "primereact/accordion"
import { Avatar } from "primereact/avatar"
import { Badge } from "primereact/badge"
import { ScrollPanel } from "primereact/scrollpanel"
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox"
import { getBetsByDay } from "@/utils/fetchData"

interface IBetsByUser {
    uid: string,
    bets: IBet[]
}

const EmptyBetsBtID = [{
    uid: "",
    bets: [] as IBet[]
}]

export function PaymentsAndBets() {
    const [matchDay, setMatchDay] = useState<number>(0)
    const [bets, setBets] = useState<IBet[]>([])
    const [betsByID, setBetsByID] = useState<IBetsByUser[] | null>(null)



    const GetBets = async () => {
        if (matchDay) {
            const response = await getBetsByDay();
            if (response) {
                setBets(response)
                const arrayBetsbyID: IBetsByUser[] = []
                response.map(bet => {
                    const userID = bet.uid
                    const betID = bet.id
                    const found = arrayBetsbyID.find((group) => group.uid === userID)
                    if (found) {
                        arrayBetsbyID.map((group) => {
                            if (group.uid === userID) {
                                group.uid = userID
                                group.bets.push(bet)
                            }
                        })
                    } else {
                        const newBet: IBet[] = []
                        newBet.push(bet)
                        arrayBetsbyID.push({ uid: userID, bets: newBet })
                    }
                })
                setBetsByID(arrayBetsbyID)
            }
        }
    }

    const HandleCheck = async (e: CheckboxChangeEvent, id: string) => {
        const isPaid = e.checked
        const response = await UpdateBetByUser(id, isPaid || false)
        if (response === "OK") {
            GetBets()
            enqueueSnackbar("Quiniela actualizada", { variant: "success" })
        }
    }

    const HandleDelete = async (id: string, name: string) => {
        const deleted = confirm(`¿Estás seguro de eliminar esta quiniela? \n ${name}`)
        if (!deleted) return
        const response = await DeleteBet(id)
        if (response === "OK") {
            GetBets()
            enqueueSnackbar("Quiniela eliminida", { variant: "success" })
        }
    }

    const HandleChangeDay = async (e: DropdownChangeEvent) => {
        const newValue = parseInt(e.value.split(" ")[1])
        setMatchDay(newValue)
    }

    const HandleGetData = async (event: MouseEvent<HTMLButtonElement>) => {
        await GetBets()
    }

    return (
        <div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
            <header className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <Dropdown value={MatchDays[matchDay - 1]} options={MatchDays} placeholder="Seleccione Jornada" onChange={HandleChangeDay} />
                    <Button onClick={HandleGetData} className="max-h-10" icon="pi pi-refresh" outlined severity="secondary" size="small" label="Actualizar" />
                </div>
                <Divider type="dashed" />
                <div className="grid grid-cols-4 gap-1 w-full">
                    <div className="bg-(--surface-c) border-1 border-(--surface-d)"  >
                        <h3 className="text-center text-sky-500 font-semibold">Total</h3>
                        <p className="text-center">{bets.length}</p>
                    </div>
                    <div className="bg-(--surface-c) border-1 border-(--surface-d)" >
                        <h3 className="text-center text-sky-500 font-semibold">Pagadas</h3>
                        <p className="text-center">{bets.filter((bet) => bet.paid).length}</p>
                    </div>
                    <div className="bg-(--surface-c) border-1 border-(--surface-d)" >
                        <h3 className="text-center text-sky-500 font-semibold">Monto</h3>
                        <p className="text-center">$ {bets.filter((bet) => bet.paid).length * 13.5}</p>
                    </div>
                    <div className="bg-(--surface-c) border-1 border-(--surface-d)" >
                        <h3 className="text-center text-sky-500 font-semibold">Ganancia</h3>
                        <p className="text-center">$ {bets.filter((bet) => bet.paid).length * 1.5}</p>
                    </div>
                </div>
            </header>
            <ScrollPanel style={{ width: '100%', height: '400px' }} >
                <Accordion className="flex flex-col "  /*className={`${styles.bets_bet} ${betsByID[index].bets.find(betdata => !betdata.data.paid)?.data ? styles.bets_betNoPaid : styles.bets_betPaid}`}*/>
                    {betsByID && betsByID![0]?.uid && betsByID?.map((bet, index) => (
                        <AccordionTab key={bet.uid}
                            header={
                                <div className="flex items-center justify-between ">
                                    <div className="flex gap-3 items-center">
                                        <Avatar size="normal" image={bet?.bets[0]?.userInfo?.image || "/user_icon.png"} shape="circle" />
                                        <span className="text-xs">{bet?.bets[0]?.userInfo?.name}</span>
                                    </div>
                                    <Badge value={bet.bets.length} severity={betsByID[index].bets.find(betdata => !betdata.paid)?.paid ? "danger" : "success"}></Badge>
                                </div>
                            }>
                            <div className="flex flex-col gap-2">
                                {bet.bets.map((bet, index) => (
                                    <div key={index} className=" flex items-center justify-between bg-(--surface-c) px-2 py-1">
                                        <p className="text-sm">{bet.name}</p>
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Checkbox type="checkbox" checked={bet.paid} onChange={(e) => HandleCheck(e, bet.id)} />
                                            <Button className="" onClick={() => HandleDelete(bet.id, bet.name)} icon="pi pi-trash" size="small" text raised />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionTab>
                    ))}
                </Accordion>
            </ScrollPanel>
        </div>
    )
}


const MatchDays = [
    "Jornada 1",
    "Jornada 2",
    "Jornada 3",
    "Jornada 4",
    "Jornada 5",
    "Jornada 6",
    "Jornada 7",
    "Jornada 8",
    "Jornada 9",
    "Jornada 10",
    "Jornada 11",
    "Jornada 12",
    "Jornada 13",
    "Jornada 14",
    "Jornada 15",
    "Jornada 16",
    "Jornada 17",
    "Cuartos",
    "Semi-Final",
    "Final",
]