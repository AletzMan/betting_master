import z from "zod"
import { emailSchema } from "./emailSchema"

export const notificationsMailSchema = z.object({
	emails: z.array(z.string().email()),
	day: z.coerce.number()
})
