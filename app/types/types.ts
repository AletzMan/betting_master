export type IUserInfo = {
    uid: string
    name: string | null
    photo: string | null
}

export interface IStatusResponse extends Response {
    isLogged: true,
    userInfo: {
        uid: string,
        name: string,
        photo: string
    }
}