import { IFinalsParticipants } from "@/types/types"
import styles from "./finals.module.scss"
import Quarters from "./Quarters"
import Semis from "./Semis"
import { Final } from "./Final"
import WinnerCard from "@/bets/components/WinnerCard"
import Fireworks, { FireworksHandlers } from "@fireworks-js/react"
import { useRef } from "react"
import { Accordion, AccordionTab } from "primereact/accordion"

interface Props {
    participants: IFinalsParticipants[]
}

export default function Finals({ participants }: Props) {
    const ref = useRef<FireworksHandlers>(null)

    const orderParticipants = participants.sort((a, b) => a.position_team - b.position_team)
    const winner = orderParticipants.filter(part => part.progress_stage.includes("winner"))
    const filterFinal = orderParticipants.filter(part => part.progress_stage.includes("final"))
    const filterSemi = orderParticipants.filter(part => part.progress_stage.includes("half"))
    const filterQuarters = orderParticipants.filter(part => part.progress_stage.includes("quarter"))

    return (

        <div className={`${styles.finals} scrollbar`}>
            {winner.length === 1 &&
                <>
                    <Fireworks style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        background: '#00000000',
                        zIndex: 15,
                        pointerEvents: "none"
                    }} />

                    {<h3 className={styles.winners_title}>GANADOR</h3>}
                    {<section className={styles.winners}>
                        <WinnerCard participant={winner[0].user_info} name_team={winner[0].team} />
                    </section>}
                </>
            }
            <Accordion activeIndex={0} >
                {filterFinal.length === 2 && <Final participants={filterFinal} />}
                {filterSemi.length === 4 && <Semis participants={filterSemi} />}
                {filterQuarters.length === 8 &&
                    <AccordionTab header={<div className="flex flex-row items-center gap-2.5"><i className="pi pi-play-circle" />Cuartos de Final</div>} >
                        <Quarters participants={filterQuarters} />
                    </AccordionTab>
                }
            </Accordion>
        </div>
    )
}