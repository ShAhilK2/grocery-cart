import { db } from "@/db/db";
import { requireAdmin } from "../auth/requireAdmin";

import { product } from "@/db/schema";
import { desc } from "drizzle-orm";


export async function getProducts() {

    try {
        await requireAdmin();

        const products = await db.query.product.findMany({
            with: {
                images: true,
            },
            orderBy : desc(product.createdAt)
        });


        // Map products to include only main image URL
       const productWithMainImage = products.map((product) => ({
        id : product.id,
        name : product.name,
        price : product.price,
        category : product.category,
        stock : product.stock,
        image : product.images.find((image) => image.isMain)?.imageUrl ?? null,
       }));

       return {
        success: true,
        products: productWithMainImage,
       };
        
    } catch (error) {
        console.error("GET_PRODUCTS_ERROR:", error);
        return {
            success: false,
            products: [],
            message: "Failed to fetch products",
        };
    }

 
}
