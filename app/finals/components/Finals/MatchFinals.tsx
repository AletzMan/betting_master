import { IFinalsParticipants } from "@/types/types"
import Image from "next/image"
import { TeamsLocalLogos } from "@/constants/constants"
import { DeadIcon } from "@/svg"
import React, { ReactElement } from "react"

interface Props {
    participants: IFinalsParticipants[]
    index: [number, number]
}


export default function MatchFinals({ participants, index }: Props) {

    const teams = [participants[index[0]].progress_stage?.length, participants[index[1]].progress_stage?.length]
    const won = Math.max(...teams)
    const canAdvance = teams[0] !== teams[1] ? true : false
    const indexWon = teams.indexOf(won)

    return (
        <div className="grid grid-cols-[1fr_1fr_3em_1fr_1fr] grid-rows-[1fr_2em] w-full gap-1 p-2 rounded-md bg-(--surface-c) border-1 border-(--surface-100)">
            <div className="relative flex flex-col items-center gap-2 col-start-1 col-span-2">
                {React.cloneElement(TeamsLocalLogos.find(logo => logo.name === participants[index[0]].team)?.logo as ReactElement, { className: "w-10 h-10" })}
                <span className="text-sm">
                    {TeamsLocalLogos.find(logo => logo.name === participants[index[0]].team)?.name}
                </span>
                {indexWon === 1 && canAdvance &&
                    <div className="flex items-center absolute h-full">
                        <DeadIcon className="w-16 h-16" />
                    </div>
                }
            </div>
            <div className="flex flex-row items-center gap-2 justify-center rounded-md row-start-2 row-span-2 col-start-1 col-span-2 bg-(--surface-b) px-1" >
                <Image className="max-w-5 max-h-5 rounded-full" src={participants[index[0]]?.user_info?.image || "/user-icon.png"} width={25} height={25} alt={`Foto de perfil de ${participants[index[0]]?.user_info?.name || ""} `} />
                <span className="text-center text-xs">{participants[index[0]]?.user_info?.name}</span>
            </div>
            <div className="flex items-center justify-center col-start-3 col-span-1 text-center font-bold text-(--primary-color)">VS</div>
            <div className="flex flex-row items-center gap-2 justify-center rounded-md row-start-2 row-span-2 col-start-4 col-span-2 bg-(--surface-b) px-1"  >
                <Image className="max-w-5 max-h-5 rounded-full" src={participants[index[1]]?.user_info?.image || "/user-icon.png"} width={25} height={25} alt={`Foto de perfil de ${participants[index[1]]?.user_info?.name || ""} `} />
                <span className="text-center text-xs">{participants[index[1]]?.user_info?.name}</span>
            </div>
            <div className="relative flex flex-col items-center gap-2 col-start-4 col-span-2">
                {React.cloneElement(TeamsLocalLogos.find(logo => logo.name === participants[index[1]].team)?.logo as ReactElement, { className: "w-10 h-10" })}
                <span className="text-sm">
                    {TeamsLocalLogos.find(logo => logo.name === participants[index[1]].team)?.name}
                </span>
                {indexWon === 0 && canAdvance &&
                    <div className="flex items-center absolute h-full">
                        <DeadIcon className="w-16 h-16" />
                    </div>
                }
            </div>
        </div>
    )
}