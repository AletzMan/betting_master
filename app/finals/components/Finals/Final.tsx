// @flow 

import { IFinalsParticipants } from "@/types/types";
import MatchFinals from "./MatchFinals";

interface Props {
    participants: IFinalsParticipants[]
}

export const Final = ({ participants }: Props) => {

    return (
        <div className="flex flex-col gap-2 mb-2">
            {participants.length === 2 && <MatchFinals participants={participants} index={[0, 1]} />}
        </div>
    );
};