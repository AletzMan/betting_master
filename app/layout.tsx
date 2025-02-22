import "./globals.css"
import type { Metadata } from "next"
import { Jost } from "next/font/google"
import MaintenancePage from "./maintenance/page"
import Header from "./components/Header/Header"
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/arya-blue/theme.css";
import 'primeicons/primeicons.css';



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
				<PrimeReactProvider  >
					{<Header />}
					{children}
					{/*<MaintenancePage />*/}
				</PrimeReactProvider>
			</body>
		</html>
	)
}
