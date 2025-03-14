/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link"
import { LinksPage } from "@/constants/constants"
import { usePathname } from "next/navigation"
import { useMenu } from "@/config/zustand-store"
import { signOut, useSession } from "next-auth/react"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { QuinieleroLogo } from "@/svg"
import { useEffect } from "react"

export function MenuPages() {
    const pathname = usePathname()
    const { openMenu, setOpenMenu } = useMenu()
    const session = useSession()

    useEffect(() => {
        setOpenMenu(false)
    }, [pathname])

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
                <nav className="relative h-full max-w-60">
                    <Button
                        label="Menu" icon="pi pi-bars"
                        text severity="info" size="large"
                        onClick={() => setOpenMenu(false)}>
                    </Button>
                    <div className="flex flex-col items-center justify-start w-full  py-1 px-4 gap-1 border-t-1 border-dashed border-(--surface-c)">
                        {LinksPage.map((link, index) => index <= 1 && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5 items-center text-sm rounded-sm  hover:bg-(--surface-c) hover:text-(--text-color) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-b) " : "transparent pointer-events-auto text-(--secondary-color) "}`}
                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        <Divider align="left"><span className="text-(--secondary-color) font-light italic">Pronósticos</span></Divider>
                        {LinksPage.map((link, index) => (index > 2 && index < 5) && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5  items-center text-sm rounded-sm hover:bg-(--surface-c) hover:text-(--text-color) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-b) " : "transparent pointer-events-auto text-(--secondary-color) "}`}
                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        <Divider align="left"><span className="text-(--secondary-color) font-light italic" >Equipos</span></Divider>
                        {LinksPage.map((link, index) => (index > 4 && index < 8) && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5  items-center text-sm rounded-sm  hover:bg-(--surface-c) hover:text-(--text-color) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-b) " : "transparent pointer-events-auto text-(--secondary-color) "}`}

                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        <Divider align="left"><span className="text-(--secondary-color) font-light italic" >Cuenta</span></Divider>
                        {LinksPage.map((link, index) => index === 2 && (
                            <Link
                                className={`flex flex-row gap-3.5 p-1.5  items-center text-sm rounded-sm  hover:bg-(--surface-c) hover:text-(--text-color) font-bold w-full ${link.pathname === pathname ? "bg-(--primary-color) ml-6 pointer-events-none text-(--surface-b) " : "transparent pointer-events-auto text-(--secondary-color) "}`}

                                key={link.id}
                                href={link.href}
                                title={link.title}>
                                {link.icon}
                                {link.text}
                            </Link>
                        ))}
                        {session.status === "unauthenticated" && (
                            <Link href={"/login"} className={`flex flex-row gap-3.5 p-1.5 text-sm  items-center rounded-sm  hover:bg-(--surface-c) hover:text-(--text-color) text-(--secondary-color) font-bold w-full `}
                                title={"Ir a sección iniciar sesión"}>
                                <i className="pi pi-sign-in" style={{ fontSize: '1.25rem' }} />
                                {"Iniciar sesión"}
                            </Link>
                        )}
                        {session.status === "authenticated" && (
                            <button onClick={HandleSignOut} className={`flex flex-row gap-3.5 p-1.5 text-sm  items-center rounded-sm text-(--secondary-color) hover:bg-(--surface-c) hover:text-(--text-color) font-bold w-full `}>
                                <i className="pi pi-sign-out" style={{ fontSize: '1.25rem' }} />
                                {"Cerrar sesión"}
                            </button>
                        )}
                    </div>
                    <div className="absolute bottom-4 left-4 flex flex-row items-end gap-2.5">
                        <QuinieleroLogo className="w-20 h-20" />
                        <span className="text-(--surface-c)">By Alejandro Garcia</span>
                    </div>
                </nav>
            } />
    )
}

