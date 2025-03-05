import * as z from "zod";

export const MatchUpdateSchema = z.object({
    status: z.enum(["not started", "in progress", "finished"]), // Validación para status 
});
