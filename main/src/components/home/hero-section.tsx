import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className='relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/80 to-primary'>
			<div className='absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]' />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12'>
				<div className='space-y-4 md:space-y-6'>
					<h1 className='text-3xl md:text-5xl font-bold text-white tracking-tight'>
						Teknolojiyi Keşfedin, Geleceği Yakalayın
					</h1>
					<p className='text-white/90 text-lg md:text-xl max-w-md'>
						En son teknolojik ürünleri uygun fiyatlarla satın almak için doğru
						yerdesiniz.
					</p>
					<div className='flex flex-col sm:flex-row gap-3 pt-3'>
						<Button size='lg' asChild className='font-medium'>
							<Link href='/products'>
								Ürünleri Keşfet
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</Button>
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96'>
						<div className='absolute inset-0 rounded-full bg-white/10 animate-pulse'></div>
						<div className='relative z-10 transform -rotate-12 text-white'>
							<ShoppingBag className='h-64 w-64' />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
