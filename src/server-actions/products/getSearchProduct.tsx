import { db } from "@/db/db";
import { product } from "@/db/schema";
import { desc, ilike, like, or } from "drizzle-orm";

export async function  getSearchProduct(search: string) {
    try {
         const searchTerm = search.trim();
  if (!searchTerm) {
    return {
      success: true,
      products: [],
    };
}

    const products = await db.query.product.findMany({
      // ilike is case-insensitive
      where: or(
        ilike(product.name, `%${searchTerm}%`),
        ilike(product.description, `%${searchTerm}%`),
      ),
      with: {
        images: true,
      },
      orderBy: desc(product.createdAt),
    });

    const searchProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice,
      stock: product.stock,
      slug: product.slug,
      image: product.images.find((image) => image.isMain)?.imageUrl || null,
    }));

    return {
      success: true,
      products: searchProducts,
    };
        
    } catch (error) {
        console.error("Error searching products:", error);
        return {
            success: false,
            products: [],
            message: "Failed to search products",
        };
        
    }
 
  }

