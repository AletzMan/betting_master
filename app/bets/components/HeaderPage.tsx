import { Dispatch, SetStateAction } from "react"
import styles from "@/bets/bets.module.scss"
import { Button } from "primereact/button"
import { RevalidatePath } from "@/utils/fetchData"

interface Props {
	isAvailable: boolean
	setOpenDialog: Dispatch<SetStateAction<boolean>>
	startGames: boolean
}

export function HeaderPage({ isAvailable, setOpenDialog, startGames }: Props) {

	const handleRefresh = async () => {
		await RevalidatePath("matchDayInfo")
		location.reload();
	}

	return (
		<header className="grid grid-cols-[1fr_1fr_120px] py-1 px-1 w-full bg-(--surface-c) max-w-4xl mb-1">
			{isAvailable &&
				<Button
					className="max-w-30"
					label="Crear"
					icon="pi pi-plus-circle"
					size="small"
					severity="success"
					onClick={() => setOpenDialog(true)}
					style={{ maxHeight: "max-content" }}
				/>
			}
			{startGames && !isAvailable &&
				<Button
					className="max-w-30"
					label="Actualizar"
					icon="pi pi-refresh"
					size="small"
					outlined
					severity="secondary"
					onClick={handleRefresh}
					style={{ maxHeight: "max-content" }}
				/>
			}

			{!isAvailable ? <div className="relative flex flex-col items-end justify-start col-start-3 overflow-hidden h-8 gap-y-1.5 text-sm">
				<div className={`${styles.options} ${styles.options_one}`}>
					<i className="pi pi-trophy text-yellow-400"></i>
					<span className="text-yellow-500">Ganador</span>
				</div>
				<div className={`${styles.options} ${styles.options_two}`}>
					<i className="pi pi-star-fill  text-purple-500"></i>
					<span className=" text-purple-500">Tus quinielas</span>
				</div>
			</div> :
				<Button
					className="max-w-30 col-start-3"
					label="Actualizar"
					icon="pi pi-refresh"
					size="small"
					outlined
					severity="secondary"
					onClick={handleRefresh}
					style={{ maxHeight: "max-content" }}
				/>}
		</header>
	)
}
