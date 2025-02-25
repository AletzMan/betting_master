import Link from "next/link"
import { LinksPage } from "@/app/constants/constants"
import { usePathname } from "next/navigation"
import { useMenu } from "@/app/config/zustand-store"
import { MouseEvent } from "react"
import { useLoggedUser } from "@/app/hooks/useLoggedUser"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"

export function MenuPages() {
    const pathname = usePathname()
    const router = useRouter()
    const { openMenu, setOpenMenu } = useMenu()
    const { isLogged, setIsLogged, setUser } = useLoggedUser()
    const session = useSession()
    const HandleSignOut = async () => {
        try {
            await signOut({ redirect: true, redirectTo: "/" })
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <Sidebar
            visible={openMenu}
            onHide={() => setOpenMenu(false)}
            content={
                <nav >
                    <Button
                        label="Menu" icon="pi pi-bars"
                        text severity="info" size="large"
                        onClick={() => setOpenMenu(false)}>
                    </Button>
                    <div className="flex flex-col items-center justify-start w-full mt-8 py-1 px-4 gap-1.5">
                        {LinksPage.map((link, index) => index == 0 && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5 items-center rounded-sm hover:bg-(--surface-d) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-50) " : "transparent pointer-events-auto text-(--surface-800) "}`}
                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        <Divider align="left"><span className="text-gray-400 font-light italic">Pronósticos</span></Divider>
                        {LinksPage.map((link, index) => (index > 1 && index < 4) && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5  items-center rounded-sm hover:bg-(--surface-d) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-50) " : "transparent pointer-events-auto text-(--surface-800) "}`}
                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        <Divider align="left"><span className="text-gray-400 font-light italic" >Equipos</span></Divider>
                        {LinksPage.map((link, index) => (index > 3 && index < 7) && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5  items-center rounded-sm hover:bg-(--surface-d) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-50) " : "transparent pointer-events-auto text-(--surface-800) "}`}

                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        <Divider align="left"><span className="text-gray-400 font-light italic" >Cuenta</span></Divider>
                        {LinksPage.map((link, index) => index === 1 && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5  items-center rounded-sm hover:bg-(--surface-d) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-50) " : "transparent pointer-events-auto text-(--surface-800) "}`}

                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        {session.status === "unauthenticated" && (
                            <Link href={"/login"} className={`flex flex-row gap-3.5 p-1.5  items-center rounded-sm hover:bg-(--surface-d) font-bold w-full `}
                                title={"Ir a sección iniciar sesión"}>
                                <i className="pi pi-sign-in" style={{ fontSize: '1.25rem' }} />
                                {"Iniciar sesión"}
                            </Link>
                        )}
                        {session.status === "authenticated" && (
                            <button onClick={HandleSignOut} className={`flex flex-row gap-3.5 p-1.5  items-center rounded-sm hover:bg-(--surface-d) font-bold w-full `}>
                                <i className="pi pi-sign-out" style={{ fontSize: '1.25rem' }} />
                                {"Cerrar sesión"}
                            </button>
                        )}
                    </div>
                </nav>
            } />
    )
}

