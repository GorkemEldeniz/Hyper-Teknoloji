"use client";

import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-background border-t border-border pt-8 pb-6'>
			<div className='container mx-auto px-4'>
				{/* Top section with columns */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
					{/* Company */}
					<div>
						<h3 className='font-medium mb-3'>HyperShop</h3>
						<p className='text-muted-foreground text-sm'>
							Kaliteli ürünler, uygun fiyatlar ve hızlı teslimat.
						</p>
					</div>

					{/* Links */}
					<div>
						<h3 className='font-medium mb-3'>Bağlantılar</h3>
						<ul className='space-y-1 text-sm text-muted-foreground'>
							<li>
								<Link href='/products' className='hover:text-primary'>
									Ürünler
								</Link>
							</li>
							<li>
								<Link href='/categories' className='hover:text-primary'>
									Kategoriler
								</Link>
							</li>
							<li>
								<Link href='/about' className='hover:text-primary'>
									Hakkımızda
								</Link>
							</li>
							<li>
								<Link href='/contact' className='hover:text-primary'>
									İletişim
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className='font-medium mb-3'>İletişim</h3>
						<ul className='space-y-1 text-sm text-muted-foreground'>
							<li>Email: info@hypershop.com</li>
							<li>Telefon: +90 212 123 45 67</li>
							<li>Adres: İstanbul, Türkiye</li>
						</ul>
					</div>
				</div>

				<Separator className='my-4' />

				{/* Social icons and copyright */}
				<div className='flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-sm text-muted-foreground'>
						&copy; {currentYear} HyperShop. Tüm Hakları Saklıdır.
					</div>

					<div className='flex gap-4'>
						<Link
							href='#'
							aria-label='Facebook'
							className='text-muted-foreground hover:text-primary'
						>
							<Facebook className='h-4 w-4' />
						</Link>
						<Link
							href='#'
							aria-label='Instagram'
							className='text-muted-foreground hover:text-primary'
						>
							<Instagram className='h-4 w-4' />
						</Link>
						<Link
							href='#'
							aria-label='Twitter'
							className='text-muted-foreground hover:text-primary'
						>
							<Twitter className='h-4 w-4' />
						</Link>
						<Link
							href='mailto:info@hypershop.com'
							aria-label='Email'
							className='text-muted-foreground hover:text-primary'
						>
							<Mail className='h-4 w-4' />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
