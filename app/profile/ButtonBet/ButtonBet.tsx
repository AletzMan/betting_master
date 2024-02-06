import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./buttonbet.module.scss"

const PREDICTIONS = ["-", "LV", "L", "E", "V"]

interface Props {
	setResultMatch: Dispatch<SetStateAction<string[]>>
	resultMatches: string[]
	index: number
	actualPrediction: string
}

export function ButtonBet(props: Props) {
	const { setResultMatch, index, resultMatches, actualPrediction } = props
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
		<button className={`${styles.button} ${prediction > 0 && styles.buttonActive}`} onClick={HandleSetPrediction}>
			{PREDICTIONS[prediction]}
		</button>
	)
}
