import { Dispatch, SetStateAction } from "react"
import styles from "@/bets/bets.module.scss"
import { Button } from "primereact/button"

interface Props {
	isAvailable: boolean
	setOpenDialog: Dispatch<SetStateAction<boolean>>
	timeFirstMatch: string
}

export function HeaderPage({ isAvailable, setOpenDialog, timeFirstMatch }: Props) {

	return (
		<header className="grid grid-cols-[0.8fr_1fr_0.8fr] py-1 px-1 w-full bg-(--surface-c) max-w-4xl mb-1">
			{isAvailable &&
				<Button
					label="Crear"
					icon="pi pi-plus-circle"
					size="small"
					severity="success"
					onClick={() => setOpenDialog(true)}
					style={{ maxHeight: "max-content" }}
				/>
			}

			<div className="relative flex flex-col items-end justify-start overflow-hidden h-8 gap-y-1.5 text-sm">
				<div className={`${styles.options} ${styles.options_one}`}>
					<i className="pi pi-trophy text-yellow-400"></i>
					<span className="text-yellow-500">Ganador</span>
				</div>
				<div className={`${styles.options} ${styles.options_two}`}>
					<i className="pi pi-star-fill  text-purple-500"></i>
					<span className=" text-purple-500">Tus quinielas</span>
				</div>
			</div>
		</header>
	)
}
