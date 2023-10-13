import { IStatusResponse, IUserInfo } from "../types/types"

export const IsLoggedUser = async (): Promise<{ isLogged: boolean, userInfo: IUserInfo }> => {
    try {
        const response = await fetch("/api/login", {
            method: "GET",
        })

        if (response.status === 200) {
            const responseData = await response.json()
            const userInfo = responseData.userInfo
            const isLogged = responseData.isLogged
            console.log(userInfo, isLogged)
            return { isLogged, userInfo }
        }
    } catch (error) {
        console.error(error)
        return { isLogged: false, userInfo: { uid: "", name: "", photo: "" } }
    }
    return { isLogged: false, userInfo: { uid: "", name: "", photo: "" } }
}