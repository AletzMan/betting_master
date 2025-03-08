/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import styles from "./match.module.scss"
import Image from "next/image"
import { FormattedCulbNames } from "@/functions/functions"
import { Results } from "@/types/ResultsTypes"
import { LoadingTwoIcon, StadiumIcon } from "@/svg"
import { ScoresAndStats } from "./ScoresAndStats"
import { DialogDetails } from "./DialogDetails"
import { GetMatchDetails } from "@/services/fetch_utils"
import { useEffect, useState } from "react"
import { DetailsData } from "@/types/DetailsMatch"
import { Divider } from "primereact/divider"

interface PropsMatch {
	eventData: Results
	isAllMatches?: boolean
}

const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" }
const optionsLive: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" }

export function Match({ props }: { props: PropsMatch }) {
	const { isAllMatches } = props
	const { eventData } = props
	const { sportEvent } = eventData
	const { competitors } = sportEvent


	const [details, setDetails] = useState<DetailsData>({} as DetailsData)
	const [openDialog, setOpenDialog] = useState(false)

	const GetDetails = async () => {
		const response = await GetMatchDetails(eventData.id)
		setDetails(response)
	}

	useEffect(() => {
		GetDetails()
	}, [])

	const Status = eventData.score.period.name || eventData.sportEvent.status.alternateNames.esES
	const StatusMatch =
		Status === "Sin comenzar" ? styles.match_statusNotStarted : Status === "Finalizado" ? styles.match_statusEnded : styles.match_statusStarted

	const currentTime = new Date().getTime()
	const startTime = new Date(eventData.score.period.startTime as string).getTime()

	const timeMatch =
		startTime !== 0
			? `${((currentTime - startTime) / 1000 / 60).toFixed(0)} - ${eventData.score.period.alternateNames.esES}`.split("-")
			: eventData.score.period.alternateNames.esES

	return (
		<>
			<div className={styles.match}>
				{isAllMatches && <span className={styles.match_tournament}>{`${eventData.tournament.name}`}</span>}
				{sportEvent.matchDay && <span className={styles.match_day}>{`Jornada ${sportEvent.matchDay}`}</span>}
				<div className={styles.match_header}>
					<div className={styles.match_team}>
						<img
							className={styles.match_teamLogo}
							src={competitors.homeTeam.images.urlLogo[0]}
							width={50}
							height={50}
							alt={`Logo del equipo ${competitors.homeTeam.fullName}`}
							loading="lazy"
						/>
						<span className={styles.match_teamName}>{FormattedCulbNames(competitors.homeTeam.commonName)}</span>
						<span className={styles.match_score}>{eventData.score.homeTeam.totalScore}</span>
					</div>
					<span className={styles.match_separator}>-</span>
					<div className={`${styles.match_team} ${styles.match_teamAway}`}>
						<img
							className={styles.match_teamLogo}
							src={competitors.awayTeam.images.urlLogo[0]}
							width={50}
							height={50}
							alt={`Logo del equipo ${competitors.awayTeam.fullName}`}
							loading="lazy"
						/>
						<span className={styles.match_teamName}>{FormattedCulbNames(competitors.awayTeam.commonName)}</span>
						<span className={styles.match_score}>{eventData.score.awayTeam.totalScore}</span>
					</div>
				</div>
				{(Status === "2nd half" || Status === "1st half" || Status === "Descanso" || Status === "1ª parte" || Status === "2ª parte") && (
					<div className={styles.match_timeMatch}>
						{Status !== "Descanso" && <span className={styles.match_timeMatchClock}>{`${timeMatch[0]}`}</span>}
						<span className={styles.match_timeMatchPeriod}>{`${Status === "Descanso" ? "Descanso" : timeMatch[1]}`}</span>
						{/*<span className={styles.match_timeMatchTime}></span>*/}
						{Status !== "Descanso" && <LoadingTwoIcon className={styles.match_timeMatchIcon} />}
					</div>
				)}
				<span className={`${styles.match_status} ${StatusMatch}`}>{eventData.sportEvent.status.name}</span>
				<div className={styles.match_stadium}>
					<StadiumIcon className={styles.match_stadiumIcon} />
					{eventData?.sportEvent?.location?.name.replace("Estadio ", "").replace("Stadium", "")}
				</div>
				<div className={styles.match_hour}>{new Date(eventData.startDate).toLocaleTimeString("es-MX", options)}</div>
				{Status !== "Sin comenzar" && details.eventStats && (
					<>
						<Divider type="dashed" />
						<footer className={styles.match_footer}>
							<ScoresAndStats details={details} />
							<button className={styles.match_buttonDetails} onClick={() => setOpenDialog(true)}>
								Ver detalles
							</button>
						</footer>
					</>
				)}
			</div>
			{openDialog && <DialogDetails detailsData={details} open={openDialog} setOpen={setOpenDialog} />}
		</>
	)
}
