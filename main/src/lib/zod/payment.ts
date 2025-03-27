import { z } from "zod";

export const paymentSchema = z.object({
	cardNumber: z.string().refine((value) => {
		const digitsOnly = value.replace(/-/g, "");
		return digitsOnly.length === 16;
	}, "Kart numarası 16 haneli olmalıdır"),
	cardHolderName: z
		.string()
		.min(5, "Kart sahibi adı en az 5 karakter olmalıdır")
		.max(50, "Kart sahibi adı en fazla 50 karakter olmalıdır"),
	cardExpirationDate: z
		.string()
		.min(4, "Son kullanma tarihi AA/YY formatında olmalıdır")
		.max(4, "Son kullanma tarihi AA/YY formatında olmalıdır")
		.regex(/^\d+$/, "Son kullanma tarihi sadece rakam içermelidir")
		.refine((value) => {
			// Ay kontrolü (01-12 arası olmalı)
			const month = parseInt(value.substring(0, 2), 10);
			return month >= 1 && month <= 12;
		}, "Geçersiz ay")
		.refine((value) => {
			// Şuanki tarih
			const now = new Date();
			const currentYear = now.getFullYear() % 100; // Son 2 basamak (YY)
			const currentMonth = now.getMonth() + 1; // 1-12

			// Kart bilgilerinden ay ve yıl
			const cardMonth = parseInt(value.substring(0, 2), 10);
			const cardYear = parseInt(value.substring(2, 4), 10);

			// Geçerlilik kontrolü (şuanki tarihten sonra olmalı)
			if (cardYear > currentYear) {
				return true;
			} else if (cardYear === currentYear) {
				return cardMonth >= currentMonth;
			}
			return false;
		}, "Kartın son kullanma tarihi geçmiş"),
	cardCvv: z
		.string()
		.min(3, "CVV kodu 3 haneli olmalıdır")
		.max(3, "CVV kodu 3 haneli olmalıdır")
		.refine((value) => {
			const parsedValue = parseInt(value, 10);
			return !isNaN(parsedValue) && parsedValue.toString().length === 3;
		}, "CVV kodu sadece rakam içermelidir"),
});
