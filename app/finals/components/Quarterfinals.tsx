import { AmericaLogo, ChivasLogo, CruzAzulLogo, MonterreyLogo, NecaxaLogo, PachucaLogo, PumasLogo, SanLuisLogo, TigresLogo, TijuanaLogo, TolucaLogo } from "../../svg"
import styles from "./quarters.module.scss"

export default function QuarterFinals() {

    return (
        <>
            <h2 className={styles.title}>Cuartos de final</h2>
            <section className={styles.matches}>
                <div className={styles.matches_container}>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {QualifiedTeams[0].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[0].name}
                            </span>
                        </div>
                        <div className={styles.team}>
                            {QualifiedTeams[7].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[7].name}
                            </span>
                        </div>
                    </article>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {QualifiedTeams[1].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[1].name}
                            </span>
                        </div>
                        <div className={styles.team}>
                            {QualifiedTeams[6].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[6].name}
                            </span>
                        </div>
                    </article>
                </div>
                <div className={styles.matches_container}>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {QualifiedTeams[2].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[2].name}
                            </span>
                        </div>
                        <div className={styles.team}>
                            {QualifiedTeams[5].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[5].name}
                            </span>
                        </div>
                    </article>
                    <article className={styles.matches_match}>
                        <div className={styles.team}>
                            {QualifiedTeams[3].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[3].name}
                            </span>
                        </div>
                        <div className={styles.team}>
                            {QualifiedTeams[4].logo}
                            <span className={styles.team_name}>
                                {QualifiedTeams[4].name}
                            </span>
                        </div>
                    </article>
                </div>
            </section>
        </>
    )
}


export const QualifiedTeams = [
    {
        id: 1,
        logo: <CruzAzulLogo className={styles.logo} />,
        name: "Cruz Azul",
        abbName: "CRZ",
        color_one: "#001f60",
        color_two: "#FFFFFF",
        color_three: "#de1d33",
    },
    {
        id: 2,
        logo: <TolucaLogo className={styles.logo} />,
        name: "Toluca",
        abbName: "TOL",
        color_one: "#ce0e2d",
        color_two: "#FFFFFF",
        color_three: "#111c4e",
    },
    {
        id: 3,
        logo: <TigresLogo className={styles.logo} />,
        name: "Tigres",
        abbName: "TIG",
        color_one: "#f1a21e",
        color_two: "#FFFFFF",
        color_three: "#00369c",
    },
    {
        id: 4,
        logo: <PumasLogo className={styles.logo} />,
        name: "Pumas",
        abbName: "PUM",
        color_one: "#001e47",
        color_two: "#FFFFFF",
        color_three: "#766910",
    },
    {
        id: 5,
        logo: <MonterreyLogo className={styles.logo} />,
        name: "Monterrey",
        abbName: "MTY",
        color_one: "#0a2240",
        color_two: "#FFFFFF",
        color_three: "#FFFFFF",
    },
    {
        id: 6,
        logo: <SanLuisLogo className={styles.logo} />,
        name: "San Luis",
        abbName: "SLUIS",
        color_one: "#CE0E2D",
        color_two: "#FFFFFF",
        color_three: "#002856",
    },
    {
        id: 7,
        logo: <AmericaLogo className={styles.logo} />,
        name: "América",
        abbName: "AME",
        color_one: "#d6bf25",
        color_two: "#00225d",
        color_three: "#e4503a",
    },
    {
        id: 8,
        logo: <TijuanaLogo className={styles.logo} />,
        name: "Tijuana",
        abbName: "TIJ",
        color_one: "#CE0E2D",
        color_two: "#111c4e",
        color_three: "#FFFFFF",
    },
]