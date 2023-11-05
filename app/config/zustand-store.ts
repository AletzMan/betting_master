import { User } from 'firebase/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserInfo, Teams } from '../types/types'

type IUser = {
    user: IUserInfo
    setUser: (value: IUserInfo) => void
}

export const useUser = create(
    persist<IUser>(
        (set) => ({
            user: { uid: "", name: "", photo: "" },
            setUser: (value: IUserInfo) => set((state) => ({ user: value })),
        }),
        {
            name: "user_soccer"
        }
    )
)


interface BetState {
    bets: string[]
    setBets: (value: string[]) => void
    isEmpty: boolean
    setIsEmpty: (value: boolean) => void
    error: boolean
    setError: (value: boolean) => void
    typeError: "empty" | "name_short" | "name_empty" | ""
    setTypeError: (value: "empty" | "name_short" | "name_empty" | "") => void

}


export const useBet = create<BetState>((set) => ({
    bets: ["", "", "", "", "", "", "", "", ""],
    setBets: (value: string[]) => set({ bets: value }),
    isEmpty: false,
    setIsEmpty: (value: boolean) => set({ isEmpty: value }),
    error: false,
    setError: (value: boolean) => set({ error: value }),
    typeError: "",
    setTypeError: (value: "empty" | "name_short" | "name_empty" | "") => set({ typeError: value }),
}))



interface INewBet {
    selectedTeams: Teams[]
    setSelectedTeams: (value: Teams[]) => void
    selectedDates: string[]
    setSelectedDates: (value: string[]) => void
    clearTeams: () => void
    clearDates: () => void
}


export const useNewBet = create<INewBet>((set) => ({
    selectedTeams: [{ home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }],
    setSelectedTeams: (value: Teams[]) => set({ selectedTeams: value }),
    selectedDates: ["", "", "", "", "", "", "", "", "",],
    setSelectedDates: (value: string[]) => set({ selectedDates: value }),
    clearTeams: () => set({ selectedTeams: [{ home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }, { home: NaN, away: NaN }] }),
    clearDates: () => set({ selectedDates: ["", "", "", "", "", "", "", "", ""] }),
}))