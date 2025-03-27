import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
	return (
		<section className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 md:p-12'>
				<div className='space-y-4'>
					<h2 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>
						İndirimli Fiyatlardan Yararlanın
					</h2>
					<p className='text-white/90'>
						Sınırlı zamanlı fırsatları kaçırmayın. Hemen alışverişe başlayın!
					</p>
				</div>
				<div className='flex justify-center md:justify-end'>
					<Button
						size='lg'
						className='bg-white text-blue-600 hover:bg-white/90 font-medium'
						asChild
					>
						<Link href='/products?discount=true'>
							Fırsatları Keşfet
							<ArrowRight className='ml-2 h-4 w-4' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
