import * as z from "zod";

export const MatchSchema = z.object({
    homeTeam: z.string().min(1, "Equipo local es requerido"),
    awayTeam: z.string().min(1, "Equipo visitante es requerido"),
    status: z.enum(["not started", "in progress", "finished"]).default("not started"), // Validación para status
    startDate: z.date().default(new Date()), // Validación para startDate
});


export const MatchDaySchema = z.object({
    day: z.number().min(1, "Jornada debe ser mayor a 0"), // Cambiado a z.number()
    matches: z.array(MatchSchema).min(1, "Se requiere al menos un partido"), // Validación de matches
    season: z.string().min(1, "Temporada es requerido"),
});

