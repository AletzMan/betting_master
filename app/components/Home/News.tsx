/* eslint-disable @next/next/no-img-element */
import { QuinieleroLogo } from "@/svg"
import { Card } from "primereact/card"
import { TeamsSlides } from "./TeamsSlides"

export async function News() {


	return (
		<article className="relative flex flex-col items-center justify-center gap-3.5 w-full h-[calc(100svh-5em)]">
			<QuinieleroLogo className="w-37 h-37" />
			<h1 className="text-(--primary-color)">{"Bienvenido al Quinielero"}</h1>
			<Card className="flex items-center p-0 max-w-[calc(100svw-0.5em)]  sm:max-w-lg border-1 border-(--surface-d) overflow-hidden">
				<TeamsSlides />
			</Card>
		</article>
	)
}
