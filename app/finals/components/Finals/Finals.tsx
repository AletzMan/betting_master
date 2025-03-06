import { IFinalsParticipants } from "@/types/types"
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

        <div className={`relative flex flex-col gap-3 w-full pt-3 scrollbar`}>
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
                    {<section className="flex flex-wrap flex-row justify-center gap-3 p-2">
                        <WinnerCard participant={winner[0].user_info} name_team={winner[0].team} />
                    </section>}
                </>
            }
            <Accordion activeIndex={(filterQuarters.length === 8 && filterSemi.length !== 4) ? 2 : (filterSemi.length === 4 && filterFinal.length !== 2) ? 1 : 0} >
                <AccordionTab disabled={filterFinal.length !== 2} header={<div className="flex flex-row items-center gap-2.5"><i className="pi pi-play-circle" />Final</div>} >
                    <Final participants={filterFinal} />
                </AccordionTab>
                <AccordionTab disabled={filterSemi.length !== 4} header={<div className="flex flex-row items-center gap-2.5"><i className="pi pi-play-circle" />Semi Finales</div>} >
                    <Semis participants={filterSemi} />
                </AccordionTab>

                <AccordionTab disabled={filterQuarters.length !== 8} header={<div className="flex flex-row items-center gap-2.5"><i className="pi pi-play-circle" />Cuartos de Final</div>} >
                    <Quarters participants={filterQuarters} />
                </AccordionTab>
            </Accordion>
        </div>
    )
}