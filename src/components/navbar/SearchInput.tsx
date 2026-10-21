import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchInput = () => {

    const router = useRouter();
    const [query,setQuery] = useState("")

    useEffect(()=>{
        const search = query.trim();
        if(!search){
            return;
        }

      const timeout = setTimeout(()=>{
        router.push(`/search?q=${encodeURIComponent(search)}`)
      },1000)

      return () => clearTimeout(timeout)

    },[query])
 


  return (
      <div className="hidden items-center gap-2 rounded-full border border-border px-3 lg:flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products"
                  className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-muted"
                />
    
                <FaSearch
                  className="text-muted"
                  size={14}
                />
              </div>
  )
}

export default SearchInput