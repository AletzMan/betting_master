/* eslint-disable @next/next/no-img-element */
import { QuinieleroLogo } from "@/svg"
import { Card } from "primereact/card"
import Link from "next/link"
import Image from "next/image"
import React, { ReactSVGElement } from "react"
import { Teams, TeamsLogosNews } from "@/constants/constants"
import { findFirstMatch } from "@/utils/helpers"
import { GetNewsLigaMX } from "@/services/fetch_utils"

export default async function Page() {

    const news = await GetNewsLigaMX()
    /*const news = [
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
    ]*/

    return (
        <article className="relative flex flex-col items-center justify-start pt-7 gap-3.5 w-full h-svh p-1">
            <QuinieleroLogo className="w-25 h-25" />
            <h1 className="w-full bg-(--surface-c) py-2 rounded-sm text-center">Noticias</h1>
            <section className="flex flex-row flex-wrap justify-center gap-6 w-full bg-(--surface-g) border-1 border-(--surface-c) border-dashed rounded-sm p-2 h-full scrollbar">
                {news.map(pageNew => (
                    <Card
                        key={pageNew.titulo}
                        className="flex flex-col w-full overflow-hidden max-sm:w-1/1 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 border border-gray-600 hover:border-gray-400"
                        header={header(pageNew.titulo)}
                    >
                        <Link href={pageNew.url} className="bg-amber-950">
                            <h3 className="text-sm font-normal">{pageNew.titulo}</h3>
                        </Link>
                    </Card>
                ))}
            </section>
        </article>
    )
}

const header = (title: string) => {
    return (

        <div className="grid grid-cols-[2.5em_3fr] gap-2.5 items-center justify-start px-2 py-2 bg-(--surface-b) border-b-1 border-b-(--surface-c)">
            {React.isValidElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo) ? (
                React.cloneElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo as ReactSVGElement, { className: 'w-7 h-7' })
            ) : (
                <Image className="w-8 h-8 object-contain justify-self-start" src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bettinggame/ligamx.png" alt="logo" width={10} height={10} />
            )}
            {React.isValidElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo) ?
                <span className="text-(--text-color) font-semibold" >{findFirstMatch(title, Teams)}</span>
                : <span className="text-(--text-color) font-semibold">Liga MX</span>}
        </div>
    )
}
