export const dynamic = 'force-dynamic';
import Link from "next/link";
import { Shield, Truck, Factory } from "lucide-react";
import Image from "next/image";

async function getBrands() {
  const API_URL = process.env.BACKEND_INTERNAL_URL || 'https://akdistributors.pythonanywhere.com';
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
  const API_URL = process.env.BACKEND_INTERNAL_URL || 'https://akdistributors.pythonanywhere.com';
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-background">
        <div className="relative z-10 max-w-4xl mx-auto py-24 flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-[80px] font-bold text-foreground mb-4 tracking-tighter leading-none">
            Wholesale, <br/> refined.
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light tracking-tight">
            Premium equipment and supplies for discerning businesses across Northern California.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg transition-transform hover:scale-95"
            >
              Shop Wholesale
            </Link>
          </div>
        </div>
        
        {/* We use hero_bg.png but present it as a clean product shot if possible */}
        <div className="relative w-full max-w-6xl mx-auto -mt-8 z-0 px-4 sm:px-8">
           <Image 
            src="/images/hero_bg.png" 
            alt="Wholesale Distribution" 
            width={1200}
            height={675}
            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
            priority 
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-secondary overflow-hidden">
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10" />
          <div className="mobile-marquee flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...marqueeBrands, ...marqueeBrands, ...marqueeBrands].map((brand, i) => (
              <Link key={i} href={`/products?brand=${encodeURIComponent(brand.name)}`} className="mx-8 md:mx-12 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={brand.logo_url}
                  alt={brand.name}
                  width={140}
                  height={70}
                  unoptimized
                  className="object-contain h-12 md:h-14 w-auto mix-blend-multiply grayscale hover:grayscale-0 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Utility Grid Features */}
      <section className="py-32 bg-background px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-background rounded-[18px] p-10 border border-border flex flex-col items-center text-center">
              <div className="text-primary mb-6">
                <Truck className="w-10 h-10 stroke-1" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Fast Dispatch.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Next-day delivery optimized for Northern California.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background rounded-[18px] p-10 border border-border flex flex-col items-center text-center">
              <div className="text-primary mb-6">
                <Shield className="w-10 h-10 stroke-1" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Verified Quality.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Rigorous quality control for every batch you order.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background rounded-[18px] p-10 border border-border flex flex-col items-center text-center">
              <div className="text-primary mb-6">
                <Factory className="w-10 h-10 stroke-1" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Direct Sourcing.</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Exclusive manufacturer partnerships for unbeatable margins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="py-32 bg-secondary px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-4 tracking-tighter">Latest Arrivals.</h2>
            <Link href="/products" className="text-primary font-medium hover:underline underline-offset-4 text-lg">
              Explore the Collection &gt;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProducts.map((product) => (
              <Link key={product.id} href={`/products?brand=${encodeURIComponent(product.brand || '')}`} className="group block">
                <div className="bg-background rounded-[18px] overflow-hidden flex flex-col h-full border border-border/50 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                  <div className="aspect-[4/3] bg-background relative p-8 flex items-center justify-center">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain p-8 group-hover:scale-105 transition-transform duration-700 drop-shadow-xl"
                        />
                      ) : (
                        <div className="text-2xl font-bold text-muted uppercase text-center tracking-tighter">
                          {product.name}
                        </div>
                      )}
                  </div>
                  <div className="p-8 pt-4 flex flex-col flex-1 text-center bg-background">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{product.brand || 'Unbranded'}</span>
                    <h3 className="font-bold text-xl text-foreground mb-1 tracking-tight">{product.name}</h3>
                    <p className="text-base text-muted-foreground mt-1">{product.category_name}</p>
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
