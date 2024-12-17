import Link from "next/link"
import styles from "./styles.module.scss"
import { AppLogo, LogInIcon, LogOutIcon, MenuIcon } from "@/app/svg"
import { LinksPage } from "@/app/constants/constants"
import { usePathname } from "next/navigation"
import { auth } from "@/app/config/firebase"
import { useMenu } from "@/app/config/zustand-store"
import { Dispatch, MouseEvent, SetStateAction } from "react"
import { useLoggedUser } from "@/app/hooks/useLoggedUser"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import axios from "axios"

export function MenuPages() {
    const pathname = usePathname()
    const router = useRouter()
    const { openMenu, setOpenMenu } = useMenu()
    const { isLogged, setIsLogged, setUser } = useLoggedUser()

    const HandleClickDialog = (e: MouseEvent<HTMLDialogElement>) => {
        if ((e.target as HTMLElement).tagName === "DIALOG") {
            setOpenMenu(false)
        }
    }

    const HandleSignOut = async () => {
        try {
            await signOut(auth)
            const response = await axios.post("/api/logout")

            if (response.status === 200) {
                setUser({ uid: "", name: "", photo: "", email: "" })
                setIsLogged(false)
                setOpenMenu(false)
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <dialog className={`${styles.dialog} ${openMenu && styles.dialog_active}`} open={true} onClick={HandleClickDialog}>
            <nav
                className={`${styles.menu} `} >
                <button
                    className={`${styles.menuButton} `}
                    onClick={() => setOpenMenu(false)}>
                    <MenuIcon className={styles.menuButton_icon} />
                    <span className={styles.menuButton_name}>Menu</span>
                </button>
                <div className={styles.menu_links}>
                    {LinksPage.map((link, index) => index == 0 && (
                        <Link
                            className={`${styles.menu_link} ${link.pathname === pathname && styles.menu_linkActive}`}
                            key={link.id}
                            href={link.href}
                            title={link.title}>
                            {link.icon}
                            {link.text}
                        </Link>
                    ))}
                    <div className={styles.separator}>Pronósticos</div>
                    {LinksPage.map((link, index) => (index > 1 && index < 4) && (
                        <Link
                            className={`${styles.menu_link} ${link.pathname === pathname && styles.menu_linkActive}`}
                            key={link.id}
                            href={link.href}
                            title={link.title}>
                            {link.icon}
                            {link.text}
                        </Link>
                    ))}
                    <div className={styles.separator}>Equipos</div>
                    {LinksPage.map((link, index) => (index > 3 && index < 7) && (
                        <Link
                            className={`${styles.menu_link} ${link.pathname === pathname && styles.menu_linkActive}`}
                            key={link.id}
                            href={link.href}
                            title={link.title}>
                            {link.icon}
                            {link.text}
                        </Link>
                    ))}
                    <div className={styles.separator}>Cuenta</div>
                    {LinksPage.map((link, index) => index === 1 && (
                        <Link
                            className={`${styles.menu_link} ${link.pathname === pathname && styles.menu_linkActive}`}
                            key={link.id}
                            href={link.href}
                            title={link.title}>
                            {link.icon}
                            {link.text}
                        </Link>
                    ))}
                    {!isLogged && (
                        <Link href={!isLogged ? "auth/login" : "/logout"} className={styles.menu_link} title={"Ir a sección iniciar sesión"}>
                            <LogInIcon className={styles.menu_icon} />
                            {"Iniciar sesión"}
                        </Link>
                    )}
                    {isLogged && (
                        <button onClick={HandleSignOut} className={styles.menu_link} title={"Cerrar sesión"}>
                            <LogOutIcon className={styles.menu_icon} />
                            {"Cerrar sesión"}
                        </button>
                    )}
                </div>
            </nav>
        </dialog>
    )
}