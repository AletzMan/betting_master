import { useState } from "react";
import { Teams } from "../types/types";

export function useValidateNewBet(dataMatches: Teams[], dataDates: string[]) {
    const [errorMatches, setErrorMatches] = useState<Teams>({ home: NaN, away: NaN })
    const [errorDates, setErrorDates] = useState<string[]>([])

    return {
        errorMatches,
        errorDates
    }
}