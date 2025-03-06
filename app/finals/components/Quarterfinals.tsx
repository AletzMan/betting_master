import { ReactElement } from "react"
import { TeamsLocalLogos } from "@/constants/constants"
import React from "react"

interface Props {
    qualifiedTeams: string[]
}

export default function QuarterFinals({ qualifiedTeams }: Props) {

    return (
        <>
            <h2 className="text-lg text-(--primary-color) font-bold bg-(--surface-c) rounded-md px-3 py-0.5">Cuartos de final</h2>
            <section className="grid items-center justify-center grid-cols-[1fr_1fr] gap-2 w-full max-w-4xl py-2">
                <div className="flex flex-col gap-2">
                    <article className="flex flex-row gap-2 p-2 rounded-sm border-1 border-(--surface-d) bg-(--surface-c)">
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[0])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[0]}
                            </span>
                        </div>
                        <span className="flex items-center font-semibold text-sm">VS</span>
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[7])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[7]}
                            </span>
                        </div>
                    </article>
                    <article className="flex flex-row gap-2 p-2 rounded-sm border-1 border-(--surface-d) bg-(--surface-c)">
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[1])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[1]}
                            </span>
                        </div>
                        <span className="flex items-center font-semibold text-sm">VS</span>
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[6])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[6]}
                            </span>
                        </div>
                    </article>
                </div>
                <div className="flex flex-col gap-2">
                    <article className="flex flex-row gap-2 p-2 rounded-sm border-1 border-(--surface-d) bg-(--surface-c)">
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[2])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[2]}
                            </span>
                        </div>
                        <span className="flex items-center font-semibold text-sm">VS</span>
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[5])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[5]}
                            </span>
                        </div>
                    </article>
                    <article className="flex flex-row gap-2 p-2 rounded-sm border-1 border-(--surface-d) bg-(--surface-c)">
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[3])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[3]}
                            </span>
                        </div>
                        <span className="flex items-center font-semibold text-sm">VS</span>
                        <div className="flex flex-col items-center w-full gap-1.5">
                            {React.cloneElement(TeamsLocalLogos.find(team => team.name === qualifiedTeams[4])?.logo as ReactElement, { className: "w-11 h-11" })}
                            <span className="text-sm">
                                {qualifiedTeams[4]}
                            </span>
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}

