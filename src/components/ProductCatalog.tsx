"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Product = {
  id: number;
  name: string;
  brand: string | null;
  category_name: string | null;
  image_url: string | null;
};

export default function ProductCatalog({
  initialProducts,
  brands,
  initialBrandFilter
}: {
  initialProducts: Product[];
  brands: string[];
  initialBrandFilter: string;
}) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrandFilter);

  const filteredProducts = initialProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand === "All" || (p.brand && p.brand === selectedBrand);
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-playfair font-bold text-slate-900 mb-4">Product Catalog</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 h-12 rounded-full border-slate-200 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-6 border sticky top-24">
            <h3 className="font-bold text-lg mb-4">Brands</h3>
            <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand("All")}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedBrand === "All" ? "bg-emerald-100 text-emerald-700" : "hover:bg-slate-50 text-slate-600"
                }`}
              >
                All Brands
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedBrand === brand ? "bg-emerald-100 text-emerald-700" : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border">
              <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => { setSearch(""); setSelectedBrand("All"); }}
                className="mt-4 text-emerald-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => {
                const imageUrl = product.image_url;
                return (
                  <div key={product.id} className="bg-white border rounded-2xl h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="aspect-square bg-slate-50 border-b relative p-6 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
