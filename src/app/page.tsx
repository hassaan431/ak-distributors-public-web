"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Truck, Factory } from "lucide-react";
import Image from "next/image";

// Placeholder for data fetching from backend
// In a real Server Component, you would fetch this directly in the page.
const MOCK_LATEST_PRODUCTS = [
  { id: 1, name: "Premium Basmati Rice", brand: "ZAIN FOODS", category_name: "Grains", image_url: null },
  { id: 2, name: "Achaari Macaroni", brand: "Bake Parlor", category_name: "Pasta", image_url: null },
  { id: 3, name: "Mango Pickle", brand: "ROYAL MANGO", category_name: "Condiments", image_url: null },
  { id: 4, name: "Afghan Almond", brand: "ZAIN FOODS", category_name: "Dry Fruits", image_url: null },
];

const MOCK_BRANDS = ["Bake Parlor", "FM-MIILEE", "ROYAL MANGO", "TOOBA", "Youngs Food", "ZAIN FOODS"];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/90 to-emerald-600/40" />
        {/* If we had the hero image available, we would put it here. Using a solid gradient fallback. */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-playfair font-extrabold text-white mb-6 leading-tight tracking-tight"
          >
            Wholesale Distribution, <br />
            <span className="text-emerald-400">Refined.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Connecting Desi Brands & Fresh Ingredients to Supermarkets, Grocers, and Foodservice Across California & Beyond.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 text-lg font-medium transition-colors">
              Explore Product Catalog
            </Link>
            <Link href="http://hassaan431.pythonanywhere.com/brochure/download" target="_blank" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white px-8 py-4 text-lg font-medium backdrop-blur-md transition-colors">
              Download PDF Catalog
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 bg-white border-b border-slate-100 overflow-hidden">
        <h2 className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mb-8">Our Featured Partners</h2>
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="animate-marquee flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...MOCK_BRANDS, ...MOCK_BRANDS, ...MOCK_BRANDS].map((brand, i) => (
              <span key={i} className="mx-12 text-2xl font-playfair font-bold text-slate-800">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-slate-900 mb-4">Why Choose AK Distributors?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">We combine decades of experience with modern logistics to ensure your shelves are always stocked with the highest quality goods.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 border shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Fast Sacramento Dispatch</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">Optimized logistics ensuring next-day delivery across Northern California.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 border shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Verified Quality</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">Rigorous quality control for every batch before it reaches your shelves.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 border shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-slate-100 text-slate-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Direct Sourcing</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">Exclusive partnerships with top manufacturers to bring you unbeatable margins.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-playfair font-bold text-slate-900 mb-2">Latest Arrivals</h2>
              <p className="text-slate-500 text-lg">Discover our newest wholesale offerings ready for dispatch.</p>
            </div>
            <Link href="/products" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline underline-offset-4">
              View All Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_LATEST_PRODUCTS.map((product) => (
              <Link key={product.id} href={`/products?brand=${encodeURIComponent(product.brand)}`} className="group h-full">
                <div className="bg-white border rounded-2xl h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="aspect-square bg-slate-50 border-b relative p-6 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="text-xl font-black text-slate-200 uppercase text-center group-hover:scale-105 transition-transform duration-500">
                      {product.name}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{product.brand || 'Unbranded'}</span>
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-slate-500 mt-auto">{product.category_name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
