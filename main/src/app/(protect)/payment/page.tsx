import PaymentContainer from "@/components/payment/container";
import { CreditCard } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Ödeme | HyperTeknoloji",
	description: "Güvenli alışveriş deneyimi için ödeme sayfası",
};

export default function PaymentPage() {
	return (
		<div className='container mx-auto py-6 px-4 md:px-6 space-y-6'>
			<div className='flex items-center gap-2 mb-6'>
				<CreditCard className='h-6 w-6 text-primary' />
				<h1 className='text-2xl font-bold tracking-tight'>Ödeme</h1>
			</div>

			<div className='bg-card rounded-lg border shadow-sm'>
				<div className='p-6'>
					<PaymentContainer />
				</div>
			</div>
		</div>
	);
}
