"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { CartContext } from "@/lib/context/cart-provider";
import { formatPriceToTurkish } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function ProductCard({ product }: { product: Product }) {
	const router = useRouter();

	const { addItem } = useContext(CartContext);

	return (
		<Card
			onClick={() => router.push(`/products/${product.id}`)}
			className='h-full flex flex-col overflow-hidden transition-all hover:shadow-md'
		>
			<CardHeader className='p-4 pb-0'>
				<div className='relative aspect-square w-full bg-muted/20 rounded-md overflow-hidden'>
					<Image
						src={product.image}
						alt={product.title}
						fill
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						className='object-contain p-4'
						priority={false}
					/>
				</div>
			</CardHeader>
			<CardContent className='flex-grow p-4 pt-2 pb-0'>
				<Badge variant='outline' className='mb-2'>
					{product.category}
				</Badge>
				<h3 className='font-medium line-clamp-2 mb-2 text-base'>
					{product.title}
				</h3>
				<p className='text-muted-foreground text-sm line-clamp-2 mb-2'>
					{product.description}
				</p>
			</CardContent>
			<CardFooter className='flex items-center justify-between p-4'>
				<span className='font-bold text-lg'>
					{formatPriceToTurkish(product.price)}
				</span>
				<Button
					size='sm'
					className='flex items-center gap-2'
					variant='default'
					onClick={(e) => {
						e.stopPropagation();
						addItem({ product, quantity: 1 });
					}}
				>
					<ShoppingCart className='h-4 w-4' />
					Sepete Ekle
				</Button>
			</CardFooter>
		</Card>
	);
}
