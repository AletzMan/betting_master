import * as z from "zod";

export const BetSchema = z.object({
    uid: z.string().min(1, "UID es requerido"),
    day: z.string().min(1, "Día es requerido"),
    name: z.string().min(1, "Nombre es requerido"),
    predictions: z.array(z.enum(["L", "V", "E"])).min(8, "Se requiere al 8 predicciones"), // Validación de predictions 
    season: z.string().min(1, "Temporada es requerido"),
    tournament: z.string().min(1, "Torneo es requerido"),
});

