
import { getShopProducts } from '@/server-actions/products/getShopProducts';
import ProductCard from './ProductCard'


interface ShopProductProps {
    categories?: string | string[],
    priceRanges?: string | string[],
    sort ?: "newest" | "oldest" | "price-low" | "price-high"
}



async function ShopProduct ({ categories, priceRanges, sort }: ShopProductProps) {

    const {products} =  await getShopProducts({categories, priceRanges, sort});

    if(products.length === 0) {
        return <div className="mt-6 flex justify-center items-center min-h-80 rounded-xl 
        bg-card border border-border px-6">
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>No products found</h3>
                <p className='mt-2 text-sm text-muted-foreground'>we couldn't find any products matching your criteria</p>
                <p className='mt-1 text-sm text-muted-foreground'>try adjusting or selecting a different filter</p>
            </div>
        </div>
    }
  return (
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4   mt-6 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
  )
}

export default ShopProduct