import * as z from "zod";

export const UserUpdateSchema = z.object({
    color: z.string().optional(), // Opcional y nullable
    account: z.string()
        .length(18, { message: "La cuenta debe tener exactamente 18 caracteres." })
        .or(z.literal("")) // Permite strings vacíos
        .nullable()
        .optional(),
    total_bets: z.number().int().min(0, "El número de apuestas debe ser mayor o igual a 0").optional(),
    bets_won: z.number().int().min(0, "El número de apuestas ganadas debe ser mayor o igual a 0").optional(),
    finals_won: z.number().int().min(0, "El número de finales ganadas debe ser mayor o igual a 0").optional(),
    last_login: z.coerce.date().optional(), // Convierte la entrada a un objeto Date
    notifications: z.boolean().optional(),
    tokenNotifications: z.string().optional(),
});

export type UserType = z.infer<typeof UserUpdateSchema>; 