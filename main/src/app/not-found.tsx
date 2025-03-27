"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CircleOff, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-background px-4 md:px-6'>
			<Card className='max-w-md w-full border-primary/20 shadow-lg'>
				<CardContent className='pt-6'>
					<div className='space-y-8 text-center'>
						{/* Hata Simgesi ve Animasyon */}
						<div className='relative mx-auto w-28 h-28 mb-4'>
							<div className='absolute inset-0 bg-primary/10 rounded-full animate-pulse'></div>
							<div className='absolute inset-0 flex items-center justify-center'>
								<CircleOff
									className='h-16 w-16 text-primary/70'
									strokeWidth={1.25}
								/>
							</div>
						</div>

						{/* Hata Başlığı */}
						<div>
							<h1 className='text-4xl font-bold tracking-tighter mb-2'>404</h1>
							<h2 className='text-2xl font-semibold text-muted-foreground'>
								Sayfa Bulunamadı
							</h2>
						</div>

						{/* Açıklama */}
						<p className='text-muted-foreground text-base max-w-sm mx-auto'>
							Aradığınız sayfaya ulaşılamıyor. Sayfa kaldırılmış, taşınmış veya
							geçici olarak kullanılamıyor olabilir.
						</p>

						{/* Eylem Butonları */}
						<div className='flex flex-col sm:flex-row gap-3 justify-center py-4'>
							<Button
								variant='outline'
								className='gap-2 border-primary/30 hover:bg-primary/5'
								onClick={() => router.back()}
							>
								<ArrowLeft className='h-4 w-4' />
								Geri Dön
							</Button>

							<Button variant='default' className='gap-2' asChild>
								<Link href='/products'>
									<Home className='h-4 w-4' />
									Ana Sayfaya Git
								</Link>
							</Button>
						</div>
					</div>

					{/* Alt Bilgi */}
					<div className='text-xs text-center text-muted-foreground/70 mt-8 border-t border-border pt-4'>
						HyperTeknoloji &copy; {new Date().getFullYear()} | Hata Kodu: 404
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
