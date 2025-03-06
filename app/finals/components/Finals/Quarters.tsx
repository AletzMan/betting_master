import { IFinalsParticipants } from "@/types/types"
import MatchFinals from "./MatchFinals"

interface Props {
    participants: IFinalsParticipants[]
}


export default function Quarters({ participants }: Props) {


    return (
        <div className="flex flex-col gap-2 mb-2">
            <MatchFinals participants={participants} index={[0, 7]} />
            <MatchFinals participants={participants} index={[1, 6]} />
            <MatchFinals participants={participants} index={[2, 5]} />
            <MatchFinals participants={participants} index={[3, 4]} />
        </div>
    )
}