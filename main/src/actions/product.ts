// Get products by categories
async function getProductsByCategories(categories: string[], search: string) {
	try {
		const response = await fetch(`https://fakestoreapi.com/products`);

		let products = await response.json();

		if (categories.length > 0) {
			products = products.filter((product: { category: string }) =>
				categories.includes(product.category)
			);
		}

		if (search) {
			products = products.filter(
				(product: { title: string; description: string }) =>
					product.title.toLowerCase().includes(search.toLowerCase()) ||
					product.description.toLowerCase().includes(search.toLowerCase())
			);
		}

		return products;
	} catch (error) {
		console.error(error);
		return [];
	}
}

// Get product by id
async function getProductById(id: string) {
	try {
		const response = await fetch(`https://fakestoreapi.com/products/${id}`);
		const product = await response.json();

		return product;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export { getProductById, getProductsByCategories };
