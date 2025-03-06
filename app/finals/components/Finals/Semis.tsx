import { IFinalsParticipants } from "@/types/types"
import MatchFinals from "./MatchFinals"

interface Props {
    participants: IFinalsParticipants[]
}


export default function Semis({ participants }: Props) {


    return (

        <div className="flex flex-col gap-2 mb-2">
            {participants.length === 4 &&
                <>
                    <MatchFinals participants={participants} index={[0, 3]} />
                    <MatchFinals participants={participants} index={[1, 2]} />
                </>
            }
        </div>
    )
}