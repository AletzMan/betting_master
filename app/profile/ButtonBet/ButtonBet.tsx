import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./buttonbet.module.scss"

const PREDICTIONS = ["-", "LV", "L", "E", "V"]

interface Props {
	actualPrediction: string
	onChange?: (value: string) => void
}

export function ButtonBet({ actualPrediction, onChange }: Props) {
	const [prediction, setPrediction] = useState(PREDICTIONS.indexOf(actualPrediction))

	const HandleSetPrediction = () => {
		if (prediction === 4) {
			setPrediction(0)
			if (onChange) {
				onChange(PREDICTIONS[0])
			}
		} else {
			let newPrediction = prediction
			newPrediction++
			setPrediction(newPrediction)
			if (onChange) {
				onChange(PREDICTIONS[newPrediction])
			}
		}
	}

	return (
		<button className={`flex items-center text-white text-shad justify-center w-full aspect-square h-full text-xl border-1 border-(--surface-100)  rounded-sm transition-all duration-200 
		${prediction === 0 && "bg-(--surface-d) hover:bg-(--surface-c)"}
		${prediction > 1 && "bg-green-600"} 
		${prediction === 1 && "bg-red-700"}`
		}
			onClick={HandleSetPrediction}>
			{PREDICTIONS[prediction]}		</button>
	)
}
