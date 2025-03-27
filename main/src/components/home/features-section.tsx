import { Gift, Star, Tag, Zap } from "lucide-react";

const features = [
	{
		icon: <Zap className='h-5 w-5' />,
		title: "Hızlı Teslimat",
		description: "Siparişiniz aynı gün içinde kargoya verilir.",
	},
	{
		icon: <Tag className='h-5 w-5' />,
		title: "En İyi Fiyat",
		description: "Piyasadaki en uygun fiyat garantisi.",
	},
	{
		icon: <Star className='h-5 w-5' />,
		title: "Kalite Güvencesi",
		description: "Tüm ürünlerimiz 2 yıl garantilidir.",
	},
	{
		icon: <Gift className='h-5 w-5' />,
		title: "Hediye Paketleme",
		description: "Özel günler için hediye paketleme hizmeti.",
	},
];

export function FeaturesSection() {
	return (
		<section className='bg-muted/50 rounded-2xl p-8'>
			<div className='text-center mb-8'>
				<h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
					Neden Bizi Tercih Etmelisiniz?
				</h2>
				<p className='text-muted-foreground mt-2'>
					Sizin için en iyi hizmeti sunuyoruz
				</p>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
				{features.map((feature, index) => (
					<div
						key={index}
						className='flex flex-col items-center text-center p-4'
					>
						<div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4'>
							{feature.icon}
						</div>
						<h3 className='font-medium mb-2'>{feature.title}</h3>
						<p className='text-muted-foreground text-sm'>
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
