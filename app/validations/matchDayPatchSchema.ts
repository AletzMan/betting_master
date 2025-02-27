import * as z from "zod";



export const MatchDayPatchSchema = z.object({
    isAvailable: z.boolean(),
    isFinishGame: z.boolean(),
    results: z.array(z.enum(["L", "V", "E", "LV", "-"])).min(8, "Se requiere al menos 8 resultados")
});