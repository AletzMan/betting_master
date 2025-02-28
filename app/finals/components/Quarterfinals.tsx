import { GetFinalistTeams } from "@/config/firebase"
import styles from "./quarters.module.scss"
import { useEffect, useState } from "react"
import { TeamsLocalLogos } from "@/constants/constants"

interface Props {
    qualifiedTeams: string[]
}

export default function QuarterFinals({ qualifiedTeams }: Props) {

    return (
        <>
            <h2 className={styles.title}>Cuartos de final</h2>
            <section className={styles.matches}>
                <div className={styles.matches_container}>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[0])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[0]}
                            </span>
                        </div>
                        <span className={styles.vs}>VS</span>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[7])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[7]}
                            </span>
                        </div>
                    </article>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[1])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[1]}
                            </span>
                        </div>
                        <span className={styles.vs}>VS</span>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[6])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[6]}
                            </span>
                        </div>
                    </article>
                </div>
                <div className={styles.matches_container}>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[2])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[2]}
                            </span>
                        </div>
                        <span className={styles.vs}>VS</span>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[5])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[5]}
                            </span>
                        </div>
                    </article>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[3])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[3]}
                            </span>
                        </div>
                        <span className={styles.vs}>VS</span>
                        <div className={styles.team}>
                            {TeamsLocalLogos.find(team => team.name === qualifiedTeams[4])?.logo}
                            <span className={styles.team_name}>
                                {qualifiedTeams[4]}
                            </span>
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}

