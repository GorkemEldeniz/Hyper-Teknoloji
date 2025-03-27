import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";

export default function CardExpirationInput({
	expirationDate,
	isError,
	onChange,
}: {
	expirationDate: string;
	isError: boolean;
	onChange?: (value: string) => void;
}) {
	const [formattedDate, setFormattedDate] = useState(expirationDate);

	// Format display with slash
	useEffect(() => {
		let formattedValue = "";
		// Remove any non-digit characters from the input
		const digitsOnly = expirationDate.replace(/\D/g, "");

		for (let i = 0; i < digitsOnly.length; i++) {
			if (i === 2 && i < digitsOnly.length) {
				formattedValue += "/";
			}
			formattedValue += digitsOnly[i];
		}
		setFormattedDate(formattedValue);
	}, [expirationDate]);

	// Handle input changes - only allow numbers and format with slash
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		// Remove any non-digit characters and slash
		const digitsOnly = inputValue.replace(/\D/g, "");

		if (onChange && digitsOnly.length <= 4) {
			onChange(digitsOnly);
		}
	};

	return (
		<Input
			value={formattedDate}
			onChange={handleChange}
			placeholder='AA/YY'
			className={isError ? "border-red-500" : ""}
			maxLength={5} // 4 digits + 1 slash
			inputMode='numeric'
		/>
	);
}
