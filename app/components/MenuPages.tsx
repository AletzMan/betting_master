import Link from "next/link"
import { LinksPage } from "@/constants/constants"
import { usePathname } from "next/navigation"
import { useMenu } from "@/config/zustand-store"
import { signOut, useSession } from "next-auth/react"
import { Sidebar } from "primereact/sidebar"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { QuinieleroLogo } from "@/svg"

export function MenuPages() {
    const pathname = usePathname()
    const { openMenu, setOpenMenu } = useMenu()
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
                <nav className="relative h-full">
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
                        <Divider align="left"><span className="text-(--secondary-color) font-light italic">Pronósticos</span></Divider>
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
                        <Divider align="left"><span className="text-(--secondary-color) font-light italic" >Equipos</span></Divider>
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
                        <Divider align="left"><span className="text-(--secondary-color) font-light italic" >Cuenta</span></Divider>
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
                    <div className="absolute bottom-4 left-4 flex flex-row items-end gap-2.5">
                        <QuinieleroLogo className="w-20 h-20" />
                        <span className="text-(--surface-c)">By Alejandro Garcia</span>
                    </div>
                </nav>
            } />
    )
}

