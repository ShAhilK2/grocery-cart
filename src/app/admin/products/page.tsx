import { getProducts } from "@/server-actions/products/getProducts";
import Image from "next/image";
import Link from "next/link";
import {  FiPlus, FiTrash2 } from "react-icons/fi";


// what is this for?
// prevents Next.js from caching this page
// forces server-side rendering on every request
// ensures fresh data on each visit
export const dynamic = "force-dynamic";

export default async function ProductsPage() {

  const {products,success,message} = await getProducts();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text sm:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-muted">
            Manage your grocery products and inventory.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
        >
          <FiPlus size={18} />
          Add Product
        </Link>
      </div>

      {/* Products */}
      <div className="mt-7 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold text-text">
            All Products
            <span className="ml-2 text-sm font-normal text-muted">
              ({products.length})
            </span>
          </h2>
        </div>

        {!success ? (
          <div className="p-6 text-center text-sm text-error">{message || "Failed to load products"}</div>
        ) : 
        products.length === 0 ? (
          <div className="p-10 text-center ">
            <p className="text-lg font-semibold text-text">
              No products found. 
            </p>
            <p className="text-sm text-muted">Start by adding your first product.</p>
          </div>
        ) : <>
              {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background text-left text-muted">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 hover:bg-background/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-background">
                        <Image
                          src={product.image || ""}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <span className="font-medium text-text">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {product.category}
                  </td>

                  <td className="px-5 py-4 font-medium text-text">
                  ₹{Number(product.price).toFixed(2)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        product.stock === 0
                          ? "font-medium text-error"
                          : product.stock <= 10
                            ? "font-medium text-accent"
                            : "font-medium text-success"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                   

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-error hover:text-error"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

              {/* Mobile List */}
        <div className="divide-y divide-border md:hidden">
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background">
                  <Image
                    src={product.image || ""}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-text">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted">
                    {product.category}
                  </p>

                  <div className="mt-1 flex items-center gap-3 text-sm">
                    <span className="font-medium text-primary">
                    ₹{Number(product.price).toFixed(2)}
                    </span>

                    <span
                      className={
                        product.stock === 0
                          ? "text-error"
                          : product.stock <= 10
                            ? "text-accent"
                            : "text-success"
                      }
                    >
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3">
               

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 px-3 text-sm text-muted transition hover:border-error hover:text-error"
                >
                  <FiTrash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
        
            }
  
    

  
      </div>
    </div>
  );
}

