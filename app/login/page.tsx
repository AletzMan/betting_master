"use client"
import { AppLogo } from "@/svg"
import { Card } from "primereact/card"
import { Suspense } from 'react'
import LoginOptions from "./LoginOptions"

export default function LoginPage() {

	return (
		<main className="flex flex-col items-center justify-start gap-y-4 mt-36  h-[calc(100svh-10em)]">
			<Card className="flex flex-col gap-2 items-center justify-center ">
				<div className="flex flex-col items-center gap-2">
					<AppLogo className="w-20 h-20" />
					<h1 className=" font-extrabold text-xl px-2.5 py-0.5">Quinielas</h1>
				</div>
				<Suspense>
					<LoginOptions />
				</Suspense>
			</Card>
		</main >
	)
}
