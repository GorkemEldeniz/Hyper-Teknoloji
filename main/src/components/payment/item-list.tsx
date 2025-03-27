"use client";

import { CartContext } from "@/lib/context/cart-provider";
import { formatPriceToTurkish } from "@/lib/utils";
import { CalculatorIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { Badge } from "../ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function ItemList() {
	const { items } = useContext(CartContext);

	// Toplam fiyat hesaplama
	const totalPrice = items.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0
	);

	// Toplam ürün adedi
	const totalItems = items.reduce((total, item) => total + item.quantity, 0);

	if (items.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className='text-lg font-medium flex items-center gap-2'>
						<ShoppingBag className='h-5 w-5 text-primary' />
						Sepetiniz
					</CardTitle>
				</CardHeader>
				<CardContent className='text-center py-6'>
					<p className='text-muted-foreground'>
						Sepetinizde ürün bulunmamaktadır.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className='pb-3'>
				<CardTitle className='text-lg font-medium flex items-center gap-2'>
					<ShoppingBag className='h-5 w-5 text-primary' />
					Sepetiniz
					<Badge variant='outline' className='ml-2 text-xs font-normal'>
						{totalItems} ürün
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className='p-0'>
				<ScrollArea className='h-[300px]'>
					<div className='px-6 py-2 space-y-1'>
						{items.map((item) => (
							<div
								key={item.product.id}
								className='flex items-center py-3 border-b border-border/40 last:border-0'
							>
								<div className='relative h-12 w-12 overflow-hidden rounded bg-accent/10 mr-3 flex-shrink-0'>
									{item.product.image && (
										<Image
											src={item.product.image}
											alt={item.product.title}
											fill
											className='object-contain p-1'
										/>
									)}
								</div>
								<div className='flex-1 min-w-0'>
									<h4 className='text-sm font-medium line-clamp-1'>
										{item.product.title}
									</h4>
									<div className='flex items-center justify-between mt-1'>
										<p className='text-xs text-muted-foreground'>
											{item.quantity} x{" "}
											{formatPriceToTurkish(item.product.price)}
										</p>
										<p className='text-sm font-medium'>
											{formatPriceToTurkish(item.product.price * item.quantity)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
			<CardFooter className='bg-muted/40 p-6 flex flex-col space-y-4'>
				<div className='w-full'>
					<div className='flex justify-between items-center text-sm text-muted-foreground mb-2'>
						<span>Ara Toplam</span>
						<span>{formatPriceToTurkish(totalPrice)}</span>
					</div>
					<div className='flex justify-between items-center text-sm text-muted-foreground mb-2'>
						<span>Kargo</span>
						<span>Ücretsiz</span>
					</div>
					<Separator className='my-2' />
					<div className='flex justify-between items-center font-medium'>
						<span className='flex items-center gap-1.5'>
							<CalculatorIcon className='h-4 w-4 text-primary' />
							Toplam
						</span>
						<span className='text-lg font-bold text-primary'>
							{formatPriceToTurkish(totalPrice)}
						</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
