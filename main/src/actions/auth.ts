"use server";

import { signInSchema, signUpSchema } from "@/lib/zod/auth";
import users from "@/mock/user.json";
import { SignJWT, jwtVerify } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { actionClient } from "../lib/safe-action";
import { Promisefy, tryCatch } from "../lib/utils";

// Kullanıcı dosyası için doğru yol tanımı
// const USER_FILE_PATH = path.join(process.cwd(), "src/mock/user.json");

const signInAction = actionClient
	.schema(signInSchema)
	.action(async ({ parsedInput: { email, password } }) => {
		// TODO: Get user from database

		const user = await Promisefy(() =>
			users.find((user: { email: string }) => user.email === email)
		);

		if (!user) {
			return { success: false, error: "Kullanıcı bulunamadı" };
		}

		if (user.password !== password) {
			return { success: false, error: "Şifre yanlış" };
		}

		// expires in 1 hour
		const token = await tryCatch(() =>
			new SignJWT({ name: user.username, email: user.email })
				.setProtectedHeader({ alg: "HS256" })
				.setExpirationTime("1h")
				.sign(new TextEncoder().encode(process.env.JWT_SECRET))
		);

		if (!token || token instanceof Error) {
			return { success: false, error: "Token oluşturulamadı" };
		}

		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		revalidatePath("/sign-in");

		return { success: true, error: null };
	});

const signUpAction = actionClient
	.schema(signUpSchema)
	.action(async ({ parsedInput: { email, username } }) => {
		// TODO: Create user in database

		/* DEVELOPMENT ONLY 
		const fileContent = fs.readFileSync(USER_FILE_PATH, "utf8");
		const users = JSON.parse(fileContent);

		const user = await Promisefy(() =>
			users.find((user: { email: string }) => user.email === email)
		);

		if (user) {
			return { success: false, error: "Kullanıcı zaten mevcut" };
		}

		const newUser = {
			id: (users.length || 0) + 1,
			email: email as string,
			password: password as string,
			username: username as string,
		};

		// Kullanıcıyı ekle
		users.push(newUser);

		// Dosyayı kaydet
		try {
			// Dizin yapısını kontrol et, yoksa oluştur
			const dir = path.dirname(USER_FILE_PATH);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.writeFileSync(USER_FILE_PATH, JSON.stringify(users, null, 2));
		} catch (error) {
			console.error("User file write error:", error);
			return { success: false, error: "Kullanıcı kaydedilemedi" };
		}
		*/

		const token = await tryCatch(() =>
			new SignJWT({ name: username, email: email })
				.setProtectedHeader({ alg: "HS256" })
				.setExpirationTime("1h")
				.sign(new TextEncoder().encode(process.env.JWT_SECRET))
		);

		if (!token || token instanceof Error) {
			return { success: false, error: "Token oluşturulamadı" };
		}

		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		revalidatePath("/sign-up");

		return { success: true, error: null };
	});

const signOutAction = actionClient.action(async () => {
	try {
		// fake delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const cookieStore = await cookies();
		cookieStore.delete("token");
		revalidatePath("/products");
		return { success: true, error: null };
	} catch (error) {
		console.error("Sign out error:", error);
		return { success: false, error: "Çıkış yapılırken bir hata oluştu" };
	}
});

const getCurrentUserAction = actionClient.action(async () => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("token");

		if (!token) {
			return { success: false, error: "Token bulunamadı" };
		}

		const { payload } = await jwtVerify(
			token.value,
			new TextEncoder().encode(process.env.JWT_SECRET)
		);

		if (!payload) {
			return { success: false, error: "Token geçersiz" };
		}

		/* DEVELOPMENT ONLY 
		const users = fs.readFileSync(USER_FILE_PATH, "utf8");
		const user = JSON.parse(users).find(
			(user: { id: number }) => user.id === payload.id
		);

		if (!user) {
			return { success: false, error: "Kullanıcı bulunamadı" };
		}
		*/

		return {
			success: true,
			data: { name: payload.name, email: payload.email },
		};
	} catch (error) {
		console.error("Get current user error:", error);
		return { success: false, error: "Kullanıcı alınamadı" };
	}
});

export { getCurrentUserAction, signInAction, signOutAction, signUpAction };
