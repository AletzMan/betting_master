import * as z from "zod";

export const UserSchema = z.object({
    id: z.string().uuid().optional(), // Opcional porque se genera automáticamente
    name: z.string().min(1, "El nombre es requerido"),
    uid: z.string().min(1, "El UID es requerido"),
    email: z.string().email("Email inválido"),
    photo: z.string().url("URL de foto inválida").optional(), // Opcional y nullable
    color: z.string().optional(), // Opcional y nullable
    account: z.string().optional(), // Opcional y nullable
    total_bets: z.number().int().min(0, "El número de apuestas debe ser mayor o igual a 0").optional(),
    bets_won: z.number().int().min(0, "El número de apuestas ganadas debe ser mayor o igual a 0").optional(),
    finals_won: z.number().int().min(0, "El número de finales ganadas debe ser mayor o igual a 0").optional(),
    last_login: z.coerce.date().optional(), // Convierte la entrada a un objeto Date
    notifications: z.boolean().optional(),
});

export type UserType = z.infer<typeof UserSchema>;