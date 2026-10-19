import { db } from "@/db/db";
import { product } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getNewArrivalProducts() {

    try {
        const products = await db.query.product.findMany({
            with: {
                images: true
            },
            orderBy: desc(product.createdAt),
            limit: 10
        });

        const newArrivalProducts = products.map(product => ({
            id : product.id,
            name : product.name,
            category : product.category,
            price : product.price,
            oldPrice : product.oldPrice,
            unit : product.unit,
            slug : product.slug,
            image : product.images.find(image => image.isMain)?.imageUrl?? null
        }));

  

        
        return {
            success: true,
            products: newArrivalProducts,
        };
        
    } catch (error) {

        return {
            success: false,
            products: [],
            error: "Failed to fetch new arrival products"
        }
        
    }
    
}