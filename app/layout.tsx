import "./globals.css"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Header } from "./components/Header/Header"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Quiniela y Resultados",
	description: "Resultados de las principales ligas del mundo así como apuestas en la liga MX",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Header />
				{children}
			</body>
		</html>
	)
}
