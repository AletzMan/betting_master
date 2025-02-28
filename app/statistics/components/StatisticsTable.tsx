import { IStatistics } from "@/types/StatisticsTypes"
import axios from "axios"
import { PlayerStatistics } from "./PlayerStatistics"
import { STATISTICS_OPTIONS } from "@/constants/constants"
import { SearchParams } from "@/types/appTypes"

const GetStatistics = async (tournament: string | string[] | undefined, type: string | string[] | undefined) => {
	try {
		const response = await axios.get<IStatistics>(process.env.NODE_ENV === "development" ? `http://localhost:3000/api/teams/statistics/${tournament}/${type}` : `https://betting-master.vercel.app/api/teams/statistics/${tournament}/${type}`)

		if (response.status === 200) {
			setTimeout(() => { }, 3000)
			return response.data.data
		}
	} catch (error) {
		console.error(error)
	}
}

export async function StatisticsTable({ tournament, type }: { tournament: string | string[] | undefined, type: string | string[] | undefined }) {
	const statistics = await GetStatistics(tournament, type)
	const option = STATISTICS_OPTIONS.filter((option) => option?.type === type)[0]

	return (
		<>
			{statistics?.rank.map((player) => (
				<PlayerStatistics key={player.id} player={player} options={option} />
			))}
		</>
	)
}
