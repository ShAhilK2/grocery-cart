"use client";

import { getProductBySlug } from "@/server-actions/products/getProductBySlug";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


type productType = NonNullable<Awaited<ReturnType<typeof getProductBySlug>>["product"]>


interface ProductPageComponentProps {
  product : productType
}
export default function ProductPageComponent({product}: ProductPageComponentProps) {

  const router = useRouter()

 
  const {addCartItem} = useCartStore()


   const handleCartItem = ()=>{

    if(product.stock <=0){
      toast.error("Product is out of stock")
      return
    }

      addCartItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        unit: product.unit,
        image: mainImage
       })


       toast.success(`${product.name} added to cart`)
    }

   const handleBuyNow = ()=>{

    if(product.stock <=0){
      toast.error("Product is out of stock")
      return
    }

      addCartItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        unit: product.unit,
        image: mainImage
       })


     
       router.push("/checkout")
    }


  const mainImage = product.images.find((image)=>image.isMain)?.imageUrl || product?.images[0]?.imageUrl || ""
  const [thumbnail, setThumbnail] = useState(mainImage);
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8 md:py-10">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted sm:text-sm">
        <span>Home</span>
        <span>/</span>
        <span>Products</span>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </div>

      {/* Product */}
      <div className="flex flex-col gap-8 lg:flex-row md:gap-12 lg:gap-16">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setThumbnail(image.imageUrl)}
                  className={`h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white transition sm:h-20 sm:w-20 ${
                    thumbnail === image.imageUrl
                      ? "border-primary"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-background sm:h-96 md:h-105">
              <Image
                src={thumbnail}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-contain p-4 sm:p-6"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-medium text-text sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-muted">
            {product.category}
          </p>

          {/* Price */}
          <div className="mt-5">
            <p className="text-sm text-muted line-through sm:text-base">
            ₹{product.oldPrice}
            </p>

            <p className="mt-1 text-2xl font-medium text-primary sm:text-3xl">
            ₹{product.price}
            </p>
          </div>

          {/* About Product */} 
          <div className="mt-6">
            <p className="text-base font-medium text-text">
              About Product
            </p>

           <p className="mt-3 text-sm leading-6 text-muted">
            {product.description}
           </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              className="w-full cursor-pointer rounded-lg bg-gray-100 py-3.5 font-medium text-text transition hover:bg-border"
              onClick={handleCartItem}
              disabled={product.stock <= 0}
            >
      {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              type="button"
                       disabled={product.stock <= 0}
              className="w-full cursor-pointer rounded-lg bg-primary py-3.5 font-medium text-white transition hover:bg-primary-hover"
              onClick={handleBuyNow}
            >
              {product.stock <= 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}