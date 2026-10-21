    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    import { useRouter } from 'next/navigation'
    import React, { useEffect, useState } from 'react'
    import { FaSearch } from 'react-icons/fa'
    
    const MobileSearchInput = () => {
    
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
             <div className="flex w-full items-center gap-2 rounded-full border border-border px-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search products"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted"
            />

            <FaSearch
              className="text-muted"
              size={14}
            />
          </div>
      )
    }
    
    export default MobileSearchInput
    
    
    
    
