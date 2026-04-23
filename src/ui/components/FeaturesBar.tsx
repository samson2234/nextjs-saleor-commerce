'use client';

import { motion } from 'framer-motion';
import { Truck, Leaf, RefreshCw, Shield } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Sustainable Materials',
    description: 'Eco-friendly & natural',
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: '30-Day Returns',
    description: 'Hassle-free returns',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Quality Guarantee',
    description: 'Built to last',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function FeaturesBar() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 text-gray-700 group-hover:text-black transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
