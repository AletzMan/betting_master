import { z } from "zod";

export const topicSchema = z.object({
	name: z.string({ required_error: "El tema es requerido." }).min(5, { message: "El tema debe tener al menos 5 caracteres." }),
	title: z.string({ required_error: "El título es requerido." }).min(5, { message: "El título debe tener al menos 5 caracteres." }),
	message: z.string({ required_error: "El mensaje es requerido." }).min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
	link: z.string().optional(),
});