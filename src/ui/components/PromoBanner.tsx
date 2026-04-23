'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PromoBannerProps {
  image: string;
  title: string;
  subtitle: string;
  ctaMen: string;
  ctaWomen: string;
  linkMen: string;
  linkWomen: string;
  reverse?: boolean;
}

export function PromoBanner({
  image,
  title,
  subtitle,
  ctaMen,
  ctaWomen,
  linkMen,
  linkWomen,
  reverse = false,
}: PromoBannerProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-square">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className={`${reverse ? 'lg:order-1' : ''}`}>
            <motion.h2
              initial={{ opacity: 0, x: reverse ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="heading-md mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: reverse ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-600 mb-8"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={linkMen}
                className="btn-primary text-center"
              >
                {ctaMen}
              </Link>
              <Link
                href={linkWomen}
                className="btn-secondary text-center"
              >
                {ctaWomen}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
