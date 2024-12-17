// @flow 

import { IParticipants } from "@/app/types/types";
import styles from "./finals.module.scss"
import stylesGeneral from "../../finales.module.scss"
import MatchFinals from "./MatchFinals";
import { ArrowUpIcon, ProfileIcon, WinnerIcon } from "@/app/svg";


interface Props {
    participants: IParticipants[]
}

export const Final = ({ participants }: Props) => {
    return (
        <details className={stylesGeneral.details} name="finals" >
            <summary className={stylesGeneral.details_summary}>
                <div className={stylesGeneral.details_title}>
                    <WinnerIcon className={stylesGeneral.details_icon} />
                    Final
                </div>
                <ArrowUpIcon className={stylesGeneral.details_arrow} />
            </summary>
            <MatchFinals participants={participants} index={[4, 6]} />
        </details>
    );
};