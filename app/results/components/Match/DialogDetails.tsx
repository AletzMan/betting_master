/* eslint-disable @next/next/no-img-element */
"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./match.module.scss"
import { DetailsData } from "@/types/DetailsMatch"
import { FormattedCulbNames, GetListStats } from "@/functions/functions"
import Image from "next/image"
import { Field } from "./Field"
import {
	ChangeTwoIcon,
	CommentIcon,
	CornerIcon,
	GoalIcon,
	LineUpIcon,
	ManagerIcon,
	MatchEndIcon,
	OffsideIcon,
	PenaltyIcon,
	RedCardIcon,
	RefereeIcon,
	ShotIcon,
	ShotOutIcon,
	VARIcon,
	YellowCardIcon,
} from "@/svg"
import { Player } from "./Player"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { TStatistics } from "@/types/types"

interface DialogProps {
	detailsData: DetailsData
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogDetails(props: DialogProps) {
	const { detailsData, open, setOpen } = props
	const [details, setDetails] = useState<DetailsData>(detailsData)
	const [statisticsMatch, setStatisticMatch] = useState<{ home: [TStatistics, number][], away: [TStatistics, number][] } | null>(null)
	const [selectedSection, setSelectedSection] = useState<"statistics" | "lineup" | "cronology">("statistics")

	useEffect(() => {
		if (details.eventStats !== undefined) {
			const statisticsHome = GetListStats(details?.eventStats?.stats?.homeTeam?.statsTeam)
			const statisticsAway = GetListStats(details?.eventStats?.stats?.awayTeam?.statsTeam)
			setStatisticMatch({ home: statisticsHome, away: statisticsAway })
		}
	}, [details])

	const HandleSelectSection = (section: "statistics" | "lineup" | "cronology") => {
		setSelectedSection(section)
	}


	return (
		<Dialog className=" " visible={open} onHide={() => setOpen(false)} >
			<div className={`${styles.details} `}>
				<Button className="self-end" onClick={() => setOpen(false)} label="Cerrar" icon="pi pi-times-circle" severity="danger" size="small" />
				<section className={`${styles.details_section}`}>
					<header className={styles.details_header}>
						<button
							className={`${styles.details_headerButton} ${selectedSection === "statistics" && styles.details_headerButtonActive}`}
							onClick={() => HandleSelectSection("statistics")}
						>
							ESTADíSTICAS
						</button>
						<button
							className={`${styles.details_headerButton} ${selectedSection === "lineup" && styles.details_headerButtonActive}`}
							onClick={() => HandleSelectSection("lineup")}
						>
							ALINEACIONES
						</button>
						<button
							className={`${styles.details_headerButton} ${selectedSection === "cronology" && styles.details_headerButtonActive}`}
							onClick={() => HandleSelectSection("cronology")}
						>
							CRONOLOGíA
						</button>
					</header>
					{selectedSection === "statistics" && (
						<div className={styles.details_statistics}>
							<div className={styles.details_title}>
								<Image
									className={styles.details_titleLogo}
									src={details.event.sportEvent.competitors.homeTeam.images.urlLogo[0]}
									width={50}
									height={50}
									alt="Logo de"
								/>
								<span className={styles.details_titleText}></span>
								<Image
									className={styles.details_titleLogo}
									src={details.event.sportEvent.competitors.awayTeam.images.urlLogo[0]}
									width={50}
									height={50}
									alt="Logo de"
								/>
								<span
									className={`${styles.details_titleGoals} 
									${details.event.score.homeTeam.totalScore > details.event.score.awayTeam.totalScore ? "text-lime-500" : details.event.score.homeTeam.totalScore < details.event.score.awayTeam.totalScore ? "text-red-600" : "text-yellow-500"}`}>{details.event.score.homeTeam.totalScore}</span>
								<span className={styles.details_posession}>Posesión</span>
								<span className={`${styles.details_titleGoals} 
									${details.event.score.homeTeam.totalScore < details.event.score.awayTeam.totalScore ? "text-lime-500" : details.event.score.homeTeam.totalScore > details.event.score.awayTeam.totalScore ? "text-red-600" : "text-yellow-500"}`}>{details.event.score.awayTeam.totalScore}</span>
								{statisticsMatch && statisticsMatch.home.length > 1 && (
									<>
										<span className={styles.details_titlePossession}>{`${statisticsMatch?.home[1][1]}%`}</span>
										<div className={styles.details_titleBar}>
											<div
												className={styles.details_titleBarHome}
												style={{
													width: `${statisticsMatch?.home[1][1]}%`,
													backgroundColor: `var(--cyan-600)`,
													borderLeft: `1px solid var(--surface-800)`,
													borderTop: `1px solid var(--surface-800)`,
													borderBottom: `1px solid var(--surface-800)`,
												}}
											></div>
											<div
												className={styles.details_titleBarAway}
												style={{
													width: `${statisticsMatch?.away[1][1]}%`,
													backgroundColor: `var(--yellow-600)`,
													borderRight: `1px solid var(--surface-800)`,
													borderTop: `1px solid var(--surface-800)`,
													borderBottom: `1px solid var(--surface-800)`,
												}}
											></div>
										</div>
										<span className={styles.details_titlePossession}>{`${statisticsMatch?.away[1][1]}%`}</span>
									</>
								)}
							</div>

							<section className={styles.details_table}>
								<article className={`${styles.details_tableOptions} ${styles.details_tableOptionsHome}`}>
									{statisticsMatch && statisticsMatch.home.map(([key, value], index) => (index > 1 &&
										<span key={key} className={`${styles.details_tableOption} ${styles.details_tableOptionHome}`}>
											{value} {/* Usar value para mostrar el valor */}
										</span>
									))}
								</article>
								<article className={`${styles.details_tableOptions} ${styles.details_tableOptionsNames}`}>
									{statisticsMatch && statisticsMatch.away.map(([key, value], index) => (index > 1 &&
										<span key={key} className={`${styles.details_tableOption} ${styles.details_tableOptionHome}`}>
											{TRADUCTIONS[key]}
										</span>
									))}
								</article>
								<article className={`${styles.details_tableOptions} ${styles.details_tableOptionsAway}`}>
									{statisticsMatch && statisticsMatch.away.map(([key, value], index) => (index > 1 &&
										<span key={key} className={`${styles.details_tableOption} ${styles.details_tableOptionHome}`}>
											{value} {/* Usar value para mostrar el valor */}
										</span>
									))}
								</article>
							</section>
						</div>
					)}
					{selectedSection === "lineup" && (
						<div className={`${styles.lineups} scrollbar`}>
							<Field>
								<div className={`${styles.lineups_manager} ${styles.lineups_managerHome}`}>
									<img
										className={styles.lineups_managerLogo}
										src={details.event.sportEvent.competitors.homeTeam.images.urlLogo[0]}
										alt={`Logo del equipo ${details.event.sportEvent.competitors.homeTeam.commonName}`}
										width={40}
										height={40}
										loading="lazy"
									/>
									<span className={styles.lineups_managerName}>{FormattedCulbNames(details.event.sportEvent.competitors.homeTeam.commonName)}</span>
									<ManagerIcon className={styles.lineups_managerIcon} />
									<span className={styles.lineups_managerName}>{details.lineup.lineups.homeTeam.manager}</span>
									<span className={styles.lineups_managerFormation}>{details.lineup.lineups.homeTeam.formationTeam.split("").join("-")}</span>
								</div>
								<div
									className={`${styles.lineup} ${styles.lineupHome} ${details.lineup.lineups.homeTeam.formationTeam.length === 4 && styles.lineup_fourRows
										}`}
								>
									{details.lineup.lineups.homeTeam.actualLineup.map((player) => (
										<Player
											key={player.id}
											player={player}
											team={{
												color: details.lineup.lineups.homeTeam.teamKit.colour1,
												color2: details.lineup.lineups.homeTeam.teamKit.colour2,
												isHome: true,
												formation: details.lineup.lineups.homeTeam.formationTeam,
											}}
											stats={{
												yellowCards: details.event.statsDetails.discipline.homeTeam.yellowCards,
												redCards: details.event.statsDetails.discipline.homeTeam.redCards,
												goals: details.event.scoreDetails.goals.homeTeam,
											}}
											isTitular={true}
										/>
									))}
								</div>
								<div
									className={`${styles.lineup} ${styles.lineupAway} ${details.lineup.lineups.awayTeam.formationTeam.length === 4 && styles.lineup_fourRows
										}`}
								>
									{details.lineup.lineups.awayTeam.actualLineup.map((player) => (
										<Player
											key={player.id}
											player={player}
											team={{
												color: details.lineup.lineups.awayTeam.teamKit.colour1,
												color2: details.lineup.lineups.awayTeam.teamKit.colour2,
												isHome: false,
												formation: details.lineup.lineups.awayTeam.formationTeam,
											}}
											stats={{
												yellowCards: details.event.statsDetails.discipline.awayTeam.yellowCards,
												redCards: details.event.statsDetails.discipline.awayTeam.redCards,
												goals: details.event.scoreDetails.goals.awayTeam,
											}}
											isTitular={true}
										/>
									))}
								</div>
								<div className={`${styles.lineups_manager} ${styles.lineups_managerAway}`}>
									<img
										className={styles.lineups_managerLogo}
										src={details.event.sportEvent.competitors.awayTeam.images.urlLogo[0]}
										alt={`Logo del equipo ${details.event.sportEvent.competitors.awayTeam.commonName}`}
										width={40}
										height={40}
										loading="lazy"
									/>
									<span className={styles.lineups_managerName}>{FormattedCulbNames(details.event.sportEvent.competitors.awayTeam.commonName)}</span>
									<ManagerIcon className={styles.lineups_managerIcon} />
									<span className={styles.lineups_managerName}>{details.lineup.lineups.awayTeam.manager}</span>
									<span className={styles.lineups_managerFormation}>{details.lineup.lineups.awayTeam.formationTeam.split("").join("-")}</span>
								</div>
							</Field>
							<h2 className={styles.lineups_title}>SUPLENTES</h2>
							<div className={styles.substitutes}>
								<div className={`${styles.substitutes_players} ${styles.substitutes_playersHome}`}>
									{details.lineup.lineups.homeTeam.substitutesActualLineup.map((player) => (
										<Player
											key={player.id}
											player={player}
											team={{
												color: details.lineup.lineups.homeTeam.teamKit.colour1,
												color2: details.lineup.lineups.homeTeam.teamKit.colour2,
												isHome: true,
												formation: details.lineup.lineups.homeTeam.formationTeam,
											}}
											stats={{
												yellowCards: details.event.statsDetails.discipline.homeTeam.yellowCards,
												redCards: details.event.statsDetails.discipline.homeTeam.redCards,
												goals: details.event.scoreDetails.goals.homeTeam,
											}}
											isTitular={false}
										/>
									))}
								</div>
								<div className={`${styles.substitutes_players} ${styles.substitutes_playersAway}`}>
									{details.lineup.lineups.awayTeam.substitutesActualLineup.map((player) => (
										<Player
											key={player.id}
											player={player}
											team={{
												color: details.lineup.lineups.awayTeam.teamKit.colour1,
												color2: details.lineup.lineups.awayTeam.teamKit.colour2,
												isHome: true,
												formation: details.lineup.lineups.awayTeam.formationTeam,
											}}
											stats={{
												yellowCards: details.event.statsDetails.discipline.awayTeam.yellowCards,
												redCards: details.event.statsDetails.discipline.awayTeam.redCards,
												goals: details.event.scoreDetails.goals.awayTeam,
											}}
											isTitular={false}
										/>
									))}
								</div>
							</div>
						</div>
					)}
					{selectedSection === "cronology" && (
						<div className={`${styles.cronology} scrollbar`}>
							{details.narration.commentaries.map((commentary) => (
								<div key={commentary.id} className={styles.cronology_commentaries}>
									<div className={styles.cronology_commentariesMinute}>{`${commentary.momentAction || ""}"`}</div>
									<div className={styles.cronology_commentariesType}>
										{GetCommentaryIcon(commentary.type || GetCommentary(commentary.commentary) || "")}
									</div>
									<p className={styles.cronology_commentariesCommentary}>{commentary.commentary}</p>
								</div>
							))}
						</div>
					)}
				</section>

			</div>
		</Dialog>
	)
}

const statisticsNames = [
	{
		id: 0,
		name: "Goles",
	},
	{
		id: 1,
		name: "Posesión",
	},
	{
		id: 2,
		name: "Duelos ganados",
	},
	{
		id: 3,
		name: "Tiros",
	},
	{
		id: 4,
		name: "Tiros al arco",
	},
	{
		id: 5,
		name: "Tiros de esquina",
	},
	{
		id: 6,
		name: "Fueras de juego",
	},
	{
		id: 7,
		name: "Pases correctos",
	},
	{
		id: 8,
		name: "Pases fallidos",
	},
	{
		id: 9,
		name: "Balones perdidos",
	},
	{
		id: 10,
		name: "Balones recuperados",
	},
	{
		id: 11,
		name: "Salvadas",
	},
	{
		id: 12,
		name: "Faltas",
	},
	{
		id: 13,
		name: "Tarjetas amarillas",
	},
	{
		id: 14,
		name: "Tarjetas rojas",
	},
]

const GetCommentary = (commentary: string) => {
	if (commentary.includes("Falta")) {
		return "fault"
	} else if (commentary.includes("Corner")) {
		return "corner"
	} else if (commentary.includes("Remate")) {
		return "shotOut"
	} else if (commentary.includes("VAR")) {
		return "var"
	}

	return undefined
}

const GetCommentaryIcon = (type: string) => {
	const iconMap: { [key: string]: React.ReactNode } = {
		goal: <GoalIcon className={styles.icons_ball} />,
		redCard: <RedCardIcon className={styles.icons_ball} />,
		yellowCard: <YellowCardIcon className={styles.icons_ball} />,
		substitution: <ChangeTwoIcon className={styles.icons_ball} />,
		offside: <OffsideIcon className={styles.icons_ball} />,
		end: <MatchEndIcon className={styles.icons_ball} />,
		startFirstHalf: <MatchEndIcon className={styles.icons_ball} />,
		startSecondHalf: <MatchEndIcon className={styles.icons_ball} />,
		halfTime: <RefereeIcon className={styles.icons_ball} />,
		penalty: <PenaltyIcon className={styles.icons_ball} />,
		lineUp: <LineUpIcon className={styles.icons_ball} />,
		chanceToScore: <ShotOutIcon className={styles.icons_ball} />,
		corner: <CornerIcon className={styles.icons_ball} />,
		shotOut: <ShotIcon className={styles.icons_ball} />,
		fault: <RefereeIcon className={styles.icons_ball} />,
		var: <VARIcon className={styles.icons_ball} />,
	}

	return iconMap[type] || <CommentIcon className={styles.icons_commentary} />
}


const TRADUCTIONS = {
	possPercentage: "Porcentaje de Posesión",
	duelsWon: "Duelos Ganados",
	shots: "Tiros",
	shotsOnGoal: "Tiros a Puerta",
	wonCorners: "Córners Ganados",
	successPass: "Pases Exitosos",
	lostPass: "Pases Perdidos",
	ballsLost: "Balones Perdidos",
	ballsRecovery: "Recuperación de Balones",
	saves: "Paradas",
	fouls: "Faltas",
	goals: "Goles",
	totalOffsides: "Fuera de Juego Totales",
	yellowCards: "Tarjetas Amarillas",
	redCards: "Tarjetas Rojas",
};