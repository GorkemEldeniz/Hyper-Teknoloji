import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartContext } from "@/lib/context/cart-provider";
import { formatPriceToTurkish } from "@/lib/utils";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

export default function CartMenuMobile() {
	const { removeAllByProductId, removeItem, addItem, items } =
		useContext(CartContext);

	return (
		<Accordion type='single' collapsible>
			<AccordionItem value='item-1'>
				<AccordionTrigger className='flex items-center justify-between'>
					<ShoppingCart className='h-5 w-5' />
					{items.length > 0 && (
						<span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center'>
							{items.reduce((total, item) => total + item.quantity, 0)}
						</span>
					)}
				</AccordionTrigger>
				<AccordionContent>
					<ScrollArea className='h-[300px] p-2'>
						{items.map((item) => (
							<div key={item.product.id}>
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
							</div>
						))}
					</ScrollArea>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
