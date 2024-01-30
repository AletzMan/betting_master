import { useEffect, useState } from "react"
import styles from "./betsbyuser.module.scss"
import { GetBetsByDay, GetBetsByIDGroup, UpdateBetByUser } from "@/app/config/firebase"
import { IBetDataDocument, IBetDocument } from "@/app/types/types"
import { useSnackbar } from "notistack"

interface IBetsByUser {
    uid: string,
    bets: IBetDataDocument[]
}

const EmptyBetsBtID = [{
    uid: "",
    bets: [] as IBetDataDocument[]
}]

export function BetsByUser() {
    const { enqueueSnackbar } = useSnackbar()
    const [matchDay, setMatchDay] = useState<number>(0)
    const [bets, setBets] = useState<IBetDataDocument[]>([])
    const [betsByID, setBetsByID] = useState<IBetsByUser[]>(EmptyBetsBtID)

    useEffect(() => {
        GetBets()
    }, [matchDay])

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


    return (
        <>
            <h2 className={styles.section_subtitle}>Quinielas Pagadas</h2>
            <section className={styles.section}>
                <select className={styles.section_select} onChange={(e) => setMatchDay(parseInt(e.target.value))}>
                    <option value="0">Selecciona una jornada</option>
                    <option value="1">Jornada 1</option>
                    <option value="2">Jornada 2</option>
                    <option value="3">Jornada 3</option>
                    <option value="4">Jornada 4</option>
                    <option value="5">Jornada 5</option>
                    <option value="6">Jornada 6</option>
                    <option value="7">Jornada 7</option>
                    <option value="8">Jornada 8</option>
                    <option value="9">Jornada 9</option>
                    <option value="10">Jornada 10</option>
                    <option value="11">Jornada 11</option>
                    <option value="12">Jornada 12</option>
                    <option value="13">Jornada 13</option>
                    <option value="14">Jornada 14</option>
                    <option value="15">Jornada 15</option>
                    <option value="16">Jornada 16</option>
                    <option value="17">Jornada 17</option>
                </select>


                <div className={styles.bets}>
                    {betsByID.map((bet, index) => (
                        <details key={bet.uid} className={styles.bets_bet}>
                            <summary className={styles.bets_betSummary}>
                                <h3 className={styles.bets_betTitle}>{bet?.bets[0]?.data.userInfo?.name}</h3>
                            </summary>
                            <div className={styles.bets_betContent}>
                                {bet.bets.map((bet, index) => (
                                    <div key={index} className={styles.bets_betMatch}>
                                        <p className={styles.bet_match_title}>{bet.data.name}</p>
                                        <input className={styles.bets_betMatchCheck} type="checkbox" defaultChecked={bet.data.paid} onChange={(e) => HandleCheck(e, bet.id)} />
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </>
    )
}
