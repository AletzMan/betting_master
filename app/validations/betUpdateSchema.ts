import * as z from "zod";

export const BetUpdateSchema = z.object({
    paid: z.boolean({ required_error: "Campo requerido", invalid_type_error: "Tipo no valido" })
});

