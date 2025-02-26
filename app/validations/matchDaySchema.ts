import * as z from "zod";

export const MatchSchema = z.object({
    homeTeam: z.string().min(1, "Equipo local es requerido"),
    awayTeam: z.string().min(1, "Equipo visitante es requerido"),
    status: z.enum(["not started", "in progress", "finished"]).default("not started"), // Validación para status
    startDate: z.coerce.date().default(new Date()), // Validación para startDate
});


export const MatchDaySchema = z.object({
    day: z.coerce.number({ invalid_type_error: "Jornada debe ser mayor a 0" }).min(1, "Jornada debe ser mayor a 0"), // Cambiado a z.number()
    matches: z.array(MatchSchema, { required_error: "Se requiere al menos un partido" }).min(8, "Se requiere al menos 8 partidos"), // Validación de matches
    season: z.string({ required_error: "Temporada es requerido" }).min(1, "Temporada es requerido"),
});

