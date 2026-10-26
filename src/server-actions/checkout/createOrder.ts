"use server"

import { db } from "@/db/db";
import { getCurrentUser } from "../auth/getCurrentUser";
import { order,  product ,orderItem} from "@/db/schema";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { generateOrderNumber } from "@/lib/generateOrderNumber";

interface CreateOrderItem {
    productId: string;
    quantity: number;
  
}

interface CreateOrderData  {
    addressId: string;
    paymentMethod: "stripe" | "cod";
    items: CreateOrderItem[];
    shippingFee: number;
    tax :number
}

export async function createOrder(data: CreateOrderData) {

    try {

        const currentUser = await getCurrentUser();

        if(!currentUser){
            return {
                success : false,
                message : "You must be logged in to create order"

            }
        }

        if(!data.addressId){
            return {
                success:false,
                message :"Please select a delivery ssaddress"
            }
        }

        if(!data.items || data.items.length === 0){
            return {
                success:false,
                message :"Your cart is empty. Please add items to your order"
            }
        }

        const productIds = data.items.map(item => item.productId);

        const result = await db.transaction(async (tx)=>{
            const products = await tx.select({
                id: product.id,
                price : product.price,
                name : product.name,
                stock : product.stock,

                // inArray means where id is in the array of productIds 
                // first parameter is the column to check, second is the array of values
            }).from(product).where(inArray(product.id, productIds));

            if(products.length !== data.items.length){
                throw new Error("One or more products are no longer available");
            }

            let subTotal = 0;

            const orderItems = data.items.map(item => {
                const productData = products.find(p => p.id === item.productId);
                if(!productData){
                    throw new Error("Product not found");
                }

                if(item.quantity <= 0){
                    throw new Error("Invalid Product quantity");
                }

                if(item.quantity > productData.stock){
                   throw new Error(`Only ${productData.stock} units of ${productData.name} are available`);
                }

                const price = Number(productData.price);

                subTotal += price * item.quantity;


                return {
                    id : crypto.randomUUID(),
                    productId: item.productId,
                    quantity: item.quantity,
                    price: productData.price
                }
            });

            const totalAmount = subTotal + data.shippingFee + data.tax

            const orderId = crypto.randomUUID()

            const orderNumber = generateOrderNumber()

            await tx.insert(order).values({
                id: orderId,
                orderId: orderNumber,
                userId: currentUser.id,
                addressId: data.addressId,
                totalAmount: totalAmount.toFixed(2),

                paymentMethod: data.paymentMethod,
                paymentStatus: "pending",

                orderStatus: data.paymentMethod === "cod" ? "confirmed" : "pending",

            })

            await tx.insert(orderItem).values(orderItems.map(item => ({
                ...item,
                orderId
            })))


            // decraese the product quantity

            for(const item of orderItems){
                // TODO: decrease product quantity
                const updatedProducts = await tx.update(product).set({
                    stock: sql`${product.stock} - ${item.quantity}`
                }).where(and(eq(product.id, item.productId),
                gte(product.stock, item.quantity))).returning({
                    id: product.id
                })

                if(updatedProducts.length === 0){
                    throw new Error(`Stock changed while placing your order, please try again later.`);
                }
            }
        
            return {
               
                orderId,
                totalAmount

            }



          

        })

        return {
            success: true,
            message : "Order created successfully",
            orderId : result.orderId,
            totalAmount : result.totalAmount
           
            
        }
        
    } catch (error) {

        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create order"
        }
        
    }
    
}