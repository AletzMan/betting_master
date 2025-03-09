"use client"
import { AppLogo, QuinieleroLogo } from "@/svg"
import { Card } from "primereact/card"
import { Suspense } from 'react'
import LoginOptions from "./LoginOptions"

export default function LoginPage() {

	return (
		<main className="flex flex-col items-center justify-start gap-y-4 mt-36  h-[calc(100svh-10em)]">
			<Card className="flex flex-col gap-2 items-center justify-center ">
				<div className="flex flex-col items-center gap-2">
					<QuinieleroLogo className="w-30 h-30" />
				</div>
				<Suspense>
					<LoginOptions />
				</Suspense>
			</Card>
		</main >
	)
}
