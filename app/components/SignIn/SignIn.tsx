
import styles from "./signin.module.scss"
import { AppLogo, LuckIcon } from "@/app/svg"
import { TeamsSlides } from "../TeamsSlides/TeamsSlides"
import { Button } from "../Button/Button"
import { GetNewsLigaMX } from "@/app/services/fetch_utils"
import Link from "next/link"
import { findFirstMatch } from "@/app/utils/helpers"
import { Teams, TeamsLogos } from "@/app/constants/constants"

export async function SignIn() {
	//const news = await GetNewsLigaMX()
	//console.log(news)
	const news = [
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760f378ca47411d498b459a.html',
			titulo:
				'Pollo Briseño, de \'villano\' con Chivas a diablo con el Toluca de Antonio Mohamed'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760ee15268e3ea9698b4586.html',
			titulo: 'Antonio Mohamed llega renovado al Toluca: "Ganar la final"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760e184ca47411a7f8b4586.html',
			titulo:
				'¡Fichaje frustrado! Cruz Azul pierde a Facundo Torres, quien firma con Palmeiras'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760d87e268e3e7d108b459e.html',
			titulo:
				'Final Copa Intercontinental: En el Pachuca vs Real Madrid, Chaka Rodríguez será el único futbolista de Liga MX con dos finales mundiales'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760d3ae46163fc4a08b4589.html',
			titulo:
				'Antonio Pérez, hermano de \'Checo\', lanza fuerte crítica al tricampeonato del América: "Me ca%@ ver campeón al América"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760d397ca4741112e8b45cd.html',
			titulo:
				'¡Igor Lichnovsky \'más\' que América! El primer tetracampeón de Liga MX en torneos cortos'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760c60146163fae208b4591.html',
			titulo:
				'América después del tricampeonato: Dos bajas confirmadas y nuevos desafíos en el Clausura 2025'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760bd17e2704e69b88b45b7.html',
			titulo:
				'Emilio Azcarraga abrirá cartera para reforzar al América tricampeón desde la Copa Intercontinental'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760bc4e268e3e76448b45a3.html',
			titulo:
				'"No cualquiera": Iván Rodríguez se toma con humor ser campeón con América sin jugar'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760b807ca4741357c8b4599.html',
			titulo:
				'André Jardine aplica un Carlo Ancelotti en festejo del tricampeonato de América'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/17/6760b4ca22601d9a648b45cc.html',
			titulo:
				'Hugo Sánchez ningunea tricampeonato del América: "No es el más grande"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/67608d5d22601dc7558b4574.html',
			titulo:
				'¿Cuánto vale el Chino Huerta? Salario, estadísticas con Pumas y los equipos de Europa que buscarían ficharlo'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/67606c0d22601dd7178b4572.html',
			titulo: 'Chicote Calderón se burla de Chivas en tricampeonato del América'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/676054b322601d63578b4590.html',
			titulo:
				'La \'Maldición Miguel Samudio\' surte efecto contra Rayados: "Hay un Dios"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/6760394d22601d835e8b45b0.html',
			titulo: 'Henry Martín juega Final ante Rayados con fractura'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fc12eca4741290d8b4578.html',
			titulo:
				'\'Echan\' al América con aspersores de la cancha del estadio de Monterrey en pleno festejo del tricampeonato'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fbc75268e3ede7c8b458e.html',
			titulo: 'Todas las marcas del América tricampeón en Liga MX'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fabe746163fea658b4570.html',
			titulo: 'Campeones Liga MX: América tricampeón y todos los títulos'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fb409ca474197088b4573.html',
			titulo:
				'Jonathan Dos Santos: "Esto es para mi papá que me enseñó lo que significa el América"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675facd246163f671e8b4578.html',
			titulo:
				'Alejandro Zendejas, "perdido" en Chivas y Selección Mexicana, a la locura con América tricampeón'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675faaad268e3e4a5b8b4583.html',
			titulo:
				'Martín Demichelis lamenta tardía reacción de Monterrey: "Ese gol llegó tarde"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/opinion/2024/12/16/675fb04cca47415e628b4580.html',
			titulo: 'América tricampeón: el vuelo eterno'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fac6eca4741193c8b4576.html',
			titulo:
				'André Jardine: "No nos consideraban favoritos pero sabíamos que éramos capaces de ser muy competitivos"'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fa32dca47417c208b457e.html',
			titulo:
				'El América Tricampeón muestra a la Liga MX que la grandeza no solo es de títulos'
		},
		{
			url:
				'https://www.marca.com/mx/futbol/liga-mx/2024/12/16/675fa77a22601d5e658b457f.html',
			titulo:
				'América Tricampeón y ¿André Jardine el mejor técnico en la historia del club?'
		}
	]

	return (
		<article className={`${styles.signIn} `}>
			<AppLogo className={styles.signIn_logo} />
			<h1 className={styles.signIn_title}>{"Bienvenido a Betting Master"}</h1>
			<p className={styles.signIn_paragraph}>¡Apuesta por tus favoritos y disfruta del fútbol!</p>
			<section className={styles.logos}>
				<TeamsSlides />
			</section>
			<h2 className={styles.title}>Noticias</h2>
			<section className={`${styles.news} scrollbar`}>
				{news.length > 0 && news?.map((notice, index) => (
					<Link key={notice.titulo} className={styles.news_notice} href={notice.url}>
						<div className={styles.news_logo}>
							{TeamsLogos.find(team => team.name === findFirstMatch(news[index].titulo, Teams))?.logo}
							<span className={styles.news_team}>{TeamsLogos.find(team => team.name === findFirstMatch(news[index].titulo, Teams))?.name}</span>
						</div>
						<h3 className={styles.news_title}>{notice.titulo}</h3>
					</Link>
				))

				}
			</section>
		</article>
	)
}
