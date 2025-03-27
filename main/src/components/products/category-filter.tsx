"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { turkishCategoryMap } from "@/lib/utils";
import categories from "@/mock/categories.json";
import type { Product } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import Searchbar from "../searchbar";

interface CategoryFilterProps {
	products: Product[];
}

export default function CategoryFilter({ products }: CategoryFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const categoriesParams = searchParams.get("categories") || "";

	const categoriesParamsArray = categoriesParams
		? categoriesParams.split(",")
		: [];

	const handleCategoryChange = (category: string, checked: boolean) => {
		const params = new URLSearchParams(searchParams.toString());

		const newCategories = checked
			? [...categoriesParamsArray, category]
			: categoriesParamsArray.filter((c) => c !== category);

		if (newCategories.length === 0) {
			params.delete("categories");
		} else {
			params.set("categories", newCategories.join(","));
		}

		router.push(`?${params.toString()}`);
	};

	return (
		<Card className='hidden lg:block sticky top-20 h-fit w-full max-w-xs border-muted/40'>
			<CardHeader className='pb-3 space-y-3'>
				<CardTitle className='text-lg font-medium'>Kategoriler</CardTitle>
				<div className='relative'>
					<Searchbar />
				</div>
			</CardHeader>
			<CardContent className='pt-0'>
				<ScrollArea className='h-fit pr-4'>
					<div className='flex flex-col space-y-4'>
						{categories.length > 0 ? (
							categories.map((category) => (
								<div
									className='flex items-center space-x-3 group'
									key={category}
								>
									<Checkbox
										id={category}
										checked={categoriesParamsArray.includes(category)}
										onCheckedChange={(checked) =>
											handleCategoryChange(category, checked === true)
										}
										className='data-[state=checked]:bg-primary data-[state=checked]:border-primary'
									/>
									<Label
										htmlFor={category}
										className='text-sm capitalize leading-none cursor-pointer hover:text-primary group-hover:text-primary transition-colors'
									>
										{
											turkishCategoryMap[
												category as keyof typeof turkishCategoryMap
											]
										}
									</Label>
									<span className='ml-auto text-xs text-muted-foreground'>
										(
										{
											products.filter((p: Product) => p.category === category)
												.length
										}
										)
									</span>
								</div>
							))
						) : (
							<p className='text-sm text-muted-foreground py-2'>
								No categories found
							</p>
						)}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
