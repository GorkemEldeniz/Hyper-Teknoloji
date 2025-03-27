"use client";

import { turkishCategoryMap } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./card";
import CategoryFilter from "./category-filter";

export default function ProductsContainer({
	products,
}: {
	products: Product[];
}) {
	const searchParams = useSearchParams();
	const router = useRouter();

	return (
		<div className='container px-4 py-8 mx-auto'>
			<h1 className='text-3xl font-bold mb-8'>Ürünler</h1>
			<div className='flex flex-col lg:flex-row gap-6'>
				<div className='w-full lg:w-64 mb-6 lg:mb-0'>
					<CategoryFilter products={products} />
				</div>
				<div className='flex-1'>
					{searchParams.has("categories") && (
						<div className='mb-4'>
							<p className='text-sm text-muted-foreground'>
								Kategoriler:{" "}
								<span className='font-medium'>
									{searchParams
										.get("categories")
										?.split(",")
										.map(
											(category) =>
												turkishCategoryMap[
													category as keyof typeof turkishCategoryMap
												]
										)
										.join(", ")}
								</span>
								{" · "}
								<button
									onClick={() => {
										const params = new URLSearchParams(searchParams.toString());
										params.delete("categories");
										router.push(`/products`);
									}}
									className='text-primary hover:underline'
								>
									Filteri Kaldır
								</button>
							</p>
						</div>
					)}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{products.length > 0 ? (
							products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))
						) : (
							<div className='col-span-full text-center py-12'>
								<p className='text-muted-foreground'>
									No products found matching the selected filters.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
