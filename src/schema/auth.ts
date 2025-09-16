
import * as z from "zod";

export function getRegisterSchema(messages: {
	invalidEmail: string,
	minLength: (min: number) => string,
	maxLength: (max: number) => string,
	passwordsDoNotMatch: string,
}) {
	return z.object({
		email: z.email({ message: messages.invalidEmail }),
		fullName: z.string()
			.min(3, { message: messages.minLength(3) })
			.max(60, { message: messages.maxLength(60) }),
		nickname: z.string()
			.min(3, { message: messages.minLength(3) })
			.max(30, { message: messages.maxLength(30) }),
		password: z.string()
			.min(6, { message: messages.minLength(6) })
			.max(100, { message: messages.maxLength(100) }),
		confirmPassword: z.string()
			.min(6, { message: messages.minLength(6) })
			.max(100, { message: messages.maxLength(100) }),
	}).refine((data) => data.password === data.confirmPassword, {
		message: messages.passwordsDoNotMatch,
		path: ['confirmPassword'],
	});
}

export type RegisterSchema = z.infer<ReturnType<typeof getRegisterSchema>>;
