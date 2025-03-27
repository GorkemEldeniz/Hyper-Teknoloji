import {
	CategoriesSection,
	CTASection,
	FeaturesSection,
	HeroSection,
} from "@/components/home";

export default function LandingPage() {
	return (
		<div className='container px-4 mx-auto space-y-16 py-8'>
			<HeroSection />
			<CategoriesSection />
			<FeaturesSection />
			<CTASection />
		</div>
	);
}
