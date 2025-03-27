import { Cpu, Headphones, Laptop, Smartphone } from "lucide-react";
import Link from "next/link";

const categories = [
	{
		icon: <Smartphone className='h-6 w-6' />,
		name: "Telefonlar",
		href: "/products?category=phones",
		color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
	},
	{
		icon: <Laptop className='h-6 w-6' />,
		name: "Bilgisayarlar",
		href: "/products?category=computers",
		color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
	},
	{
		icon: <Headphones className='h-6 w-6' />,
		name: "Aksesuarlar",
		href: "/products?category=accessories",
		color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
	},
	{
		icon: <Cpu className='h-6 w-6' />,
		name: "Elektronik",
		href: "/products?category=electronics",
		color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	},
];

export function CategoriesSection() {
	return (
		<section>
			<div className='text-center mb-8'>
				<h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
					Popüler Kategoriler
				</h2>
				<p className='text-muted-foreground mt-2'>
					İhtiyacınız olan ürünleri keşfedin
				</p>
			</div>

			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{categories.map((category, index) => (
					<Link key={index} href={category.href} className='group'>
						<div
							className={`${category.color} rounded-xl p-6 flex flex-col items-center justify-center h-32 transition-all hover:scale-[1.02] hover:shadow-md`}
						>
							<div className='mb-3'>{category.icon}</div>
							<h3 className='font-medium'>{category.name}</h3>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
