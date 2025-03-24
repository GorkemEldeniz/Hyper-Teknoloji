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
