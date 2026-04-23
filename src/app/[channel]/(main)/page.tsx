import { ProductListByCollectionDocument, ProductListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { HeroSlideshow } from "@/ui/components/HeroSlideshow";
import { FeaturedCategories } from "@/ui/components/FeaturedCategories";
import { FeaturesBar } from "@/ui/components/FeaturesBar";
import { BestSellersCarousel } from "@/ui/components/BestSellersCarousel";
import { PromoBanner } from "@/ui/components/PromoBanner";
import { NewsletterSignup } from "@/ui/components/NewsletterSignup";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Premium Ecommerce Store - Comfort Meets Style",
	description:
		"Discover our curated collection of sustainable, comfortable, and stylish products designed for modern living.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;

	// Fetch featured products for carousel
	const featuredData = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	// Fetch all products for best sellers
	const productsData = await executeGraphQL(ProductListDocument, {
		variables: {
			channel: params.channel,
		},
		revalidate: 60,
	});

	const featuredProducts = featuredData.collection?.products?.edges.map(({ node: product }) => product) ?? [];
	const allProducts = productsData.products?.edges.map(({ node: product }) => product) ?? [];

	return (
		<div className="min-h-screen">
			{/* Hero Slideshow */}
			<HeroSlideshow />

			{/* Features Bar */}
			<FeaturesBar />

			{/* Featured Categories */}
			<FeaturedCategories />

			{/* Best Sellers Carousel */}
			{allProducts.length > 0 && <BestSellersCarousel products={allProducts} />}

			{/* Promotional Banners */}
			<PromoBanner
				image="https://images.unsplash.com/photo-1460353581641-37baddab0b27?w=1200&h=800&fit=crop"
				title="Spring Collection 2024"
				subtitle="Embrace the season with our latest arrivals. Crafted with sustainable materials for ultimate comfort."
				ctaMen="Shop Men"
				ctaWomen="Shop Women"
				linkMen={`/default-channel/products`}
				linkWomen={`/default-channel/products`}
			/>

			<PromoBanner
				image="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=800&fit=crop"
				title="Sustainability First"
				subtitle="Every step we take is a step towards a better planet. Our commitment to eco-friendly practices."
				ctaMen="Learn More"
				ctaWomen="Our Story"
				linkMen={`/default-channel/products`}
				linkWomen={`/default-channel/products`}
				reverse
			/>

			{/* Featured Products Grid */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
					<div className="text-center mb-12">
						<h2 className="heading-lg mb-4">Featured Products</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Handpicked favorites from our collection
						</p>
					</div>
					{featuredProducts.length > 0 && <ProductList products={featuredProducts} />}
				</div>
			</section>

			{/* Newsletter Signup */}
			<NewsletterSignup />
		</div>
	);
}
