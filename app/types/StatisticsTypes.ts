export interface IStatistics {
    status: string
    data: Data
}

export interface Data {
    classificationHead: ClassificationHead
    rank: Rank[]
}

export interface ClassificationHead {
    tournament: Tournament
    season: Season
    sport: Sport
}

export interface Tournament {
    alternateNames: AlternateNames
    id: string
    name: string
    sportId: string
    isNational: boolean
    gameSystem: string
    isOfficial: boolean
    gender: string
    isMainOfCountry: boolean
    currentSeason: string
}

export interface AlternateNames {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}

export interface Season {
    id: string
    name: string
}

export interface Sport {
    alternateNames: AlternateNames2
    id: string
    name: string
    type: string
}

export interface AlternateNames2 {
    enEN: string
    esES: string
}

export interface Rank {
    id: string
    playerId: string
    knownName: string
    teamName: string
    alternateTeamNames?: AlternateTeamNames
    playerPosition: PlayerPosition
    goals: number
    rankGoals: number
    averageGoals: number
    games: number
    cards?: number
    rankCards: number
    yellowCards?: number
    rankRedCards: number
    rankAssists: number
    passes: number
    successPasses: number
    rankSuccessPasses: number
    averageSuccessPasses: number
    rankPasses: number
    goalsConceded: number
    rankGoalsConceded: number
    averageGoalsConceded: number
    rankSaves: number
    redCards?: number
    assists?: number
    averageAssists?: number
    playerEditorialInfo?: PlayerEditorialInfo
    saves?: number
    averageSaves?: number
}

export interface AlternateTeamNames {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}

export interface PlayerPosition {
    id: string
    name: string
    alternateNames: AlternateNames3
}

export interface AlternateNames3 {
    enEN: string
    esES: string
    ptBR: string
}

export interface PlayerEditorialInfo {
    lastUpdate: string
    playerEditorialId: string
    sportId: string
    playerId: string
    urlsDataCenter: UrlsDataCenter
}

export interface UrlsDataCenter {
    otherUrls: OtherUrl[]
    url: string
    site: string
}

export interface OtherUrl {
    url: string
    tag: string
}
