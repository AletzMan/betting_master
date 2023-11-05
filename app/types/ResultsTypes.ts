
export interface ResponseDataResults {
    data: DataResults
}



export interface DataResults {
    status: string
    data: Results[]
    timestamp: string
}

export interface Results {
    id: string
    lastUpdate: string
    startDate: string
    score: Score
    sport: Sport
    sportEvent: SportEvent
    tournament: Tournament
}

export interface Score {
    awayTeam: AwayTeam
    homeTeam: HomeTeam
    period: Period
    winner: Winner
}

export interface AwayTeam {
    subScore: string
    totalScore: string
}

export interface HomeTeam {
    subScore: string
    totalScore: string
}

export interface Period {
    alternateNames: AlternateNames
    id: number
    name: string
    startTime?: string
}

export interface AlternateNames {
    enEN: string
    esES: string
}

export interface Winner {
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

export interface SportEvent {
    competitors: Competitors
    season: Season
    matchDay: string
    phase: Phase
    group: Group
    alternateNames: AlternateNames5
    location: Location
    name: string
    status: Status
}

export interface Season {
    id: number
    name: string
}

export interface Competitors {
    awayTeam: AwayTeam2
    homeTeam: HomeTeam2
}

export interface AwayTeam2 {
    abbName: string
    commonName: string
    fullName: string
    alternateCommonNames: AlternateCommonNames
    id: string
    country: string
    countryName: string
    alternateCountryNames: AlternateCountryNames
    sham?: boolean
    imageUrlSizes: ImageUrlSizes
    imageUrl: string
    images: Images
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

export interface HomeTeam2 {
    abbName: string
    commonName: string
    alternateCommonNames: AlternateCommonNames2
    fullName: string
    id: string
    country: string
    countryName: string
    alternateCountryNames: AlternateCountryNames2
    imageUrlSizes: ImageUrlSizes2
    imageUrl: string
    images: Images2
    sham?: boolean
}

export interface AlternateCommonNames2 {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}

export interface AlternateCountryNames2 {
    enEN: string
    esES: string
}

export interface ImageUrlSizes2 {
    XS: string
    S: string
    M: string
    L: string
}

export interface Images2 {
    urlLogo: string[]
    urlFlag: string[]
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

export interface Group {
    id: string
    name: string
    alternateNames: AlternateNames4
}

export interface AlternateNames4 {
    enEN: string
    esES: string
}

export interface AlternateNames5 {
    enEN: string
    esES: string
}

export interface Location {
    address: string
    image: string
    name: string
    url: string
}

export interface Status {
    alternateNames: AlternateNames6
    id: number
    name: string
}

export interface AlternateNames6 {
    enEN: string
    esES: string
}

export interface Tournament {
    alternateNames: AlternateNames7
    id: string
    name: string
    isNational: boolean
}

export interface AlternateNames7 {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}
