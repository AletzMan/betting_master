import styles from "@/profile/profile.module.scss"
import { RevalidatePath, deleteUserByID } from "@/utils/fetchData"
import { enqueueSnackbar } from "notistack"
import { MouseEvent, Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { IUser } from "@/types/types"
import { SmallDateLocal } from "@/utils/helpers"
import { useSelecterUser } from "@/config/zustand-store"
import { IOpenDialog } from "./AdminNotifications"

interface Props {
    user: IUser
    index: number
    selectedView: number | null
    setSelectedView: Dispatch<SetStateAction<number | null>>
    setUsersData: Dispatch<SetStateAction<IUser[] | null>>
    setOpenDialog: Dispatch<SetStateAction<IOpenDialog>>
}

export function CardUser({ user, index, setUsersData, selectedView, setSelectedView, setOpenDialog }: Props) {
    const setSelectedUser = useSelecterUser((state) => state.setSelectedUser)


    const HandleViewDetails = (e: MouseEvent<HTMLElement>, index: number): void => {
        setSelectedUser(user)
        if ((e.target as HTMLElement).tagName === "ARTICLE") {
            if (index === selectedView) {
                setSelectedView(null)
            } else {
                setSelectedView(index)
            }
        }
    }

    const handleDeleteUser = async (uid: string, name: string) => {
        const responseDelete = confirm(`Desea eliminar al usuario: \n${name}`)
        if (responseDelete) {
            const response = await deleteUserByID(uid)
            if (response) {
                enqueueSnackbar("Usuario eliminado correctamente", { variant: "success" })
                RevalidatePath("users")
                setUsersData((prevData) =>
                    prevData!.filter(user =>
                        user.id !== uid
                    )
                )
            } else {
                enqueueSnackbar("Error al eliminar el usuario", { variant: "error" })
            }
        }
    }


    return (
        <article className={`${styles.users_user} ${selectedView === index && styles.users_userActive}`} key={user.id} onClick={(e) => HandleViewDetails(e, index)}>
            <div className={styles.users_data} >
                <Image className={styles.users_photo} src={user.image || ""} alt={`Imagen de perfil de ${user.name}`} width={70} height={70} />
                <div className={styles.users_group} >
                    <span className={`${styles.users_name} text-(--info-color)`}>{user.name}</span>
                    <span className={`${styles.users_email} text-gray-400`}>{user.email}</span>
                </div>
                <span className={`${styles.users_date} text-violet-300`}>{new Date(user?.last_login as Date).toLocaleDateString("es-MX", SmallDateLocal)}</span>
            </div>
            <div className={styles.users_stats}>
                <div className={styles.users_bets}>
                    <i className="pi pi-pen-to-square text-emerald-400" />
                    <span className={styles.users_label}>Quinielas</span>
                    <span className={`${styles.users_number} text-sky-300 font-semibold`}>{user.total_bets}</span>
                </div>
                <div className={styles.users_bets}>
                    <i className="pi pi-check-circle text-lime-400" />
                    <span className={styles.users_label}>Ganadoras</span>
                    <span className={`${styles.users_number} text-sky-300 font-semibold`}>{user.bets_won}</span>
                </div>
                <div className={styles.users_bets}>
                    <i className="pi pi-trophy text-amber-400" />
                    <span className={styles.users_label}>Finales</span>
                    <span className={`${styles.users_number} text-sky-300 font-semibold`}>{user.finals_won}</span>
                </div>
            </div>
            <div className={styles.users_options}>
                <div className={`flex items-center justify-center w-7 h-7 rounded-sm ${user.notifications ? "bg-(--background-info-color)" : "bg-transparent"}`} ><i className={`${styles.users_iconNoti} ${user.notifications && styles.users_iconNotiActive} ${user.notifications ? "pi pi-bell" : "pi pi-bell-slash opacity-60"}`} /></div>
                <button className="flex items-center justify-center w-7 h-7 bg-transparent hover:bg-(--surface-c) rounded-sm" onClick={() => setOpenDialog({ type: "sendNotification", isOpen: true })} > <i className={`${styles.users_iconEmail} pi pi-envelope`} /></button>
                <button className="flex items-center justify-center w-7 h-7 bg-transparent hover:bg-(--surface-c) hover:text-(--danger-color) rounded-sm" onClick={() => handleDeleteUser(user.id, user.name)}><i className={`${styles.users_iconDelete} pi pi-trash`} /></button>
            </div>
        </article>
    )
}