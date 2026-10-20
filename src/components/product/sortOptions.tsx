"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  {label : "Sort By: Price (Low to High)", value : "price-low"},
  {label : "Sort By: Price (High to Low)", value : "price-high"},
  {label : "Sort By: Newest", value : "newest"},
  {label : "Sort By: Oldest", value : "oldest"},
] as const

export default function SortOptions() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") || "newest"


  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`${pathname}?${params.toString()}`)
  }


  
  return (
    <div className="mb-4 flex items-center justify-between">
       <h2 className="text-xl font-medium md:text-3xl">All Products</h2>

      <select className="rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"
              onChange={(e) => handleSortChange(e.target.value)}
              value={currentSort}>
        {
          sortOptions.map((option) => (
            <option key={option.value} value={option.value}
     
           >
              {option.label}
            </option>
          ))
        }
  

      </select>
    </div>
  );
}
