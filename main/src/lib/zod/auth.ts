import * as z from "zod";

const signInSchema = z.object({
	email: z.string().email({ message: "Geçersiz e-posta adresi." }),
	password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
});

const signUpSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: "Kullanıcı adı en az 2 karakter olmalı." }),
		email: z.string().email({ message: "Geçersiz e-posta adresi." }),
		password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı." }),
		confirmPassword: z
			.string()
			.min(8, { message: "Şifre en az 8 karakter olmalı." }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Şifreler eşleşmiyor.",
		path: ["confirmPassword"],
	});

export { signInSchema, signUpSchema };
