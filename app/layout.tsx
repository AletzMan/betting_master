import "./globals.css"
import type { Metadata } from "next"
import { Jost } from "next/font/google"
import { Header } from "./components/Header/Header"
import MaintenancePage from "./maintenance/page"

const montserrat = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Quiniela y Resultados",
	description: "Resultados de las principales ligas del mundo así como apuestas en la liga MX",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				{<Header />}
				{children}
				{/*<MaintenancePage />*/}
			</body>
		</html>
	)
}
