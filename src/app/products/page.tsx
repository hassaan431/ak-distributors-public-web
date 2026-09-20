import ProductCatalog from "@/components/ProductCatalog";

export const revalidate = 3600; // Revalidate every hour

async function getProducts() {
  const url = `${process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000'}/api/public/products`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

async function getBrands() {
  const url = `${process.env.BACKEND_INTERNAL_URL || 'http://127.0.0.1:5000'}/api/public/brands`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data.map((b: any) => b.name) || [];
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const [products, brands, resolvedSearchParams] = await Promise.all([
    getProducts(),
    getBrands(),
    searchParams
  ]);
  const initialBrandFilter = resolvedSearchParams?.brand || "All";

  return (
    <ProductCatalog
      initialProducts={products}
      brands={brands}
      initialBrandFilter={initialBrandFilter}
    />
  );
}
