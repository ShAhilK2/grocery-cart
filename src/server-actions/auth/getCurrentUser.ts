import { auth } from "@/lib/auth";
import { headers } from "next/headers";


// Server action to get current user
// Returns null if not authenticated 
// how it differ from authClient? -> authClient is a client-side utility, this is a server-side action
//  it check the session from the request headers
// how it work? -> it use the auth.api.getSession() method to get the session from the request headers
export const getCurrentUser = async () => {
    // TODO: Implement authentication logic
   const session = await auth.api.getSession({
    headers: await headers(),
   });
   return session?.user ?? null;
};