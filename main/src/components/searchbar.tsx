import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const searchSchema = z.object({
	search: z.string(),
});

export default function Searchbar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	const form = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			search: search || "",
		},
	});

	const onSubmit = (data: z.infer<typeof searchSchema>) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("search", data.search);
		router.push(`${pathname}?${newSearchParams.toString()}`);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='search'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Arama</FormLabel>
							<FormControl>
								<Input type='text' placeholder='Ürün arama...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
