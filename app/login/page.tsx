"use client"
import { AppLogo } from "@/svg"
import { signIn } from "next-auth/react"
import { Card } from "primereact/card"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/';
	const HandleSignInWithGoogle = (provider: string) => {

		signIn(provider, { redirect: true, redirectTo: callbackUrl });
	}



	return (
		<main className="flex flex-col items-center justify-start gap-y-4 mt-36  h-[calc(100svh-10em)]">
			<Card className="flex flex-col gap-2 items-center justify-center ">
				<div className="flex flex-col items-center gap-2">
					<AppLogo className="w-20 h-20" />
					<span className="bg-(--surface-d)  rounded-sm px-2.5 py-0.5">Iniciar Sesión</span>
				</div>
				<article className="flex flex-col gap-2.5 p-3 items-center">
					<Divider >
						<span className="">Elige una opción para iniciar sesión.</span>
					</Divider>
					<Button className="w-full max-w-57" label="Continuar con Google" severity="danger" icon="pi pi-google" onClick={() => HandleSignInWithGoogle("google")} />
					{/*<Button className="w-full max-w-57" label="Continuar con X" severity="secondary" icon="pi pi-twitter" onClick={() => HandleSignInWithGoogle("twitter")} />*/}
					<Divider />
				</article>
			</Card>
		</main >
	)
}
