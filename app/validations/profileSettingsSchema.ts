import zod from "zod"

export const profileSettingsSchema = zod.object({
	account: zod
		.string({ required_error: "Error de sintaxis" })
		.regex(/^\d{18}$|^$/, { message: "Se requieren 18 dígitos" }),
})
