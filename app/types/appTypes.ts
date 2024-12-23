export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export interface IMessage {
    uid: string
    message: string
    username: string | null
    color: string
}
