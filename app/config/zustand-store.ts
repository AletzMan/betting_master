import { User } from "firebase/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ICurrentMatch, IMatch, IPredictions, IUserInfo, Teams } from "../types/types"
import { Nullable } from "primereact/ts-helpers"

type IUser = {
	user: IUserInfo
	setUser: (value: IUserInfo) => void
}

export const useUser = create(
	persist<IUser>(
		(set) => ({
			user: { uid: "", name: "", photo: "", email: "" },
			setUser: (value: IUserInfo) => set((state) => ({ user: value })),
		}),
		{
			name: "user_soccer",
		}
	)
)

interface BetState {
	bets: string[]
	setBets: (value: string[]) => void
}

const EmptyBets: string[] = []

export const useBet = create<BetState>((set) => ({
	bets: EmptyBets,
	setBets: (value: string[]) => set({ bets: value }),
}))



interface IUpdateBets {
	updateBets: boolean
	setUpdateBets: (value: boolean) => void
}


export const useUpdateBets = create<IUpdateBets>((set) => ({
	updateBets: false,
	setUpdateBets: (value: boolean) => set({ updateBets: value }),
}))

interface INewBet {
	bettingMatches: IMatch[]
	setBettingMatches: (value: IMatch[]) => void
	clearBettingMatches: () => void
}

export const useNewBet = create<INewBet>((set) => ({
	bettingMatches: [],
	setBettingMatches: (value: IMatch[]) => set({ bettingMatches: value }),
	clearBettingMatches: () =>
		set({
			bettingMatches: [],
		}),
}))

interface IDialogMenu {
	openMenu: boolean
	setOpenMenu: (value: boolean) => void
}

export const useMenu = create<IDialogMenu>((set) => ({
	openMenu: false,
	setOpenMenu: (value: boolean) => set({ openMenu: value }),
}))
