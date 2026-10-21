import FrontendLayout from "@/components/layouts/FrontendLayout";
import ProductPageSkeleton from "@/components/loading/skeleton/ProductPageSkeleton";
import ProductPageComponent from "@/components/product/ProductPageComponent";
import { getProductBySlug } from "@/server-actions/products/getProductBySlug";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductPageProps {
  params : Promise<{
    slug : string
  }>
}

interface ProductContentProps {
  slug : string
}


async function ProductContent({slug}: ProductContentProps) {

  const {product} = await getProductBySlug(slug)

  if(!product){
    notFound()
  }

  return (
    <ProductPageComponent product={product}/>
  )
}

export default async function ProductPage({params}: ProductPageProps) {

   const {slug} = await params;
  return (
   <FrontendLayout>
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductContent slug={slug}/>
    </Suspense>
   
   </FrontendLayout>
  )
}
