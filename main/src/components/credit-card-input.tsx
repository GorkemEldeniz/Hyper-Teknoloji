import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";

export default function CreditCardInput({
	creditCard,
	isError,
	onChange,
}: {
	creditCard: string;
	isError: boolean;
	onChange?: (value: string) => void;
}) {
	const [formattedCreditCard, setFormattedCreditCard] = useState(creditCard);

	useEffect(() => {
		let formattedValue = "";
		// Remove any non-digit characters from the input
		const digitsOnly = creditCard.replace(/\D/g, "");

		for (let i = 0; i < digitsOnly.length; i++) {
			if (i % 4 === 0 && i !== 0) {
				formattedValue += "-";
			}
			formattedValue += digitsOnly[i];
		}
		setFormattedCreditCard(formattedValue);
	}, [creditCard]);

	// Handle input changes - only allow numbers and format with dashes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		// Remove any non-digit characters and dashes
		const digitsOnly = inputValue.replace(/\D/g, "");

		if (onChange && digitsOnly.length <= 16) {
			onChange(digitsOnly);
		}
	};

	return (
		<Input
			value={formattedCreditCard}
			onChange={handleChange}
			placeholder='XXXX-XXXX-XXXX-XXXX'
			className={isError ? "border-red-500" : ""}
			maxLength={19} // 16 digits + 3 dashes
			inputMode='numeric'
		/>
	);
}
