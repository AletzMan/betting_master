import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const URL_API = "https://api.unidadeditorial.es/sports/v1/events/preset/" //Liga MX
const URL_API_MX =
  "https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=" //Liga MX
//const URL_API = "https://api.unidadeditorial.es/sports/v1/events/preset/74_183a06e3?timezoneOffset=-6&date=" //Liga MX
//const URL_API = "https://api.unidadeditorial.es/sports/v1/events/preset/34_45d657ef?timezoneOffset=-6&date=" //All matches
//const URL_API = "https://api.unidadeditorial.es/sports/v1/events/preset/182_835e556b?timezoneOffset=-6&date=" //Liga ES

export async function GET(request: NextRequest, context: any) {
  const { params } = context
  const paramsURL = request.nextUrl.searchParams
  const tournament = paramsURL.get("tournament")

  const URL_Selected = tournament
    ? `${URL_API}${tournament}?timezoneOffset=-6&date=${params.date}`
    : URL_API_MX

  try {
    const response = await axios.get(URL_Selected)
    const data = response.data

    if (response.status === 204) {
      return NextResponse.json({}, { status: 204 })
    }
    if (response.status === 200) {
      return NextResponse.json({ data }, { status: 200 })
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
    }
    return NextResponse.json({ error: true, message: error }, { status: 500 })
  }
}
