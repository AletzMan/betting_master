
export interface ResponseDetailsMatch {
    data: DetailsMatch
}


export interface DetailsMatch {
    status: string
    data: DetailsData
    timestamp: string
    time: number
}

export interface DetailsData {
    id: string
    event: Event
    lastUpdate: string
    lineup: Lineup
    eventStats: EventStats
    narration: Narration
    summary: Summary
}

export interface Event {
    id: string
    lastUpdate: string
    startDate: string
    indexInfo: IndexInfo
    docType: DocType
    sport: Sport
    tournament: Tournament
    season: Season
    matchDay: string
    sportEvent: SportEvent
    score: Score
    scoreDetails: ScoreDetails
    editorialInfo: EditorialInfo
    statsDetails: StatsDetails
    editorialIntro: EditorialIntro
    seoText: SeoText
}

export interface IndexInfo {
    sportId: string
    tournamentId: string
    eventDate: string
    homeTeam: string
    awayTeam: string
}

export interface DocType {
    id: number
    name: string
}

export interface Sport {
    alternateNames: AlternateNames
    id: string
    name: string
    type: string
}

export interface AlternateNames {
    enEN: string
    esES: string
}

export interface Tournament {
    alternateNames: AlternateNames2
    id: string
    name: string
    isNational: boolean
}

export interface AlternateNames2 {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}

export interface Season {
    id: string
    name: string
}

export interface SportEvent {
    competitors: Competitors
    referees: string[]
    season: Season2
    matchDay: string
    phase: Phase
    group: Group
    alternateNames: AlternateNames5
    location: Location
    name: string
    status: Status
}

export interface Competitors {
    awayTeam: AwayTeam
    homeTeam: HomeTeam
}

export interface AwayTeam {
    abbName: string
    commonName: string
    fullName: string
    alternateCommonNames: AlternateCommonNames
    id: string
    country: string
    countryName: string
    alternateCountryNames: AlternateCountryNames
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

export interface HomeTeam {
    abbName: string
    commonName: string
    fullName: string
    id: string
    country: string
    countryName: string
    alternateCountryNames: AlternateCountryNames2
    imageUrlSizes: ImageUrlSizes2
    imageUrl: string
    images: Images2
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

export interface Season2 {
    id: string
    name: string
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
    name: string
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

export interface Score {
    awayTeam: AwayTeam2
    homeTeam: HomeTeam2
    period: Period
    winner: Winner
}

export interface AwayTeam2 {
    subScore: string
    totalScore: string
}

export interface HomeTeam2 {
    subScore: string
    totalScore: string
}

export interface Period {
    alternateNames: AlternateNames7
    id: number
    name: string
}

export interface AlternateNames7 {
    enEN: string
    esES: string
}

export interface Winner {
    id: string
    name: string
}

export interface ScoreDetails {
    goals: Goals
}

export interface Goals {
    awayTeam: AwayTeam3[]
    homeTeam: HomeTeam3[]
}

export interface AwayTeam3 {
    _id: string
    date: string
    matchTime: number
    period: Period2
    playerCommonName: string
    playerId: string
    playerFullName: string
    type: Type
}

export interface Period2 {
    alternateNames: AlternateNames8
    id: number
    name: string
}

export interface AlternateNames8 {
    enEN: string
    esES: string
}

export interface Type {
    id: number
    typeName: string
    abbr: string
}

export interface HomeTeam3 {
    _id: string
    date: string
    matchTime: number
    period: Period3
    playerCommonName: string
    playerId: string
    playerFullName: string
    type: Type2
}

export interface Period3 {
    alternateNames: AlternateNames9
    id: number
    name: string
}

export interface AlternateNames9 {
    enEN: string
    esES: string
}

export interface Type2 {
    id: number
    typeName: string
    abbr: string
}

export interface EditorialInfo {
    site: string
    url: string
    otherUrls: OtherUrl[]
}

export interface OtherUrl {
    tag: string
    url: string
}

export interface StatsDetails {
    discipline: Discipline
    substitutions: Substitutions
}

export interface Discipline {
    awayTeam: AwayTeam4
    homeTeam: HomeTeam4
}

export interface AwayTeam4 {
    redCards: RedCard[]
    yellowCards: YellowCard[]
}

export interface YellowCard {
    _id: string
    date: string
    matchTime: number
    playerCommonName: string
    playerId: string
    playerFullName: string
    period: Period4
}
export interface RedCard {
    _id: string
    date: string
    matchTime: number
    playerCommonName: string
    playerId: string
    playerFullName: string
    period: Period4
}

export interface Period4 {
    alternateNames: AlternateNames10
    id: number
    name: string
}

export interface AlternateNames10 {
    enEN: string
    esES: string
}

export interface HomeTeam4 {
    redCards: RedCard[]
    yellowCards: YellowCard[]
}

export interface Substitutions {
    awayTeam: AwayTeam5[]
    homeTeam: HomeTeam5[]
}

export interface AwayTeam5 {
    _id: string
    date: string
    matchTime: number
    subOff: SubOff
    subOn: SubOn
}

export interface SubOff {
    playerCommonName: string
    playerId: string
    playerFullName: string
}

export interface SubOn {
    playerCommonName: string
    playerId: string
    playerFullName: string
}

export interface HomeTeam5 {
    _id: string
    date: string
    matchTime: number
    subOff: SubOff2
    subOn: SubOn2
}

export interface SubOff2 {
    playerCommonName: string
    playerId: string
    playerFullName: string
}

export interface SubOn2 {
    playerCommonName: string
    playerId: string
    playerFullName: string
}

export interface EditorialIntro {
    timePublished: string
    timeModified: string
    normalizedText: NormalizedText[]
}

export interface NormalizedText {
    type: string
    content: any
    visualStates?: any[]
}

export interface SeoText {
    timePublished: string
    timeModified: string
    normalizedText: NormalizedText2[]
}

export interface NormalizedText2 {
    type: string
    content: string
}

export interface Lineup {
    id: string
    lastUpdate: string
    eventId: string
    lineups: Lineups
    blocked: boolean
    lineupConfirmed: boolean
}

export interface Lineups {
    homeTeam: HomeTeam6
    awayTeam: AwayTeam6
}

export interface HomeTeam6 {
    teamInfo: TeamInfo
    formationTeam: string
    teamKit: TeamKit
    inicialLineup: InicialLineup[]
    substitutesInicialLineup: SubstitutesInicialLineup[]
    actualLineup: ActualLineup[]
    substitutesActualLineup: SubstitutesActualLineup[]
    manager: string
}

export interface TeamInfo {
    id: string
    fullName: string
    commonName: string
}

export interface TeamKit {
    colour1: string
    colour2: string
}

export interface InicialLineup {
    name: string
    playerPosition: PlayerPosition
    jerseyNumber: string
    formationPlace: string
    id: string
}

export interface PlayerPosition {
    id: string
    name: string
    alternateNames: AlternateNames11
}

export interface AlternateNames11 {
    enEN: string
    esES: string
    ptBR: string
}

export interface SubstitutesInicialLineup {
    name: string
    playerPosition: PlayerPosition2
    jerseyNumber: string
    id: string
}

export interface PlayerPosition2 {
    id: string
    name: string
    alternateNames: AlternateNames12
}

export interface AlternateNames12 {
    enEN: string
    esES: string
    ptBR: string
}

export interface ActualLineup {
    name: string
    playerPosition: PlayerPosition3
    jerseyNumber: string
    formationPlace: string
    id: string
    titular: boolean
    changeTo?: ChangeTo
}

export interface PlayerPosition3 {
    id: string
    name: string
    alternateNames: AlternateNames13
}

export interface AlternateNames13 {
    enEN: string
    esES: string
    ptBR: string
}

export interface ChangeTo {
    id: string
    name: string
    minute: string
    reason: string
    alternateReasonNames: AlternateReasonNames
}

export interface AlternateReasonNames {
    enEN: string
    esES: string
}

export interface SubstitutesActualLineup {
    name: string
    playerPosition: PlayerPosition4
    jerseyNumber: string
    id: string
    titular: boolean
    changeTo?: ChangeTo2
    formationPlace: string
}

export interface PlayerPosition4 {
    id: string
    name: string
    alternateNames: AlternateNames14
}

export interface AlternateNames14 {
    enEN: string
    esES: string
    ptBR: string
}

export interface ChangeTo2 {
    id: string
    name: string
    minute: string
    reason: string
    alternateReasonNames: AlternateReasonNames2
}

export interface AlternateReasonNames2 {
    enEN: string
    esES: string
}

export interface AwayTeam6 {
    teamInfo: TeamInfo2
    formationTeam: string
    teamKit: TeamKit2
    inicialLineup: InicialLineup2[]
    substitutesInicialLineup: SubstitutesInicialLineup2[]
    actualLineup: ActualLineup2[]
    substitutesActualLineup: SubstitutesActualLineup2[]
    manager: string
}

export interface TeamInfo2 {
    id: string
    fullName: string
    commonName: string
    alternateCommonNames: AlternateCommonNames2
}

export interface AlternateCommonNames2 {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}

export interface TeamKit2 {
    colour1: string
    colour2: string
}

export interface InicialLineup2 {
    name: string
    playerPosition: PlayerPosition5
    jerseyNumber: string
    formationPlace: string
    id: string
}

export interface PlayerPosition5 {
    id: string
    name: string
    alternateNames: AlternateNames15
}

export interface AlternateNames15 {
    enEN: string
    esES: string
    ptBR: string
}

export interface SubstitutesInicialLineup2 {
    name: string
    playerPosition: PlayerPosition6
    jerseyNumber: string
    id: string
}

export interface PlayerPosition6 {
    id: string
    name: string
    alternateNames: AlternateNames16
}

export interface AlternateNames16 {
    enEN: string
    esES: string
    ptBR: string
}

export interface ActualLineup2 {
    name: string
    playerPosition: PlayerPosition7
    jerseyNumber: string
    formationPlace: string
    id: string
    titular: boolean
    changeTo?: ChangeTo3
}

export interface PlayerPosition7 {
    id: string
    name: string
    alternateNames: AlternateNames17
}

export interface AlternateNames17 {
    enEN: string
    esES: string
    ptBR: string
}

export interface ChangeTo3 {
    id: string
    name: string
    minute: string
    reason: string
    alternateReasonNames: AlternateReasonNames3
}

export interface AlternateReasonNames3 {
    enEN: string
    esES: string
}

export interface SubstitutesActualLineup2 {
    name: string
    playerPosition: PlayerPosition8
    jerseyNumber: string
    id: string
    titular: boolean
    changeTo?: ChangeTo4
    formationPlace: string
}

export interface PlayerPosition8 {
    id: string
    name: string
    alternateNames: AlternateNames18
}

export interface AlternateNames18 {
    enEN: string
    esES: string
    ptBR: string
}

export interface ChangeTo4 {
    id: string
    name: string
    minute: string
    reason: string
    alternateReasonNames: AlternateReasonNames4
}

export interface AlternateReasonNames4 {
    enEN: string
    esES: string
}

export interface EventStats {
    id: string
    lastUpdate: string
    eventId: string
    stats: Stats
    blocked: boolean
}

export interface Stats {
    homeTeam: HomeTeam7
    awayTeam: AwayTeam7
}

export interface HomeTeam7 {
    teamInfo: TeamInfo3
    statsTeam: StatsTeam
    statsPlayers: StatsPlayer[]
    teamKit: TeamKit3
}

export interface TeamInfo3 {
    id: string
    fullName: string
    commonName: string
}

export interface StatsTeam {
    goals: number
    possPercentage: number
    duelsWon: number
    shots: number
    shotsOnGoal: number
    wonCorners: number
    totalOffsides: number
    successPass: number
    lostPass: number
    ballsLost: number
    ballsRecovery: number
    saves: number
    fouls: number
    yellowCards: number
    redCards: number
}

export interface StatsPlayer {
    statsPlayer: StatsPlayer2
    player: Player
    jerseyNumber: string
    playerPosition: PlayerPosition9
}

export interface StatsPlayer2 {
    goals: number
    ownGoals: number
    playedTime: number
    shots: number
    shotsOnGoal: number
    fouls: number
    foulsReceived: number
    yellowCards: number
    redCards: number
    successPass: number
    lostPass: number
    saves: number
    clearances: number
    goalsConceded: number
}

export interface Player {
    id: string
    knownName: string
    firstName: string
    lastName: string
    birthPlace?: string
    birthDate: string
    firstNationality?: string
    weight?: string
    height?: string
    country: string
    alternatePreferredFootNames?: AlternatePreferredFootNames
    alternateFirstNationalityNames?: AlternateFirstNationalityNames
    alternateCountryNames: AlternateCountryNames3
}

export interface AlternatePreferredFootNames {
    enEN: string
    esES: string
}

export interface AlternateFirstNationalityNames {
    enEN: string
    esES: string
}

export interface AlternateCountryNames3 {
    enEN: string
    esES: string
}

export interface PlayerPosition9 {
    id: string
    name: string
    alternateNames: AlternateNames19
}

export interface AlternateNames19 {
    enEN: string
    esES: string
    ptBR: string
}

export interface TeamKit3 {
    colour1: string
}

export interface AwayTeam7 {
    teamInfo: TeamInfo4
    statsTeam: StatsTeam2
    statsPlayers: StatsPlayer3[]
    teamKit: TeamKit4
}

export interface TeamInfo4 {
    id: string
    fullName: string
    commonName: string
    alternateCommonNames: AlternateCommonNames3
}

export interface AlternateCommonNames3 {
    enEN: string
    esES: string
    itIT: string
    ptBR: string
}

export interface StatsTeam2 {
    goals: number
    possPercentage: number
    duelsWon: number
    shots: number
    shotsOnGoal: number
    wonCorners: number
    totalOffsides: number
    successPass: number
    lostPass: number
    ballsLost: number
    ballsRecovery: number
    saves: number
    fouls: number
    yellowCards: number
    redCards: number
}

export interface StatsPlayer3 {
    statsPlayer: StatsPlayer4
    player: Player2
    jerseyNumber: string
    playerPosition: PlayerPosition10
}

export interface StatsPlayer4 {
    goals: number
    ownGoals: number
    playedTime: number
    shots: number
    shotsOnGoal: number
    fouls: number
    foulsReceived: number
    yellowCards: number
    redCards: number
    successPass: number
    lostPass: number
    saves: number
    clearances: number
    goalsConceded: number
}

export interface Player2 {
    id: string
    knownName: string
    firstName: string
    lastName: string
    birthDate?: string
    firstNationality?: string
    weight?: string
    height?: string
    country: string
    alternatePreferredFootNames?: AlternatePreferredFootNames2
    alternateFirstNationalityNames?: AlternateFirstNationalityNames2
    alternateCountryNames: AlternateCountryNames4
    birthPlace?: string
}

export interface AlternatePreferredFootNames2 {
    enEN: string
    esES: string
}

export interface AlternateFirstNationalityNames2 {
    enEN: string
    esES: string
}

export interface AlternateCountryNames4 {
    enEN: string
    esES: string
}

export interface PlayerPosition10 {
    id: string
    name: string
    alternateNames: AlternateNames20
}

export interface AlternateNames20 {
    enEN: string
    esES: string
    ptBR: string
}

export interface TeamKit4 {
    colour1: string
}

export interface Narration {
    id: string
    startDate: string
    lastUpdate: string
    eventId: string
    narrationHead: NarrationHead
    commentaries: Commentary[]
    blocked: boolean
}

export interface NarrationHead {
    narrationType: NarrationType
    language: Language
    unit: Unit
    commOrder: string
}

export interface NarrationType {
    typeId: string
    typeName: string
}

export interface Language {
    code: string
    id: string
    name: string
}

export interface Unit {
    name: string
    id: string
}

export interface Commentary {
    auto: boolean
    id: number
    commentary: string
    timePublished?: string
    timeModified: string
    momentAction?: string
    type?: string
    content: Content[]
    typeAtom: string
    commEditing: string
    period?: Period5
}

export interface Content {
    type: string
    content: string
}

export interface Period5 {
    alternateNames: AlternateNames21
    id: number
    name: string
}

export interface AlternateNames21 {
    enEN: string
    esES: string
}

export interface Summary {
    lastUpdate: string
    narrationId: string
    startDate: string
    eventId: string
    narrationHead: NarrationHead2
    commentaries: Commentary2[]
}

export interface NarrationHead2 {
    narrationType: NarrationType2
    language: Language2
    unit: Unit2
    commOrder: string
}

export interface NarrationType2 {
    typeId: string
    typeName: string
}

export interface Language2 {
    code: string
    id: string
    name: string
}

export interface Unit2 {
    name: string
    id: string
}

export interface Commentary2 {
    auto: boolean
    id: number
    commentary: string
    timePublished: string
    timeModified: string
    momentAction: string
    period: Period6
    type: string
    content: Content2[]
    typeAtom: string
    commEditing: string
}

export interface Period6 {
    alternateNames: AlternateNames22
    id: number
    name: string
}

export interface AlternateNames22 {
    enEN: string
    esES: string
}

export interface Content2 {
    type: string
    content: string
}
