import { db } from "@/db/db";
import { product } from "@/db/schema";
import { and, inArray,gte,lt, or, asc, desc } from "drizzle-orm";
interface GetShopProductsOptions {
    categories?: string[] | string;  
    priceRanges?: string[] | string;
    sort?: "newest" | "price-low" | "price-high" | "oldest" ;

}

export async function getShopProducts({categories=[], priceRanges=[], sort="newest"}: GetShopProductsOptions) {

    try {

        const filters = []

        if(categories.length > 0) {
            filters.push(
                // inArray is used to check if the category is in the array
                // what push does is it adds the condition to the filters array

                inArray(product.category, Array.isArray(categories) ? categories : [categories])
            )
        }   

        if(priceRanges.length > 0) {

            const priceConditions= []

            const rangesArray = Array.isArray(priceRanges) ? priceRanges : [priceRanges];

            for(const range of rangesArray){
                switch(range){
                    case "0-100": priceConditions.push(and(gte(product.price,"0"), lt(product.price,"100")))
                        break;
                    case "100-200": priceConditions.push(and(gte(product.price,"100"), lt(product.price,"200")))
                        break;
                    case "200-500": priceConditions.push(and(gte(product.price,"200"), lt(product.price,"500")))
                        break;
                    case "500+": priceConditions.push(gte(product.price,"500"))
                        break;
                }

                if(priceConditions.length > 0) {
                    filters.push(or(...priceConditions))
                }

            }

        }
        const products = await db.query.product.findMany({
                where : filters.length > 0 ? and(...filters) : undefined,
                with: {
                    images: true
                },
                orderBy: sort === "oldest" ? asc(product.createdAt) : 
                sort === "price-low" ? asc(product.price) : 
                sort === "price-high" ? desc(product.price) : 
                desc(product.createdAt)
            })

        const shopProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            category: product.category,
            oldPrice: product.oldPrice,
            price: product.price,
            unit: product.unit,
            slug: product.slug,
            image: product.images.find((image)=>image.isMain)?.imageUrl ?? null
        }))

        


        return {
            success: true,
            products: shopProducts
        }
        
    } catch (error) {

        console.error("GET_SHOP_PRODUCTS_ERROR", error);

        return {
            success: false,
            products: [],
            error: "Failed to fetch products"
        }
        
    }
    
}