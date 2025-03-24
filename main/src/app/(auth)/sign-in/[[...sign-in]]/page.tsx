import AuthForm from "@/components/auth-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Giriş Yap | E-Ticaret",
	description: "Hesabınıza giriş yapın",
};

export default function SignInPage() {
	return (
		<div className='mx-auto container flex min-h-screen items-center justify-center py-10'>
			<div className='mx-auto w-full max-w-md space-y-6'>
				<div className='flex flex-col items-center space-y-2 text-center'>
					<div className='rounded-full bg-primary/10 p-3'>
						<ShoppingBag className='h-10 w-10 text-primary' />
					</div>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Hoş Geldiniz
					</h1>
					<p className='text-sm text-muted-foreground max-w-xs'>
						Devam etmek için giriş yapın
					</p>
				</div>

				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-center'>Giriş Yap</CardTitle>
						<CardDescription className='text-center'>
							E-ticaret hesabınıza giriş yaparak alışverişe başlayın
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AuthForm type='login' />
					</CardContent>
					<CardFooter className='flex flex-col space-y-4 border-t p-6'>
						<div className='text-sm text-muted-foreground text-center'>
							Henüz hesabınız yok mu?{" "}
							<Link
								href='/sign-up'
								className='font-medium underline underline-offset-4 hover:text-primary'
							>
								Hemen kaydolun
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
