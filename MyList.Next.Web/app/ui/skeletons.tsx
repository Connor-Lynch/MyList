const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function ShoppingListsSkeleton() {
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
  