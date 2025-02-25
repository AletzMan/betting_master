import * as z from "zod";

const MatchSchema = z.object({
    homeTeam: z.string().min(1, "Equipo local es requerido"),
    awayTeam: z.string().min(1, "Equipo visitante es requerido"),
});

export const MatchDaySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Nombre es requerido"),
    day: z.number().min(1, "Jornada debe ser mayor a 0"), // Cambiado a z.number()
    matches: z.array(MatchSchema).min(1, "Se requiere al menos un partido"), // Validación de matches
    season: z.string().min(1, "Temporada es requerido"),
});