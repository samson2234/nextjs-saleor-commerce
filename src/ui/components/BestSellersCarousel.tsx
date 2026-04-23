'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { type ProductListItemFragment } from '@/gql/graphql';

interface BestSellersCarouselProps {
  products: readonly ProductListItemFragment[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.h2 variants={itemVariants} className="heading-lg mb-2">
            Best Sellers
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base text-gray-600 max-w-xl mx-auto">
            Our most loved products
          </motion.p>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[260px] md:min-w-[280px] snap-start flex-shrink-0"
              >
                <Link href={`/default-channel/products/${product.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100 mb-4">
                    {product?.thumbnail?.url && (
                      <img
                        src={product.thumbnail.url}
                        alt={product.thumbnail.alt ?? product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={index < 4 ? 'eager' : 'lazy'}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="font-semibold text-base mb-1 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category?.name}</p>
                  <p className="font-bold text-base">
                    {product.pricing?.priceRange?.start?.gross.amount}{' '}
                    {product.pricing?.priceRange?.start?.gross.currency}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="absolute -top-16 right-0 flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-300 group bg-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-300 group bg-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
