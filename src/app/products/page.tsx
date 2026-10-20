import FrontendLayout from "@/components/layouts/FrontendLayout";
import ProductCardSkeleton from "@/components/loading/skeleton/ProductCardSkeleton";
import FilterOptions from "@/components/product/FilterOptions";
import ProductCard from "@/components/product/ProductCard";
import ShopProduct from "@/components/product/shopProduct";
import SortOptions from "@/components/product/sortOptions";
import { Suspense } from "react";


interface ProductsPageProps {
  searchParams: Promise<{ 
    categories?: string | string[],
    priceRanges?: string | string[],
    sort ?: "newest" | "oldest" | "price-low" | "price-high"
  }>;
} 
export default async function ProductsPage({ searchParams }: ProductsPageProps) {

  const params = await searchParams;
  // Array is Array => return array, else return array with single string
  const categories = params.categories ? Array.isArray(params.categories) ? params.categories : [params.categories] : [];
  const priceRanges = params.priceRanges ? Array.isArray(params.priceRanges) ? params.priceRanges : [params.priceRanges] : [];
  const sort = params.sort === "oldest" || params.sort === "price-low" || params.sort === "price-high" ? params.sort : "newest";
  return (
    <FrontendLayout>
      <div className="my-6">
        <div className="flex flex-col sm:flex-row gap-5  my-10 ">
          <FilterOptions />
          <div className="flex-1">
            <SortOptions />

       <Suspense fallback={<ProductCardSkeleton number={4} />}>
        <ShopProduct 
        categories={categories}
        priceRanges={priceRanges}
        sort={sort}
        />
       </Suspense>
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
