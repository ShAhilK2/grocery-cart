
export default function ProductPageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-6 sm:px-6 md:px-8 md:py-10">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-3 w-12 rounded bg-gray-200" />
        <div className="h-3 w-2 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-2 rounded bg-gray-200" />
        <div className="h-3 w-32 rounded bg-gray-200" />
      </div>

      {/* Product Layout */}
      <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            {/* Thumbnail Skeletons */}
            <div className="flex gap-3 overflow-hidden sm:w-20 sm:flex-col">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 w-20 shrink-0 rounded-lg bg-gray-200"
                />
              ))}
            </div>

            {/* Main Image Skeleton */}
            <div className="flex h-72 w-full items-center justify-center rounded-lg bg-gray-200 sm:h-96 md:h-105">
              <div className="h-32 w-32 rounded-xl bg-gray-300 sm:h-48 sm:w-48" />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          {/* Product Title */}
          <div className="h-8 w-4/5 rounded bg-gray-200 sm:h-10" />

          {/* Category */}
          <div className="mt-3 h-4 w-28 rounded bg-gray-200" />

          {/* Price */}
          <div className="mt-7 space-y-3">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-9 w-32 rounded bg-gray-200" />
          </div>

          {/* Description */}
          <div className="mt-8">
            <div className="h-5 w-32 rounded bg-gray-200" />

            <div className="mt-4 space-y-3">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-11/12 rounded bg-gray-200" />
              <div className="h-3 w-3/4 rounded bg-gray-200" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="h-12 w-full rounded-lg bg-gray-200" />
            <div className="h-12 w-full rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
