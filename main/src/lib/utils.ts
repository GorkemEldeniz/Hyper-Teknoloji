import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function tryCatch<T, E extends Error>(fn: () => Promise<T | E>) {
	try {
		const result = await fn();
		return result;
	} catch (error) {
		console.error(error);
		return error as E;
	}
}

export async function Promisefy<T>(fn: () => T, delay = 1000) {
	return new Promise<T>((resolve) => {
		setTimeout(() => {
			resolve(fn());
		}, delay);
	});
}

export function formatPriceToTurkish(price: number) {
	return new Intl.NumberFormat("tr-TR", {
		style: "currency",
		currency: "TRY",
	}).format(price);
}

export const turkishCategoryMap = {
	electronics: "Elektronik",
	jewelery: "Takı",
	"men's clothing": "Erkek Giyim",
	"women's clothing": "Kadın Giyim",
};
