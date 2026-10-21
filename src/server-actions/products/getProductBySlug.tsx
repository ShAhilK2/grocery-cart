import { db } from "@/db/db";
import { product } from "@/db/schema";
import { success } from "better-auth";
import { eq } from "drizzle-orm";

export async function getProductBySlug(slug: string) {
   try {
    const productData = await db.query.product.findFirst({
      where: eq(product?.slug,slug),
      with : {
        images : true
      }
    });

    if(!productData){
      return {
        success: false,
        product : null,
        error: "Product not found"
      }
    }

    return {
        success: true,
        product: productData 
    }
    
   } catch (error) {
    return {
        success: false,
        product : null,
        error: "Failed to fetch product"
    }
    
   }
}