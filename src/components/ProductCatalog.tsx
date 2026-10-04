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
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-6">
        <div className="flex-1 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tighter leading-none">Product Catalog</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-12 h-14 rounded-full border-border bg-background text-lg shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0 z-10">
          <div className="bg-background rounded-[18px] p-6 border border-border md:sticky md:top-24">
            <h3 className="font-bold text-lg mb-4 text-foreground">Brands</h3>
            <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-2">
              <button
                onClick={() => setSelectedBrand("All")}
                className={`text-left px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                  selectedBrand === "All" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                }`}
              >
                All Brands
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                    selectedBrand === brand ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
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
            <div className="text-center py-20 bg-background rounded-[18px] border border-border">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => { setSearch(""); setSelectedBrand("All"); }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, i) => {
                const imageUrl = product.image_url;
                return (
                  <div 
                    key={product.id} 
                    className="bg-background border border-border rounded-[18px] h-full flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-black/5 transition-all duration-300 relative group animate-cascade opacity-0"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="aspect-square bg-secondary relative p-6 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-md mix-blend-multiply"
                        />
                      ) : (
                        <div className="text-xl font-bold text-muted-foreground uppercase text-center group-hover:scale-105 transition-transform duration-500 tracking-tighter">
                          {product.name}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1 bg-background">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">{product.brand || 'Unbranded'}</span>
                      <h3 className="font-semibold text-[17px] text-foreground mb-1 line-clamp-2 leading-snug tracking-tight">{product.name}</h3>
                      <p className="text-[15px] text-muted-foreground mt-auto">{product.category_name}</p>
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
