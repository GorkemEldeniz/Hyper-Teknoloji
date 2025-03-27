import { getProductById } from "@/actions/product";
import ProductDetail from "@/components/product-detail";

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const product = await getProductById(id);

	return <ProductDetail product={product} />;
}
