"use client";

import type { CartItem, Product } from "@/types/product";
import { createContext, useEffect, useState } from "react";

type CartContextType = {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	addItemByAmount: (product: Product, amount: number) => void;
	removeItem: (id: number) => void;
	clearCart: () => void;
	removeAllByProductId: (id: number) => void;
};

export const CartContext = createContext<CartContextType>({
	items: [],
	addItem: () => {},
	addItemByAmount: () => {},
	removeItem: () => {},
	clearCart: () => {},
	removeAllByProductId: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [items, setItems] = useState<CartItem[]>([]);

	// This effect runs only once on the client side
	useEffect(() => {
		setItems(
			localStorage.getItem("cart")
				? JSON.parse(localStorage.getItem("cart")!)
				: []
		);
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addItem = (item: CartItem) => {
		if (items.some((i) => i.product.id === item.product.id)) {
			setItems((prevItems) =>
				prevItems.map((i) =>
					i.product.id === item.product.id
						? {
								...i,
								quantity: i.quantity + 1,
						  }
						: i
				)
			);
		} else {
			setItems((prevItems) => [...prevItems, item]);
		}
	};

	const addItemByAmount = (product: Product, amount: number) => {
		const item = items.find((i) => i.product.id === product.id);
		if (item) {
			setItems((prevItems) =>
				prevItems.map((i) =>
					i.product.id === product.id
						? { ...i, quantity: i.quantity + amount }
						: i
				)
			);
		} else {
			setItems((prevItems) => [...prevItems, { product, quantity: amount }]);
		}
	};

	const removeItem = (id: number) => {
		const item = items.find((i) => i.product.id === id);
		if (item) {
			if (item.quantity === 1) {
				setItems((prevItems) => prevItems.filter((i) => i.product.id !== id));
			} else {
				setItems((prevItems) =>
					prevItems.map((i) =>
						i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i
					)
				);
			}
		}
	};

	const removeAllByProductId = (id: number) => {
		setItems((prevItems) => prevItems.filter((i) => i.product.id !== id));
	};

	const clearCart = () => {
		setItems([]);
	};

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				removeItem,
				clearCart,
				removeAllByProductId,
				addItemByAmount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
