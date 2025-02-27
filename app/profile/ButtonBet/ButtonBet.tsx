import { Dispatch, SetStateAction, useState } from "react"

const PREDICTIONS = ["-", "LV", "L", "E", "V"]

interface Props {
	setResultMatch: Dispatch<SetStateAction<string[]>>
	resultMatches: string[]
	index: number
	actualPrediction: string
}

export function ButtonBet({ setResultMatch, index, resultMatches, actualPrediction }: Props) {
	const [prediction, setPrediction] = useState(PREDICTIONS.indexOf(actualPrediction))

	const HandleSetPrediction = () => {
		if (prediction === 4) {
			setPrediction(0)
		} else {
			setPrediction((prev) => prev + 1)
		}
		if (resultMatches?.length > 0) {
			let newArray = [...resultMatches]
			newArray.splice(index, 1, PREDICTIONS[prediction + 1] || "-")
			setResultMatch(newArray)
		}
	}

	return (
		<button className={`flex items-center justify-center w-full aspect-square h-full text-xl border-1 border-(--surface-100) bg-(--surface-50) rounded-sm transition-all duration-200 hover:bg-(--surface-a) ${prediction > 0 && "bg-(--surface-b)"}`} onClick={HandleSetPrediction}>
			{PREDICTIONS[prediction]}
		</button>
	)
}
