/* eslint-disable @next/next/no-img-element */
import { AppLogo } from "@/svg"
import { GetNewsLigaMX } from "@/services/fetch_utils"
import { Card } from "primereact/card"
import CarouselNews from "./CarouselNews"
import { Tag } from "primereact/tag"
import { TeamsSlides } from "./TeamsSlides"

export async function News() {

	//const news = await GetNewsLigaMX()
	const news = [
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b8ec9e46163f5d9b8b45a6.html",
			"titulo": "Armando Archundia ahora sí finiquita su adiós de la Comisión de Árbitros"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b8901546163ffe308b459f.html",
			"titulo": "Dónde ver Necaxa-Mazatlán y Puebla-Tijuana: horarios y pronósticos juegos hoy Liga MX 2025 | Viernes Botanero"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b8952aca4741907b8b45b2.html",
			"titulo": "¿Qué partidos hay hoy en la Liga MX? Horarios y dónde ver en vivo la Jornada 8 del Clausura 2025 mexicano"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b8cb1d46163f5d9b8b4587.html",
			"titulo": "Sergio Ramos, a honrar su '93' y capitanía ante el hermano del Atlético de Madrid"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b80810ca47412b0c8b45ac.html",
			"titulo": "Chivas: Alan Mozo en el ojo del huracán, el jugador promueve apuestas ¿Será investigado por la FMF?"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7dc86268e3e28778b458a.html",
			"titulo": "Jardine revela lo que realmente pasó con Valdés: ¿qué hay detrás de su mal momento con América?"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7d58ee2704ec2798b457e.html",
			"titulo": "Cruz Azul le cumple a Martín Anselmi y lo demanda ante el TAS por irse al Porto"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7d374268e3eaf3c8b456c.html",
			"titulo": "América y todas sus playeras Adidas, que vuelve a vestir al Tricampeón"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7cf4dca4741d96c8b45a0.html",
			"titulo": "¿Y qué pasó? Idrissi cuenta su verdad: América sí contactó a Pachuca para ficharlo"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7c553268e3e79718b45b1.html",
			"titulo": "Lichnovsky tiene alta médica en América, pero no todas son buenas noticias"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7cb7646163f31298b45b4.html",
			"titulo": "Tigres por Cristiano Ronaldo para opacar a Sergio Ramos en Rayados, pide Samuel García"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7bd55268e3e7a218b458b.html",
			"titulo": "Jardine y América buscan imitar estilo Guardiola y Mourinho juntos"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7b628e2704e171f8b457c.html",
			"titulo": "Muere hermano de Carlos Hermosillo: ¿Quién es Heriberto Hermosillo?"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/21/67b7b84e22601d475a8b4587.html",
			"titulo": "Alejandro Zendejas brilla en América al nivel de Raúl Jiménez"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b7a8b022601db9088b459c.html",
			"titulo": "Chivas no convence y pierde jugador por la MLS: Óscar García se queda sin Fidel Barajas"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b79d1e22601dff5f8b45c1.html",
			"titulo": "James Rodríguez vs Gignac: James le anota al América y ahora apunta contra Tigres"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b78fce268e3ebd728b4573.html",
			"titulo": "James Rodríguez levanta queja pública sobre calendarios Liga MX: \"Ponen partidos cada tres días\""
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b78dcbe2704eab608b458a.html",
			"titulo": "Alan Pulido y sus polémicas dentro y fuera de la cancha: equipos, novias, secuestro y más"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b77218268e3e1f208b45f5.html",
			"titulo": "Sergio Ramos se reencuentra con su ex: Rayados vs Sevilla, uno de los dos amistosos que cerraría Tato Noriega"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b7695ee2704ea5408b4590.html",
			"titulo": "¿Cómo le fue a Leo Suárez en América? Cómo va su recuperación y cuándo podría volver a jugar con Pumas"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b773abe2704e76a78b459c.html",
			"titulo": "Cruz Azul pone boletos al 2x1 ante Querétaro: Precio y dónde comprar"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b750ebca4741e0698b45f2.html",
			"titulo": "América vuelve a las tres franjas: Primer jersey causará nostalgia azulcrema"
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b747e0ca47415d1c8b45d4.html",
			"titulo": "Tano Ortiz tira la toalla con Santos: \"Anímicamente estamos por el piso\""
		},
		{
			"url": "https://www.marca.com/mx/futbol/liga-mx/2025/02/20/67b6c047ca474140758b45bc.html",
			"titulo": "Efecto James Rodríguez: Aficionadas colombianas se niegan a salir del estadio hasta poder ver al '10' de la Fiera"
		}
	]

	return (
		<article className="relative flex flex-col items-center justify-center gap-3.5 w-full h-[calc(100svh-5em)]">
			<AppLogo className="w-18" />
			<h1 className="text-blue-300">{"Bienvenido a Betting Master"}</h1>
			<Card className="flex items-center p-0 max-w-[calc(100svw-0.5em)]  sm:max-w-lg border-1 border-(--surface-d) overflow-hidden">
				<TeamsSlides />
			</Card>
			<Tag severity="info">Noticias</Tag>
			<CarouselNews news={news} />
		</article>
	)
}
