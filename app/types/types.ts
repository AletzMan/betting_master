import { DocumentData } from "firebase/firestore"
import { Session } from "next-auth"
import { Nullable } from "primereact/ts-helpers"

export type IUserInfo = {
	uid: string
	name: string | null
	photo: string | null
	email: string | null
	color?: string
}

export interface IStatusResponse extends Response {
	isLogged: true
	userInfo: {
		uid: string
		name: string
		photo: string
	}
}

export interface ResponseStatsLeagueMX {
	data: StatsLeagueMX
}

export interface StatsLeagueMX {
	status: string
	data: LeagueMX[]
	timestamp: string
}

export interface LeagueMX {
	id: string
	lastUpdate: string
	classificationHead: ClassificationHead
	rank: Rank[]
	blocked: boolean
}

export interface ClassificationHead {
	classificationType: ClassificationType
	group: Group
	phase: Phase
	subphase: Subphase
	season: Season
	sport: Sport
	tournament: Tournament
	matchDay: number
}

export interface ClassificationType {
	alternateNames: AlternateNames
	id: number
	name: string
}

export interface AlternateNames {
	enEN: string
	esES: string
}

export interface Group {
	id: string
	name: string
	romanNumerals: string
	alternateNames: AlternateNames2
}

export interface AlternateNames2 {
	enEN: string
	esES: string
}

export interface Phase {
	alternateNames: AlternateNames3
	id: number
	name: string
}

export interface AlternateNames3 {
	enEN: string
	esES: string
}

export interface Subphase { }

export interface Season {
	id: number
	name: string
}

export interface Sport {
	alternateNames: AlternateNames4
	id: string
	name: string
	type: string
}

export interface AlternateNames4 {
	enEN: string
	esES: string
}

export interface Tournament {
	alternateNames: AlternateNames5
	id: string
	name: string
	isNational: boolean
}

export interface AlternateNames5 {
	enEN: string
	esES: string
	itIT: string
	ptBR: string
}

export interface Rank {
	standing: Standing
	_id: string
	alternateCommonNames?: AlternateCommonNames
	id: string
	name: string
	fullName: string
	country: string
	countryName: string
	alternateCountryNames: AlternateCountryNames
	imageUrlSizes: ImageUrlSizes
	imageUrl: string
	images: Images
	competitorEditorialInfo?: CompetitorEditorialInfo
}

export interface Standing {
	home: Home
	away: Away
	position: string
	points: string
	played: string
	won: string
	lost: string
	drawn: string
	against: string
	for: string
	posVariation: string
	wonPercentage: string
}

export interface Home {
	against: string
	drawn: string
	for: string
	lost: string
	played: string
	points: string
	position: string
	won: string
	wonPercentage: string
}

export interface Away {
	against: string
	drawn: string
	for: string
	lost: string
	played: string
	points: string
	position: string
	won: string
	wonPercentage: string
}

export interface AlternateCommonNames {
	enEN: string
	esES: string
	itIT: string
	ptBR: string
}

export interface AlternateCountryNames {
	enEN: string
	esES: string
}

export interface ImageUrlSizes {
	XS: string
	S: string
	M: string
	L: string
}

export interface Images {
	urlLogo: string[]
	urlFlag: string[]
}

export interface CompetitorEditorialInfo {
	competitorId: string
	urlsDataCenter: UrlsDataCenter
}

export interface UrlsDataCenter {
	site: string
	url: string
	otherUrls: OtherUrl[]
}

export interface OtherUrl {
	tag: string
	url: string
}

export interface Day {
	short: string
	long: string
}

export interface MatchDay {
	id: number
	day: Day
	date: number
	month: string
	year: number
	dateFull: string
	dateFullShort: string
	currentDate: Date
}

/////////////////////////////////////
///////-----TYPES RESULTS-----///////
/////////////////////////////////////

export interface IUserAndState {
	status: string[]
	result: string[]
}

export interface IBetDocument extends DocumentData {
	id: string
	uid: string
	day: string
	name: string
	bets: IPredictions[]
	matches: string[]
	seasson: string
	paid: boolean
	tournament: string
	userInfo?: IUserInfo
}

export interface IPredictions {
	id: string
	prediction: string
}

export interface IBetDataDocument extends DocumentData {
	id: string
	data: IBetData
}

export interface IBetData {
	id: string
	uid: string
	day: string
	name: string
	bets: IPredictions[]
	matches: string[]
	seasson: string
	paid: boolean
	tournament: string
	userInfo?: IUserInfo
}



export interface IBetsByDay {
	bets: IBet[]
}

export interface IResultsMatches extends DocumentData {
	day: string
	results: string[]
	status: string
	winner_correct_pick: number
	isAvailable: boolean
}

export interface IMatchDays {
	matches: ICurrentMatch[]
	results: string[]
	day: number
	tournament: string
	isAvailable: boolean
	isFinishGame: boolean
}

export interface Teams {
	home: number
	away: number
}

export interface Team {
	id: string
	name: string
}

export interface ICurrentMatch {
	id: string
	teams: Teams
	startDate: string
	status: "Sin comenzar" | "En juego" | "Finalizado"
}

export interface IOptions {
	type: string
	headers: string[]
	nameHeaders: string[]
	rank: "rankGoals" | "rankCards" | "rankAssists" | "rankPasses" | "rankSaves"
	statistic: "goals" | "cards" | "assists" | "passes" | "saves" | "successPasses"
	totals: "games" | "yellowCards" | "passes"
	average:
	| "averageGoals"
	| "redCards"
	| "averageAssists"
	| "averageSuccessPasses"
	| "averageSaves"
}

export interface IErrorMatches {
	home: boolean[]
	away: boolean[]
}


export interface ITournament {
	id: string
	name: "Liga MX" | "Champions League" | "Premier League" | "La Liga" | "Bundesliga" | "Liga Holandesa" | "Serie A" | "League 1" | "Todos los torneos"
}

export interface ITournamentPosition {
	id: string
	name: "Liga MX" | "Champions League" | "Premier League" | "La Liga" | "Bundesliga" | "Liga Holandesa" | "Serie A" | "League 1"
}


export interface INews {
	titulo: string
	url: string
}

export interface IFinalsTeams {
	positions: string[]
}

export type IStage = "quarter" | "half" | "final" | "winner";

export interface IFinalsParticipants {
	id: string
	position_team: number
	progress_stage: IStage[]
	team: string
	user_info: IUser
}




export interface IUser {
	id: string;
	name: string;
	email: string;
	image: string;
	color?: string;
	account?: string;
	total_bets?: number;
	finals_won?: number;
	last_login?: Date;
	bets_won?: number;
	notifications?: boolean;
	tokenNotifications?: string
}

export interface UserSession {
	id: string;
	name: string;
	email: string;
	image: string;
	notifications?: boolean;
	color?: string;
	account?: string;
	total_bets?: number;
	bets_won?: number;
	finals_won?: number;
	last_login?: Date;
	emailVerified: Date | null;
}

export interface IMatchDay {
	id: number
	matches: string[]
	season: string
	day: number
	isAvailable: boolean
	isFinishGame: boolean
	results: string[]
	matchesRel: IMatch[]
	bets: IBet[]
}

export interface IMatch {
	homeTeam: string
	awayTeam: string
	matchDay?: number
	status?: 'not started' | 'in progress' | 'finished'
	startDate: Nullable<Date>
}

export interface IMatchesResponse {
	response: IMatch[]
}

export interface IHitsBet {
	id: string
	uid: string
	name: string
	predictions: IPredictions[]
	paid: boolean
	day: number
	season: string
	tournament: string
	hits: number
	userInfo?: UserSession
}


export interface IBet {
	id: string
	uid: string
	name: string
	predictions: IPrediction[]
	paid: boolean
	day: number
	season: string
	tournament: string
	userInfo: UserSession

}

export interface IPrediction {
	id: string
	matchNumber: number
	prediction: 'L' | 'V' | 'E'
}

export type TStatistics = "possPercentage" | "duelsWon" | "shots" | "shotsOnGoal" | "wonCorners" | "successPass" | "lostPass" | "ballsLost" | "ballsRecovery" | "saves" | "fouls" | "goals" | "totalOffsides" | "yellowCards" | "redCards"


export interface ITopic {
	name: string
	title: string
	message: string
	link: string
}