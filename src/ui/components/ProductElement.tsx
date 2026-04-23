'use client';

import { motion } from 'framer-motion';
import { LinkWithChannel } from '../atoms/LinkWithChannel';
import { ProductImageWrapper } from '@/ui/atoms/ProductImageWrapper';

import type { ProductListItemFragment } from '@/gql/graphql';
import { formatMoneyRange } from '@/lib/utils';

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: 'eager' | 'lazy'; priority?: boolean }) {
	return (
		<motion.li
			data-testid="ProductElement"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			whileHover={{ y: -8 }}
			className="group cursor-pointer"
		>
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="relative">
					{product?.thumbnail?.url && (
						<div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/5] mb-4">
							<ProductImageWrapper
								loading={loading}
								src={product.thumbnail.url}
								alt={product.thumbnail.alt ?? ''}
								width={512}
								height={640}
								sizes={'512px'}
								priority={priority}
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
						</div>
					)}
					<div>
						<h3 className="text-base font-semibold text-neutral-900 group-hover:text-gray-600 transition-colors duration-300 line-clamp-1">
							{product.name}
						</h3>
						<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
							{product.category?.name}
						</p>
						<p className="mt-2 text-lg font-bold text-neutral-900" data-testid="ProductElement_PriceRange">
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</motion.li>
	);
}
