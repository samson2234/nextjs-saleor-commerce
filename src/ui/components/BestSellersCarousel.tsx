'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { type ProductListItemFragment } from '@/gql/graphql';

interface BestSellersCarouselProps {
  products: readonly ProductListItemFragment[];
}

export function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg">Best Sellers</h2>
            <p className="text-lg text-gray-600 mt-2">Our most loved products</p>
          </motion.div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] snap-start flex-shrink-0"
            >
              <Link href={`/default-channel/products/${product.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-100 mb-4">
                  {product?.thumbnail?.url && (
                    <img
                      src={product.thumbnail.url}
                      alt={product.thumbnail.alt ?? product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={index < 4 ? 'eager' : 'lazy'}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <h3 className="font-semibold text-lg mb-1 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.category?.name}</p>
                <p className="font-bold text-lg">
                  {product.pricing?.priceRange?.start?.gross.amount}{' '}
                  {product.pricing?.priceRange?.start?.gross.currency}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
