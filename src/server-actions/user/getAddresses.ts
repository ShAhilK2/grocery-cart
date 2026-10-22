import { db } from "@/db/db";
import { address } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getCurrentUser } from "../auth/getCurrentUser";


export async function getAddresses() {

    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return {
                success : false,
                addresses : [],
                message : "User must be logged in to view addresses"
            }
        }

        const addresses = await db.select({
            id: address.id,
            userId: address.userId,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            street: address.street,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
            isDefault : address.isDefault
        }).from(address).where(eq(address.userId, currentUser.id)).orderBy(desc(address.createdAt))




        
        return {
            success : true,
            addresses : addresses
        }
        
    } catch (error) {

        return {
            success : false,
            addresses : [],
            message : "Failed to get addresses"
        }
        
    }
    
}