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
	bets: IPredictions[]
	setBets: (value: IPredictions[]) => void
	isEmpty: boolean
	setIsEmpty: (value: boolean) => void
	error: boolean
	setError: (value: boolean) => void
	typeError: "empty" | "name_short" | "name_empty" | ""
	setTypeError: (value: "empty" | "name_short" | "name_empty" | "") => void
}

const EmptyBets: IPredictions[] = []

export const useBet = create<BetState>((set) => ({
	bets: EmptyBets,
	setBets: (value: IPredictions[]) => set({ bets: value }),
	isEmpty: false,
	setIsEmpty: (value: boolean) => set({ isEmpty: value }),
	error: false,
	setError: (value: boolean) => set({ error: value }),
	typeError: "",
	setTypeError: (value: "empty" | "name_short" | "name_empty" | "") => set({ typeError: value }),
}))

interface INewBet {
	selectedTeams: IMatch[]
	setSelectedTeams: (value: IMatch[]) => void
	clearTeams: () => void
}

export const useNewBet = create<INewBet>((set) => ({
	selectedTeams: [],
	setSelectedTeams: (value: IMatch[]) => set({ selectedTeams: value }),
	clearTeams: () =>
		set({
			selectedTeams: [],
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
