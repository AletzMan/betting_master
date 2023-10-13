import { User } from 'firebase/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserInfo } from '../types/types'

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