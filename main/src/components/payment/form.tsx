"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { paymentSchema } from "@/lib/zod/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Landmark, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardExpirationInput from "../card-expiration-input";
import CreditCardInput from "../credit-card-input";

export default function PaymentForm() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof paymentSchema>>({
		resolver: zodResolver(paymentSchema),
		defaultValues: {
			cardNumber: "",
			cardHolderName: "",
			cardExpirationDate: "",
			cardCvv: "",
		},
	});

	const onSubmit = (data: z.infer<typeof paymentSchema>) => {
		console.log(data);
		// Burada ödeme işlemleri gerçekleştirilecek
		toast({
			variant: "success",
			title: "Ödeme Başarılı",
			description: "Siparişiniz başarıyla oluşturuldu.",
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl flex items-center gap-2'>
					<CreditCard className='h-5 w-5 text-primary' />
					Ödeme Bilgileri
				</CardTitle>
				<CardDescription>
					Lütfen kart bilgilerinizi güvenli bir şekilde girin.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='cardHolderName'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='flex items-center gap-1.5'>
											<User className='h-3.5 w-3.5' />
											Kart Sahibi
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='Ad Soyad'
												className='bg-background'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='cardNumber'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='flex items-center gap-1.5'>
											<CreditCard className='h-3.5 w-3.5' />
											Kart Numarası
										</FormLabel>
										<FormControl>
											<CreditCardInput
												creditCard={field.value}
												isError={!!form.formState.errors.cardNumber}
												onChange={(value) => field.onChange(value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='cardExpirationDate'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Son Kullanma Tarihi</FormLabel>
											<FormControl>
												<CardExpirationInput
													expirationDate={field.value}
													isError={!!form.formState.errors.cardExpirationDate}
													onChange={(value) => field.onChange(value)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='cardCvv'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Güvenlik Kodu (CVV)</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='XXX'
													type='password'
													className='bg-background'
													inputMode='numeric'
													maxLength={3}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className='rounded-md bg-primary/5 p-4 border border-primary/10'>
							<div className='flex items-center gap-2 text-sm'>
								<Landmark className='h-4 w-4 text-primary' />
								<span>
									Tüm ödeme işlemleri 256-bit SSL ile şifrelenmektedir.
								</span>
							</div>
						</div>

						<Button type='submit' className='w-full'>
							Ödemeyi Tamamla
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
