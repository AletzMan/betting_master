import {
	AmericaLogo,
	AtlasLogo,
	ChivasLogo,
	CruzAzulLogo,
	JuarezLogo,
	LeonLogo,
	MazatlanLogo,
	MonterreyLogo,
	NecaxaLogo,
	PachucaLogo,
	PueblaLogo,
	PumasLogo,
	QueretaroLogo,
	SanLuisLogo,
	SantosLogo,
	StatsIcon,
	TigresLogo,
	TijuanaLogo,
	TolucaLogo,
} from "@/app/svg"

export const TeamsLogos = [
	{ id: 0, logo: <AmericaLogo className="logo__team_slided" />, color_one: "#d6bf25", color_two: "#00225d", color_three: "#e4503a" },
	{ id: 1, logo: <AtlasLogo className="logo__team_slided" />, color_one: "#dd2709", color_two: "#000000", color_three: "#FFFFFF" },
	{ id: 2, logo: <CruzAzulLogo className="logo__team_slided" />, color_one: "#001f60", color_two: "#FFFFFF", color_three: "#de1d33" },
	{ id: 3, logo: <ChivasLogo className="logo__team_slided" />, color_one: "#CE0E2D", color_two: "#FFFFFF", color_three: "#002856" },
	{ id: 4, logo: <JuarezLogo className="logo__team_slided" />, color_one: "#76bc21", color_two: "#000000", color_three: "#d7282f" },
	{ id: 5, logo: <LeonLogo className="logo__team_slided" />, color_one: "#00722e", color_two: "#FFFFFF", color_three: "#fbde00" },
	{ id: 6, logo: <TigresLogo className="logo__team_slided" />, color_one: "#f1a21e", color_two: "#FFFFFF", color_three: "#00369c" },
	{ id: 7, logo: <MazatlanLogo className="logo__team_slided" />, color_one: "#533278", color_two: "#FFFFFF", color_three: "#000000" },
	{ id: 8, logo: <MonterreyLogo className="logo__team_slided" />, color_one: "#0a2240", color_two: "#FFFFFF", color_three: "#FFFFFF" },
	{ id: 9, logo: <NecaxaLogo className="logo__team_slided" />, color_one: "#EA0029", color_two: "#FFFFFF", color_three: "#FFFFFF" },
	{ id: 10, logo: <PachucaLogo className="logo__team_slided" />, color_one: "#002577", color_two: "#FFFFFF", color_three: "#FFFFFF" },
	{ id: 11, logo: <PueblaLogo className="logo__team_slided" />, color_one: "#35426a", color_two: "#FFFFFF", color_three: "#FFFFFF" },
	{ id: 12, logo: <PumasLogo className="logo__team_slided" />, color_one: "#001e47", color_two: "#FFFFFF", color_three: "#766910" },
	{ id: 13, logo: <SanLuisLogo className="logo__team_slided" />, color_one: "#a23725", color_two: "#FFFFFF", color_three: "#2a2e5b" },
	{ id: 14, logo: <SantosLogo className="logo__team_slided" />, color_one: "#007763", color_two: "#FFFFFF", color_three: "#f8be0d" },
	{ id: 15, logo: <TijuanaLogo className="logo__team_slided" />, color_one: "#df040b", color_two: "#FFFFFF", color_three: "#000000" },
	{ id: 16, logo: <TolucaLogo className="logo__team_slided" />, color_one: "#ce0e2d", color_two: "#FFFFFF", color_three: "#111c4e" },
	{ id: 17, logo: <QueretaroLogo className="logo__team_slided" />, color_one: "#142055", color_two: "#FFFFFF", color_three: "#000000" },
]

export const LinksPage = [
	{
		id: 0,
		text: "Quinielas",
		href: "/bets",
		title: "Ir a página de quinielas",
	},
	{
		id: 1,
		text: "Estadísticas",
		href: "/stats",
		title: "Ir a página de estadísticas",
	},
	{
		id: 2,
		text: "Resultados",
		href: "/results",
		title: "Ir a página de resultados",
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
