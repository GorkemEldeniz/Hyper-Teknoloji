"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartContext } from "@/lib/context/cart-provider";
import { formatPriceToTurkish } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ArrowLeft, MinusIcon, PlusIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

export default function ProductDetail({ product }: { product: Product }) {
	const { addItemByAmount } = useContext(CartContext);

	const [amount, setAmount] = useState(1);

	if (!product) {
		return (
			<div className='container mx-auto px-4 py-16 text-center'>
				<h1 className='text-2xl font-bold text-destructive'>Ürün bulunamadı</h1>
				<p className='text-muted-foreground mt-2'>
					Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
				</p>
			</div>
		);
	}

	// Fiyatı düzgün formatlama (örn: 299.99 TL)
	const formattedPrice = formatPriceToTurkish(product.price);

	return (
		<div className='container mx-auto px-4 py-8'>
			<Link href='/products' className='mb-4 flex items-center gap-2'>
				<ArrowLeft className='h-4 w-4' />
				Geri Dön
			</Link>

			<Card className='overflow-hidden'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-6'>
					{/* Ürün Görseli */}
					<div className='col-span-1 relative rounded-lg overflow-hidden bg-accent/10 flex items-center justify-center'>
						<div className='aspect-square w-full relative'>
							<Image
								src={product.image}
								alt={product.title}
								fill
								className='object-contain p-4'
								sizes='(max-width: 768px) 100vw, 50vw'
								priority
							/>
						</div>
					</div>

					{/* Ürün Bilgileri */}
					<div className='col-span-1 flex flex-col'>
						<h1 className='text-2xl md:text-3xl font-bold'>{product.title}</h1>

						<div className='flex items-center space-x-2 mt-2'>
							<span className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'>
								{product.category}
							</span>
						</div>

						<div className='mt-4'>
							<h2 className='text-3xl font-bold text-primary'>
								{formattedPrice}
							</h2>
						</div>

						<Separator className='my-6' />

						<div className='prose prose-sm dark:prose-invert'>
							<p className='text-muted-foreground'>{product.description}</p>
						</div>

						<div className='mt-6 space-y-4'>
							{/* Miktar Seçici */}
							<div className='flex items-center'>
								<span className='text-sm font-medium mr-4'>Miktar:</span>
								<div className='flex items-center space-x-2'>
									<Button
										variant='outline'
										size='icon'
										onClick={() => {
											if (amount > 1) {
												setAmount(amount - 1);
											}
										}}
									>
										<MinusIcon className='h-4 w-4' />
									</Button>
									<span className='w-8 text-center'>{amount}</span>
									<Button
										variant='outline'
										size='icon'
										onClick={() => {
											setAmount(amount + 1);
										}}
									>
										<PlusIcon className='h-4 w-4' />
									</Button>
								</div>
							</div>

							{/* Sepete Ekle Butonu */}
							<Button
								className='w-full md:w-auto'
								size='lg'
								onClick={() => {
									addItemByAmount(product, amount);
								}}
							>
								<ShoppingCart className='mr-2 h-4 w-4' />
								Sepete Ekle
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
