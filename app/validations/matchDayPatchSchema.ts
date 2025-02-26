import * as z from "zod";



export const MatchDayPatchSchema = z.object({
    isAvailable: z.boolean(),
    isFinishGame: z.boolean(),
    results: z.array(z.enum(["L", "V", "E", "LV", "-"])).min(1, "Se requiere al menos una resultado")
});