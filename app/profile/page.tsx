"use client"
import { useUser } from "../config/zustand-store"
import styles from "./profile.module.scss"
import { useEffect, useState } from "react"
import { GetBetsByUser } from "../config/firebase"
import { IBetsByDay } from "../types/types"
import { GroupObjectByProperty } from "../functions/functions"
import { BettingDay } from "./BettingDays/BettingDay"
import { AdminPanel } from "./AdminPanel/AdminPanel"
import { useOrientation } from "../hooks/useOrientation"

const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID

export default function ProfilePage() {
	const { user } = useUser()
	const { isLandscape } = useOrientation()
	const [myBets, setMyBets] = useState<[string, IBetsByDay][]>()
	const [open, setOpen] = useState<boolean[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const GetBets = async () => {
		const bets = await GetBetsByUser(user.uid)
		const result = GroupObjectByProperty(bets, "")
		const arrayDays = Object.entries(result)
		setMyBets(arrayDays.reverse())
		SetArrayOpenBets(arrayDays.length)
	}

	const SetArrayOpenBets = (days: number) => {
		const arrayOpenDays = new Array(false)
		for (let index = 0; index < days - 1; index++) {
			arrayOpenDays.push(false)
		}
		setOpen(arrayOpenDays)
		setLoading(false)
	}

	useEffect(() => {
		GetBets()
	}, [])

	return (
		<main className={`${styles.main} ${isLandscape && styles.main_landscape} scrollbar`}>
			<section className={styles.section}>
				{!loading && user.uid === ADMIN_UID && <AdminPanel />}
				<h2 className={styles.main_subtitle}>Mis quinielas</h2>
				{myBets?.map((myBet, index) => (
					<BettingDay key={myBet[0]} bet={myBet} open={open} setOpen={setOpen} index={index} numberDays={open.length} />
				))}
			</section>
		</main>
	)
}
