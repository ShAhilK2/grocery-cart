
import { db } from "@/db/db";
import { product, productImage } from "@/db/schema";
import { requireAdmin } from "@/server-actions/auth/requireAdmin";
import { uploadImages } from "@/services/uploadImages";

import { NextResponse } from "next/server";


export async function POST(request :Request) {

    try {   

        await requireAdmin();
        

        const formData = await request.formData();
        const name = formData.get("name")?.toString();
        const description = formData.get("description")?.toString();
        const price = formData.get("price")?.toString();
        const oldPrice = formData.get("oldPrice")?.toString();
        const stock = formData.get("stock")?.toString();
        const category = formData.get("category")?.toString();
        const unit = formData.get("unit")?.toString();

        // generate the slug
        const slug = name?.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      
        const images = formData.getAll("images").filter((value): value is File => value instanceof File);   


        if(!name || !description || !price || !stock || !category || !unit ) {
            return NextResponse.json({success :false,
                 message: "All fields are required" }, { status: 400 });
        }

        if(images.length < 1 || images.length > 4) {
            return NextResponse.json({success :false,
                 message: "Please upload between 1 and 4 images" }, { status: 400 });
        }

        // Upload images to Cloudinary
        
        const uploadedImages = await uploadImages(images);

        const productId = crypto.randomUUID();


        await db.transaction(async (tx) => {
            // Insert product
            await tx.insert(product).values({
                id: productId,
                name,
                slug: slug!,
                description,
                price,
                oldPrice: oldPrice || null,
                stock: Number(stock),
                category,
                unit,

            });

            // Insert images

                await tx.insert(productImage).values(
                    uploadedImages.map((image,index) => ({
                        id: crypto.randomUUID(),
                        productId,
                        imageUrl: image.imageUrl,
                        publicId: image.publicId,
                        isMain: index === 0,
                    }))
                );

          
        });

        return NextResponse.json({success :true,
                     message: "Product created successfully" }, { status: 201 });



    } catch (error) {
    console.error("Create product API error:", error);

    return NextResponse.json(
        {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create product",
        },
        { status: 500 }
    );
}
   
}