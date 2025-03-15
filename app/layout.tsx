import type { Metadata } from "next"
import { Handjet, Jost, Keania_One, Oxanium } from "next/font/google"
import MaintenancePage from "./maintenance/page"
import "./globals.css"
import Header from "./components/Header"
import { PrimeReactProvider } from 'primereact/api';
//import "primereact/resources/themes/lara-dark-cyan/theme.css";
//import "primereact/resources/themes/mdc-dark-indigo/theme.css";
//import "primereact/resources/themes/arya-blue/theme.css";
//import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primereact/resources/themes/viva-dark/theme.css";

import 'primeicons/primeicons.css';
import { SessionProvider } from "next-auth/react"
import { QuinieleroLogo } from "./svg"



const fontJost = Jost({
	variable: "--font-jost",
	subsets: ["latin"],
});

const fontHandjet = Oxanium({
	variable: "--font-handjet",
	subsets: ["latin"],
});


export const metadata: Metadata = {
	title: "Quiniela y Resultados",
	description: "Resultados de las principales ligas del mundo así como apuestas en la liga MX",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${fontJost.variable} ${fontHandjet.variable}`}>
				<QuinieleroLogo className="absolute w-80 h-80 left-[calc(50%-10rem)] top-[calc(50%-10rem)] opacity-1 -z-10" />
				<SessionProvider>
					<PrimeReactProvider  >
						{/*<Header />*/}
						{/*children*/}
						{<MaintenancePage />}
					</PrimeReactProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
