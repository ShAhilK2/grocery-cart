"use client";

import Image from "next/image";
import Link from "next/link";

import { FiArrowLeft, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi"; 
import DeliveryAddress from "./DeliveryAddress";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";
import { createOrder } from "@/server-actions/checkout/createOrder";

export type addressProps ={
  id : string;
  firstName : string;
  lastName : string;
  userId : string;
  street : string;
  city : string;
  state : string;
  postalCode : string;
  country : string;
  isDefault : boolean;
}

interface CheckoutPageComponent {
  addresses : addressProps[];
}
export default function CheckoutPageComponent({addresses} :CheckoutPageComponent) {

  const router = useRouter()
  const [selectedAddress,setSelectedAddress] = useState<addressProps | null>(
    null
  )
  const [paymentMethod,setPaymentMethod] = useState<"cod" | "stripe">("cod")
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false)

  const cartItems = useCartStore((store)=>store.cartItems);
const increaseQuantity = useCartStore((store)=>store.increaseQuantity);
const decreaseQuantity = useCartStore((store)=>store.decreaseQuantity);
const removeItem = useCartStore((store)=>store.removeCartItem);
const clearCart = useCartStore((store)=>store.clearCart);

const cartCount = cartItems.reduce((total,item)=>total + item.quantity,0);
  const subTotal = cartItems.reduce((total,item)=>total + Number(item.price) * item.quantity,0)

  

  // order above 500 no shipping fee
  const shippingFee = 0
  const tax = subTotal * 0.02;
  const total = subTotal + shippingFee + tax;


  const handlePlaceOrder = async()=>{
    if(!selectedAddress){
      toast.error("Please select an address");
      return;
    }

    if(cartItems.length === 0){
      toast.error("Cart is empty");
      return;
    }
     
    setIsSubmitting(true)

    if(paymentMethod === "stripe"){
      // handle stripe 
      return
    }

    const result = await createOrder({
      addressId: selectedAddress.id,
      paymentMethod: "cod",
      items: cartItems.map((item)=>({
        productId: item.id,
        quantity: item.quantity,
      })),
      shippingFee: shippingFee,
      tax: tax
    })

    if(!result.success){
      toast.error(result.message || "Failed to place order");
      setIsSubmitting(false);
      return;
    }

    clearCart();
    setIsSubmitting(false);
    toast.success("Order placed successfully");
    router.replace("/orders");
   


  }
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:px-8 lg:flex-row lg:py-12">
      {/* Cart */}
      <div className="min-w-0 flex-1">
        <h1 className="mb-6 text-2xl font-medium text-text md:text-3xl">
          Shopping Cart{" "}
          <span className="text-sm font-normal text-primary">
            {cartCount} Items
          </span>
        </h1>

        {/* Desktop Header */}
        <div className="hidden grid-cols-[2fr_1fr_1fr] border-b border-border pb-3 text-sm font-medium text-muted sm:grid">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* Products */}
        <div className="divide-y divide-border">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="grid gap-4 py-5 sm:grid-cols-[2fr_1fr_1fr] sm:items-center"
            >
              {/* Product Details */}
              <div className="flex gap-3 sm:gap-5">
                <Link
                  href={`/products/${product.name
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background sm:h-28 sm:w-28"
                >
                  <Image
                    src={product.image || ""}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="h-full w-full object-contain p-2"
                  />
                </Link>

                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-text">
                    {product.name}
                  </p>

                  {/* <p className="mt-1 text-xs text-muted">
                    {product.category}
                  </p> */}

                  <p className="mt-1 text-sm text-muted">
                    {product.unit}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-medium text-primary">
                    ₹{Number(product.price).toFixed(2)}
                    </span>

                    {/* <span className="text-xs text-muted line-through">
                    ₹{Number(product.oldPrice).toFixed(2)}
                    </span> */}
                  </div>

                  {/* Quantity */}
                  <div className="mt-3 flex w-fit items-center overflow-hidden rounded-md border border-border">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(product.id)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center text-muted hover:bg-background hover:text-primary"
                    >
                      <FiMinus size={13} />
                    </button>

                    <span className="flex h-7 w-8 items-center justify-center border-x border-border text-xs font-medium text-text">
                      {product.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(product.id)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center text-muted hover:bg-background hover:text-primary"
                    >
                      <FiPlus size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <p className="text-left font-medium text-text sm:text-center">
                <span className="mr-2 text-sm text-muted sm:hidden">
                  Subtotal:
                </span>
              ₹{Number(product.price) * product.quantity}
              </p>

              {/* Delete */}
              <button
                onClick={() => removeItem(product.id)}
                type="button"
                className="flex w-fit cursor-pointer items-center gap-2 text-sm !text-red-500 transition hover:opacity-70 sm:mx-auto "
              >
                <FiTrash2 size={17} className="text-red-500" />
                <span className="sm:hidden">Remove</span>
              </button>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <Link
          href="/products"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-hover"
        >
          <FiArrowLeft
            size={17}
            className="transition-transform group-hover:-translate-x-1"
          />
          Continue Shopping
        </Link>
      </div>

      {/* Order Summary */}
      <div className="h-fit w-full rounded-lg border border-border bg-background p-5 lg:max-w-[360px]">
        <h2 className="text-xl font-medium text-text">
          Order Summary
        </h2>

        <hr className="my-5 border-border" />

        {/* Delivery Address */}
   <DeliveryAddress addresses={addresses} selectedAddress={selectedAddress}
   setSelectedAddress={setSelectedAddress}/>

        {/* Payment Method */}
        <div className="mt-6">
          <p className="text-sm font-medium uppercase text-text">
            Payment Method
          </p>

          <select className="mt-2 w-full cursor-pointer rounded-md border border-border bg-white px-3 py-2.5 text-sm text-text outline-none focus:border-primary"
          onChange={(e)=>setPaymentMethod(e.target.value as "cod" | "stripe")}>
            <option value="cod">Cash on Delivery</option>
            <option value="stripe">Online Payment</option>
          </select>
        </div>

        <hr className="my-5 border-border" />

        {/* Summary */}
        <div className="space-y-3 text-sm text-muted">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subTotal}</span>
          </p>

          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-success">
              {shippingFee === 0
                ? "Free"
                : `₹${shippingFee}`}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </p>

          <hr className="border-border" />

          <p className="flex justify-between text-lg font-medium text-text">
            <span>Total Amount</span>
            <span className="text-primary">
            ₹{total}
            </span>
          </p>
        </div>

        {/* Place Order */}
        <button
        disabled={isSubmitting || cartItems.length === 0}
          type="button"
          onClick={handlePlaceOrder}
          className="mt-6 w-full cursor-pointer rounded-lg bg-primary py-3.5 font-medium text-white transition hover:bg-primary-hover"
        >
         {paymentMethod === "cod" ? "Place Order" : "Continue to Stripe"}
        </button>
      </div>
    </div>
  );
}