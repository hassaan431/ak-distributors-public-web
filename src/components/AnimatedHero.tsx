"use client";

import { motion } from "framer-motion";

export function AnimatedHeroTitle() {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-7xl font-playfair font-black text-white mb-6 drop-shadow-md leading-tight"
    >
      Premium Wholesale Distribution
    </motion.h1>
  );
}

export function AnimatedHeroText() {
  return (
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-lg md:text-xl text-emerald-50 mb-10 drop-shadow max-w-2xl mx-auto"
    >
      Providing top-tier ingredients, desi brands, and grocery essentials for businesses across Northern California.
    </motion.p>
  );
}
