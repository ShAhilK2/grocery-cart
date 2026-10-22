"use client"
import { deleteAddress } from '@/server-actions/user/deleteAddress';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FiTrash, FiTrash2 } from 'react-icons/fi';


interface DeleteAddressButtonProps {
    addressId: string;
}

const DeleteAddressButton = ({ addressId }: DeleteAddressButtonProps) => {

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        const isConfirmed = window.confirm('Are you sure you want to delete this address?');
        if (!isConfirmed) {
            setIsDeleting(false);
            return;
        }

        const result = await deleteAddress(addressId);
        if (!result.success) {
            toast.error(result.error || 'Failed to delete address');
            setIsDeleting(false);
            return;
        }

        toast.success(result.message || 'Address deleted successfully');
        router.refresh()
        setIsDeleting(false);
    };
  return (
    <button type="button" onClick={handleDelete} disabled={isDeleting}
    className="mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition hover:bg-red-50 hover:text-error
    disabled:cursor-not-allowed disabled:opacity-50">
        <FiTrash2 size={16} />
    </button>
  )
}

export default DeleteAddressButton