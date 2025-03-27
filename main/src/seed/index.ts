import fs from "fs";
import path from "path";

// Define a Product interface
interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
}

const CATEGORIES_FILE_PATH = path.resolve(
	process.cwd(),
	"src",
	"mock",
	"categories.json"
);

// Get categories from products
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getCategoriesFromProducts() {
	const response = await fetch("https://fakestoreapi.com/products");
	const products = (await response.json()) as Product[];

	const productSet = new Set<string>();
	products.forEach((product: Product) => productSet.add(product.category));

	const categories = Array.from(productSet);

	fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));

	return categories;
}
