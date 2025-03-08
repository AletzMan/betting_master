import type { Metadata } from "next"
import { Jost } from "next/font/google"
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



const fontJost = Jost({
	variable: "--font-jost",
	subsets: ["latin"],
});


export const metadata: Metadata = {
	title: "Quiniela y Resultados",
	description: "Resultados de las principales ligas del mundo así como apuestas en la liga MX",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={fontJost.variable}>
				<SessionProvider>
					<PrimeReactProvider  >
						{<Header />}
						{children}
						{/*<MaintenancePage />*/}
					</PrimeReactProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
