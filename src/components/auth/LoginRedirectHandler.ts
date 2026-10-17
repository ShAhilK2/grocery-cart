"use client"
import { useAuthModal } from "@/store/authModalStore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LoginRedirectHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    console.log(searchParams, pathname);


    const {openLogin} = useAuthModal();

    useEffect(() => {
        if (searchParams.get("login") === "true") {
            openLogin();

            // removing the query parameter /?login=true
            router.replace(pathname);
        }
    }, [searchParams, openLogin, router, pathname]);

    return null;
}