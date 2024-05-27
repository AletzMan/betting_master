// @flow 

import { IParticipants } from "@/app/types/types";
import styles from "./finals.module.scss"
import MatchFinals from "./MatchFinals";


interface Props {
    participants: IParticipants[]
}

export const Final = ({ participants }: Props) => {
    return (
        <div className={`${styles.quarters} `}>
            <h2 className={styles.quarters_title}>Final</h2>
            <MatchFinals participants={participants} index={[0, 1]} />
        </div>
    );
};