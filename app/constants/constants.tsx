import {
	AmericaLogo,
	AtlasLogo,
	AtleticoMardidLogo,
	BarcelonaLogo,
	BetsIcon,
	ChivasLogo,
	CruzAzulLogo,
	GetafeLogo,
	JuarezLogo,
	LeonLogo,
	LuckIcon,
	MazatlanLogo,
	MonterreyLogo,
	NecaxaLogo,
	OsasunaLogo,
	PachucaLogo,
	PositionsIcon,
	PueblaLogo,
	PumasLogo,
	QueretaroLogo,
	RayoLogo,
	RealMadridLogo,
	ResultsIcon,
	SanLuisLogo,
	SantosLogo,
	StarIcon,
	StatsIcon,
	TigresLogo,
	TijuanaLogo,
	TolucaLogo,
} from "@/app/svg"
import { IOptions, Team } from "../types/types"

export const TeamsLogos = [
	{
		id: 0,
		logo: <AmericaLogo className="logo__team_slided" />,
		name: "América",
		abbName: "AME",
		color_one: "#d6bf25",
		color_two: "#00225d",
		color_three: "#e4503a",
	},
	{
		id: 1,
		logo: <AtlasLogo className="logo__team_slided" />,
		name: "Atlas",
		abbName: "ATS",
		color_one: "#dd2709",
		color_two: "#000000",
		color_three: "#FFFFFF",
	},
	{
		id: 2,
		logo: <CruzAzulLogo className="logo__team_slided" />,
		name: "Cruz Azul",
		abbName: "CRZ",
		color_one: "#001f60",
		color_two: "#FFFFFF",
		color_three: "#de1d33",
	},
	{
		id: 3,
		logo: <ChivasLogo className="logo__team_slided" />,
		name: "Guadalajara",
		abbName: "GUA",
		color_one: "#CE0E2D",
		color_two: "#FFFFFF",
		color_three: "#002856",
	},
	{
		id: 4,
		logo: <JuarezLogo className="logo__team_slided" />,
		name: "Juárez",
		abbName: "JUA",
		color_one: "#76bc21",
		color_two: "#000000",
		color_three: "#d7282f",
	},
	{
		id: 5,
		logo: <LeonLogo className="logo__team_slided" />,
		name: "León",
		abbName: "LEO",
		color_one: "#00722e",
		color_two: "#FFFFFF",
		color_three: "#fbde00",
	},
	{
		id: 6,
		logo: <TigresLogo className="logo__team_slided" />,
		name: "Tigres",
		abbName: "TIG",
		color_one: "#f1a21e",
		color_two: "#FFFFFF",
		color_three: "#00369c",
	},
	{
		id: 7,
		logo: <MazatlanLogo className="logo__team_slided" />,
		name: "Mazatlán",
		abbName: "MAZ",
		color_one: "#533278",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 8,
		logo: <MonterreyLogo className="logo__team_slided" />,
		name: "Monterrey",
		abbName: "MTY",
		color_one: "#0a2240",
		color_two: "#FFFFFF",
		color_three: "#FFFFFF",
	},
	{
		id: 9,
		logo: <NecaxaLogo className="logo__team_slided" />,
		name: "Necaxa",
		abbName: "NEC",
		color_one: "#EA0029",
		color_two: "#FFFFFF",
		color_three: "#FFFFFF",
	},
	{
		id: 10,
		logo: <PachucaLogo className="logo__team_slided" />,
		name: "Pachuca",
		abbName: "PCH",
		color_one: "#002577",
		color_two: "#FFFFFF",
		color_three: "#FFFFFF",
	},
	{
		id: 11,
		logo: <PueblaLogo className="logo__team_slided" />,
		name: "Puebla",
		abbName: "PUE",
		color_one: "#35426a",
		color_two: "#FFFFFF",
		color_three: "#FFFFFF",
	},
	{
		id: 12,
		logo: <PumasLogo className="logo__team_slided" />,
		name: "Pumas",
		abbName: "PUM",
		color_one: "#001e47",
		color_two: "#FFFFFF",
		color_three: "#766910",
	},
	{
		id: 13,
		logo: <SanLuisLogo className="logo__team_slided" />,
		name: "San Luis",
		abbName: "SLUI",
		color_one: "#a23725",
		color_two: "#FFFFFF",
		color_three: "#2a2e5b",
	},
	{
		id: 14,
		logo: <SantosLogo className="logo__team_slided" />,
		name: "Santos",
		abbName: "SAN",
		color_one: "#007763",
		color_two: "#FFFFFF",
		color_three: "#f8be0d",
	},
	{
		id: 15,
		logo: <TijuanaLogo className="logo__team_slided" />,
		name: "Tijuana",
		abbName: "TIJ",
		color_one: "#df040b",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 16,
		logo: <TolucaLogo className="logo__team_slided" />,
		name: "Toluca",
		abbName: "TOL",
		color_one: "#ce0e2d",
		color_two: "#FFFFFF",
		color_three: "#111c4e",
	},
	{
		id: 17,
		logo: <QueretaroLogo className="logo__team_slided" />,
		name: "Queretaro",
		abbName: "QUE",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 18,
		logo: <BarcelonaLogo className="logo__team_slided" />,
		name: "Barcelona",
		abbName: "BAR",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 19,
		logo: <OsasunaLogo className="logo__team_slided" />,
		name: "Osasuna",
		abbName: "OSA",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 20,
		logo: <AtleticoMardidLogo className="logo__team_slided" />,
		name: "Atlético de Madrid",
		abbName: "ATM",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 21,
		logo: <RayoLogo className="logo__team_slided" />,
		name: "Rayo Vallecano",
		abbName: "RAY",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 22,
		logo: <RealMadridLogo className="logo__team_slided" />,
		name: "Real Madrid",
		abbName: "RMD",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},
	{
		id: 23,
		logo: <GetafeLogo className="logo__team_slided" />,
		name: "Getafe",
		abbName: "GET",
		color_one: "#142055",
		color_two: "#FFFFFF",
		color_three: "#000000",
	},

]

export const TeamsNames: Team[] = [
	{
		id: "0",
		name: "América",
	},
	{
		id: "1",
		name: "Atlas",
	},
	{
		id: "2",
		name: "Cruz Azul",
	},
	{
		id: "3",
		name: "Guadalajara",
	},
	{
		id: "4",
		name: "Juárez",
	},
	{
		id: "5",
		name: "León",
	},
	{
		id: "6",
		name: "Tigres",
	},
	{
		id: "7",
		name: "Mazatlán",
	},
	{
		id: "8",
		name: "Monterrey",
	},
	{
		id: "9",
		name: "Necaxa",
	},
	{
		id: "10",
		name: "Pachuca",
	},
	{
		id: "11",
		name: "Puebla",
	},
	{
		id: "12",
		name: "Pumas",
	},
	{
		id: "13",
		name: "San Luis",
	},
	{
		id: "14",
		name: "Santos",
	},
	{
		id: "15",
		name: "Tijuana",
	},
	{
		id: "16",
		name: "Toluca",
	},
	{
		id: "17",
		name: "Queretaro",
	},
	{
		id: "18",
		name: "Barcelona",
	},
	{
		id: "19",
		name: "Osasuna",
	},
	{
		id: "20",
		name: "Atlético de Madrid",
	},
	{
		id: "21",
		name: "Rayo Vallecano",
	},
	{
		id: "22",
		name: "Real Madrid",
	},
	{
		id: "23",
		name: "Getafe",
	},
]

export const LinksPage = [
	{
		id: 0,
		text: "Quinielas",
		pathname: "/bets",
		href: "/bets",
		title: "Ir a página de quinielas",
		icon: <BetsIcon className="" />,
	},
	{
		id: 1,
		text: "Finales",
		pathname: "/finals",
		href: "/finals",
		title: "Ir a enfrentamientos finales",
		icon: <LuckIcon className="" />,
	},
	{
		id: 2,
		text: "Resultados",
		pathname: "/results",
		href: "/results",
		title: "Ir a página de resultados",
		icon: <ResultsIcon className="" />,
	},
	{
		id: 3,
		text: "Posiciones",
		pathname: "/positions",
		href: "/positions",
		title: "Ir a página de posiciones",
		icon: <PositionsIcon className="" />,
	},
	{
		id: 4,
		text: "Estadísticas",
		pathname: "/statistics",
		href: `/statistics?tournament=${new Date().getMonth() < 6 ? "0168" : "0159"}&type=goals`,
		title: "Ir a página de estadística",
		icon: <StatsIcon className="" />,
	},
]

export const LinksProfile = [
	{
		id: 0,
		text: "Perfil",
		href: "/profile",
		title: "Ir a sección de perfil",
	},
	{
		id: 1,
		text: "Iniciar Sesión",
		href: "/login",
		title: "Ir a página de inicio de sesión",
	},
	{
		id: 2,
		text: "Cerrar sesión",
		href: "/logout",
		title: "Cerrar sesión",
	},
]

export const Tournaments = [
	{
		id: new Date().getMonth() < 6 ? "0168" : "0159",
		name: "Liga MX",
	},
	{
		id: "0106",
		name: "Premier League",
	},
	{
		id: "0101",
		name: "La Liga",
	},
	{
		id: "0108",
		name: "Bundesliga",
	},
	{
		id: "0146",
		name: "Liga Holandesa",
	},
	{
		id: "0107",
		name: "Serie A",
	},
	{
		id: "0109",
		name: "League 1",
	},
	{
		id: "0103",
		name: "Champions League",
	},
]


export const TournamentsInitYear = [
	{
		id: "0168",
		name: "Liga MX",
	},
	{
		id: "0106",
		name: "Premier League",
	},
	{
		id: "0101",
		name: "La Liga",
	},
	{
		id: "0108",
		name: "Bundesliga",
	},
	{
		id: "0146",
		name: "Liga Holandesa",
	},
	{
		id: "0107",
		name: "Serie A",
	},
	{
		id: "0109",
		name: "League 1",
	},
	{
		id: "0103",
		name: "Champions League",
	},
]
export const STATISTICS_OPTIONS: IOptions[] = [
	{
		type: "goals",
		headers: ["TG", "JG", "G/P"],
		nameHeaders: ["Total de  totales", "Partidos jugados", "Goles por partido"],
		statistic: "goals",
		totals: "games",
		average: "averageGoals",
		rank: "rankGoals",
	},
	{
		type: "cards",
		headers: ["TT", "TA", "TR"],
		nameHeaders: ["Total de tarjetas", "Tarjetas amarillas", "Tarjetas rojas"],
		statistic: "cards",
		totals: "yellowCards",
		average: "redCards",
		rank: "rankCards",
	},
	{
		type: "assists",
		headers: ["TA", "PJ", "A/P"],
		nameHeaders: ["Asistencias totales", "Partidos jugados", "Asistencias por partido"],
		statistic: "assists",
		totals: "games",
		average: "averageAssists",
		rank: "rankAssists",
	},
	{
		type: "passes",
		headers: ["PB", "PI", "%P"],
		nameHeaders: ["Pases buenos", "Pases intersectados", "Porcentaje de pases por partido"],
		statistic: "successPasses",
		totals: "passes",
		average: "averageSuccessPasses",
		rank: "rankPasses",
	},
	{
		type: "saves",
		headers: ["PT", "PJ", "%P"],
		nameHeaders: ["Paradas totales", "Partidos jugados", "Porcentaje de paradas por partidos"],
		statistic: "saves",
		totals: "games",
		average: "averageSaves",
		rank: "rankSaves",
	},
]
