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
	title: "Kayıt Ol | E-Ticaret",
	description: "Yeni hesap oluşturun",
};

export default function SignUpPage() {
	return (
		<div className='mx-auto container flex min-h-screen items-center justify-center py-10'>
			<div className='mx-auto w-full max-w-md space-y-6'>
				<div className='flex flex-col items-center space-y-2 text-center'>
					<div className='rounded-full bg-primary/10 p-3'>
						<ShoppingBag className='h-10 w-10 text-primary' />
					</div>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Hesap Oluşturun
					</h1>
					<p className='text-sm text-muted-foreground max-w-xs'>
						E-ticaret deneyiminize başlamak için kaydolun
					</p>
				</div>

				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='text-center'>Kayıt Ol</CardTitle>
						<CardDescription className='text-center'>
							Hesap oluşturarak özel tekliflerden ve kampanyalardan yararlanın
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AuthForm type='register' />
					</CardContent>
					<CardFooter className='flex flex-col space-y-4 border-t p-6'>
						<div className='text-sm text-muted-foreground text-center'>
							Zaten bir hesabınız var mı?{" "}
							<Link
								href='/sign-in'
								className='font-medium underline underline-offset-4 hover:text-primary'
							>
								Giriş yapın
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
