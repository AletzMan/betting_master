"use client"
import { Teams, TeamsLogosNews } from "@/constants/constants";
import { INews } from "@/types/types";
import { findFirstMatch } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import React, { ReactSVGElement } from "react";

interface PropsNews {
    news: INews[]
}

const responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 4
    },
    {
        breakpoint: '980px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '500px',
        numVisible: 2,
        numScroll: 2
    }
];


export default function CarouselNews({ news }: PropsNews) {



    return (
        <section className="w-svw  sm:w-[calc(100svw-1em)]] max-w-7xl">
            {<Carousel value={news} itemTemplate={NewsTemplate} numVisible={5} numScroll={1} autoplayInterval={8000} responsiveOptions={responsiveOptions} />}
        </section>
    )
}

const NewsTemplate = (news: INews) => {
    return (
        <Card className="flex flex-col  w-34 sm:w-42 h-full max-h-65 border-1  border-gray-600 hover:border-gray-400" header={header(news.titulo)} >
            <Link href={news.url} className="bg-amber-950">
                <h3 className="text-sm font-normal">{news.titulo}</h3>
            </Link>
        </Card>
    )
}



const header = (title: string) => {
    return (

        <div className="grid grid-cols-[1fr_3fr] gap-2.5 items-center justify-start px-2 py-2 bg-(--surface-f)">
            {React.isValidElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo) ? (
                React.cloneElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo as ReactSVGElement, { className: 'w-7 h-7' })
            ) : (
                <Image className="w-8 h-8 object-contain" src="https://raw.githubusercontent.com/AletzMan/ImagesStorage/refs/heads/main/bettinggame/ligamx.png" alt="logo" width={10} height={10} />
            )}
            {React.isValidElement(TeamsLogosNews.find(team => team.name === findFirstMatch(title, Teams))?.logo) ?
                <span  >{findFirstMatch(title, Teams)}</span>
                : <span>Liga MX</span>}
        </div>
    )
}
