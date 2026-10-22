"use server"
import { db } from "@/db/db";
import { getCurrentUser } from "../auth/getCurrentUser";

import { eq,count } from "drizzle-orm";
import { address } from "@/db/schema";

interface AddAddressData {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    phone: string;
    state: string;
    postalCode: string;
    country: string;
}

export async function addAddress(data: AddAddressData){
    try {
    const currentUser = await getCurrentUser();
       
       if(!currentUser) {
        return {
            success: false,
            error: "You must be logged in to add an address"
        }
    
    }
         const fields = [
            data.firstName,
            data.lastName,
            data.street,
            data.city,
            data.phone,
            data.state,
            data.postalCode,
            data.country
        ]

        const hasFields = fields.some(field => !field || !field.trim());


        
        if(hasFields) {
            return {
                success: false,
                error: "All fields are required"
            }
        }

        // ensure user dont have address more than 3 

        const [addressCount] = await db.select({ count:count() }).from(address).where(eq(address.userId, currentUser.id));

        if(addressCount.count >= 3) {
            return {
                success: false,
                error: "You can only have 3 addresses"
            }
        }

        const isDefault = addressCount.count === 0;

        // save the address
        await db.insert(address).values({
            id : crypto.randomUUID(), 
            userId: currentUser.id,
            firstName: data.firstName,
            lastName: data.lastName,
            street: data.street,
            city: data.city,
            phone: data.phone,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
            isDefault: isDefault
        })

        return {
            success: true,
            message: "Address added successfully"
        }

        
        

    
    } catch (error) {
        return {
        success: false,
        error: "Failed to add address"
    }
        
    }
}

