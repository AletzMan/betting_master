"use client"
import { Teams, TeamsLogos, TeamsLogosNews } from "@/app/constants/constants";
import { INews } from "@/app/types/types";
import { findFirstMatch } from "@/app/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import React, { ReactSVGElement } from "react";

interface PropsNews {
    news: INews[]
}




export default function CarouselNews({ news }: PropsNews) {

    return (
        <section  >
            {<Carousel value={news} itemTemplate={NewsTemplate} numVisible={3} numScroll={3} autoplayInterval={3000} circular />}
        </section>
    )
}

const NewsTemplate = (news: INews) => {
    return (
        <Card className="flex flex-col w-3xs" header={header(news.titulo)} >
            <Link href={news.url}>
                <h3  >{news.titulo}</h3>
            </Link>
        </Card>
    )
}

const header = (title: string) => {
    return (

        <div className="flex flex-row">
            {React.isValidElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo) ? (
                React.cloneElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo as ReactSVGElement, { className: 'w-[4em] h-[4em]' })
            ) : (
                <Image className="w-7 h-7 object-cover" src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bettinggame/ligamx.png" alt="logo" width={10} height={10} />
            )}
            <span  >{TeamsLogos.find(team => team.name === findFirstMatch(title, Teams))?.name}</span>
        </div>
    )
}
