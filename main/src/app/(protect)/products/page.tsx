import { getProductsByCategories } from "@/actions/product";
import ProductsContainer from "@/components/products/container";

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ categories: string; search: string }>;
}) {
	const { categories, search } = await searchParams;

	const categoriesArray = categories ? categories.split(",") : [];

	const products = await getProductsByCategories(categoriesArray, search);

	return (
		<div className='container mx-auto'>
			<ProductsContainer products={products} />
		</div>
	);
}
