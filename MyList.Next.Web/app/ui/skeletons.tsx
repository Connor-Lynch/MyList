const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ShoppingListsSkeleton() {
    return (
        <>
            <div className="p-5 flex flex-wrap">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </>
      );
}

export function ShoppingListSkeleton() {
    return (
        <div className={`${shimmer} w-full`}> 
            <div className="flex p-4 w-full">
                <div className="h-12 w-28 rounded-md bg-gray-200" />
            </div>

            <div className="px-4 py-0 w-full">
                <div className="h-12 w-full rounded-md bg-gray-200" />
            </div>

            <div className="p-4 w-full">
                <div className="h-7 w-1/2 rounded-md bg-gray-200 mb-2" />
                <div className="h-7 w-2/3 rounded-md bg-gray-200 mb-2" />
                <div className="h-7 w-1/4 rounded-md bg-gray-200 mb-2" />
                <div className="h-7 w-1/2 rounded-md bg-gray-200 mb-2" />
                <div className="h-7 w-1/2 rounded-md bg-gray-200 mb-2" />
                <div className="h-7 w-1/4 rounded-md bg-gray-200 mb-2" />
                <div className="h-7 w-1/2 rounded-md bg-gray-200 mb-2" />
                <div className="flex justify-center pt-2">
                    <div className="h-7 w-1/4 rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    )
}

export function CardSkeleton() {
    return (
        <div className={`${shimmer} w-full md:w-1/2 relative`}>
            <div className="rounded-xl bg-gray-50 p-2 m-3 shadow-sm drop-shadow-md">
                <div className="flex p-4 w-full">
                    <div className="h-5 w-1/2 rounded-md bg-gray-200" />
                </div>
                <div className="truncate rounded-xl bg-white p-3 w-full" >
                    <div className="h-5 w-1/2 rounded-md bg-gray-200 mb-2" />
                    <div className="h-5 w-2/3 rounded-md bg-gray-200 mb-2" />
                    <div className="h-5 w-1/4 rounded-md bg-gray-200 mb-2" />
                    <div className="h-5 w-1/2 rounded-md bg-gray-200" />
                </div>
            </div>
        </div>
    );
  }
  