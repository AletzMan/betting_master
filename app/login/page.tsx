"use client"
import { AppLogo, GoogleIcon } from "@/svg"
import { signIn } from "next-auth/react"
import { Card } from "primereact/card"
import { Divider } from "primereact/divider"
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
					<h1 className=" font-extrabold text-xl px-2.5 py-0.5">Quinielas</h1>
				</div>
				<article className="flex flex-col gap-2.5 p-3 items-center w-full">
					<Divider >
						<span className="">Inicia sesión para crear tus quinielas.</span>
					</Divider>
					<button type="button" className="flex flex-row items-center gap-2.5 w-full max-w-65 bg-(--surface-b) border-1 border-(--surface-d) rounded-md py-2.5 px-5 hover:bg-(--surface-e) cursor-pointer" onClick={() => HandleSignInWithGoogle("google")} >
						<GoogleIcon className="w-6 h-6" />
						Continuar con Google
					</button>
					{/*<Button className="w-full max-w-57" label="Continuar con X" severity="secondary" icon="pi pi-twitter" onClick={() => HandleSignInWithGoogle("twitter")} />*/}
					<Divider />
				</article>
			</Card>
		</main >
	)
}
