import { IFinalsParticipants } from "@/types/types"
import Image from "next/image"


interface Props {
    participant: IFinalsParticipants
}


export default function Participant({ participant }: Props) {
    return (
        <div key={participant.id} className="flex flex-row gap-2.5 items-center bg-cyan-950 px-4 py-1 rounded-md border-1 border-cyan-800">
            <Image className="rounded-full min-w-8 min-h-8 border-3 border-(--primary-color)" src={participant.user_info?.image || "/user-icon.png"} width="40" height="40" alt={`Imagen de perfil de ${participant.user_info?.name}`} />
            <span className="text-sm">{participant.user_info?.name}</span>
        </div>
    )
}