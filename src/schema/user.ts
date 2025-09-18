import * as z from "zod";


export function getEditUserSchema(messages: {
	invalidEmail: string,
	minLength: (min: number) => string,
	maxLength: (max: number) => string,
}) {
	return z.object({
		email: z.email({ message: messages.invalidEmail }),
		fullName: z.string()
			.min(3, { message: messages.minLength(3) })
			.max(60, { message: messages.maxLength(60) }),
		nickname: z.string()
			.min(2, { message: messages.minLength(2) })
			.max(30, { message: messages.maxLength(30) })
			.optional(),
	});
}

export type EditUserFormData = z.infer<ReturnType<typeof getEditUserSchema>>;