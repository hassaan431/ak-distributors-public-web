export const dynamic = "force-dynamic";
import Link from "next/link";
import { Shield, Truck, Factory } from "lucide-react";
import Image from "next/image";
import BrandCarousel from "@/components/BrandCarousel";

async function getBrands() {
  const API_URL = process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000';
  try {
    const res = await fetch(`${API_URL}/api/public/brands`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.data) {
      return data.data.filter((b: any) => b.logo_url);
    }
  } catch (e) {
    console.error("Failed to fetch brands:", e);
  }
  return [];
}

async function getLatestProducts() {
  const API_URL = process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000';
  try {
    const res = await fetch(`${API_URL}/api/public/products`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      const withImages = data.data.filter((p: any) => p.image_url);
      if (withImages.length > 0) {
        const randomized = [...withImages].sort(() => 0.5 - Math.random());
        return randomized.slice(0, 6);
      }
      const randomFallback = [...data.data].sort(() => 0.5 - Math.random());
      return randomFallback.slice(0, 6);
    }
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }
  return [];
}

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const marqueeBrands = await getBrands();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden bg-slate-900">
        <Image 
          src="/images/hero_bg.png" 
          alt="Wholesale Distribution" 
          fill 
          className="object-cover opacity-70" 
          priority 
          sizes="100vw"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/90 to-emerald-900/40" />
        <div className="relative z-10 max-w-4xl mx-auto py-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 border border-emerald-500/30 backdrop-blur-sm">
            Northern California's Premier Distributor
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-playfair font-black text-white mb-6 drop-shadow-md leading-tight">
            Premium Desi Brands Distribution
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-emerald-50 mb-10 drop-shadow max-w-2xl mx-auto leading-relaxed">
            Providing top-tier ingredients, desi brands, and grocery essentials for businesses across Northern California.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold transition-all hover:scale-105 shadow-xl hover:shadow-emerald-900/20"
            >
              Explore Product Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 bg-white border-b border-slate-100 overflow-hidden">
        <h2 className="text-center text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mb-8">Our Featured Partners</h2>
        <BrandCarousel brands={marqueeBrands} />
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
            <div className="bg-white rounded-2xl p-8 border shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="bg-emerald-100 text-emerald-600 w-12 h-12 shrink-0 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 m-0">Fast Sacramento Dispatch</h3>
              </div>
              <p className="text-slate-600 leading-relaxed relative z-10">Optimized logistics ensuring next-day delivery across Northern California.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 shrink-0 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 m-0">Verified Quality</h3>
              </div>
              <p className="text-slate-600 leading-relaxed relative z-10">Rigorous quality control for every batch before it reaches your shelves.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="bg-slate-100 text-slate-600 w-12 h-12 shrink-0 rounded-xl flex items-center justify-center">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 m-0">Direct Sourcing</h3>
              </div>
              <p className="text-slate-600 leading-relaxed relative z-10">Exclusive partnerships with top manufacturers to bring you unbeatable margins.</p>
            </div>
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
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {latestProducts.map((product) => (
              <Link key={product.id} href={`/products?brand=${encodeURIComponent(product.brand || '')}`} className="group h-full">
                <div className="bg-white border rounded-2xl h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="aspect-square bg-slate-50 border-b relative p-6 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                        />
                      ) : (
                        <div className="text-xl font-black text-slate-200 uppercase text-center group-hover:scale-105 transition-transform duration-500">
                          {product.name}
                        </div>
                      )}
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

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center w-full clear-both">
            <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
              View All Catalog &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
