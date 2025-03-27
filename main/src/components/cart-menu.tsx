import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CartContext } from "@/lib/context/cart-provider";
import { formatPriceToTurkish } from "@/lib/utils";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function CartMenu() {
	const { items, addItem, removeItem, removeAllByProductId } =
		useContext(CartContext);

	// Toplam fiyat hesaplama
	const totalPrice = items.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0
	);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button className='relative' variant='outline' size='icon'>
					<ShoppingCart className='h-5 w-5' />
					{items.length > 0 && (
						<span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center'>
							{items.reduce((total, item) => total + item.quantity, 0)}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-80'>
				<div className='p-2'>
					<h3 className='font-medium text-center pb-2'>Sepetim</h3>
					<Separator />
				</div>

				{items.length === 0 ? (
					<div className='py-6 text-center'>
						<p className='text-muted-foreground'>Sepetiniz boş</p>
					</div>
				) : (
					<>
						<ScrollArea className='h-[300px] p-2'>
							{items.map((item) => (
								<DropdownMenuItem
									key={item.product.id}
									className='flex flex-col items-start py-3 px-2 focus:bg-transparent cursor-default'
								>
									<div className='flex w-full justify-between items-center mb-2'>
										<div className='flex items-center gap-3'>
											<div className='relative h-12 w-12 overflow-hidden rounded bg-accent/10'>
												{item.product.image && (
													<Image
														src={item.product.image}
														alt={item.product.title}
														fill
														className='object-contain p-1'
													/>
												)}
											</div>
											<div>
												<h4 className='text-sm font-medium line-clamp-1'>
													{item.product.title}
												</h4>
												<p className='text-xs text-muted-foreground'>
													{formatPriceToTurkish(item.product.price)}
												</p>
											</div>
										</div>
										<Button
											variant='ghost'
											size='icon'
											className='h-7 w-7 text-destructive opacity-70 hover:opacity-100'
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
												removeAllByProductId(item.product.id);
											}}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>

									<div className='flex items-center justify-between w-full'>
										<div className='flex items-center text-sm'>
											<Button
												variant='outline'
												size='icon'
												className='h-6 w-6'
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													removeItem(item.product.id);
												}}
											>
												<Minus className='h-3 w-3' />
											</Button>
											<span className='w-8 text-center'>{item.quantity}</span>
											<Button
												variant='outline'
												size='icon'
												className='h-6 w-6'
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													addItem({
														product: item.product,
														quantity: item.quantity + 1,
													});
												}}
											>
												<Plus className='h-3 w-3' />
											</Button>
										</div>
										<p className='text-sm font-medium'>
											{formatPriceToTurkish(item.product.price * item.quantity)}
										</p>
									</div>
									<DropdownMenuSeparator className='mt-3' />
								</DropdownMenuItem>
							))}
						</ScrollArea>

						<div className='p-4 bg-muted/50'>
							<div className='flex justify-between items-center mb-4'>
								<span className='font-medium'>Toplam</span>
								<span className='font-bold text-primary'>
									{formatPriceToTurkish(totalPrice)}
								</span>
							</div>
							<Button className='w-full' asChild>
								<Link href='/payment'>Ödeme Yap</Link>
							</Button>
						</div>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
