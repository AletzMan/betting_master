/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { ChangeIcon, ExitLogo, InjuryIcon, RedCardIcon, ShirtIcon, SoccerBallIcon, YellowCardIcon } from "@/svg"
import styles from "./match.module.scss"
import { ActualLineup, ActualLineup2, AwayTeam3, AwayTeam6, HomeTeam3, HomeTeam6, RedCard, SubstitutesActualLineup, YellowCard } from "@/types/DetailsMatch"
import { useEffect, useState } from "react"

interface FormationData {
	gridRow: string
	gridColumn: string
}

interface PropsShirt {
	player: ActualLineup | ActualLineup2 | SubstitutesActualLineup
	team: {
		color: string
		color2: string
		isHome: boolean
		formation: string
	}
	stats: {
		yellowCards: YellowCard[]
		redCards: RedCard[]
		goals: HomeTeam3[] | AwayTeam3[]
	}
	isTitular: boolean
}

export function Player(props: PropsShirt) {
	const { player, team, stats, isTitular } = props
	const [statsPlayer, setStatsPlayer] = useState({ yellowCard: false, redCard: false, goal: false, numberGoals: 0, change: false })

	useEffect(() => {
		let HasYellowCard = false
		let HasRedCard = false
		let HasGoal = false
		let IsChange = player.changeTo !== undefined
		let goals = 0
		stats.yellowCards.forEach((card) => {
			if (card.playerId === player.id) {
				HasYellowCard = true
			}
		})
		stats.redCards.forEach((card) => {
			if (card.playerId === player.id) {
				HasRedCard = true
			}
		})
		stats.goals.forEach((card) => {
			if (card.playerId === player.id) {
				HasGoal = true
			}
		})
		stats.goals.forEach((card) => {
			if (card.playerId === player.id) {
				goals++
			}
		})
		setStatsPlayer({ yellowCard: HasYellowCard, redCard: HasRedCard, goal: HasGoal, numberGoals: goals, change: IsChange })
	}, [])

	const GetPlayerPosition = () => {
		if (player.playerPosition.name === "portero") {
			if (!team.isHome) {
				return styles.player_goalkeeperAway
			}
			return styles.player_goalkeeper
		} else if (player.playerPosition.name === "defensa") {
			return styles.player_defender
		} else if (player.playerPosition.name === "centrocampista") {
			return styles.player_midfielder
		} else if (player.playerPosition.name === "delantero") {
			return styles.player_forward
		} else {
			return styles.player_normal
		}
	}

	return (
		<div
			className={`${styles.player} ${!team.isHome && styles.player_away} ${GetPlayerPosition()} ${!isTitular && styles.player_isSubstitute} `}
			style={{
				gridRow: GetPlayerFormationPlace(team.formation, player.formationPlace).gridRow,
				gridColumn: GetPlayerFormationPlace(team.formation, player.formationPlace).gridColumn,
			}}
		>
			<div className={`${styles.player_shirt} ${isTitular && styles.player_shirtIsTitular} `}>
				<ShirtIcon className={styles.player_icon} color={team.color} color2={team.color2} />
				<div className={styles.player_number}>{player.jerseyNumber}</div>
			</div>
			{statsPlayer.yellowCard && <YellowCardIcon className={`${styles.player_yellowCard} ${!isTitular && styles.player_yellowCardSubstitute}`} />}
			{statsPlayer.redCard && <RedCardIcon className={`${styles.player_redCard} ${!isTitular && styles.player_redCardSubstitute}`} />}
			{statsPlayer.goal && <SoccerBallIcon className={`${styles.player_goal} ${!isTitular && styles.player_goalSubstitute}`} />}
			{statsPlayer.change && <ChangeIcon className={`${styles.player_change} ${!isTitular && styles.player_changeSubstitute}`} />}
			{!isTitular && player.changeTo?.reason === "Injury" && (
				<InjuryIcon className={`${styles.player_changeReason} ${!isTitular && styles.player_goalNumberSubstitute}`} />
			)}
			{statsPlayer.numberGoals > 0 && (
				<span className={`${styles.player_goalNumber} ${!isTitular && styles.player_goalNumberSubstitute}`}>{statsPlayer.numberGoals}</span>
			)}
			{!isTitular && <span className={styles.player_position}>{player.playerPosition.name}</span>}
			<div className={`${styles.player_name}  ${!isTitular && styles.player_nameSubstitute}`}>{player.name}</div>
			{/*<div className={`${styles.player_name}`}>{player.formationPlace}</div>*/}
		</div>
	)
}

const GetPlayerFormationPlace = (formation: string, formationPlace: string) => {
	const formationMap: { [key: string]: { [key: string]: FormationData } } = {
		"433": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "2 / span 2" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"8": { gridRow: "3 / 4", gridColumn: "4 / 5" },
			"9": { gridRow: "4 / 5", gridColumn: "2 / span 2" },
			"10": { gridRow: "4 / 5", gridColumn: "1 / 2" },
			"11": { gridRow: "4 / 5", gridColumn: "4 / 5" },
		},
		"442": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"8": { gridRow: "3 / 4", gridColumn: "3 / 4" },
			"9": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
			"10": { gridRow: "4 / 5", gridColumn: "1 / span 2" },
			"11": { gridRow: "3 / 4", gridColumn: "4 / 5" },
		},
		"451": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 5" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / span 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / span 2" },
			"4": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / span 2" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / span 2" },
			"7": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"8": { gridRow: "3 / 4", gridColumn: "4 / 5" },
			"9": { gridRow: "4 / 5", gridColumn: "1 / span 5" },
			"10": { gridRow: "3 / 4", gridColumn: "3 / 4" },
			"11": { gridRow: "3 / 4", gridColumn: "5 / 6" },
		},
		"4231": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "3 / span 2" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "4 / 5", gridColumn: "1 / 2" },
			"8": { gridRow: "3 / 4", gridColumn: "1 / span 2" },
			"9": { gridRow: "5 / 6", gridColumn: "1 / span 4" },
			"10": { gridRow: "4 / 5", gridColumn: "2 / span 2" },
			"11": { gridRow: "4 / 5", gridColumn: "4 / 5" },
		},
		"4141": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "1 / span 4" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "4 / 5", gridColumn: "1 / 2" },
			"8": { gridRow: "4 / 5", gridColumn: "2 / 3" },
			"9": { gridRow: "5 / 6", gridColumn: "1 / span 4" },
			"10": { gridRow: "4 / 5", gridColumn: "3 / 4" },
			"11": { gridRow: "4 / 5", gridColumn: "4 / 5" },
		},
		"532": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 5" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "5 / 6" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"5": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"6": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"7": { gridRow: "3 / 4", gridColumn: "1 / span 2" },
			"8": { gridRow: "3 / 4", gridColumn: "2 / span 3" },
			"9": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
			"10": { gridRow: "4 / 5", gridColumn: "2 / span 2" },
			"11": { gridRow: "3 / 4", gridColumn: "4 / span 2" },
		},
		"541": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 5" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "5 / 6" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"5": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"6": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"7": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"8": { gridRow: "3 / 4", gridColumn: "2 / span 2" },
			"9": { gridRow: "4 / 5", gridColumn: "1 / span 5" },
			"10": { gridRow: "3 / 4", gridColumn: "3 / span 2" },
			"11": { gridRow: "3 / 4", gridColumn: "5 / 6" },
		},
		"4132": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "1 / span 4" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "4 / 5", gridColumn: "1 / 2" },
			"8": { gridRow: "4 / 5", gridColumn: "2 / span 2" },
			"9": { gridRow: "5 / 6", gridColumn: "1 / span 2" },
			"10": { gridRow: "5 / 6", gridColumn: "3 / span 2" },
			"11": { gridRow: "4 / 5", gridColumn: "4 / 5" },
		},
		"3421": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"3": { gridRow: "3 / 4", gridColumn: "4 / 5" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / span 2" },
			"6": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"7": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"8": { gridRow: "3 / 4", gridColumn: "3 / 4" },
			"9": { gridRow: "5 / 6", gridColumn: "1 / span 4" },
			"10": { gridRow: "4 / 5", gridColumn: "1 / span 2" },
			"11": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
		},
		"41212": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "1 / span 4" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
			"8": { gridRow: "5 / 6", gridColumn: "1 / span 4" },
			"9": { gridRow: "6 / 7", gridColumn: "1 / span 2" },
			"10": { gridRow: "6 / 7", gridColumn: "3 / span 2" },
			"11": { gridRow: "4 / 5", gridColumn: "1 / span 2" },
		},
		"352": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 5" },
			"2": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"3": { gridRow: "3 / 4", gridColumn: "5 / 6" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / span 2" },
			"5": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"6": { gridRow: "2 / 3", gridColumn: "1 / span 2" },
			"7": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"8": { gridRow: "3 / 4", gridColumn: "4 / 5" },
			"9": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
			"10": { gridRow: "4 / 5", gridColumn: "2 / span 2" },
			"11": { gridRow: "3 / 4", gridColumn: "3 / 4" },
		},
		"4411": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"8": { gridRow: "3 / 4", gridColumn: "3 / 4" },
			"9": { gridRow: "5 / 6", gridColumn: "1 / span 4" },
			"10": { gridRow: "4 / 5", gridColumn: "1 / span 4" },
			"11": { gridRow: "3 / 4", gridColumn: "4 / 5" },
		},
		"4222": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"3": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"4": { gridRow: "3 / 4", gridColumn: "1 / span 2" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / 3" },
			"6": { gridRow: "2 / 3", gridColumn: "3 / 4" },
			"7": { gridRow: "4 / 5", gridColumn: "1 / span 2" },
			"8": { gridRow: "3 / 4", gridColumn: "3 / span 2" },
			"9": { gridRow: "5 / 6", gridColumn: "3 / span 2" },
			"10": { gridRow: "5 / 6", gridColumn: "1 / span 2" },
			"11": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
		},
		"3412": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"3": { gridRow: "3 / 4", gridColumn: "4 / 5" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / span 2" },
			"6": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"7": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"8": { gridRow: "3 / 4", gridColumn: "3 / 4" },
			"9": { gridRow: "4 / 5", gridColumn: "1 / span 4" },
			"10": { gridRow: "5 / 6", gridColumn: "1 / span 2" },
			"11": { gridRow: "5 / 6", gridColumn: "3 / span 2" },
		},
		"3241": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "3 / 4", gridColumn: "1 / span 2" },
			"3": { gridRow: "3 / 4", gridColumn: "3 / span 2" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / span 2" },
			"6": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"7": { gridRow: "4 / 5", gridColumn: "2 / 3" },
			"8": { gridRow: "4 / 5", gridColumn: "3 / 4" },
			"9": { gridRow: "5 / 6", gridColumn: "1 / span 4" },
			"10": { gridRow: "4 / 5", gridColumn: "1 / 2" },
			"11": { gridRow: "4 / 5", gridColumn: "4 / 5" },
		},
		"343": {
			"1": { gridRow: "1 / 2", gridColumn: "1 / span 4" },
			"2": { gridRow: "3 / 4", gridColumn: "1 / 2" },
			"3": { gridRow: "3 / 4", gridColumn: "4 / 5" },
			"4": { gridRow: "2 / 3", gridColumn: "4 / 5" },
			"5": { gridRow: "2 / 3", gridColumn: "2 / span 2" },
			"6": { gridRow: "2 / 3", gridColumn: "1 / 2" },
			"7": { gridRow: "3 / 4", gridColumn: "2 / 3" },
			"8": { gridRow: "3 / 4", gridColumn: "3 / 4" },
			"9": { gridRow: "4 / 5", gridColumn: "1 / span 4" },
			"10": { gridRow: "4 / 5", gridColumn: "1 / span 2" },
			"11": { gridRow: "4 / 5", gridColumn: "3 / span 2" },
		},
	}

	if (formation in formationMap && formationPlace in formationMap[formation]) {
		return formationMap[formation][formationPlace]
	}

	return { gridRow: "", gridColumn: "" }
}
