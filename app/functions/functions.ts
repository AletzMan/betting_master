import { TeamsLogos, TeamsNames } from "../constants/constants"
import { GetResults } from "../services/fetch_utils"
import { StatsTeam, StatsTeam2 } from "../types/DetailsMatch"
import { Results } from "../types/ResultsTypes"
import {
  IBetDocument,
  IBetsByDay,
  ICurrentMatch,
  IErrorMatches,
  IHitsBet,
  IMatchDay,
  IUserAndState,
  MatchDay,
} from "../types/types"

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }

const DAYS = [
  {
    short: "DOM",
    long: "Domingo",
  },
  {
    short: "LUN",
    long: "Lunes",
  },
  {
    short: "MAR",
    long: "Martes",
  },
  {
    short: "MIE",
    long: "Miercoles",
  },
  {
    short: "JUE",
    long: "Jueves",
  },
  {
    short: "VIE",
    long: "Viernes",
  },
  {
    short: "SAB",
    long: "Sabado",
  },
]

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
]

export const GetCurrentDays = (today: Date): MatchDay[] => {
  const MATCH_DAYS: MatchDay[] = []
  for (let i = -2; i <= 2; i++) {
    const currentDate: Date = new Date(today)
    currentDate.setDate(today.getDate() + i)
    MATCH_DAYS.push({
      id: i + 2,
      day: DAYS[currentDate.getDay()],
      date: currentDate.getDate(),
      month: MONTHS[currentDate.getMonth()],
      year: currentDate.getFullYear(),
      dateFull: `${DAYS[currentDate.getDay()].long} ${currentDate.getDate()} ${
        MONTHS[currentDate.getMonth()]
      }`,
      dateFullShort: `${currentDate.getFullYear()}-${formattedNumber(
        currentDate.getMonth() + 1
      )}-${formattedNumber(currentDate.getDate())}`,
      currentDate: currentDate,
    })
  }
  return MATCH_DAYS
}

const formattedNumber = (number: number) => {
  const newNumber = number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  return newNumber
}

export const FormattedCulbNames = (name: string) => {
  const result = name.replace(" Laguna", "").replace("Atlético ", "").replace(" UNAM", "")
  return result
}

export const DefineTypeGoal = (type: string) => {
  if (type === "normal") {
    return ""
  } else if (type === "penalty") {
    return "(P)"
  } else if (type === "propia puerta") {
    return "(AG)"
  }
}

export const GetListStats = (stats: StatsTeam | StatsTeam2) => {
  const list = Object.entries(stats) as [string, number][]
  return list
}

export function GetWeekendDays(): string[] {
  const today = new Date()
  const currentDay = today.getDay()

  if (currentDay === 0) {
    // Es domingo, así que obtenemos el fin de semana pasado
    const daysToSubtract = 3 // Restar días para llegar al jueves de la semana pasada
    const lastThursday = new Date(today)
    lastThursday.setDate(today.getDate() - daysToSubtract)

    const weekendDays = []
    for (let i = 0; i < 5; i++) {
      const day = new Date(lastThursday)

      day.setDate(lastThursday.getDate() + i)

      //const formattedDate = day.toISOString().split('T')[0]; // Formato yyyy-mm-dd
      const formatDate = new Date(day).toLocaleString("es-MX", options).split("/")
      const CURRENT_DAY = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
      weekendDays.push(CURRENT_DAY)
    }

    return weekendDays
  } else if (currentDay === 1) {
    // Es domingo, así que obtenemos el fin de semana pasado
    const daysToSubtract = 4 // Restar días para llegar al jueves de la semana pasada
    const lastThursday = new Date(today)
    lastThursday.setDate(today.getDate() - daysToSubtract)

    const weekendDays = []
    for (let i = 0; i < 5; i++) {
      const day = new Date(lastThursday)
      day.setDate(lastThursday.getDate() + i)

      const formatDate = new Date(day).toLocaleString("es-MX", options).split("/")
      const CURRENT_DAY = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
      weekendDays.push(CURRENT_DAY)
    }

    return weekendDays
  } else if (currentDay > 1 && currentDay <= 3) {
    // Estamos en martes o miércoles, así que obtenemos el próximo fin de semana
    const daysToAdd = 4 - currentDay // Añadir días para llegar al jueves de esta semana
    const nextThursday = new Date(today)
    nextThursday.setDate(today.getDate() + daysToAdd)

    const weekendDays = []
    for (let i = 0; i < 5; i++) {
      const day = new Date(nextThursday)
      day.setDate(nextThursday.getDate() + i)

      //const formattedDate = day.toISOString().split('T')[0]; // Formato yyyy-mm-dd

      const formatDate = new Date(day).toLocaleString("es-MX", options).split("/")
      const CURRENT_DAY = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
      weekendDays.push(CURRENT_DAY)
    }

    return weekendDays
  } else {
    // Estamos en jueves, viernes, o sábado, así que obtenemos el próximo fin de semana
    const daysToAdd = 4 - currentDay // Añadir días para llegar al jueves de la próxima semana
    const nextThursday = new Date(today)
    nextThursday.setDate(today.getDate() + daysToAdd)

    const weekendDays = []
    for (let i = 0; i < 5; i++) {
      const day = new Date(nextThursday)
      day.setDate(nextThursday.getDate() + i)

      const formatDate = new Date(day).toLocaleString("es-MX", options).split("/")
      const CURRENT_DAY = `${formatDate[2]}-${formatDate[1]}-${formatDate[0]}`
      weekendDays.push(CURRENT_DAY)
    }

    return weekendDays
  }
}

export const GetMatchesOfTheDay = async () => {
  const WeekendDay = GetWeekendDays()
  const thursdayMatches = await GetResults(WeekendDay[0])
  const fridayMatches = await GetResults(WeekendDay[1])
  const saturdayMatches = await GetResults(WeekendDay[2])
  const sundayMatches = await GetResults(WeekendDay[3])
  const mondayMatches = await GetResults(WeekendDay[4])

  const results: Results[] = []

  const weekendMatches = results.concat(
    thursdayMatches,
    fridayMatches,
    saturdayMatches,
    sundayMatches,
    mondayMatches
  )
  const filterWeekend = weekendMatches.filter((matches) => Object.keys(matches).length > 0)

  return filterWeekend
}

/*export const GetResultsAndStatusMatches = (results: Results[]): IUserAndState[] => {
    let Results: IUserAndState[] = []
    //console.log(results)
    results.forEach(res => {
        if (res.score.winner.name === res.sportEvent.competitors.homeTeam.commonName && res.score.period.name === "Finalizado") {
            Results.push({ status: "end", result: "G" })
        } else if (res.score.winner.name === res.sportEvent.competitors.awayTeam.commonName && res.score.period.name === "Finalizado") {
            Results.push({ status: "end", result: "P" })
        } else if (res.score.winner.name === "" && res.score.period.name === "Finalizado") {
            Results.push({ status: "end", result: "E" })
        } else if (res.score.winner.name === res.sportEvent.competitors.homeTeam.commonName && (res.score.period.name === "2nd half" || res.score.period.name === "1st half" || res.score.period.name === "Descanso")) {
            Results.push({ status: "live", result: "G" })
        } else if (res.score.winner.name === res.sportEvent.competitors.awayTeam.commonName && (res.score.period.name === "2nd half" || res.score.period.name === "1st half" || res.score.period.name === "Descanso")) {
            Results.push({ status: "live", result: "P" })
        } else if (res.score.winner.name === "" && (res.score.period.name === "2nd half" || res.score.period.name === "1st half" || res.score.period.name === "Descanso")) {
            Results.push({ status: "live", result: "E" })
        } else if (res.score.period.name === "2nd half" || res.score.period.name === "1st half" || res.score.period.name === "Descanso") {
            Results.push({ status: "live", result: "" })
        } else if (res.score.period.name === "Sin comenzar") {
            Results.push({ status: "notstarted", result: "" })
        }
    })
    return Results
}
*/

export const InTimeToBet = (dateFirstMatch: string) => {
  const dateMatch = new Date(dateFirstMatch).getTime()

  const today = new Date().getTime()
  const timeOut = dateMatch - today
  const remainingHours = timeOut / 1000 / 60 / 60

  if (remainingHours > 0) {
    return true
  } else {
    return false
  }
}

export const TimeRemainig = (dateFirstMatch: string) => {
  const dateMatch = new Date(dateFirstMatch).getTime()
  const today = new Date().getTime()
  const timeOut = dateMatch - today
  const remainingHours = Math.floor(timeOut / 1000 / 60 / 60)
  const remainingMinutes = Math.floor((timeOut / 1000 / 60 / 60 - remainingHours) * 60)
  const remainingSeconds = Math.floor(
    timeOut / 1000 - remainingHours * 60 * 60 - remainingMinutes * 60
  )

  const timeRemainig = `${remainingHours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`

  return timeRemainig
}

export const AbbNameMatches = (matches: IMatchDay): string[] => {
  let MatchesNames: string[] = []
  for (let index = 0; index < matches.matches.length; index++) {
    const homeTeam = TeamsLogos[matches.matches[index].teams.home].abbName
    const awayTeam = TeamsLogos[matches.matches[index].teams.away].abbName
    const nameMatch = `${homeTeam}-${awayTeam}`
    MatchesNames.push(nameMatch)
  }

  return MatchesNames
}

export const GroupObjectByProperty = (objects: IBetDocument[], property: string) => {
  let newObject: Record<string, IBetsByDay> = {}
  objects.forEach((object) => {
    if (!newObject.hasOwnProperty(object.day)) {
      newObject[object.day] = {
        bets: [],
      }
    }

    newObject[object.day].bets.push({
      id: object.id,
      uid: object.uid,
      name: object.name,
      bets: object.bets,
      matches: object.matches,
      day: object.day,
    })
  })
  return newObject
}

export const SortByHits = (
  order: "asc" | "des",
  betsArray: IBetDocument[],
  results: string[]
): IHitsBet[] => {
  let orderBets: IHitsBet[] = []
  if (results.length > 0) {
    for (let index = 0; index < betsArray.length; index++) {
      let hits = 0
      betsArray[index].bets.forEach((betMatch, index) => {
        if (betMatch === results[index]) {
          hits++
        }
      })
      orderBets.push({
        id: betsArray[index].id,
        uid: betsArray[index].uid,
        name: betsArray[index].name,
        bets: betsArray[index].bets,
        matches: [],
        hits,
        day: betsArray[index].day,
      })
    }
    orderBets.sort((a, b) => {
      if (a.hits > b.hits) {
        if (order === "des") return -1
        if (order === "asc") return 1
      }
      if (a.hits < b.hits) {
        if (order === "des") return 1
        if (order === "asc") return -1
      }
      // a must be equal to b
      return 0
    })
  }
  return orderBets
}

import { Teams } from "../types/types"

export function ValidateNewBet(dataMatches: Teams[], dataDates: string[], matchDay: number) {
  let errorMatches: IErrorMatches = { home: [], away: [] }
  let errorDates: boolean[] = []
  let errorMatchDay: boolean = false
  let hasErrors: boolean = false
  let totalTeams: number[] = []
  const idTeams = Array.from({ length: 18 }, (_, index) => index)

  for (let index = 0; index < Object.entries(dataMatches).length; index++) {
    errorMatches.home.push(Number.isNaN(dataMatches[index].home))
    hasErrors = Number.isNaN(dataMatches[index].home)
    errorMatches.away.push(Number.isNaN(dataMatches[index].away))
    hasErrors = Number.isNaN(dataMatches[index].away)
    errorDates.push(dataDates[index] === "")
    hasErrors = dataDates[index] === ""

    if (hasErrors) return { errorMatches, errorDates, hasErrors, errorMatchDay }
  }

  if (matchDay === 0) {
    errorMatchDay = true
    hasErrors = true
    return { errorMatches, errorDates, hasErrors, errorMatchDay }
  }

  if (!hasErrors) {
    for (let index = 0; index < Object.entries(dataMatches).length; index++) {
      //dataMatches.includes({ home: parseInt(TeamsNames[index].id), away: parseInt(TeamsNames[index].id) })
      console.log(index)
      const idTeamHome = idTeams.find((team) => team === dataMatches[index].home)
      if (idTeamHome && !totalTeams.includes(idTeamHome)) {
        totalTeams.push(idTeamHome)
      }
      const idTeamAway = idTeams.find((team) => team === dataMatches[index].away)
      if (idTeamAway && !totalTeams.includes(idTeamAway)) {
        totalTeams.push(idTeamAway)
      }
    }
  }

  return { errorMatches, errorDates, hasErrors, totalTeams, errorMatchDay }
}
