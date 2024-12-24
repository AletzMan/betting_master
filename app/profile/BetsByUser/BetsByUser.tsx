/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { ChangeEvent, useState, MouseEvent } from "react"
import { DeleteBet, GetBetsByIDGroup, UpdateBetByUser } from "@/app/config/firebase"
import { IBetDataDocument } from "@/app/types/types"
import { enqueueSnackbar } from "notistack"
import Image from "next/image"
import { DeleteIcon, PaymentIcon } from "@/app/svg"
import styles from "./betsbyuser.module.scss"
import Details from "@/app/components/Details/Details"
import SelectField from "@/app/components/SelectField/SelectField"
import { ButtonRefresh } from "@/app/components/ButtonRefresh/ButtonRefresh"

interface IBetsByUser {
    uid: string,
    bets: IBetDataDocument[]
}

const EmptyBetsBtID = [{
    uid: "",
    bets: [] as IBetDataDocument[]
}]

export function BetsByUser() {
    const [matchDay, setMatchDay] = useState<number>(0)
    const [bets, setBets] = useState<IBetDataDocument[]>([])
    const [betsByID, setBetsByID] = useState<IBetsByUser[]>(EmptyBetsBtID)



    const GetBets = async () => {
        if (matchDay) {
            const documents = await GetBetsByIDGroup(matchDay.toString())

            setBets(documents)
            let newGroup: IBetsByUser[] = []
            documents.forEach((bet) => {
                const userID = bet.data.uid
                const betID = bet.id
                const found = newGroup.find((group) => group.uid === userID)
                if (found) {
                    newGroup.map((group) => {
                        if (group.uid === userID) {
                            group.bets.push({ id: betID, data: bet.data })
                        }
                    })
                } else {
                    newGroup.push({ uid: userID, bets: [{ id: betID, data: bet.data }] })
                }
            })
            setBetsByID(newGroup)
        }
    }

    const HandleCheck = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const isPaid = e.target.checked
        const response = await UpdateBetByUser(id, isPaid)
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

    const HandleChangeDay = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(e.target.value.split(" ")[1])
        setMatchDay(newValue)
    }

    const HandleGetData = async (event: MouseEvent<HTMLButtonElement>) => {
        await GetBets()
    }

    return (
        <Details name="adminpanel" title="Gestión de Pagos" icon={<PaymentIcon className="" />} >
            <section className={styles.section}>
                <header className={styles.header}>
                    <div className={styles.day}>
                        <SelectField items={MatchDays} props={{ onChange: HandleChangeDay, value: MatchDays[matchDay - 1] }} />
                        <ButtonRefresh onClick={HandleGetData} />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.description_total}>
                            <h2 className={styles.description_title}>Total</h2>
                            <p className={styles.description_totalValue}>{bets.length}</p>
                        </div>
                        <div className={styles.description_total}>
                            <h2 className={styles.description_title}>Pagadas</h2>
                            <p className={styles.description_totalValue}>{bets.filter((bet) => bet.data.paid).length}</p>
                        </div>
                        <div className={styles.description_total}>
                            <h2 className={styles.description_title}>Monto</h2>
                            <p className={styles.description_totalValue}>$ {bets.filter((bet) => bet.data.paid).length * 13.5}</p>
                        </div>
                        <div className={styles.description_total}>
                            <h2 className={styles.description_title}>Ganancia</h2>
                            <p className={styles.description_totalValue}>$ {bets.filter((bet) => bet.data.paid).length * 1.5}</p>
                        </div>
                    </div>
                </header>
                <div className={styles.bets}>
                    {betsByID[0]?.uid && betsByID?.map((bet, index) => (
                        <details key={bet.uid} className={`${styles.bets_bet} ${betsByID[index].bets.find(betdata => !betdata.data.paid)?.data ? styles.bets_betNoPaid : styles.bets_betPaid}`}>
                            <summary className={`${styles.bets_betSummary} `}>
                                <Image className={styles.bets_betSummaryImage} src={bet?.bets[0]?.data.userInfo?.photo || "/user_icon.png"} alt="user" width={30} height={30} />
                                {bet?.bets[0]?.data.userInfo?.name}
                                <span className={styles.bets_betSummaryCount}>{bet.bets.length}</span>
                            </summary>
                            <div className={styles.bets_betContent}>
                                {bet.bets.map((bet, index) => (
                                    <div key={index} className={styles.bets_betMatch}>
                                        <p className={styles.bet_match_title}>{bet.data.name}</p>
                                        <input className={styles.bets_betMatchCheck} type="checkbox" defaultChecked={bet.data.paid} onChange={(e) => HandleCheck(e, bet.id)} />
                                        <button className={styles.bets_betMatchButton} onClick={() => HandleDelete(bet.id, bet.data.name)}>
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </Details>
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