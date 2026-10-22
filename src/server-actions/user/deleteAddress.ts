
"use server"

import { db } from "@/db/db";
import { getCurrentUser } from "../auth/getCurrentUser";
import { address } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function deleteAddress(addressId: string) {
    

    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return {
                success: false,
                error: 'User not found'
            }
        }

        const [existingAddress] = await db
        // id : address.id means we are selecting only the id field from the address table
          .select({id :address.id})
          .from(address)
          .where(and(eq(address.id, addressId), eq(address.userId, currentUser.id)))
          .limit(1); // limit 1 means we are only selecting one record
        
        if (!existingAddress) {
            return {
                success: false,
                error: 'Address not found'
            }
        }
        
        // Delete the address
        await db.delete(address).where(and(eq(address.id, addressId), eq(address.userId, currentUser.id)));
        
        return {
            success: true,
            message: 'Address deleted successfully'
        };
        
    } catch (error) {

        return {
            success: false,
            error: 'Failed to delete address'
        }
        
    }
}
