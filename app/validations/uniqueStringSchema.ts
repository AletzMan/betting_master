import { z } from "zod"

export const uniqueStringSchema = z
	.array(z.string().min(1, "No se permiten elementos vacíos"))
	.length(8, "El array debe tener exactamente 8 elementos")
	.refine((arr) => new Set(arr).size === arr.length, {
		message: "No se permiten elementos duplicados",
	})