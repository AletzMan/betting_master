import { z } from "zod";

export const subscribeSchema = z.object({
	tokens: z.array(z.string().min(1, "Cada token debe contener al menos 1 carácter."), {
		required_error: "Se requiere al menos un token.",
		invalid_type_error: "Los tokens deben ser un array de cadenas."
	}),
	topic: z.string({ invalid_type_error: "Por favor, introduce el nombre del tema." }).min(5, { message: "El nombre del tema debe tener al menos 5 caracteres." })
});