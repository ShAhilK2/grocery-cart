
interface ProductCardSkeletonProps {
  number: number;
}

export default function ProductCardSkeleton({
  number,
}: ProductCardSkeletonProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: number }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-md border border-gray-500/20 bg-white px-3 py-2 md:px-4"
        >
          {/* Product Image */}
          <div className="flex items-center justify-center px-2">
            <div className="aspect-square w-full rounded-md bg-[#f5f5f5]" />
          </div>

          {/* Product Info */}
          <div className="space-y-2 pt-3">
            {/* Category */}
            <div className="h-4 w-20 rounded bg-gray-200" />

            {/* Product Name */}
            <div className="h-5 w-3/4 rounded bg-gray-200" />

            {/* Price and Add Button */}
            <div className="mt-3 flex items-end justify-between gap-2">
              <div className="space-y-2">
                <div className="h-6 w-20 rounded bg-gray-200 md:w-24" />
                <div className="h-3 w-14 rounded bg-gray-200" />
              </div>

              <div className="h-[34px] w-[64px] rounded bg-gray-200 md:w-[80px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

