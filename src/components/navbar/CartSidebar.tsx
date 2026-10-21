"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";



interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({
  open,
  onClose,
}: CartSidebarProps) {

  const cartItems = useCartStore((state) => state.cartItems)
  const removeFromCart = useCartStore((state) => state.removeCartItem)
  const increaseQuanutity = useCartStore((store) => store.increaseQuantity)
  const decreaseQuanutity = useCartStore((store) => store.decreaseQuantity)

  // Calculate total items in cart
  // TODO: Add item count to cart store
 const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const subTotal = cartItems.reduce((total,item)=> total + Number(item.price) * item.quantity, 0)
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-60 flex h-dvh w-full max-w-105 flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div>
            <h2 className="text-lg font-semibold text-text">
              Your Cart
            </h2>

            <p className="mt-0.5 text-xs text-muted">
              {cartCount} items in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background text-muted transition hover:bg-border hover:text-text"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Cart Items */}
     
{/* Cart Items */}
<div className="flex flex-1 flex-col overflow-y-auto px-5 py-5">
  {cartItems.length === 0 ? (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      {/* Empty Cart Icon */}
      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-background">
        <FiTrash2 size={38} className="text-muted/60" />
      </div>

      <h3 className="text-lg font-semibold text-text">
        Your cart is empty
      </h3>

      <p className="mt-2 max-w-60 text-sm leading-6 text-muted">
        Looks like you haven't added anything to your cart yet.
        Explore our products and find something you love.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
      >
        Continue Shopping
      </button>
    </div>
  ) : (
    <div className="space-y-5">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 border-b border-border pb-5"
        >
          {/* Product Image */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background">
            {item.image ? (
              <Image
                width={80}
                height={80}
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-xs text-muted">No image</span>
            )}
          </div>

          {/* Product Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="line-clamp-2 text-sm font-medium text-text">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs text-muted">
                  {item.unit}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                type="button"
                aria-label={`Remove ${item.name} from cart`}
                className="shrink-0 cursor-pointer text-muted transition hover:text-error"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              {/* Quantity */}
              <div className="flex items-center overflow-hidden rounded-md border border-border">
                <button
                  onClick={() => decreaseQuanutity(item.id)}
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center text-muted transition hover:bg-background hover:text-primary"
                >
                  <FiMinus size={12} />
                </button>

                <span className="flex h-7 w-8 items-center justify-center border-x border-border text-xs font-medium text-text">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuanutity(item.id)}
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center text-muted transition hover:bg-background hover:text-primary"
                >
                  <FiPlus size={12} />
                </button>
              </div>

              {/* Price */}
              <p className="text-sm font-semibold text-text">
                ₹{(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


        {/* Footer */}
        <div className="border-t border-border bg-white px-5 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted">Subtotal</span>

            <span className="text-lg font-semibold text-text">
              {subTotal.toFixed(2) }
            </span>
          </div>

          <p className="mb-4 text-xs leading-5 text-muted">
            Delivery charges and taxes will be calculated at checkout.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-primary py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              Continue Shopping
            </button>

            <Link
              href="/checkout"
              onClick={onClose}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-primary py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}