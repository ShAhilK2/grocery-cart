
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
import { db } from "../../db/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

export async function requireAdmin() {
    // TODO: Implement admin check logic

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/?login=true");
    }

    const [dbUser] = await db.select({
        role: user.role
    }).from(user).where(eq(user.id, currentUser.id)).limit(1);

    if(dbUser.role !== "ADMIN") {
        redirect("/");
    }
    
    return currentUser;
   
}
