"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
	LogOut,
	Menu,
	Moon,
	ShoppingBag,
	ShoppingCart,
	Sun,
	User,
	X,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CartMenu from "./cart-menu";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const { theme, setTheme } = useTheme();

	const pathname = usePathname();

	const { toast } = useToast();

	const { execute: signOut, status: signOutStatus } = useAction(signOutAction, {
		onSuccess: ({ data }) => {
			if (data?.success) {
				toast({
					variant: "success",
					title: "Çıkış Yapıldı",
					description: "Başarıyla çıkış yapıldınız",
				});
				setIsMobileMenuOpen(false);
			} else {
				toast({
					variant: "warning",
					title: "Hata",
					description: data?.error || "Çıkış yapılırken bir hata oluştu",
				});
			}
		},
		onError: ({ error }) => {
			toast({
				variant: "destructive",
				title: "Hata",
				description: error?.serverError || "Çıkış yapılırken bir hata oluştu",
			});
		},
	});

	const isActiveTab = (path: string) => {
		if (path === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(path);
	};

	// Navigation links array for consistent rendering
	const navLinks = [
		{ href: "/", label: "Anasayfa" },
		{ href: "/products", label: "Ürünler" },
		{ href: "/about", label: "Hakkımızda" },
	];

	return (
		<>
			<nav className='sticky top-0 z-50 bg-background shadow-sm border-b border-border'>
				<div className='container mx-auto px-4 h-16'>
					<div className='flex items-center justify-between h-full'>
						{/* Logo */}
						<Link href='/' className='flex items-center space-x-2 group'>
							<div className='p-2 rounded-md bg-primary/10'>
								<ShoppingBag className='h-6 w-6 text-primary' />
							</div>
							<span className='font-bold text-xl'>HyperShop</span>
						</Link>

						{/* Mobile Menu Button */}
						<Button
							variant='ghost'
							size='icon'
							className='md:hidden'
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? (
								<X className='h-6 w-6' />
							) : (
								<Menu className='h-6 w-6' />
							)}
						</Button>

						{/* Navigation Links - Desktop */}
						<div className='hidden md:flex items-center space-x-1'>
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={cn("nav-link", isActiveTab(link.href) && "active")}
								>
									{link.label}
								</Link>
							))}
						</div>

						{/* Right Side - Desktop Only */}
						<div className='hidden md:flex items-center space-x-4'>
							{/* Cart Button */}
							<CartMenu />

							{/* Profile Dropdown */}
							<UserMenu open={open} setOpen={setOpen} />

							<ModeToggle />
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Backdrop */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 bg-black/20 z-40 md:hidden'
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			{/* Mobile Menu - Dropdown */}
			<div
				className={cn(
					"fixed top-16 left-0 right-0 bg-background shadow-md z-50 border-b border-border md:hidden transition-all duration-200",
					isMobileMenuOpen
						? "max-h-[calc(100vh-4rem)] opacity-100"
						: "max-h-0 opacity-0 pointer-events-none overflow-hidden"
				)}
			>
				<div className='container mx-auto px-4 py-4'>
					{/* Navigation Links */}
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={cn(
								"mobile-nav-link",
								pathname.startsWith(link.href) && "active",
								"border-b border-border/30"
							)}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{link.label}
						</Link>
					))}

					{/* Profile Links */}
					<Link
						href='/profile'
						className='mobile-nav-link border-b border-border/30'
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<div className='flex items-center'>
							<User className='mr-2 h-4 w-4' />
							<span>Profil</span>
						</div>
					</Link>

					<Link
						href='/payment'
						className='mobile-nav-link border-b border-border/30'
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<div className='flex items-center'>
							<ShoppingCart className='mr-2 h-4 w-4' />
							<span>Ödeme Yap</span>
						</div>
					</Link>

					{/* Sign Out Button */}
					<button
						className='mobile-nav-link text-destructive text-left w-full'
						onClick={() => {
							signOut();
						}}
						disabled={signOutStatus === "executing"}
					>
						<div className='flex items-center'>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Çıkış Yap</span>
						</div>
					</button>

					{/* Theme Toggle Button in Mobile Menu */}
					<div className='mobile-nav-link pt-2'>
						<div className='flex items-center justify-between'>
							<span>Görünüm Modu</span>
							<>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
								>
									{theme === "dark" ? (
										<Sun className='h-4 w-4' />
									) : (
										<Moon className='h-4 w-4' />
									)}
								</Button>
							</>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
