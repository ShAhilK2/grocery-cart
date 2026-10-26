import { year } from "drizzle-orm/mysql-core"


export function generateOrderNumber() {
    
    const year = new Date().getFullYear();

    // Generate a random 8-character alphanumeric string
    // for example : ABC12345 substr means take characters from index 2 to 10
    const random = Math.random().toString(36).substr(2, 8).toUpperCase();

    
    

    return `ORD-${year}-${random}`;
    
}