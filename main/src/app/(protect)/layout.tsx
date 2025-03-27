import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/lib/context/cart-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Products",
	description: "Products",
};

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex flex-col min-h-screen w-screen max-w-screen-xl mx-auto'>
			<CartProvider>
				<Navbar />
				{children}
				<Footer />
			</CartProvider>
		</main>
	);
}
