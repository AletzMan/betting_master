/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useUser } from "../config/zustand-store"
import { IUserInfo } from "../types/types"
import { IsLoggedUser } from "../services/fetch_utils"
import { useSession } from "next-auth/react"

export function useLoggedUser() {
	const [isLogged, setIsLogged] = useState(false)
	const { user, setUser } = useUser()
	const [userLocal, setUserLocal] = useState<IUserInfo>({
		uid: "",
		name: "",
		photo: "",
		email: "",
	})

	useEffect(() => {
		const LoggedUser = async () => {
			const response = await IsLoggedUser()
			setIsLogged(response.isLogged)
			setUser(response.userInfo)
			return response
		}
		LoggedUser()
	}, [])

	useEffect(() => {
		setUserLocal(user)
		if (user.name !== "") {
			setIsLogged(true)
		}
	}, [user])
	return {
		isLogged,
		userLocal,
		setUser,
		setIsLogged,
	}
}
