import ProductCatalog from "@/components/ProductCatalog";

export const revalidate = 3600; // Revalidate every hour

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/public/products`;
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
  const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'}/api/public/brands`;
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
  searchParams: { brand?: string };
}) {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);
  const initialBrandFilter = searchParams.brand || "All";

  return (
    <ProductCatalog
      initialProducts={products}
      brands={brands}
      initialBrandFilter={initialBrandFilter}
    />
  );
}
