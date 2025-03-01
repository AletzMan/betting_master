import { Dispatch, SetStateAction } from "react"
import styles from "@/bets/bets.module.scss"
import { Button } from "primereact/button"

interface Props {
	isInTime: boolean
	setOpenDialog: Dispatch<SetStateAction<boolean>>
	timeFirstMatch: string
}

export function HeaderPage({ isInTime, setOpenDialog, timeFirstMatch }: Props) {


	return (
		<header className="grid grid-cols-[0.6fr_1fr_0.8fr] py-1.5 px-1 w-full">
			{isInTime &&
				<Button
					label="Crear"
					icon="pi pi-plus-circle"
					size="small"
					severity="success"
					onClick={() => setOpenDialog(true)}
				/>
			}
			{!isInTime && <p className="col-span-2 col-start-1 w-max text-sm py-0.5 px-2 rounded-sm border-1 border-red-600 bg-red-950">Tiempo agotado para enviar</p>}
			{isInTime &&
				<p className="col-span-1 col-start-2 flex flex-col text-center justify-center text-sm">
					<span>{!timeFirstMatch.includes("-") ? "Se cierra en" : ""}</span>
					{!timeFirstMatch.includes("-") && <span className="text-lime-500">{` ${(timeFirstMatch)}`}</span>}
					{timeFirstMatch.includes("-") && <span className="text-lime-500">{`Esta por comenzar`}</span>}
				</p>
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
