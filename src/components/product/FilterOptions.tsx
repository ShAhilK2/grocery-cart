"use client";

import { categories } from "@/constants/categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const priceRanges = [
  {label : "₹0-₹100", value : "0-100"},
  {label : "₹100-₹200", value : "100-200"},
  {label : "₹200-₹500", value : "200-500"},
  {label : "₹500+", value : "500+"},
] as const

export default function FilterOptions() {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  console.log(pathname)
  console.log(searchParams)

  const handleFilterChange = (type : "categories" | "priceRanges", value : string)=>{
    // TODO: Implement filter logic
   
    // url search params => update => redirect
    // eg ?categories=fruits&priceRanges=0-10
    // 
    const params = new URLSearchParams(searchParams.toString())
    // update the params
    const currentValues = params.getAll(type)
     
    params.delete(type)

    if(!currentValues.includes(value)) {
      currentValues.push(value)
    }else{
      const index = currentValues.indexOf(value)
      currentValues.splice(index, 1)
    }

    currentValues.forEach((value) => {
      params.append(type, value)
    })

    router.push(`${pathname}?${params.toString()}`)
  }
  const isChecked = (type : "categories" | "priceRanges", value : string) => {
    const currentValues = searchParams.getAll(type)
    return currentValues.includes(value)
  }

  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="mb-4 flex items-center gap-2 text-xl font-semibold text-text sm:cursor-default"
      >
        FILTERS

        <RiArrowRightDoubleFill
          className={`text-primary transition-transform duration-300 sm:hidden ${
            showFilter ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Filters */}
      <div
        className={`${
          showFilter ? "block" : "hidden"
        } space-y-6 sm:block`}
      >
        {/* Categories */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-text">
            CATEGORIES
          </h3>

          <div className="space-y-3 text-sm text-muted">
       {categories.map((category) => (
         <label key={category.value} className="flex cursor-pointer items-center gap-3">
              <input
              onChange={() => handleFilterChange("categories", category.value)}
              checked={isChecked("categories", category.value)}
                type="checkbox"
                value={category.value}
                className="accent-primary"
              />
              <span>{category.label}</span>
            </label>
          ))}
          </div>
        </div>


        {/* Price Range */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-text">
            PRICE RANGE
          </h3>

          <div className="space-y-3 text-sm text-muted">
         {priceRanges.map((priceRange) => (
            <label key={priceRange.value} className="flex cursor-pointer items-center gap-3">
              <input
                onChange={() => handleFilterChange("priceRanges", priceRange.value)}
                checked={isChecked("priceRanges", priceRange.value)}
                type="checkbox"
                value={priceRange.value}
                className="accent-primary"
              />
              <span>{priceRange.label}</span>
            </label>
          ))}
          </div>
        </div>

      
      </div>
    </aside>
  );
}