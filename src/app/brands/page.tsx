export const revalidate = 3600;
import Image from "next/image";
import Link from "next/link";

async function getBrands() {
  const url = `${process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000'}/api/public/brands`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">Our Brand Partners</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We are proud to partner with industry-leading brands to bring you the highest quality products.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((brand: { name: string, logo_url: string | null }) => {
          const logoUrl = brand.logo_url;
          return (
            <Link key={brand.name} href={`/products?brand=${encodeURIComponent(brand.name)}`} className="group">
              <div className="bg-white rounded-2xl border p-8 flex flex-col items-center justify-center aspect-square hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                {logoUrl ? (
                  <div className="relative w-full h-full z-10 flex items-center justify-center">
                    <Image
                      src={logoUrl}
                      alt={brand.name}
                      fill
                      unoptimized
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                    />
                  </div>
                ) : (
                  <span className="font-playfair text-2xl font-bold text-slate-800 text-center z-10 group-hover:scale-110 transition-transform duration-500">
                    {brand.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
