"use client"
import { deleteProduct } from "@/server-actions/products/deleteProduct";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";

interface DeleteProductButtonProps {
    productId: string;
}

export  function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?")
        if (!confirmed) return

        setIsDeleting(true)

        const result = await deleteProduct(productId)
        
        if (result.success) {
            router.refresh()
        }else{
            toast.error(result.message || "Failed to delete product")
            setIsDeleting(false)
        }
        
        // TODO: Call deleteProduct server action
    }
    return (
        <button type="button" onClick={handleDelete} disabled={isDeleting}
        className="flex w-full items-center justify-center 
        rounded-lg gap-2 border border-border px-3 py-2 text-sm text-muted
        transition hover:border-error hover:text-error disabled:cursor-not-allowed
        disabled:opacity-50
        ">
                <FiTrash2 size={15} />
                {isDeleting ? "Deleting..." : "Delete"}
        </button>
    )
}