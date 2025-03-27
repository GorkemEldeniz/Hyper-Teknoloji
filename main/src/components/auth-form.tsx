"use client";

import { signInAction, signUpAction } from "@/actions/auth";
import { useToast } from "@/hooks/use-toast";
import { signInSchema, signUpSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface AuthFormProps {
	type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
	const formSchema = type === "login" ? signInSchema : signUpSchema;

	const defaultValues =
		type === "login"
			? { email: "", password: "" }
			: { username: "", email: "", password: "", confirmPassword: "" };

	const router = useRouter();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const { execute: signIn, status: signInStatus } = useAction(signInAction, {
		onSuccess: ({ data }) => {
			if (data?.success) {
				toast({
					variant: "success",
					title: "Başarılı",
					description: "Giriş yapıldı",
				});
				router.push("/products");
			} else {
				toast({
					variant: "warning",
					title: "Hata",
					description: data?.error || "Giriş yapılırken bir hata oluştu",
				});
			}
		},
		onError: ({ error }) => {
			toast({
				variant: "destructive",
				title: "Hata",
				description: error?.serverError || "Giriş yapılırken bir hata oluştu",
			});
		},
	});

	const { execute: signUp, status: signUpStatus } = useAction(signUpAction, {
		onSuccess: ({ data }) => {
			if (data?.success) {
				toast({
					variant: "success",
					title: "Başarılı",
					description: "Giriş yapıldı",
				});
				router.push("/products");
			} else {
				toast({
					variant: "warning",
					title: "Hata",
					description: data?.error || "Giriş yapılırken bir hata oluştu",
				});
			}
		},
		onError: ({ error }) => {
			toast({
				variant: "destructive",
				title: "Hata",
				description: error?.serverError || "Giriş yapılırken bir hata oluştu",
			});
		},
	});

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		if (type === "login") {
			signIn(data as z.infer<typeof signInSchema>);
		} else {
			signUp(data as z.infer<typeof signUpSchema>);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-4 w-full'
			>
				{type === "register" && (
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Kullanıcı Adı</FormLabel>
								<FormControl>
									<Input placeholder='kullaniciadi' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-posta</FormLabel>
							<FormControl>
								<Input placeholder='ornek@email.com' type='email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Şifre</FormLabel>
							<FormControl>
								<Input type='password' placeholder='********' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{type === "register" && (
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Şifre Tekrarı</FormLabel>
								<FormControl>
									<Input type='password' placeholder='********' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button
					type='submit'
					className='w-full mt-6'
					disabled={
						form.formState.isSubmitting ||
						signInStatus === "executing" ||
						signUpStatus === "executing"
					}
				>
					{signInStatus === "executing" || signUpStatus === "executing" ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							{type === "login" ? "Giriş Yapılıyor..." : "Kaydolunuyor..."}
						</>
					) : (
						<>{type === "login" ? "Giriş Yap" : "Kayıt Ol"}</>
					)}
				</Button>
			</form>
		</Form>
	);
}
