
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../server-actions/auth/getCurrentUser";

export default async function ProtectedLayout({
  children,
}: {
  children: LayoutProps<"/">
}) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        // Redirect to login page
        redirect("/?login=true");
    }

  return <>{children}</>;
}